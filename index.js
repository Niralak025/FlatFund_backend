require('dotenv').config();
const express = require('express');
const { connectDatabase } = require('./src/db/db');
const { userRegister, updateUserById, getUserById, deleteUserById, getAllRegisteredUsers } = require('./src/controller/Register');
const { upload } = require('./src/middleware/multer');
const { userLogin } = require('./src/controller/UserLogin');
const { addExpense, getUserAllExpanse, updateExpanseById, deleteExpanseById, getAllUsersExpanses } = require('./src/controller/TransactionController');
const app = express()

const PORT = process.env.PORT || 8080;

connectDatabase()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Get all registered users
app.get('/getusers', getAllRegisteredUsers)

//Users - CRUD
app.post('/users', upload.single('profileImage'), userRegister)

app.patch('/users/:id', upload.single('profileImage'), updateUserById)

app.get('/getusers/:id', getUserById)

app.delete('/getusers/:id', deleteUserById)

//Login
app.post('/users/login', userLogin)

//Transactions - CRUD
app.post('/add_transaction', addExpense)

app.get('/add_transaction/:id', getUserAllExpanse)

app.patch('/update_transaction/:id', updateExpanseById)

app.delete('/delete_transaction/:id', deleteExpanseById)

//Get all users transactions 
app.get('/gettransactions', getAllUsersExpanses)

app.listen(PORT, () => {
    console.log(`server Started at ${PORT}`)
})