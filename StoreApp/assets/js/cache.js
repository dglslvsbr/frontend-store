async function getOrSetCache(key, endpoint) {
    if (localStorage.getItem(key))
        return JSON.parse(localStorage.getItem(key));
    else {
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            const data = await response.json();
            localStorage.setItem(key, JSON.stringify(data));
            return data;
        } catch (error) {
            console.log(error);
        }
    }
}