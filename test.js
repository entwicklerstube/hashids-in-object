import { expect } from 'chai'

import { encodeId, decodeId, detectIfId, encode,  decode } from './index'

describe('hashids-in-object', () => {
  describe('encodeId', () => {
    it('returns a string', () => {
      expect(encodeId()).to.be.a('string')
    })

    it('returns the encoded hash of a number', () => {
      expect(encodeId(1)).to.equal('lejRe')
    })
  })

  describe('decodeId', () => {
    it('returns a string', () => {
      expect(decodeId()).to.be.a('undefined')
    })

    it('returns the decoded number of hash', () => {
      expect(decodeId('lejRe')).to.equal(1)
    })
  })

  describe('detectIfId', () => {
    it('returns boolean', () => {
      expect(detectIfId()).to.be.a('boolean')
    })

    it('returns true if prop is `id`', () => {
      expect(detectIfId('id')).to.be.true
    })

    it('returns true if prop contains `id`', () => {
      expect(detectIfId('some_id')).to.be.true
      expect(detectIfId('someid')).to.be.true
      expect(detectIfId('someId')).to.be.true
    })

    it('returns false if prop doesnt contain `id`', () => {
      expect(detectIfId('nope')).to.be.false
      expect(detectIfId('id_nope')).to.be.false
      expect(detectIfId('nope_id_')).to.be.false
      expect(detectIfId('IdNope')).to.be.false
      expect(detectIfId('nopeIdN')).to.be.false
    })
  })

  describe('encode', () => {
    it('returns a object', () => {
      expect(encode()).to.be.a('object')
    })

    it('returns props as they where passed', () => {
      expect(encode({ hey: 'ho', lets: 'go' })).to.deep.equal({ hey: 'ho', lets: 'go' })
    })

    it('returns props as there where passed but encodes all `id` prop-values', () => {
      expect(encode({ id: 1, foo: 'bar', some_id: 2 })).to.deep.equal({ id: 'lejRe', foo: 'bar', some_id: 'mbk5e' })
    })

    it('returns ids encoded in array', () => {
      expect(encode({ some_id: [1,2,3]})).to.deep.equal({ some_id: ['lejRe', 'mbk5e', 'nel5a'] })
    })

    it('returns deep positioned id props', () => {
      expect(encode({ some: { flat: { object: { id: 1 } }} })).to.deep.equal({ some: { flat: { object: { id: 'lejRe' } }} })
    })

    it('returns deep positioned id props in arrays', () => {
      expect(encode({ some: { deep: [{ object: { id: 1 } }] } })).to.deep.equal({ some: { deep: [{ object: { id: 'lejRe' } }] } })
    })
  })

  describe('decode', () => {
    it('returns a object', () => {
      expect(decode()).to.be.a('object')
    })

    it('returns props as they where passed', () => {
      expect(decode({ hey: 'ho', lets: 'go' })).to.deep.equal({ hey: 'ho', lets: 'go' })
    })

    it('returns props as they where passed and transforms extra _id field', () => {
      expect(decode({ id: 'lejRe', foo: 'bar', some_id: 'mbk5e' })).to.deep.equal({ id: 1, foo: 'bar', some_id: 2 })
    })

    it('returns props but doesnt decode _id / Id fields if already numbers', () => {
      expect(decode({ id: 'lejRe', foo: 'bar', some_id: 'mbk5e', nativeId: 1, native_id: 1 })).to.deep.equal({ id: 1, foo: 'bar', some_id: 2, nativeId: 1, native_id: 1 })
    })
    
    it('decoded ids encoded in array', () => {
      expect(decode({some_id: ['lejRe', 'mbk5e', 'nel5a'] })).to.deep.equal({ some_id: [1,2,3] })
    })

    it('returns deep positioned id props', () => {
      expect(decode({ some: { flat: { object: { id: 'lejRe' } }} })).to.deep.equal({ some: { flat: { object: { id: 1 } }} })
    })

    it('returns deep positioned id props in arrays', () => {
      expect(decode({ some: { deep: [{ object: { id: 'lejRe' } }] } })).to.deep.equal({ some: { deep: [{ object: { id: 1 } }] } })
    })
  })
})
