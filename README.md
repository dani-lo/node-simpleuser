# node-simpleuser
A simple utility class to manage user logins basic operation without external storage engines (local filesystem only)

## about
Include the library in your Express app (or any other backend) then start managing users out of the box. Add, edit, update, delete and check login auth. Uses encryption to store password safely. The path to the stored user data can be customised (see examples and tests) and you should make sure the path is outside your server public / assets folders

## examples
See tests for detailed api. See below a basic working example of using the library in a basic node module 

    var user = require('./lib/simpleuser');

    var testEmail = "foo@bar.com",
        testPassword = "foo";

    var mUse = new user();

    var onUserError = function (err) {
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
        console.log("User added success");

        mUse.findUser(testEmail).then(function () {
   
            console.log("User retrieve success");

            if (mUse.authUser(testPassword)) {

                console.log("User auth success")
            };
        }, onUserError);
    }, onUserError);




## note
Node-Simpleuser does not provide resources to tag a user authorisation to the request object, though that migh be built in the future. Typically you will need to manually flag the user as authorised (session i.e) after using this library purely to check the email and password provided do match