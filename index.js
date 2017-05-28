import Hashids from 'hashids'

const hashid = new Hashids('', 5)

export const encodeId = id => {
  return hashid.encode(id)
}

export const decodeId = id => {
  return hashid.decode(id)[0]
}

export const detectIfId = (string = '') => {
  return /(([a-z]+)_)?id$/.test(string.toLowerCase())
}

export const encode = (origin = {}) => {
  let response = {}

  for (let prop in origin) {
    if(detectIfId(prop)) {
      response[prop] = encodeId(origin[prop])
    } else {
      response[prop] = origin[prop]
    }
  }

  return response
}

export const decode = (origin = {}) => {
  let response = {}

  for (let prop in origin) {
    if(detectIfId(prop)) {
      response[prop] = decodeId(origin[prop])
    } else {
      response[prop] = origin[prop]
    }
  }

  return response
}

export default { encodeId, decodeId, detectIfId, encode, decode }
