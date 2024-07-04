
function restart(){
    let resize = 10;
    resize = prompt("add the size needed");
    container.innerHTML="";
    for(var i =0;i<resize;i++){
        const newdiv2 = document.createElement("div");
        newdiv2.classList.add("rows");
        for(let j  =0;j<resize;j++){
            const newdiv = document.createElement("div");
            newdiv.classList.add("sqr");
            // newdiv.textContent=`${(i*resize) + j+1}`;
            newdiv2.appendChild(newdiv);
        }
        container.appendChild(newdiv2);
    }
    resize++;
    const sqr = document.querySelectorAll(".sqr");
    sqr.forEach((a)=>{a.setAttribute("style",`width:${960/resize}px; height:${540/resize}px;`)});
    sqr.forEach((a)=>{a.addEventListener("mouseover",()=>{
        a.setAttribute("style",`width:${960/resize}px; height:${540/resize}px; background-color:${randomColor()};`);
    })});
}

function randInt(max){
    return Math.floor(Math.random()*max+1);
}
function randomColor(){
    let clr =`rgb(${randInt(255)},${randInt(255)},${randInt(255)})`;
    return clr;
}

const container = document.querySelector(".container");
const input = document.querySelector(".input");

input.addEventListener('click',restart);
