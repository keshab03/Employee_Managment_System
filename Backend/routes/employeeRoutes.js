const express = require('express');
const bodyParser = require('body-parser');
// const requireAuth = require('../middleware/requireAuth');
// const { getAll, getById, getAllEmployee, createemployee, updateById, deleteById, signup, login, hrsignup, hrlogin, createteam, deleteTeamById, getTeamById, updateTeamById, getEmpTeamById, verifyHrEmail, verifyEmail } = require('../controllers/employeeController')
const { getAll, getById, getAllEmployee, createemployee, updateById, deleteById, signup, login, hrsignup, hrlogin, createteam, deleteTeamById, getTeamById, updateTeamById, getEmpTeamById } = require('../controllers/employeeController')

const multer = require('multer');
const upload = multer({dest: 'uploads/'})

const router = express.Router();
// router.use(requireAuth);
// Add bodyParser middleware to parse request bodies
router.use(bodyParser.json());

router.get('/get', getAll);
router.get('/getnum', getAllEmployee);

// router.get('/getteam', getteam);

router.get('/get/:id', getById);
router.get('/getempteam/:id', getEmpTeamById);

router.get('/getteam/:employeeId/:teamMemberId', getTeamById);

router.post('/create',upload.single('image'), createemployee);

router.post('/createteam/:employeeId',upload.single('image'), createteam);

router.post('/signup', signup);

router.post('/hrsignup', hrsignup);

// router.get('/verify', verifyEmail);

// router.get('/verifyhr', verifyHrEmail);

router.post('/login', login);

router.post('/hrlogin', hrlogin);

router.put('/update/:id',upload.single('image'), updateById);

router.put('/updateteam/:employeeId/:teamMemberId',upload.single('image'), updateTeamById);


router.delete('/delete/:id', deleteById);

router.delete('/deleteteam/:employeeId/:teamMemberId', deleteTeamById);

module.exports = router;