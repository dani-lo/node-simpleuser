"use strict";

var xFs = require("fs-extra"),
    util = require('./util');

var baseStorage = "./ud/u.json",
    useCrypting = true;

class SimpleUser {
	/**
  *
  * Constructor
  */
	constructor (options) {
  	//
    this.email = "";
    //
    this.password = "";
    //
    if (options && options.email) {
      //
      this.email = this.setEmail(options.email);
    }

    if (options && options.password) {
      //
      this.password = this.setPassword(options.password);
    }
    //
    if (options && options.storeLocation) {
      //
      baseStorage = options.storeLocation;
    }

    if (options && options.crypt === false) {
      //
      useCrypting = false;
    }
	}
  /**
  *
  * API
  */
  /////////////// void
  setPassword (password, crypt) {
    //
    var userPass;

    if (crypt === false) { // bypass conf
      //
      userPass = password;//
    } else {
      //
      if (useCrypting) {
        //
        userPass = util.cryptPassword(password);
      } else {
        //
        userPass = password;
      }
    } 

    this.password = userPass;

    return this.password;
  }
  /////////////// string
  getPassword () {
    //
    return this.password;
  }
  /////////////// void
  setEmail (email) {
    //
    this.email = email;
  }
  /////////////// string
  getEmail () {
    //
    return this.email;
  }
  /////////////// object
	getUser () {
		//
    return this.flatten();
	}
  /////////////// Promise
  findUser (email) {
    //
    return this.retrieve(email);
  }
  /////////////// bool
  authUser (userPassword) {
    //
    return util.comparePassword(this.password, userPassword);
  }
  /////////////// Promise
  deleteUser () {
    //
    return this.store(true);
  }
  /////////////// Promise
  updateUser () {
    //
    return this.store();
  }
  /////////////// Promise
  addUser () {
    //
    return this.store();
  }
  /**
  *
  * Private Methods
  */
  /////////////// Promise
  retrieve (email) {
    //
    var file = baseStorage;

    return new Promise((resolve, reject) => {

      try {
        xFs.readJson(file, (err, users) => {
          //
          if (err) {
            reject(err);
          };
          //
          var user = users.find((u) => {
            return u !== null && u.email === email;
          });
          if (user) {
            this.email = user.email;
            this.password = user.password;

            resolve(user);
          }
        });
      } catch (e) {
        //
        reject(e);
        return;
      }
    });
  }
  /////////////// Object
	flatten () {
		return {
			"email": this.getEmail(),
			"password": this.getPassword()
		}
	}
  /////////////// Promise
  store (boolDelete) {
    // store to fs-extra
    var file = baseStorage;

    return new Promise((resolve, reject) => {
      //
      xFs.ensureFile(file, () => {
        //
        try {

          xFs.readJson(file, (err, users) => {
            
            if (typeof(err) === "string") {
              //
              reject(err);
              return;
            }

            if (!users || !users.length) {
              users = [];
            };

            var user = users.find((u) => {
              return u !== null && u.email === this.email;
            });
            if (!user) {
              //
              users.push(this.flatten());
            } else {
              //
              users[users.indexOf(user)] = this.flatten();
            };

            if (boolDelete) {
              delete users[users.indexOf(user)];
            }

            if (user !== null) {

              xFs.writeJson(file, users, function (err) {
                //
                resolve(user);
              });
            } else {
              //
              resolve(user);
            }
          });
        } catch (e) {
          //
          reject(null, new Error("Error in creating storage"));
          //
          return;
        }
      });
    }); 
  }
}
//
module.exports = SimpleUser;