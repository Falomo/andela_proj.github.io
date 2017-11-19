let students = [];


function Student(details){
    this.firstName = details.firstName;
    this.lastName = details.lastName;
    this.age = details.age;
    this.grade = details.grade;
    this.email = details.email;
    // this.courses = details.courses;
    this.id = new Date().getTime();
}


module.exports = {

    createStudent(student, callback){
        students.push(new Student(student));
        return callback(students[students.length - 1]);
    },

    getAllStudents(){
        return students.slice();
    },

    getStudent(id){
        return students[id - 1];
    },

    editStudent(id, newStudent){
        newStudent.id = id;
        let index = students.findIndex((student) => student.id == newStudent.id);
        students[index] = newStudent;
        return students[index];
    },

    deleteStudent(id){
        var index = students.findIndex((student) => student.id == id );
        students.splice(index, 1);
    }

}