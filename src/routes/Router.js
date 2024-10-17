const express = require('express');
const { userRegister } = require('../controller/Register');
const { userLogin } = require('../controller/UserLogin');
const { authenticateToken } = require('../controller/Authentication');
const { usersController } = require('../controller/UsersController');
const { updateProfileController } = require('../controller/UpdateProfileController');
const { upload } = require('../middleware/multer');
const { getUserProfile } = require('../controller/GetUpdatedProfile');
const { addExpense, getUserAllExpanse } = require('../controller/TransactionController');

//create router
const router = express.Router();

//post apis
// router.post('/register', userRegister)
// router.post('/login', userLogin)
// router.post('/getUserProfile', getUserProfile)
// router.post('/updateProfile', upload.single('profileImage'), updateProfileController)
// router.post('/addExpense', addExpense)
// router.post('/getUserAllExpanse', getUserAllExpanse)

// get apis
// router.get('/getusers', usersController)
// router.get('/protected', authenticateToken)
// router.get('/', (req, res) => {
//     res.render('../views/index', {
//         title: 'Home Page',
//         heading: 'Welcome to My Website',
//         subheading: 'About This',
//         content: 'This is a basic EJS template that contains all the APIs'
//     });
// });

//export router
// module.exports = router;