var request = require('request');

var url = "http://175.156.152.251:3000/"

getWalletByClientID(123);

function getWalletByClientID(id) {
    request(url + 'api/Wallet?filter=%7B%22clientID%22%3A%20%22' + id + '%22%7D', function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred 
            return;
        }
        console.log('body:', body); // Print the HTML for the Google homepage. 
      });
}

function insertNewWallet(id, clientid, value) {
    request.post(url + 'api/wallet', 
        {form:
            {
                "$class": "org.acme.jenetwork.Wallet",
                "walletID": "walletID:" + id,
                "clientID": clientid,
                "value": value
            }
        }, function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred 
            return;
        }
        console.log('body:', body); // Print the HTML for the Google homepage. 
    });
}

function createTransaction(walletid, value) {
    request.post(url + 'api/walletTransaction', 
    {form:
        {
            "$class": "org.acme.jenetwork.walletTransaction",
            "asset": "resource:org.acme.jenetwork.Wallet#walletID:" + walletid,
            "newValue": value
          
        }
    }, function (error, response, body) {
    if (error) {
        console.log('error:', error); // Print the error if one occurred 
        return;
    }
    console.log('body:', body); // Print the HTML for the Google homepage. 
});
}