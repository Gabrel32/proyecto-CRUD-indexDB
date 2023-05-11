const requestIDB = indexedDB.open("dataBase",1)
const inputName = document.getElementById(`inputName`);
const inputSurname = document.getElementById("inputSurname");
const btnInputValue = document.querySelector(".btnInputValue");
const maximunContainerUsers = document.querySelector(".maximunContainerUsers");
const templade = document.querySelector(".templade");
const fracment = document.createDocumentFragment()
let user ={nombre:"", apellido:""} 
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

const addObjet = user =>{
    const db = requestIDB.result;
    const IDBtransaction = db.transaction("users","readwrite")
    const objectStore = IDBtransaction.objectStore("users",)
    objectStore.add(user);
    IDBtransaction.addEventListener("complete",()=>{
        console.log(`objeto agregado correctamente ${user.nombre} ${user.apellido}`)
    })

}
const readObjet = ()=>{
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
const modifyObjet = (key,objeto)=>{
    const db = requestIDB.result;
    const IDBtransaction = db.transaction("users","readwrite")
    const objectStore = IDBtransaction.objectStore("users",)
    objectStore.put(objeto,key);
    IDBtransaction.addEventListener("complete",()=>{
        console.log("se modifico");
    })
}
const deleteObjet = (key)=>{
    const db = requestIDB.result;
    const IDBtransaction = db.transaction("users","readwrite")
    const objectStore = IDBtransaction.objectStore("users",)
    objectStore.delete(key);
    IDBtransaction.addEventListener("complete",()=>{
        console.log("se elimino");
    })
}
function clear(){
    while (maximunContainerUsers.firstChild) {
        maximunContainerUsers.removeChild(maximunContainerUsers.firstChild)
    }
}

function createdate (key ,user){
    clear()
    const containerUsers = templade.content.firstElementChild.cloneNode(true);
    const h3Name = containerUsers.querySelector(".h3Name");
    const h3Surname = containerUsers.querySelector(".h3Surname")
    const deleteBtn = containerUsers.querySelector(".deleteBtn")
    const modifyBtn = containerUsers.querySelector("#modifyBtn")

    h3Name.textContent = user.nombre
    h3Surname.textContent = user.apellido
    h3Name.setAttribute("contenteditable","true");
    h3Surname.setAttribute("contenteditable","true")
    h3Name.setAttribute("spellcheck","false");
    h3Surname.setAttribute("spellcheck","false")
    
    deleteBtn.addEventListener("click",()=>{
        deleteObjet(key)
        maximunContainerUsers.removeChild(containerUsers)
    })
    h3Name.addEventListener("keyup",()=>{
        modifyBtn.classList.replace("impossible","possible")
        if(modifyBtn.className == "possible"){
            modifyBtn.addEventListener("click",()=>{
            modifyObjet(key,{nombre:h3Name.textContent,apellido:h3Surname.textContent})
            modifyBtn.classList.replace("possible","impossible")
        })
    }
    })
    h3Surname.addEventListener("keyup",()=>{
        modifyBtn.classList.replace("impossible","possible")
        if(modifyBtn.className == "possible"){
            modifyBtn.addEventListener("click",()=>{
            modifyObjet(key,{nombre:h3Name.textContent,apellido:h3Surname.textContent})
            modifyBtn.classList.replace("possible","impossible")
        })
    }
    })  

    return containerUsers
} 

btnInputValue.addEventListener("click",()=>{
    user.nombre = inputName.value
    user.apellido = inputSurname.value
    addObjet(user)
    readObjet()
    inputName.value =""
    inputSurname.value =""
    
})




