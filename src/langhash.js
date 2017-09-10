import pbkdf2 from 'pbkdf2';
import tldjs from 'tldjs';
import ascii85 from 'ascii85';

function insertPassword(password) {
    chrome.tabs.executeScript({"code": `document.activeElement.value=${JSON.stringify(password)};`});
}

function derivePassword(masterPassword, domain, callback) {
    pbkdf2.pbkdf2(masterPassword, domain, 135571, 16, 'sha512', (err, derivedKey) => {
        let password = ascii85.encode(derivedKey).toString();
        callback(password);
    });
}

function getCurrentUrl(callback) {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        let url = tabs[0].url;
        callback(url);
    });
}

document.getElementById('form').addEventListener('submit', function (ev) {
    ev.preventDefault();
    let masterPassword = document.getElementById('password').value;
    getCurrentUrl(url => {
        let domain = tldjs.getDomain(url);
        derivePassword(masterPassword, domain, password => {
            insertPassword(password);
            window.close();
        });
    });
});
