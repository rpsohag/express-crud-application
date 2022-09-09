const express = require('express');
const { EmployeeIndexPage, EmployeeCreatePage, EmployeeStorePage, EmployeeSinglePage, EmployeeDataDelete, EmployeeDataEdit, EmployeeDataUpdate } = require('../controllers/EmployeeController');
const { EmployeeDataStore } = require('../middlewares/EmployeeCreateRequest');
const router = express.Router();

router.get('/', EmployeeIndexPage);
router.get('/create', EmployeeCreatePage);
router.post('/store', EmployeeDataStore, EmployeeStorePage);
router.get('/:id', EmployeeSinglePage);
router.get('/edit/:id', EmployeeDataEdit);
router.post('/update/:id', EmployeeDataStore, EmployeeDataUpdate)
router.get('/delete/:id', EmployeeDataDelete);


module.exports = router;