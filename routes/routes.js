const express = require('express');
const router = express.Router();
const Student = require('../model/model')

router.post('/createStudent', (req, res) => {
    const details = {

        firstName:req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        grade: req.body.grade,
        email: req.body.email
        
    };

    Student.createStudent(details, (student) => {
        res.send(student);
    });
})

router.get('/allStudents', (req, res) => {
    const student = Student.getAllStudents();
    res.send(student);
});

router.get('/student/:id', (req, res) => {
    const student = Student.getStudent(req.params.id);
    res.send(student);
});

router.put('/student/:id', (req, res) => {
    const details = {

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        grade: req.body.grade,
        email: req.body.email
        
    };
    const student = Student.editStudent(req.params.id, details);
    res.send(student);
});

router.delete('/student/:id', (req, res) => {
    Student.deleteStudent(req.params.id);
    res.send(Student.getAllStudents())
})

module.exports = router;