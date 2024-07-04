const container = document.querySelector("main");
let library=[];

class book {
    constructor(title, author, pages, read = 0) {
        this.title = title;
        this.author = author;
        this.pages = parseInt(pages);
        this.read = parseInt(read) ? "read" : "not read";
        this.info = () => {
            return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read} yet`;
        };
    }
}

function addBookToLibrary(title,author,pages,read){
    library.push(new book(title,author,pages,read));
}

function removeCard(val){
    let ind = library.findIndex(({title})=>title == val);
    console.log(library[ind]);
    library.splice(ind,1);
    console.log(library);
}

function createCard(obj){
    const card = document.createElement("article");
    const img = document.createElement("img");
    const titleName = document.createElement("p");
    const authorName= document.createElement("p");
    const remove = document.createElement("button");
    const read = document.createElement("button");

    img.setAttribute("alt",`${obj.title}`);
    titleName.textContent = obj.title;
    authorName.textContent = obj.author;
    remove.textContent = "Remove";
    read.textContent = "Read";

    read.addEventListener("click",()=>{
        read.classList.toggle( "btn-bg");
        if(obj.read == "read"){
            obj.read = "not read";
        } 
        else{
            obj.read = "read";
        }
    })
        
    if(obj.read == "read"){
        read.setAttribute("class","btn-bg");
    }

    remove.addEventListener("click",()=>{
        remove.parentNode.remove();
        removeCard(obj.title);
    })

    card.appendChild(img);
    card.appendChild(titleName);
    card.appendChild(authorName);
    card.appendChild(remove);
    card.appendChild(read);
    container.appendChild(card);
}


const dia = document.querySelector(".bookDiag");
const openBtn = document.querySelector(".showBtn");
const confirm = document.querySelector(".confirmBtn");
const form = document.querySelector("#bookform");
const titleip = document.querySelector("#title");
const authorip= document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelectorAll("[name = read]");
const cancelBtn = document.querySelector(".cancelBtn");


openBtn.addEventListener("click",()=>dia.showModal());
cancelBtn.addEventListener("click",(e)=>{
    dia.close(cancelBtn.value);
});
confirm.addEventListener("click",(e)=>{
    e.preventDefault();
    dia.close(confirm.value);
}); 

dia.addEventListener("close",(e)=>{
    if(dia.returnValue =="cancel"){
        form.reset();
    }
    else{
        let extra = document.querySelector("#extra");
        if(titleip.value == "" || authorip.value==""){
            extra.textContent = "missing title/author";
            dia.showModal();
        }
        else{
            extra.textContent = "";
            let t = titleip.value;
            let a= authorip.value;
            let p = pages.value;
            let r ;
            read.forEach(e =>{ 
                if(e.checked){
                    r= e.value;
                }
            });
            addBookToLibrary(t,a,p,r);
            createCard(library[library.length -1]);
        }    
        form.reset();
    }

});

addBookToLibrary("The Hobbit","J.R.R. Tolkien",295,0);
addBookToLibrary("The Heart in Winter","Kevin Barry",256,0);
addBookToLibrary("The Song of Achilles","Madeline Miller",384,0);
addBookToLibrary("The Secret History of Bigfoot","John O'Connor",304,1);
library.forEach(e=>createCard(e));