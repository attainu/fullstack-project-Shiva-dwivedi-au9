const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config')
const User = require('../model/userModel')
const emp_attendance = require('../model/attendanceSchema')
const Task = require('../model/taskmodal')
const leave1 = require('../model/defaultleave')
const empleave = require('../model/empleave')
const mongo = require('mongodb');
const Announcement = require('../model/Announcement')
const MongoClient = mongo.MongoClient
router.use(express.json());
const {RegisterMail,LoginMail} = require("../mailer/sendmails");
router.use(express.urlencoded({extended : true}));

//get all employee attendence
router.get('/employeattendence', (req, res) => {
    emp_attendance.find({}, (err, data) => {
        if (err) throw err
        res.send(data)
    })
})

//get al the employee's leave count details
router.get('/leavedetails', (req, res) => {
    leave1.find({}, (err, data) => {
        if (err) throw err
        res.send(data)
    })
})

// get all allowed leave 
router.get('/allowedLeave', (req, res) => {
    console.log(req.query)
    leave1.find({role : req.query.role}, (err, data) => {
        if (err) throw err
        if (!data) return res.send(`No user was found with Role of ${req.query.role}` )
        res.send(data)
    })
})

//get announcements

router.get('/Announcements', (req, res) => {
    Announcement.find({}, (err, data) => {
        if (err) throw err
        res.send(data)
    })
})

//get all the leave requests
router.get('/leaverequests', (req, res) => {
    empleave.find({}, (err, data) => {
        if (err) throw err
        res.send(data)
    })
})

// Get Specific Details using Query Parameter
// send _id in parameter To get Specific user details 
// Example = http://localhost:5400/api/auth/Allemployees2?_id=6054a0e13ca43b55d816257f
router.get('/Allemployees2', (req, res) => {
    // var find = {
    //     name: req.params.name
    // }
    User.findOne({_id : req.query._id}, (err, data) => {
        if (!data) return res.send(`No user was found with Id of ${req.query._id}` )
        res.send(data)
    })
})

// send department as parameter to get user according to specific department
//Example =  http://localhost:5400/api/auth/Allemployees3?department=Frontend
router.get('/Allemployees3', (req, res) => {
    console.log(req.query)
    User.find({department : req.query.department}, (err, data) => {
        if (!data) return res.send(`No user was found with Division of ${req.query.department}` )
        res.send(data)
    })
})

router.get('/Allemployees5', (req, res) => {
    console.log(req.query)
    User.find({name : req.query.name}, (err, data) => {
        if (!data) return res.send(`No user was found with name of ${req.query.name}` )
        res.send(data)
    })
})

// Shiva Look here 
// Pass user id in param and yopu will get that Employee
router.get('/Leavebyemployee', (req, res) => {
    empleave.find({User_id : req.query.User_id}, (err, data) => {
        if (!data) return res.send(`No user was found with Division of ${req.query.User_id}` )
        res.send(data)
    })
})

router.get('/Allemployees4', (req, res) => {
 
    User.find({role : req.query.role}, (err, data) => {
        if (err) throw err
        if (!data) return res.send(`No user was found with Role of ${req.query.role}` )
        res.send(data)
    })
})

router.get('/Allemployees', (req, res) => {
    User.find({}, (err, data) => {
        if (err) throw err
        res.send(data)
        console.log(req.query)
    })
})

// get all tasks
router.get('/taskdetails', (req, res) => {
    Task.find({}, (err, data) => {
        if (err) throw err
        res.send(data)
    })
})

//get all the task details respective to their department
router.get('/taskdetails1', (req, res) => {
    console.log(req.query)
    Task.find({Department : req.query.Department}, (err, data) => {
        if (err) throw err
        if (!data) return res.send(`No task was found with Department of ${req.query.Department}` )
        res.send(data)
    })
})

// get all the task detais respective to their status
router.get('/taskdetails2', (req, res) => {
    console.log(req.query)
    Task.find({Status : req.query.Status}, (err, data) => {
        if (err) throw err
        if (!data) return res.send(`No task was found with Department of ${req.query.Status}` )
        res.send(data) 
    })
})



