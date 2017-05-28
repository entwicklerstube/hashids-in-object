# Hashids in object
> Go through object, detect id values and decode or encode them

[![Build Status](https://travis-ci.org/entwicklerstube/hashids-in-object.svg?branch=master)](https://travis-ci.org/entwicklerstube/hashids-in-object)

### Install
**yarn**
```
yarn add hashids-in-object
```

**npm**
```
npm install hashids-in-object --save
```

### Usage
```js
import { encode, decode } from 'hashids-in-object'

// Input
const example = {
  id: 123,
  user_id: 391,
  name: 'Michael',
  contact_id: 12,
  some: {
    deep: [{
      object: {
        in: {
          array: [{
            id: 1
          }]
        }
      }
    }]
  }
}

// Process
const encodedExample = encode(example)

// Output
{
  id: 'aMj3b',
  user_id: 'elpJe',
  name: 'Michael',
  contact_id: '7ax9b',
  some: {
    deep: [{
      object: {
        in: {
          array: [{
            id: 'aMj3b'
          }]
        }
      }
    }]
  }
}

// Decode it:
decode(encodedExample)

// Output
{
  id: 123,
  user_id: 391,
  name: 'Michael',
  contact_id: 12,
  some: {
    deep: [{
      object: {
        in: {
          array: [{
            id: 1
          }]
        }
      }
    }]
  }
}
```


### Under the hood
At the moment it uses the `[hashids.js](https://github.com/ivanakimov/hashids.js)` module to encode/decode the single id's.
