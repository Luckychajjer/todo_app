let newitem = "";

const addBtn = document.querySelector(".additembtn");
const newitemName = document.querySelector("#newitem");
const outputList = document.querySelector(".output");

addBtn.addEventListener('click',()=>{
    newitem = newitemName.value;
    newitemName.value="";
    addItem(newitem);
});

function addItem(newitem){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const h2 = document.createElement("h2");

    h2.style.display="inline";
    h2.style.paddingRight="1rem";
    h2.textContent = newitem;
    delBtn.textContent="Delete Item";
    delBtn.addEventListener("click",(e)=>{e.target.parentNode.parentNode.removeChild(li)});

    li.style.padding="0.5rem";
    li.appendChild(h2);
    li.appendChild(delBtn);

    outputList.insertBefore(li,outputList.firstChild);
}