//MarkAttendence
router.post('/mark', (req, res) => {
    let token = req.headers['x-access-token']
    if(!token) return res.status(500).send({auth : false,error : "No token provided"})
    jwt.verify(token,config.secret, (err, data) => {
        if(err) return res.status(500).send({auth : false,error : "Invalid Token"})
        User.create(data.id,{password:0}, (err, result) => {
            if(result){
                let employeedetail = {
                    employee_name: req.body.employee_name,
                    employee_email: req.body.employee_email,
                    employee_role: req.body.employee_role,
                    employee_division: req.body.employee_division,
                }
                console.log(employeedetail)
                emp_attendance.create(employeedetail, (err, response) => {
                    if(err) throw err;
                    return res.send({message: "Attendence marked successfully"})
                })
            }
        })
    })

})

//create attendance function

function markAttendance(){
    
    let today = new Date();
    let date=today.getFullYear() +"-"+ parseInt(today.getMonth()+1) + "-"+ today.getDate() ;

    return{
        count:1,
        date: date
    }
}

// mark attendance

router.patch('/markAttendance', (req, res) => {
    let token = req.headers['x-access-token']
    if(!token) return res.status(500)
    .send({auth : false,error : "No token provided"})
    jwt.verify(token,config.secret, (err, data) => {
        if(err) return res.status(500)
        .send({auth : false,error : "Invalid Token"})
        let attendance1 = markAttendance()
        console.log(attendance1.count)
        User.updateOne({_id : data.id},{ $push :{attendance:attendance1}},(err, result) => {
            if (err) throw err
            return res.send('Attendance updated')
        })
    })
})


// For Creating Tasks
router.post('/createtask', (req, res) => {
    let token = req.headers['x-access-token']
    if(!token) return res.status(500).send({auth : false,error : "No token provided"})
    jwt.verify(token,config.secret, (err, data) => {
        if(err) return res.status(500).send({auth : false,error : "Invalid Token"})
        Task.create( () => {
                    {
                let Taskdetails = {
                    Task_name: req.body.Task_name,
                    Task_created_by: req.body.Task_created_by ? req.body.Task_created_by : "Teamlead",
                    Department: req.body.Department,
                    Status : req.body.Status,
                    Deadline: req.body.Deadline ? req.body.Deadline : "2",
                    Priority: req.body.Priority ? req.body.Priority : "Medium" ,
                    Remark:req.body.Remark,
                    id:req.body.id,
                    Task_completed_by:req.body.Task_completed_by  
                }
                console.log(Taskdetails)
                Task.create(Taskdetails, (err, response) => {
                    if (response){
                        User.updateMany({department : req.query.department},{tasks : 1},(err1,res1) =>{
                            console.log(Taskdetails)
                        })
                    }
                    if(err) throw err;
                    return res.send({message: "Task Created Successfully"})
                })
            }
        })
    })

})

// apply for leave
router.post('/Applyforleave', (req, res) => {
    let token = req.headers['x-access-token']
    if(!token) return res.status(500).send({auth : false,error : "No token provided"})
    jwt.verify(token,config.secret, (err, data) => {
        if(err) return res.status(500).send({auth : false,error : "Invalid Token"})
        empleave.create( () => {
                    {
                let leave_details = {
                    Employee_name: req.body.Employee_name,
                    Employee_division: req.body.Employee_division,
                    Employee_department: req.body.Employee_department,
                    Reason_for_leave: req.body.Reason_for_leave,
                    Leave_from: req.body.Leave_from, 
                    User_id :req.body.User_id, 
                    Leave_to: req.body.Leave_to,
                    Leave_status: req.body.Leave_status,
                }
                console.log(leave_details)
                empleave.create(leave_details, (err, response) => {
                    if(err) throw err;
                    return res.send({message: "Leave Request Created Successfully"})
                })
            }
        })
    })

})


// create announcements

