import langhash from './langhash';

function insertPassword(password) {
    let result = document.getElementById('result');
    result.value = password;
    result.select();
    document.execCommand('copy');
}

document.getElementById('form').addEventListener('submit', function (ev) {
    ev.preventDefault();
    let masterPassword = document.getElementById('password').value;
    let url = document.getElementById('url').value;
    langhash.derivePassword(masterPassword, url, password => {
        insertPassword(password);
    });
});
