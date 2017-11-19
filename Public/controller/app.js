/*////////////////////////////
// AUTHOR: FALOMO OREOLUWA MICHAEL
////////////////////////////*/

/*////////////////////////////
// STUDENT VIEW
////////////////////////////*/
var studentView = {
    init: function(){
        var addStudent = document.querySelector('.add');
        addStudent.addEventListener('click', function(){
            controller.modalMode('CREATE');
        });
    }
}

/*////////////////////////////
// ERROR VIEW
////////////////////////////*/

//displays an error if it exists
var errorView = {
    init: function(){
        this.error = document.querySelector('.error');
    },
    display: function(){
        this.error.className = 'error display';
        setTimeout(() => {
            this.error.className = 'error'
        }, 6000)
    }
}

/*////////////////////////////
// LOAD VIEW
////////////////////////////*/

//displays a loader on the page
var loadView = {
    init: function(){
        this.loader = document.querySelector('.loading');
    },
    display: function(){
        this.loader.className = 'loading';
    },
    close: function(){
        this.loader.className = 'loading hidden';
    }
}
/*////////////////////////////
// MODAL VIEW
////////////////////////////*/

//displays a modal on the page
var modalView = {
    init: function(){
        this.modal = document.querySelector('.modal');
        this.render('CREATE');
        this.modal.addEventListener('click', (e) => {
            
            if(e.target === this.modal || e.target.parentNode.className == 'cancel')
                this.close();
            return;
        });
    
        
    },
    //show modal
    display:function(){
        this.modal.className = 'modal display';
    },
    // close modal with animation
    animateClose: function(){
        this.modal.className = 'modal display close';
    },
    // close modal without animation
    close: function(){
        this.modal.className = 'modal';
    },
   
    render: function(mode, student){
        
        this.modal.innerHTML = '';
        
        this.modal.innerHTML +=
        `
        <div class="create-form">
        <div class="cancel"><i class="fa fa-times" style="color:purple; height:100%; width: 100%; font-size:1.6em"></i></div>
        <form  name="studentForm" class="form">
            <h2>${mode} STUDENT</h2>
            <input name="firstName" required  type="text" value="${student? student.firstName : ''}" placeholder="Firstname"/>
            <input name="lastName" required type="text" value="${student? student.lastName : ''}" placeholder="Lastname"/>
            <input name="age" required max="120" type="number" value="${student? student.age : ''}" placeholder="Age"/>
            <input name="grade" required type="text"  value="${student? student.grade : ''}" placeholder="Level"/>
            <input name="email" required type="email" value="${student? student.email : ''}" placeholder="Email"/>
            <button type="submit" required class="sub" id="${student? student.id : ''}">${mode}</button>
        </form>
            <div class="detail" style="display: none">
                Name:
            </div>
        </div>
                `;
    }
}
/*////////////////////////////
// LIST VIEW
////////////////////////////*/
var listView = {
    init: function(){
        this.students = document.querySelector('.students');
        this.students.addEventListener('click', function(e){

            var id = e.target.parentNode.parentNode.id;
             if(e.target.className === "fa fa-minus delete"){
                 controller.deleteStudent(id)
             }
             else if(e.target.className === "fa fa-pencil-square-o edit"){
                 this.student = controller.getStudent(id);
                 controller.modalMode('EDIT',this.student)
             }

        })
        this.render();
    },

    render: function(){
       this.students.innerHTML = `
            <div class="head">
                <div>Firstname</div>
                <div>LastName</div>
                <div>Age</div>
                <div>Course</div>
                <div>Email</div>
                <div style="width:10%"></div>
            </div>
       `;
       populateAllStudent(controller.getAllStudent(), this.students);       
    }

}
// add a student to the list
var addStudent = function(parent, student){
    let content = `
            <div id = "${student.id}" class="new">
                <div>${student.firstName}</div>
                <div>${student.lastName}</div>
                <div>${student.age}</div>
                <div>${student.grade}</div>
                <div>${student.email}</div>
                <div class="options">
                     <i class="fa fa-minus delete" style="height:30px;width:30px;color:red" class="delete"></i>
                     <i class="fa fa-pencil-square-o edit" style="height:30px;width:30px;" class="edit"></i> </div>
                </div>
            </div>
    `;
    parent.innerHTML += content;
}

var populateAllStudent = function(students, parent){
    students.forEach((student) => {
        addStudent(parent, student)
    })
}   
/*////////////////////////////
// FORM VIEW
////////////////////////////*/

var formView = {
    init: function(){
        this.state = {
            error: []
        };
        this.form = document.forms.studentForm;
        this.form.addEventListener('submit', this.handleSubmit);
    }
    ,

    handleSubmit: function(e){
        e.preventDefault();

        loadView.display();
        console.dir(this.form)
        let inputs = {};
        
        for(let i = 0; i < 5; i++){
            let { value, name } = e.target[i]
            inputs[name] = value;
        }
        
        let submit = e.target.querySelector('button.sub');
        let submitMode = submit.textContent;

        if(submitMode === "CREATE")
            controller.createStudent(inputs);
        else if(submitMode === "EDIT"){
            controller.editStudent(submit.id, inputs)
        }
        modalView.animateClose();
        
        let _this = this;
        setTimeout(function(){
                modalView.close();
                formView.destroy();
        }, 600)
    },
    destroy: function(){

        this.form.removeEventListener('submit', this.handleSubmit);
    }

}


/*////////////////////////////
// CONTROLLER
////////////////////////////*/


var controller = {
    api: 'http://localhost:4000',
    init: function(){
        this.fetchAllStudent();
        errorView.init();
        loadView.init();
        listView.init();
        modalView.init();
        formView.init();
        studentView.init();
    },
    modalMode: function(mode, student){
        if(student)
            modalView.render(mode, student);
        else
            modalView.render(mode);
        modalView.display();
        formView.init();
    },

    createStudent: function(student){
        this.studentapi('/createStudent', 'POST', student).then(() => {
            loadView.close();
            this.fetchAllStudent();
        }).catch(err => {
            loadView.close();
            errorView.display();
        });
    },
    
    deleteStudent: function(id){
        loadView.display();
        fetch(this.api+`/student/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            console.log("deleted", id)
            loadView.close();
            this.fetchAllStudent();
        }).catch(err => {
            loadView.close();
            errorView.display();
        })
    },

    editStudent: function(id, student){
        loadView.display();
        this.studentapi('/student/'+id, 'PUT', student).then(() => {
            loadView.close();
            this.fetchAllStudent();
        }).catch(err => {
            loadView.close();
            errorView.display();
        })
    },

    getStudent: function(id){
        console.log(id)
       let student = model.studentsModel.find((student) => student.id == id) ;
       console.log(student,"getstud")
       return student;
    },

    fetchAllStudent: function(){
        fetch(this.api+'/allStudents')
        .then((res) => res.json())
        .then(( data ) => {
            model.studentsModel = [];
            console.log(model.studentsModel)
            data.forEach(function(student) {
                model.studentsModel.push(new Student(student));
            }, this);
            console.log(data)
            
            listView.render();
        }).catch(err => errorView.display());

    }, 
    getAllStudent: function(){
        return model.studentsModel.slice();
    },

    studentapi(url, method, body) {
        return fetch(this.api + url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: method,
            body: JSON.stringify(body)
        })
    }

}
controller.init();