router.post('/Createannoucement', (req, res) => {
    let token = req.headers['x-access-token']
    if(!token) return res.status(500).send({auth : false,error : "No token provided"})
    jwt.verify(token,config.secret, (err, data) => {
        if(err) return res.status(500).send({auth : false,error : "Invalid Token"})
        Announcement.create( () => {
                    {
                let Announcement_details = {
                    Announcement_Subject: req.body.Announcement_Subject,
                    Announcement: req.body.Announcement,
                    Announcement_created_by: req.body.Announcement_created_by,
                }
                console.log(Announcement_details)
                Announcement.create(Announcement_details, (err, response) => {
                    if(err) throw err;
                    return res.send({message: "Announcement Created Successfully"})
                })
            }
        })
    })

})


//register Employee

router.post('/register', (req, res) => {
    User.findOne({email: req.body.email}, (err, result) => {
        if (result){
            return res.send({err: " employee's email is already registered"})
        }
        else{
            let hash = bcrypt.hashSync(req.body.password)
            User.create({
                name: req.body.name,
                username: req.body.username, 
                email: req.body.email,
                department: req.body.department,
                employee_division: req.body.employee_division,
                contactnumber: req.body.contactnumber,
                gender: req.body.gender,
                joining_Date: req.body.joining_Date,
                Employee_added_by: req.body.Employee_added_by, 
                password: hash,
                role: req.body.role ? req.body.role : "Employee",
                isActive: true

            },
            (data, err) => {

                email = req.body.email,
                password = req.body.password,
                name = req.body.name
                RegisterMail(email,password,name)
                console.log(email,password,name)
                return res.status(200).send({succ : "Register Successfull"})
                if(err) return res.status(500).send({err: 'error while registering'})

            })
        }
    })
})

//login user

router.post('/login', (req, res) => {
    User.findOne({email : req.body.email},(err, data) => {
        if(err) return res.status(500).send({auth : false, error : "Error while login"})
        if(!data) return res.status(500).send({auth : false, error : "no user found, register first"})
        else{
            const passIsValid = bcrypt.compareSync(req.body.password, data.password)
            if(!passIsValid){
                return res.status(500).send({auth : false,error : "Invalid Password"})
            }
            if(data) {
                let email = req.body.email
                LoginMail(email)
            }
            let token = jwt.sign({id: data.id}, config.secret, {expiresIn: 86400})
            return res.status(200).send({auth : true, token: token})
        }
    })
})

//user info

router.get('/userInfo', (req, res) => {
    let token = req.headers['x-access-token']
    if(!token) return res.status(500).send({auth : false,error : "No token provided"})
    jwt.verify(token,config.secret, (err, data) => {
        if(err) return res.status(500).send({auth : false,error : "Invalid Token"})
        User.findById(data.id,{password:0}, (err, result) => {
            res.send(result)
        })
    })

})

// Update leave1 status 
// Put call
router.put('/updateleavestatus', (req, res) => {
    let token = req.headers['x-access-token']
    if(!token) return res.status(500)
    .send({auth : false,error : "No token provided"})
    jwt.verify(token,config.secret, (err, data) => {
        if(err) return res.status(500).send({auth : false,error : "Invalid Token"})
        let Id = mongo.ObjectID(req.body._id)
        empleave.updateOne({_id : Id}
            ,{
                $set:{
                    Leave_status : req.body.Leave_status
                }
            },(err, result) => {
                if (result){
                    User.updateOne({_id : req.query._id},{leave : req.body.leave ? req.body.leave: 1},(err1,res1) =>{
                    })
                }
            if (err) throw err
            return res.send('Done')
        })
    })
})


// Update Task Status
router.put('/Taskstatus', (req, res) => {
    let token = req.headers['x-access-token']
    if(!token) return res.status(500)
    .send({auth : false,error : "No token provided"})
    jwt.verify(token,config.secret, (err, data) => {
        if(err) return res.status(500).send({auth : false,error : "Invalid Token"})
        let Id = mongo.ObjectID(req.body._id)
        Task.updateOne({_id : Id}
            ,{
                $set:{
                    Task_completed_by:req.body.Task_completed_by,
                    Remark: req.body.Remark,
                    Status : req.body.Status
                }
            },(err, result) => {
                if (result){
                    User.updateOne({_id : req.query._id},{tasks : req.body.tasks - 1},(err1,res1) =>{
                    })
                }
            if (err) throw err
            return res.send('Done')
        })
    })
})

