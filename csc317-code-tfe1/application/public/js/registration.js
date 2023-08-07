var form = document.getElementById("registration-form");
var errorMessage = document.getElementById("error-message");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    errorMessage.textContent = ""; // Clear previous error message

    if (!validateForm()) {
        errorMessage.textContent = "There are errors in the form. Please check and try again.";
    } else {
        registerUser();
    }
});

function validateForm() {
    var username = document.getElementById("username").value.trim();
    var password = document.getElementById("password").value;
    var ageConfirm = document.querySelector('input[name="age-confirm"]:checked');
    var termsOfService = document.querySelector('input[name="terms-of-service"]:checked');

    if (username === "") {
        errorMessage.textContent += "Please enter a username. ";
        return false;
    }

    if (password === "") {
        errorMessage.textContent += "Please enter a password. ";
        return false;
    }

    if (!ageConfirm) {
        errorMessage.textContent += "Please confirm if you are 13 years of age or older. ";
        return false;
    }

    if (!termsOfService) {
        errorMessage.textContent += "Please accept the TOS and privacy rules. ";
        return false;
    }

    return true;
}

function registerUser() {
    var username = document.getElementById("username").value.trim();
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value.trim();

    var formData = {
        username: username,
        password: password,
        email: email
    };

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(function(response) {
            if (response.ok) {
                // Registration successful, show a success message
                alert("Registration successful!");
            } else {
                // Registration failed, display an error message
                errorMessage.textContent = "Registration failed. Please try again later.";
            }
        })
        .catch(function(error) {
            console.error("Error:", error);
            errorMessage.textContent = "An error occurred. Please try again later.";
        });
}
