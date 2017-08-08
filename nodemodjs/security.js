var fakepinAuths = {"1" : "wUKw1LaFWay2weUen7Ru6PMNfLMJp3o375Ie4R6VHWw=", "2" : "v1r2UoZHJtDuMSRufnsv68sLuNYlEyS5kNjFqy6ap70=", "3" : "g+e+RBczVGl5XME9OvPu+c5jw/YllUkoY2aOR01EnsI="};
var timetoexpire = 15000;
var crypto = require('crypto');
var encryption = 'sha256';


function checkAuthorized(session) { //doesnt do anything yet cos no session stuff added
    var timenow = Math.floor(Date.now() / 1000);
    if (timenow - session.authorized > timetoexpire) {
        return true;
    }
    else {
        return false;
    }
}

function authRequest(sess, user, pin) {

    if (fakepinAuths.hasOwnProperty(user)) {
        var hashverify = crypto.createHash('sha256').update(pin).digest('base64');
        if (hashverify == fakepinAuths[user]) { //TODO database.getSHA256Pin(user)
            sess.authorized = Math.floor(Date.now() / 1000); //sets current time as authorized timing
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