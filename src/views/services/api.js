// services/api.js

export const profileUpdate = async (firstName, lastName, bio, profilePicture) => {
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('bio', bio);
    formData.append('profilePictureUrl', profilePicture);

    try {
        const response = await fetch('http://localhost:8080/api/upload', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Profile Update Error:', error);
        throw error;
    }
};

export const signUp = async (username, password, email) => {
    const inputParams = {
        username,
        password,
        email
    };

    try {
        const response = await fetch('http://localhost:8080/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputParams)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Sign Up Error:', error);
        throw error;
    }
};

export const login = async (username, password) => {
    const inputParams = {
        username,
        password
    };

    try {
        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputParams)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
};
