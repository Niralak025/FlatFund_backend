// scripts/main.js
import { profileUpdate, signUp, login } from '../services/api.js';

document.getElementById('signUpButton').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    try {
        const data = await signUp(username, password, email);
        console.log('Sign Up Success:', data);
    } catch (error) {
        console.error('Sign Up Error:', error);
    }
});

document.getElementById('loginButton').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log("username===", username, password);

    try {
        const data = await login(username, password);
        console.log('Login Success:', data);
    } catch (error) {
        console.error('Login Error:', error);
    }
});

document.getElementById('profileUpdateButton').addEventListener('click', async () => {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const bio = document.getElementById('bio').value;
    const profilePicture = document.getElementById('profilePicture').files[0];
    try {
        const data = await profileUpdate(firstName, lastName, bio, profilePicture);
        console.log('Profile Update Success:', data);
    } catch (error) {
        console.error('Profile Update Error:', error);
    }
});
