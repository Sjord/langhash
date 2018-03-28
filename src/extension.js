import langhash from './langhash';

function insertPassword(password) {
    chrome.tabs.executeScript({"code": `document.activeElement.value=${JSON.stringify(password)}; document.activeElement.dispatchEvent(new Event("input")); document.activeElement.dispatchEvent(new Event("change"));`});
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
        langhash.derivePassword(masterPassword, url, password => {
            insertPassword(password);
            window.close();
        });
    });
});
