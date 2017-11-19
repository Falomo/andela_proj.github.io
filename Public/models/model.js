var model = {
    studentsModel: [], 
}
function Student(details){
    this.firstName = details.firstName;
    this.lastName = details.lastName;
    this.age = details.age;
    this.grade = details.grade;
    this.email = details.email;
    // this.courses = details.courses;
    this.id = details.id;
}

