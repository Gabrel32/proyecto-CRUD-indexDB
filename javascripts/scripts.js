const requestIDB = indexedDB.open("dataBase",1)
requestIDB.addEventListener("upgradeneeded",()=>{
    console.log(`funciona`)
    const db = requestIDB.result
    db.createObjectStore("users",{
        autoIncrement: true
    })
})

requestIDB.addEventListener("success",()=>{
    console.log(`se abrio correctamente`);
})

requestIDB.addEventListener("error",()=>{
    console.log(`se produjo un error`);
})

const addObjeto = user =>{
    const db = requestIDB.result;
    const IDBtransaction = db.transaction("users","readwrite")
    const objectStore = IDBtransaction.objectStore("users",)
    objectStore.add(user);
    IDBtransaction.addEventListener("complete",()=>{
        console.log(`objeto agregado correctamente ${user.nombre} ${user.apellido}`)
    })

}
const readoObjeto = ()=>{
    const db = requestIDB.result;
    const IDBtransaction = db.transaction("users","readonly")
    const objectStore = IDBtransaction.objectStore("users",)
    const cursor = objectStore.openCursor();
    cursor.addEventListener("success",()=>{
        if(cursor.result){
            let user = createdate(cursor.result.key,cursor.result.value);
            console.log(user)
            fracment.appendChild(user)
            cursor.result.continue()
        }
        else{
            console.log("todos los datos fueron leidos");
            maximunContainerUsers.appendChild(fracment)
        }
    })
}
const modifyObjeto = (key,objeto)=>{
    const db = requestIDB.result;
    const IDBtransaction = db.transaction("users","readwrite")
    const objectStore = IDBtransaction.objectStore("users",)
    objectStore.put(objeto,key);
    IDBtransaction.addEventListener("complete",()=>{
        console.log("se modifico");
    })
}
const deleteObjeto = (key)=>{
    const db = requestIDB.result;
    const IDBtransaction = db.transaction("users","readwrite")
    const objectStore = IDBtransaction.objectStore("users",)
    objectStore.delete(key);
    IDBtransaction.addEventListener("complete",()=>{
        console.log("se elimino");
    })
}
const inputName = document.getElementById(`inputName`);
const inputSurname = document.getElementById("inputSurname");
const btnInputValue = document.querySelector(".btnInputValue");
const maximunContainerUsers = document.querySelector(".maximunContainerUsers");
const templade = document.querySelector(".templade");
const fracment = document.createDocumentFragment()
let user ={nombre:"", apellido:""} 


function createdate (key ,user){
    while (maximunContainerUsers.firstChild) {
        maximunContainerUsers.removeChild(maximunContainerUsers.firstChild)
    }
    const containerUsers = templade.content.firstElementChild.cloneNode(true);
    const h3NameSurname = containerUsers.querySelector(".h3NameSurname");
    const deleteBtn = containerUsers.querySelector(".deleteBtn")
    const modifyBtn = containerUsers.querySelector("modifyBtn")
    deleteBtn.addEventListener("click",()=>{
        deleteObjeto(key)
        maximunContainerUsers.removeChild(containerUsers)
    })
    h3NameSurname.textContent = `${user.nombre} ${user.apellido}`
    h3NameSurname.setAttribute("contenteditable","true");
    h3NameSurname.setAttribute("spellcheck","false");
    h3NameSurname.addEventListener("keyup",()=>{
        modifyBtn.id = null;
    })

    
    return containerUsers
} 

btnInputValue.addEventListener("click",()=>{
    user.nombre = inputName.value
    user.apellido = inputSurname.value
    addObjeto(user)
    readoObjeto()
    inputName.value =""
    inputSurname.value =""
    // for (let i = 0; i < 5; i++) {
    //     createdate();
        
    // }
   
})




