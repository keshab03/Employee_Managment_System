const express = require('express');
const bodyParser = require('body-parser');
// const requireAuth = require('../middleware/requireAuth');
const { getAll, getById, getAllEmployee, createemployee, updateById, deleteById, signup, login, hrsignup, hrlogin, createteam, deleteTeamById, getTeamById, updateTeamById, getEmpTeamById } = require('../controllers/employeeController')
// const upload = require('../middleware/Multer');

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

router.post('/create', createemployee);

router.post('/createteam/:employeeId', createteam);

router.post('/signup', signup);

router.post('/hrsignup', hrsignup);

router.post('/login', login);

router.post('/hrlogin', hrlogin);

router.put('/update/:id', updateById);

router.put('/updateteam/:employeeId/:teamMemberId', updateTeamById);


router.delete('/delete/:id', deleteById);

router.delete('/deleteteam/:employeeId/:teamMemberId', deleteTeamById);

module.exports = router;