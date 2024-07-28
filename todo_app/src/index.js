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
        projects:[]
    };    
    let name = prompt("Enter Name");
    while(name ==null){
        name = prompt("Enter Name");
    }
    user.name = name;
    localStorage.setItem("user",JSON.stringify(user));
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

    currdata.projects[0].todoList[currdata.projects[0].last]=currinfo;
    
    displayTodo(currdata.projects[0].todoList[currdata.projects[0].last]);
    currdata.projects[0].last++;

    window.localStorage.setItem("user",JSON.stringify(currdata));
    dialog.close();

}

function displayTodo(todoList){
    
    const monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const todos = document.createElement("div");
    todos.classList.add("todos");

    const check = document.createElement("div");
    check.classList.add("check");
    check.classList.add(`${todoList.priority}`);

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
function displayPrj(projectName){
    const projectlist = document.querySelector(".projectlist");
    const newele = document.createElement("p");
    newele.textContent = projectName;
    projectlist.insertBefore(newele,projectlist.children[0]); 
}
function displayAll(){
    const currdata = JSON.parse(localStorage.getItem("user"));
    document.querySelector(".user p").textContent = currdata.name;

    for(let ind =0;ind<currdata.projects.length;ind++){
        displayPrj(currdata.projects[ind].projectName);
    }
    const currProject = currdata.projects[0];
    document.querySelector(".heading").value = currProject.projectName;
    for(let ind=0;ind<currProject.last;ind++){
        displayTodo(currProject.todoList[ind]);
    }
}

function updateProject(projectName){
    const currdata = JSON.parse(localStorage.getItem("user"));
    const newData = {
        projectName:projectName,
        last:0,
        todoList:[]
    };
    currdata.projects.push(newData);
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
                displayPrj(inp.value);
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
         currdata.projects[0].projectName = heading.value;
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

