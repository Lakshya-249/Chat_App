const socket = io();

let nam;

do{
    nam = prompt("Enter your name");
}while(!nam);

const chat = document.getElementById("chatt");
const mytxt = document.getElementById("write");
const submit = document.getElementById("submit");

submit.addEventListener("click",(e)=>{
    // e.preventDefault();
    const msg = {
        user: nam,
        message: mytxt.value
    }
    if(mytxt.value.trim() != ""){
        makenewdiv(msg, "sending");
        mytxt.value = "";
        socket.emit("send",msg);
    }else{
        alert("Nothing to send...");
    }
});

// const appendata = (e)=>{
//     // e.preventDefault();
//     const msg = {
//         user: nam,
//         message: mytxt
//     }
//     makenewdiv(msg, "sending");
//     mytxt.value = "";
//     socket.emit("send",msg);
// }

const makenewdiv = (msg,type)=>{
    let mydiv = document.createElement("div");
    temp = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mydiv.innerHTML= temp;
    mydiv.classList.add(type);
    chat.appendChild(mydiv);
}

socket.on("receive",(data)=>{
    makenewdiv(data,"incoming");
})

