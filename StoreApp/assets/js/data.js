localStorage.setItem("API_URL", "https://localhost:7135/api/");
const API_URL = localStorage.getItem("API_URL");

const token = getToken();
const decodedToken = tokenDescribe(token);
checkTokenValidity();

function getToken() {
    return localStorage.getItem('token');
}

function tokenDescribe(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );
    return JSON.parse(jsonPayload);
}

function checkTokenValidity() {
    if (token) {
        const now = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < now) {
            localStorage.clear();
            document.location.replace('index.html');
        }
    }
}

setInterval(() => checkTokenValidity(), 5000)

setInterval(async () => {
    try {
        await fetch(API_URL +
        "Product/GetAllPaginated?pageNumber=1&pageSize=10", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    } catch (error) {
        localStorage.clear();
        document.location.replace('index.html');
    }
}, 10000);

async function fetchClient(email) {
    try {
        const response = await fetch(API_URL + `Client/GetByEmail/${email}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!response.ok)
            return;

        return await response.json();

    } catch (error) {
        console.log(error);
    }
}

function convertData(dateTimeOffSet) {
    const date = new Date(dateTimeOffSet);
    return date.toLocaleDateString('pt-BR');
}

function convertDataISO8601(dateBrazil){
    const [day, month, year] = dateBrazil.split('/');

    const data = new Date(Date.UTC(year, month - 1, day, 0, 0, 0))

    const offset = "-03:00";

    const isoOffSet = data.toISOString().replace("Z", offset);

    return isoOffSet;
}