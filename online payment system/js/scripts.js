document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const paymentForm = document.getElementById('payment-form');

    // Handle user registration
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            localStorage.setItem(username, password);
            alert('Registration successful!');
            window.location.href = 'login.html';
        });
    }

    // Handle user login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const storedPassword = localStorage.getItem(username);

            if (password === storedPassword) {
                alert('Login successful!');
                sessionStorage.setItem('loggedInUser', username);
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid username or password.');
            }
        });
    }

    // Display transactions on the dashboard
    if (window.location.pathname.endsWith('dashboard.html')) {
        const transactionsList = document.getElementById('transactions');
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

        transactions.forEach(transaction => {
            const listItem = document.createElement('li');
            listItem.textContent = `Amount: $${transaction.amount}, Card: ${transaction.card}`;
            transactionsList.appendChild(listItem);
        });
    }

    // Handle payment submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const amount = document.getElementById('amount').value;
            const card = document.getElementById('card').value;

            const transaction = {
                amount,
                card
            };

            const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
            transactions.push(transaction);
            localStorage.setItem('transactions', JSON.stringify(transactions));

            alert('Payment successful!');
            window.location.href = 'dashboard.html';
        });
    }
});
