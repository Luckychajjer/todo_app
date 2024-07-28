import './style.css';
function setDefDate(){
    const dateinput = document.querySelector("#due");
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    dateinput.setAttribute("min",`${year}-${month}-${day}`);
    dateinput.value = `${year}-${month}-${day}`;
}

function resetData(){
    const user = {
        name:"user",
        nextid:101,
        projects:{}
    };    
    let name = prompt("Enter Name");
    while(name ==null){
        name = prompt("Enter Name");
    }
    user.name = name;
    localStorage.setItem("user",JSON.stringify(user));
}

function delTodo(todoid){
    const currdata = JSON.parse(window.localStorage.getItem("user"));
    const currProject = document.querySelector(".selected").id;
    const currTodo = document.querySelector(`#${todoid}`).parentNode;
    delete currdata.projects[currProject].todoList[todoid];
    currTodo.remove();
    window.localStorage.setItem("user",JSON.stringify(currdata));
}
function getInfo(){
    const dialog = document.querySelector("dialog");
    let currdata = JSON.parse(localStorage.getItem("user"));
    let currinfo = {};
    const inputParameter = ['title','description','due'];
    for(let ele of inputParameter){
        const x = document.querySelector(`#${ele}`);
        currinfo[ele] = `${x.value}`;
        x.value= "";
    }
    const priority= document.querySelector('input[name="pri"]:checked').value;
    currinfo['priority'] = priority;
    
    const currProjectid = document.querySelector(".selected").id;

    const currProject = currdata.projects[currProjectid];
    currProject.todoList[`todo${currProject.nextTodoid}`] = currinfo;
    
    displayTodo(`todo${currProject.nextTodoid}`,currProject.todoList[`todo${currProject.nextTodoid}`]);
    currProject.nextTodoid++;

    window.localStorage.setItem("user",JSON.stringify(currdata));
    dialog.close();

}

function displayTodo(todoid,todoList){
    const monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const todos = document.createElement("div");
    todos.classList.add("todos");

    const check = document.createElement("div");
    check.classList.add("check");
    check.classList.add(`${todoList.priority}`);
    check.id = todoid;
    check.onclick = ()=>{delTodo(check.id)};

    const content = document.createElement("div");
    content.classList.add("content");

    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = todoList.title;

    const due = document.createElement("p");
    due.classList.add("due");
    const dueDate = new Date(todoList.due);
    due.textContent = `${dueDate.getDate()} ${monthsArr[dueDate.getMonth()]}`;

    content.appendChild(title);
    content.appendChild(due);

    todos.appendChild(check);
    todos.appendChild(content);

    const todocontainer = document.querySelector(".todocontainer");
    todocontainer.insertBefore(todos, todocontainer.children[0]);

}

function displayAllHelper(newele,prjid){

    document.querySelector(".selected").classList.remove("selected");
    newele.classList.add("selected");
    const currdata = JSON.parse(localStorage.getItem("user"));
    const currProject = currdata.projects[prjid];

    const todocontainer = document.querySelector(".todocontainer");
    const todos = document.querySelectorAll(".todos");
    for(const child of todos){
        todocontainer.removeChild(child);
    }

    document.querySelector(".heading").value = currProject.projectName;
    for(const todo in currProject.todoList){
        displayTodo(todo,currProject.todoList[todo]);
    }
}

function displayPrj(projectName,prjid){
    const projectlist = document.querySelector(".projectlist");
    const newele = document.createElement("p");
    newele.id = prjid;
    newele.textContent = projectName;
    newele.onclick = ()=>{displayAllHelper(newele,newele.id)}; 
    projectlist.insertBefore(newele,projectlist.children[0]); 
}



function displayAll(){
    const currdata = JSON.parse(localStorage.getItem("user"));
    document.querySelector(".user p").textContent = currdata.name;
    const currProject = currdata.projects;
    for(const project in currProject){
        displayPrj(currProject[project].projectName,project);
    }
    document.querySelector(".heading").value = currProject.prj101.projectName;
    document.querySelector("#prj101").classList.add("selected");  //edit after
    for(const todo in currProject.prj101.todoList){
        displayTodo(todo,currProject.prj101.todoList[todo]);
    }

}

function updateProject(projectName){
    const currdata = JSON.parse(localStorage.getItem("user"));
    const newData = {
        projectName:projectName,
        nextTodoid:0,
        todoList:{}
    };
    currdata.projects[`prj${currdata.nextid}`] = newData;
    displayPrj(projectName,`prj${currdata.nextid}`);
    currdata.nextid++;
    window.localStorage.setItem("user",JSON.stringify(currdata));
}

function newProject(){
    const projectlist = document.querySelector(".projectlist");
    const inp = document.createElement("input");
    projectlist.insertBefore(inp,projectlist.children[0]);
    inp.focus();
    inp.addEventListener("keydown", (e) => {
        if(e.key =="Enter" || e.key=="Escape" ||e.key=="Tab" || e.key == "Alt"){
            inp.blur();
            projectlist.removeChild(inp);
            if(inp.value.length >=1){
                updateProject(inp.value);
            }
        }
    });
}


const heading = document.querySelector(".heading");
heading.onclick =()=>{
    heading.addEventListener("keydown", (e) => {
        if(e.key =="Enter" || e.key=="Escape" ||e.key=="Tab"|| e.key == "Alt"){
         heading.blur();
         const currdata = JSON.parse(localStorage.getItem("user"));
         const prj = document.querySelector(".selected");
         prj.textContent= heading.value;
         currdata.projects[prj.id].projectName = heading.value;
         window.localStorage.setItem("user",JSON.stringify(currdata));
        }
     })
}

const addbtn = document.querySelector(".addtask p");
addbtn.onclick=function(){
    document.querySelector("dialog").showModal();
    setDefDate();
}

const addProject =document.querySelector(".addProject");
addProject.onclick = newProject;

const submit = document.querySelector("dialog button");
submit.onclick = getInfo;

if(!localStorage.getItem("user")){
    resetData();
}
displayAll();