// Here We can Update Any Employee details

router.put('/updateemployeedetails', (req, res) => {
    let token = req.headers['x-access-token']
    if(!token) return res.status(500)
    .send({auth : false,error : "No token provided"})
    jwt.verify(token,config.secret, (err, data) => {
        if(err) return res.status(500).send({auth : false,error : "Invalid Token"})
        let Id = mongo.ObjectID(req.body._id)
        User.updateOne({_id : Id}
            ,{
                $set:{
                    name: req.body.name,
                    username: req.body.username, 
                    email: req.body.email,
                    department: req.body.department,
                    contactnumber: req.body.contactnumber,
                    role: req.body.role, 
                    isActive: true
                }
            },(err, result) => {
            if (err) throw err
            return res.send('Data Updated ')
        })
    })
})




// For Updating Password
router.put('/updatePassword', (req, res) => {
    let token = req.headers['x-access-token']
    if(!token) return res.status(500).send({auth : false,error : "No token provided"})
    jwt.verify(token,config.secret, (err, data) => {
        if(err) return res.status(500).send({auth : false,error : "Invalid Token"})
        let hash = bcrypt.hashSync(req.body.password)
        User.updateOne({_id : data.id}, {password : hash}, (err, result) => {
            if (err) throw err
            return res.send('password updated')
        })
    })
})


//for deleting employee
router.delete('/Deleteemployee', (req, res) => {
    let token = req.headers['x-access-token']
    if(!token) return res.status(500).send({auth : false,error : "No token provided"})
    jwt.verify(token,config.secret, (err, data) => {
        if(err) return res.status(500).send({auth : false,error : "Invalid Token"})
        User.deleteOne({_id : req.body._id},(err, result) => {
            if (err) throw err
            return res.send('Employee Deleted')
        })
    })
})

//for deleting tasks
router.delete('/Deletetask', (req, res) => {
    let token = req.headers['x-access-token']
    if(!token) return res.status(500).send({auth : false,error : "No token provided"})
    jwt.verify(token,config.secret, (err, data) => {
        if(err) return res.status(500).send({auth : false,error : "Invalid Token"})
        Task.deleteOne({_id : req.body._id},(err, result) => {
            if (err) throw err
            return res.send('Task Deleted')
        })
    })
})

//for deleting leave
router.delete('/Deleteleave', (req, res) => {
    let token = req.headers['x-access-token']
    if(!token) return res.status(500).send({auth : false,error : "No token provided"})
    jwt.verify(token,config.secret, (err, data) => {
        if(err) return res.status(500).send({auth : false,error : "Invalid Token"})
        empleave.deleteOne({_id : req.body._id},(err, result) => {
            if (err) throw err
            return res.send('Leave deleted')
        })
    })
})

//for deleting announcement
router.delete('/DeleteAnnouncement', (req, res) => {
    let token = req.headers['x-access-token']
    if(!token) return res.status(500).send({auth : false,error : "No token provided"})
    jwt.verify(token,config.secret, (err, data) => {
        if(err) return res.status(500).send({auth : false,error : "Invalid Token"})
        Announcement.deleteOne({_id : req.body._id},(err, result) => {
            if (err) throw err
            return res.send('Announcement deleted')
        })
    })
})


//create leave counts for department

router.post('/leave1', (req, res) => {
    User.findOne({role: req.body.role}, (err, result) => {
        if (err){
            return res.send({err: "Not Allowed"})
        }
        else{
            leave1.create({

                role : req.body.role,
                leaves : req.body.leaves   

            },
            (err) => {
                if(err) return res.status(500).send({err: 'error while registering'})
                return res.status(200).send({succ : "Register Successfull"})
            })
        }
    })
})
module.exports = router