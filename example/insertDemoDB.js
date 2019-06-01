// we create clients tables in auth collection and paraffin database
var url = 'mongodb://localhost:27017'

var debug = require('debug')
// create a client to mongodb
const MongoClient = require('mongodb').MongoClient
const crypto = require('crypto')


var yesterday = new Date()
var today = new Date()
var tomorrow = new Date()
var nextMonth = new Date()

tomorrow.setDate(today.getDate() + 1)
yesterday.setDate(today.getDate() - 1)
nextMonth.setDate(today.getDate() + 30)

const config = {
  iterations: 10,
  hashBytes: 64,
  digest: 'sha512',
  salt: 'salt'
}

// Generate PBKDF2 hash
function pbkdf2(value) {

  //return new Promise((resolve, reject) => {

  const {
    iterations,
    hashBytes,
    digest,
    salt
  } = config

  key = crypto.pbkdf2Sync(value, salt, iterations, hashBytes, digest)

  debug('Hashed > ' + value + ' : ' + key.toString('base64'))
  //resolve(key.toString('base64'))
  return key.toString('base64')
}



// documents to be inserted
var docs = [
  {
    ver: '1.0',
    realm: 'ali',
    clientId: 'Reader-114',
    adapters: [
      {
        type: 'mqtt',
        enabled: true,
        secret: { type: 'basic', pwdhash: 'king', startAfter: yesterday, expiredBefore: nextMonth },
        topics: [
          { topic: 'temperature', action: 'allow', type: 'rw' },
          { topic: 'color', action: 'deny'},
          //{ topic: 'humidity', action: 'timeLimit', type: 'rw', startAfter: yesterday, expiredBefore: tomorrow },
        ],
        setting: {
          action: 'exactSame',  // Exactsame, 
          keepAlive: 20,
          cleanSession: true,
          willTopic: '',
          willQoS: 1,
          willRetain: false,
          willPayload: '',
          connectTimeout: 10000,  //ms
          reconnectPeriod: 3000,  //ms
          limitW: 50,  //50kb is allowable for writting packet data in every publish
          limitMPM: 3 // 3 messages per minute can write
        }
      }
    ]
  },
  {
    realm: 'mohammad',
    clientId: 'r92',
    adapters: [
      {
        type: 'mqtt',
        enabled: true,
        secret: { type: 'pbkdf2', pwdhash: pbkdf2('allah'), startAfter: yesterday, expiredBefore: tomorrow },
        topics: ['hello', 'username', 'mahdi/hello', 'mohammad', '*'],
        keepAlive: 20,
        limitW: 50,  //50kb is allowable for writting packet data in every publish
        limitMPM: 3 // 3 messages per minute can write
      },
      {
        type: 'http',
        enabled: true,
        secret: { type: 'pbkdf2', pwdhash: pbkdf2('allah'), startAfter: yesterday, expiredBefore: tomorrow },
        topics: ['hello', 'username', 'mahdi/hello', 'mohammad', '*'],
      },
      {
        type: 'coap',
        enabled: false
      }
    ]
  },
  {
    realm: 'mahdi',
    clientId: 'm313',
    adapters: [
      {
        type: 'mqtt',
        enabled: true,
        secret: { type: 'pbkdf2', pwdhash: pbkdf2('adrekni'), startAfter: yesterday, expiredBefore: tomorrow },
        topics: ['hello', 'username', 'mahdi/hello', 'mohammad', '*'],
        keepAlive: 20,
        limitW: 50,  //50kb is allowable for writting packet data in every publish
        limitMPM: 3 // 3 messages per minute can write
      },
      {
        type: 'http',
        enabled: true,  // Authorization: Basic bWFoZGk6aGFkaQ==
        secret: { type: 'pbkdf2', pwdhash: pbkdf2('adrekni'), startAfter: yesterday, expiredBefore: tomorrow },
        topics: ['hello', 'username', 'mahdi/hello', 'mohammad', '*'],
      },
      {
        type: 'coap',
        enabled: false
      }
    ]
  },
  {
    realm: 'ali',
    clientId: 'a110',
    adapters: [
      {
        type: 'mqtt',
        enabled: true,
        secret: { type: 'basic', pwdhash: 'amir', startAfter: yesterday, expiredBefore: tomorrow },
        topics: ['hello', 'username', 'mahdi/hello', 'mohammad', '*'],
        keepAlive: 20,
        limitW: 50,  //50kb is allowable for writting packet data in every publish
        limitMPM: 3 // 3 messages per minute can write
      },
      {
        type: 'http',
        enabled: true,   //Authorization: Basic YWxpOmFtaXI=
        secret: { type: 'basic', pwdhash: 'amir', startAfter: yesterday, expiredBefore: tomorrow },
        topics: ['hello', 'username', 'mahdi/hello', 'mohammad', '*']
      },
      {
        type: 'coap',
        enabled: false
      }
    ]
  },
  {
    realm: 'ali',
    clientId: 'Thermostat1398',
    adapters: [
      {
        type: 'mqtt',
        enabled: true,
        secret: { type: 'basic', pwdhash: 'fatima', startAfter: yesterday, expiredBefore: tomorrow },
        topics: ['hello', 'temperature', '*'],
        keepAlive: 20,
        limitW: 50,  //50kb is allowable for writting packet data in every publish
        limitMPM: 3 // 3 messages per minute can write
      },
      {
        type: 'http',
        enabled: true,   //Authorization: Basic YWxpOmFtaXI=
        secret: { type: 'basic', pwdhash: 'fatima', startAfter: yesterday, expiredBefore: tomorrow },
        topics: ['hello', 'temperature', '*']
      },
      {
        type: 'coap',
        enabled: false
      }
    ]
  },
  {
    realm: 'username',
    clientId: 'u911',
    adapters: [
      {
        type: 'mqtt',
        enabled: true,
        secret: { type: 'basic', pwdhash: 'password', startAfter: yesterday, expiredBefore: tomorrow },
        topics: ['hello', 'username', 'mahdi/hello', 'mohammad', '*'],
        keepAlive: 20,
        limitW: 50,  //50kb is allowable for writting packet data in every publish
        limitMPM: 3 // 3 messages per minute can write
      },
      {
        type: 'http',
        enabled: true,  // Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
        secret: { type: 'basic', pwdhash: 'password', startAfter: yesterday, expiredBefore: tomorrow },
        topics: ['hello', 'username', 'mahdi/hello', 'mohammad', '*']
      },
      {
        type: 'coap',
        enabled: false
      }
    ]
  },
  {
    realm: 'username',
    clientId: 'u20_Expired',
    adapters: [
      {
        type: 'mqtt',
        enabled: true,
        secret: { type: 'basic', pwdhash: 'password', startAfter: yesterday, expiredBefore: today },
        topics: ['hello', 'username', 'mahdi/hello', 'mohammad', '*'],
        keepAlive: 20,
        limitW: 50,  //50kb is allowable for writting packet data in every publish
        limitMPM: 3 // 3 messages per minute can write
      },
      {
        type: 'http',
        enabled: true,  // Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
        secret: { type: 'basic', pwdhash: 'password', startAfter: yesterday, expiredBefore: today },
        topics: ['hello', 'username', 'mahdi/hello', 'mohammad', '*']
      },
      {
        type: 'coap',
        enabled: false
      }
    ]
  },
  {
    realm: 'hello',
    clientId: 'hi313',
    adapters: [
      {
        type: 'mqtt',
        enabled: true,
        secret: { type: 'basic', pwdhash: 'rasoul', startAfter: yesterday, expiredBefore: tomorrow },
        topics: ['hello', 'username', 'mahdi/hello', 'mohammad', '*'],
        keepAlive: 20,
        limitW: 50,  //50kb is allowable for writting packet data in every publish
        limitMPM: 3 // 3 messages per minute can write
      },
      {
        type: 'http',
        enabled: true,
        secret: { type: 'basic', pwdhash: 'hadi', startAfter: yesterday, expiredBefore: tomorrow },
        topics: ['hello', 'username', 'mahdi/hello', 'mohammad', '*']
      },
      {
        type: 'coap',
        enabled: true,
        secret: { type: 'basic', pwdhash: 'hadi', startAfter: yesterday, expiredBefore: tomorrow },
        topics: ['hello', 'username', 'mahdi/hello', 'mohammad', '*']
      }
    ]
  },
  {
    realm: 'hello',
    clientId: 'hi110',
    adapters: [
      {
        type: 'mqtt',
        enabled: true,
        secret: { type: 'basic', pwdhash: 'yaali', startAfter: yesterday, expiredBefore: tomorrow },
        topics: ['hello', 'username', 'mahdi/hello', 'mohammad', '*'],
        keepAlive: 20,
        limitW: 50,  //50kb is allowable for writting packet data in every publish
        limitMPM: 3 // 3 messages per minute can write
      },
      {
        type: 'http',
        enabled: true,
        secret: { type: 'basic', pwdhash: 'yaali', startAfter: yesterday, expiredBefore: tomorrow },
        topics: ['hello', 'username', 'mahdi/hello', 'mohammad', '*']
      },
      {
        type: 'coap',
        enabled: true,
        secret: { type: 'basic', pwdhash: 'yaali', startAfter: yesterday, expiredBefore: tomorrow },
        topics: ['hello', 'username', 'mahdi/hello', 'mohammad', '*']
      }
    ]
  }
]


// make client connect to mongo service
MongoClient.connect(
  url,
  function (err, db) {
    if (err) throw err
    debug('Switched to ' + db.databaseName + ' database')
    /*
        db.collection(auth).drop(function (err, delOK) {
          if (err) {
            debug('Collection drop error: ')
            debug(err)
          }
          if (delOK) debug('Collection deleted')
          db.close()
        })
    */
    var dbo = db.db('paraffin')

    for (i = 0; i < docs.length; i++) {
      // insert multiple documents to 'users' collection using insertOne
      dbo.collection(docs[i].realm.toString()).insertOne(docs[i], function (err, res) {
        if (err) throw err
        console.log('new Doc inserted')
        console.log(res.result)
      })
    }
    // close the connection to db when you are done with it
    db.close()
  })