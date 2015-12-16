var path = require('path'),
	fs = require('fs'),
	strPwd = path.resolve(process.cwd(), '.'),
	//strLibPwd = path.resolve(process.cwd(), '../'),
	SimpleUser = require(strPwd + '/lib/simpleuser');

var chai = require("chai"),
	chaiAsPromised = require("chai-as-promised"),
	expect = chai.expect;
	
chai.use(chaiAsPromised);

describe('Simpleuser', function() {

	var simpleUser,
		testStorage = strPwd + "/test/ud-test/u.json",
		userTestData = {
			email: "foo@foo.com",
			password: "bar"
		},
		onUserError = function (err) {
			console.log("User Error - " + err);
		};

  	describe('Setup', function () {
  		//
  		
  		before(function() {
		    //
		    simpleUser = new SimpleUser({
		    	storeLocation: testStorage
		    });
		    simpleUser.setEmail(userTestData.email);
			simpleUser.setPassword(userTestData.password);
		});

  		//
  		
		after(function() {
		  	//
		    fs.unlink(testStorage, function (err) {
			  	//
			  	if (err) throw err;

			  	console.log('successfully cleaned up after tests');
			});
			
		});
  		
		//
		
		it('should set email and password', function () {
			//

			expect(simpleUser.getEmail()).to.equal(userTestData.email);	
			
			expect(simpleUser.getPassword()).to.be.a('string');			
			
	    });

		it('should save a user', function () {
			//
			var result;

			result = simpleUser.addUser();

  			return expect(result).to.eventually.to.have.any.keys('email', 'password');
	    });
  	});
/*
  	describe('CRUDs', function () {

	    it('should return -1 when the value is not present', function () {

	      	assert.equal(-1, [1,2,3].indexOf(5));
	      	assert.equal(-1, [1,2,3].indexOf(0));
	    });
  	});

  	describe('Auth', function () {

	    it('should return -1 when the value is not present', function () {

	      	assert.equal(-1, [1,2,3].indexOf(5));
	      	assert.equal(-1, [1,2,3].indexOf(0));
	    });
  	});
 */
});