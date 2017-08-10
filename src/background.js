import pbkdf2 from 'pbkdf2';
import tldjs from 'tldjs';
import ascii85 from 'ascii85';

chrome.browserAction.onClicked.addListener(function (tab) {
    let masterPassword = prompt('Please enter your password:');
    if (masterPassword) {
        let domain = tldjs.getDomain(tab.url);
        pbkdf2.pbkdf2(masterPassword, domain, 100000, 16, 'sha512', (err, derivedKey) => {
            let password = ascii85.encode(derivedKey).toString();
            chrome.tabs.executeScript({"code": `document.activeElement.value=${JSON.stringify(password)};`});
        });
    }
});
