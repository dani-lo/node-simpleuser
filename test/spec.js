var path = require('path'),
	fs = require('fs'),
	strPwd = path.resolve(process.cwd(), '.'),
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
			password: "foo"
		},
		userUpdateData = {
			email: "bar@bar.com",
			password: "bar"
		}
		onUserError = function (err) {
			console.log("User Error - " + err);
		};

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

	//

	it('should save a user', function () {
		//
		var result;

		result = simpleUser.addUser();

			return expect(result).to.eventually.to.have.any.keys('email', 'password');
    });

	//

	it('should login a user', function () {
		//
		expect(simpleUser.authUser(userTestData.password)).to.equal(true);
    });

	//

    it('should update a user', function () {
		//
		var result;

		simpleUser.setEmail(userUpdateData.email).setPassword(userUpdateData.password);

		result = simpleUser.updateUser();

		return expect(result).to.eventually.to.have.property('email').with.length(userUpdateData.email.length);
    });

    //

	it('should find a user', function () {
		//
		var result;

		simpleUser.addUser();

		result = simpleUser.findUser(userTestData.email);

		return expect(result).to.eventually.to.have.property('email').with.length(userTestData.email.length);
    });

	//
	
    it('should delete a user', function () {
		//
		var result;

		result = simpleUser.deleteUser(userUpdateData.email);

		return expect(result).to.eventually.to.deep.equal(true);
    });
});