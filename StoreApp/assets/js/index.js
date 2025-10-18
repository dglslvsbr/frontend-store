window.onload = () =>
    document.getElementById("form-login")
        .addEventListener("submit", (e) => e.preventDefault());
        
async function login() {
    const form = document.getElementById("form-login");
    
    const formData = new FormData(form);

    for (const data of formData.values())
        if (!data)
            return;

    const payload = {
        email: formData.get("email"),
        password: formData.get("password")
    }

    try {
        const response = await fetch(API_URL + "Auth/Login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && data) {
            localStorage.clear();
            localStorage.setItem("token", data.data);
            window.location.replace('main.html');
            console.log(data.message);
        }
        else {
            const element = document.getElementById('message');
            element.style = `margin-top: 20px;
                             font-family: calibri;
                             font-size: 20px;
                             color: red;
                             border-radius: 8px;
                             border: 1px solid red;
                             padding: 5px;`;
            element.innerHTML = data.message;
        }

    } catch (error) {
        console.log(error);
    }
}