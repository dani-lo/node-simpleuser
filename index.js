var user = require('./lib/simpleuser');

var testEmail = "foo@bar.com",
	testPassword = "foo";

var mUse = new user();

var onUserError = function (err) {
	//
	console.log(err);
}

/**
* A very basic example of usage for simple 
* web user storage and auth
* See specs file for full api functionality
*
*/

mUse.setEmail(testEmail);
mUse.setPassword(testPassword);

mUse.addUser().then(function () {
	//
	console.log("User added success");

	mUse.findUser(testEmail).then(function () {
		//
		console.log("User retrieve success");

		if (mUse.authUser(testPassword)) {
			//
			console.log("User auth success")
		};
	}, onUserError);
}, onUserError);



