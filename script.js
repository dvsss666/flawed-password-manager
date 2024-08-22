document.addEventListener('DOMContentLoaded', () => {
    const passwordForm = document.getElementById('passwordForm');
    const passwordList = document.getElementById('passwordList');

    // Load passwords from localStorage
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];

    // Function to render passwords
    function renderPasswords() {
        passwordList.innerHTML = '';
        passwords.forEach((password, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span><strong>URL:</strong> ${password.url}, <strong>Login:</strong> ${password.login}, <strong>Password:</strong> ${password.password}</span>
                <button onclick="deletePassword(${index})">Delete</button>
            `;
            passwordList.appendChild(li);
        });
    }

    // Function to add a new password
    function addPassword(url, login, password) {
        passwords.push({ url, login, password });
        localStorage.setItem('passwords', JSON.stringify(passwords));
        renderPasswords();
    }

    // Function to delete a password
    window.deletePassword = function(index) {
        passwords.splice(index, 1);
        localStorage.setItem('passwords', JSON.stringify(passwords));
        renderPasswords();
    }

    // Form submit event
    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const url = document.getElementById('url').value;
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        addPassword(url, login, password);
        passwordForm.reset();
    });

    // Initial render
    renderPasswords();
});
