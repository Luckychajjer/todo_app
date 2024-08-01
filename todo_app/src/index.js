import './style.css';
import favicon from './images/to-do-list.png'
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
    const dialog = document.querySelector("#name");
    const userName = document.querySelector("#userName");

    if(userName.value.length>=1){
        user.name = userName.value;
    }
    localStorage.setItem("user",JSON.stringify(user));
    dialog.close();
    displayAll();
}

function delTodo(todoid){
    const currdata = JSON.parse(window.localStorage.getItem("user"));   
    const currProject = document.querySelector(".selected").id;
    const currTodo = document.querySelector(`#${todoid}`);
    delete currdata.projects[currProject].todoList[todoid];
    currTodo.classList.add("checkImage");
    currTodo.parentNode.classList.add("fadeOut");
    currTodo.parentNode.addEventListener("animationend",(a)=>{
        currTodo.parentNode.remove();
    });
    window.localStorage.setItem("user",JSON.stringify(currdata));
}

function getInfo(){
    const dialog = document.querySelector("#task");
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

function displayTodo(todoid,todo){
    const monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const todos = document.createElement("div");
    todos.classList.add("todos");
    todos.classList.add("fadeIn");

    todos.addEventListener("animationend",(a)=>{
        todos.classList.remove("fadeIn");
    });

    const todocontainer = document.querySelector(".todocontainer");
    todocontainer.insertBefore(todos, todocontainer.children[0]);

    const check = document.createElement("div");
    check.classList.add("check");
    check.classList.add(`${todo.priority}`);
    check.id = todoid;
    check.onclick = ()=>{delTodo(check.id)};

    const content = document.createElement("div");
    content.classList.add("content");

    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = todo.title;

    const due = document.createElement("p");
    due.classList.add("dueDate");
    const dueDate = new Date(todo.due);
    due.textContent = `${dueDate.getDate()} ${monthsArr[dueDate.getMonth()]}`;

    content.appendChild(title);
    content.appendChild(due);

    todos.appendChild(check);
    todos.appendChild(content);
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

function displayAll(){
    const currdata = JSON.parse(localStorage.getItem("user"));
    document.querySelector(".user p").textContent = currdata.name;
    const currProject = currdata.projects;
    for(const project in currProject){
        displayPrj(currProject[project].projectName,project);
    }

    displayTodoHelper(currProject);
}

function displayTodoHelper(currProject,prjid = "prj101"){
    
    if(currProject[prjid] == null){
        document.querySelector("section").hidden = true;
    }
    else{
        if(document.querySelector(".starterInfo")){
            document.querySelector(".starterInfo").remove();
        }
        document.querySelector("section").hidden = false;

        if(document.querySelector(".selected") == null){
            document.querySelector(".heading").value = currProject[prjid].projectName;
            document.querySelector(`#${prjid}`).classList.add("selected"); 
            for(const todo in currProject[prjid].todoList){
                displayTodo(todo,currProject[prjid].todoList[todo]);
            }
        }
        else{
            const newele = document.querySelector(`#${prjid}`);
            displayAllHelper(newele,newele.id); 
        }
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

function updateProject(projectName){
    const currdata = JSON.parse(localStorage.getItem("user"));
    const newData = {
        projectName:projectName,
        nextTodoid:0,
        todoList:{}
    };
    currdata.projects[`prj${currdata.nextid}`] = newData;
    displayPrj(projectName,`prj${currdata.nextid}`,true);
    currdata.nextid++;
    window.localStorage.setItem("user",JSON.stringify(currdata));
    displayTodoHelper(currdata.projects,`prj${currdata.nextid-1}`);
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
    document.querySelector("#task").showModal();
    setDefDate();
}
const submit = document.querySelector("#task button");
submit.onclick = getInfo;

const addProject =document.querySelector(".addProject");
addProject.onclick = newProject;

if(!localStorage.getItem("user")){
    const userName = document.querySelector("#name")
    userName.showModal();
    userName.addEventListener("keydown",e=>{
        if(e.key == "Enter"){
            resetData();
        }
    });
    document.querySelector("#name button").onclick = resetData;
}
else{
    displayAll();
}

const link = document.createElement("link")
link.href = favicon;
link.rel="icon";
document.querySelector("head").appendChild(link);



