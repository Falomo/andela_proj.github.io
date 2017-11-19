var controller = {
    api: 'http://localhost:4000',
    init: function(){
        
    },

    createStudent: function(student){
        this.studentapi('/createStudent', 'POST', student);
        this.listView.render();
    },
    
    deleteStudent: function(){

    },

    editStudent: function(id, student){

    },

    getStudent: function(id){
        
    },

    fetchAllStudent: function(){
        fetch(this.api+'/allStudents')
        .then((res) => res.json())
        .then(( data ) => {
            console.log("data gotten")
            data.forEach(function(student) {
                
                model.studentsModel.push(new Student(student));
            }, this);
           console.log(data)
            console.log(model.studentsModel)
            
        })
    }, 
    getAllStudent: function(){
        console.log(model.studentsModel)
        return model.studentsModel.slice();
    },

    studentapi(url, method, body) {
        fetch(this.api + url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: method,
            body: JSON.stringify(body)
        }).then(() => {
            console.log("creation succesful");
        });
    }

}

controller.createStudent({
    "firstName": "Jerry",
    "lastName": "Enebeli",
    "age": "23",
    "grade": "400",
    "email": "jerryenebeli@gmail.com"
});
controller.fetchAllStudent()
console.log("hello")
