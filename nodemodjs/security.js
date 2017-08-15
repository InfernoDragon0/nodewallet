var fakepinAuths = {"1" : "wUKw1LaFWay2weUen7Ru6PMNfLMJp3o375Ie4R6VHWw=", "2" : "v1r2UoZHJtDuMSRufnsv68sLuNYlEyS5kNjFqy6ap70=", "3" : "g+e+RBczVGl5XME9OvPu+c5jw/YllUkoY2aOR01EnsI="};
var timetoexpire = 15 * 60;
var crypto = require('crypto');
var encryption = 'sha256';

module.exports.checkAuthorized = checkAuthorized;
module.exports.testAuthRequest = testAuthRequest;
module.exports.authRequest = authRequest;

function checkAuthorized(session) {
    var timenow = Math.floor(Date.now() / 1000);
    let timeprevious = parseInt(session["authorized"]);

    console.log("nowtime is " + timenow);
    console.log("time is " + timeprevious);
    console.log("Expiring is " + timetoexpire);
    console.log("Difference is " + (timenow - timeprevious));

    return timenow - timeprevious < timetoexpire;
}

function testAuthRequest(sess, user, pin) {

    if (fakepinAuths.hasOwnProperty(user)) {
        var hashverify = crypto.createHash('sha256').update(pin).digest('base64');
        if (hashverify == fakepinAuths[user]) { //TODO database.getSHA256Pin(user)
            sess["authorized"] = Math.floor(Date.now() / 1000); //sets current time as authorized timing
            return true;
        }
        else {       
            return false;
        }
    }
    else {
        return false;
    }
}

function authRequest(sess, user, pin) {
    if (fakepinAuths.hasOwnProperty(user)) {
        var hashverify = crypto.createHash('sha256').update(pin).digest('base64');
        if (hashverify == mongoReader.getSHA256Pin(user)) { //TODO database.getSHA256Pin(user)
            sess["authorized"] = Math.floor(Date.now() / 1000); //sets current time as authorized timing
            return true;
        }
        else {       
            return false;
        }
    }
    else {
        return false;
    }
}

function auth2FA(pin2) {

}