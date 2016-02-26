'use strict';

var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash');
var encoding = require('NativeModules').Encoding;

const authKey = 'auth';
const userKey = 'user';

class AuthService {

  getAuthInfo(cb) {
    AsyncStorage.multiGet([authKey,userKey], (err, val) => {
      if(err) {
        return cb(err);
      }
      if(!val) {
        return cb();
      }
      var zippedObj = _.fromPairs(val);
      if(!zippedObj[authKey]){
        return cb();
      }
      var user = JSON.parse(zippedObj[userKey]);
      var authInfo = {
        header: {
          Authorization: 'Basic ' + zippedObj[authKey]
        },
        user: user
      }
      return cb(null, authInfo);
    });
  }

  clearAuthInfo(){
    AsyncStorage.multiRemove([authKey,userKey]);
  }

  login(creds, cb) {

    var authString = creds.username + ':' + creds.password;
    encoding.base64Encode(authString,(encodedAuth) => {
      fetch('https://api.github.com/user',{
        headers: {
          'Authorization': 'Basic ' + encodedAuth
        }
      })
      .then((response)=> {
        console.log(response.status)
        if (response.status >= 200 && response.status < 300){
          return response;
        }
        throw {
          badCredentials: response.status == 401,
          unknownError: response.status != 401
        }
      })
      .then((response)=> {
        return response.json();
      })
      .then((results) => {
        AsyncStorage.multiSet([
          [authKey, encodedAuth],
          [userKey, JSON.stringify(results)]
        ], (err) => {
          if (err) {
            throw err;
          }
          return cb({loginSuccess: true});
        })
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
    });

  }
}

module.exports = new AuthService();
