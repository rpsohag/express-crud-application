const { readFileSync, writeFileSync, unlinkSync } = require("fs");
const path = require("path");

const EmployeeIndexPage = (req,res) => {
    const employees = JSON.parse(readFileSync(path.join(__dirname,'./../database/employee.json')));
    res.status(200).render('employee/index',{
        employees : employees
    });
}

const EmployeeCreatePage = (req,res) => {
    res.status(200).render('employee/create');
}

const EmployeeStorePage = (req,res) => {
    const employees = JSON.parse(readFileSync(path.join(__dirname,'./../database/employee.json')));
    const { name, email, phone, location } = req.body;
    let last_id = 1;
    if(employees.length > 0){
        last_id = employees[employees.length -1].id + 1;
    }
    employees.push({
        id: last_id,
        name : name,
        email : email,
        phone : phone,
        location : location,
        photo : req.file ? req.file.filename : "avatar.jpg"
    })
    writeFileSync(path.join(__dirname,'./../database/employee.json'),JSON.stringify(employees));
    res.redirect('/employee')
}

const EmployeeSinglePage = (req,res) => {
    const employees = JSON.parse(readFileSync(path.join(__dirname,'../database/employee.json')));
    const employee = employees.find(data => data.id == req.params.id);
    res.status(200).render('employee/show',{
        employee : employee
    })
}

const EmployeeDataDelete = (req,res) => {
    const employees = JSON.parse(readFileSync(path.join(__dirname,'../database/employee.json')));
    const EmployeeData = employees.filter(data => data.id != req.params.id);
    const employee = employees.find(data => data.id == req.params.id);
    const employeePhoto = employee.photo;

    if(employeePhoto != 'avatar.jpg'){
        unlinkSync(path.join(__dirname,'./../public/images/employees/'+`${employeePhoto}`))
    }

    writeFileSync(path.join(__dirname,'./../database/employee.json'),JSON.stringify(EmployeeData));
    res.redirect('/employee');
}

const EmployeeDataEdit = (req,res) => {
    const employees = JSON.parse(readFileSync(path.join(__dirname,'./../database/employee.json')));
    const employee = employees.find(data => data.id == req.params.id);
    res.status(200).render('employee/edit',{
        employee : employee
    })
}

const EmployeeDataUpdate = (req,res) => {
    const employees = JSON.parse(readFileSync(path.join(__dirname,'./../database/employee.json')));
    const employee = employees.find(data => data.id == req.params.id);
    const { id } = req.params;

    const employeePhoto = employee.photo;


    if(req.file){
        if (employeePhoto != 'avatar.jpg') {
            unlinkSync(path.join(__dirname,'./../public/images/employees/'+`${employeePhoto}`))
        }
    }

    employees[employees.findIndex(data => data.id == id)] = {
        ...employees[employees.findIndex(data => data.id == id)],
        name: req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        location : req.body.location,
        photo : req.file ? req.file.filename : employee.photo
        
    }
    writeFileSync(path.join(__dirname,'./../database/employee.json'), JSON.stringify(employees));
    res.redirect('/employee')
}


module.exports = {
    EmployeeIndexPage,
    EmployeeCreatePage,
    EmployeeStorePage,
    EmployeeSinglePage,
    EmployeeDataDelete,
    EmployeeDataEdit,
    EmployeeDataUpdate
}