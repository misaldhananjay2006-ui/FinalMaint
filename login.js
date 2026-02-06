// === APPROVED USERS (BASE LIST) ===
const approvedUsers = [
    { username: "ram",        password: "Ram123",     isAdmin: false },
    { username: "ravikiran",  password: "Ravi123",    isAdmin: false },
    { username: "sagar",      password: "Sagar123",   isAdmin: true },
    { username: "sanjay",     password: "Sanjay123",  isAdmin: true },
    { username: "tushar",     password: "Tushar123",  isAdmin: true },
    { username: "bhagwat",    password: "Bhagwat123", isAdmin: false },
    { username: "rupesh",     password: "Rupesh123",  isAdmin: false },
    { username: "mahadeo",    password: "Mahadeo123", isAdmin: false },
    { username: "prakash",    password: "Prakash123", isAdmin: false },
    { username: "surendra",   password: "Surendra123",isAdmin: false },
    { username: "dhanumisal", password: "Dhanu123",   isAdmin: true },
    { username: "shubham",    password: "Shubham123", isAdmin: false },
    { username: "devidas",    password: "Devidas123", isAdmin: false }
];

// Initialize users ONLY IF NOT EXIST (so admin changes persist)
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(approvedUsers));
}

if (!localStorage.getItem('passwordResetRequests')) {
    localStorage.setItem('passwordResetRequests', JSON.stringify([]));
}

function showForgetPassword() {
    document.getElementById('forgetPassword').style.display = 'block';
}

function requestPasswordReset() {
    const username = document.getElementById('forgetUsername').value.trim();

    if (!username) {
        alert("Please enter a username.");
        return;
    }

    const requests = JSON.parse(localStorage.getItem('passwordResetRequests'));
    requests.push({ username, requestedAt: new Date().toISOString() });
    localStorage.setItem('passwordResetRequests', JSON.stringify(requests));

    alert("Password reset request sent to admin.");
    document.getElementById('forgetPassword').style.display = 'none';
}

// LOGIN HANDLER (ALWAYS READS LATEST PASSWORD)
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            const users = JSON.parse(localStorage.getItem('users')) || [];

            const user = users.find(u =>
                u.username === username && u.password === password
            );

            if (user) {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid username or password.");
            }
        });
    }
});

