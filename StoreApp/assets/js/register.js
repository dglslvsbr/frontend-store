window.onload = () =>
    document.getElementById("form-register")
        .addEventListener("submit", (e) => e.preventDefault());

async function register() {
    const form = document.getElementById("form-register");

    const formData = new FormData(form);

    for (const data of formData.values())
        if (!data)
            return;

    const payload = {
        firstName: formData.get("first-name"),
        lastName: formData.get("last-name"),
        email: formData.get("email"),
        password: formData.get("password"),
        cpf: formData.get("cpf"),
        phone: formData.get("phone"),
        address: {
            street: formData.get("street"),
            number: formData.get("house-number"),
            district: formData.get("district"),
            city: formData.get("city"),
            state: formData.get("state")
        }
    }

    try {
        const element = document.getElementById('message');
        element.innerHTML = '';
        element.style = '';

        const response = await fetch(API_URL + "Client/Create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && data) {
            window.location.replace('index.html');
            console.log(data.message);
        }
        else{
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