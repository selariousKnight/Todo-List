let todoItemsContainer = document.getElementById('todoItemsContainer');

let addButton = document.getElementById('addButton');

let saveButton = document.getElementById('saveButton');


let todoList = getFromLocalStorage()

function onDelete(todoId){
    let deleteEle = document.getElementById(todoId);
    todoItemsContainer.removeChild(deleteEle)
    let todoIndex = todoList.findIndex(function(todoEle){
        let newTodoId = 'todo'+todoEle.uniqueNo
        if(todoId === newTodoId){
            return true
        }
        else{
            return false
        }
    })
    todoList.splice(todoIndex,1)
}

function onTodoSatusChange(checkboxId,labelId,todoId){
    let checkEle = document.getElementById(checkboxId);
    let labelEle = document.getElementById(labelId);
    labelEle.classList.toggle("checked");
    let checkedIndex = todoList.findIndex(function(eachEle){
        let newCheckedId = 'todo' + eachEle.uniqueNo;
        if(todoId === newCheckedId){
            return true
        }
        else{
            return false
        }
    })
    let  checkedobj = todoList[checkedIndex]
    if(checkedobj.isChecked === true){
        checkedobj.isChecked = false
    }
    else{
        checkedobj.isChecked = true
    }

}
function createAndAppendTodo(todoItems){
    let checkboxId = "checkbox"+todoItems.uniqueNo;
    let labelId = 'label'+todoItems.uniqueNo;
    let todoId = 'todo' + todoItems.uniqueNo

    let todoContainer = document.createElement("li");
    todoContainer.classList.add('todoContainer')
    todoContainer.id = todoId
    todoItemsContainer.appendChild(todoContainer)

    let inputElement = document.createElement('input');
    inputElement.type = 'checkbox'
    inputElement.id = checkboxId
    inputElement.classList.add('checkbox')
    inputElement.checked = todoItems.isChecked
    inputElement.onclick = function(){
        onTodoSatusChange(checkboxId,labelId,todoId)
    }
    todoContainer.appendChild(inputElement);

    let labelContainer = document.createElement('div');
    labelContainer.classList.add('label-Continer')
    
    todoContainer.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.textContent = todoItems.text;
    labelElement.setAttribute("for",checkboxId)
    labelContainer.id= labelId;
    if(todoItems.isChecked === true){
        labelElement.classList.add('checked')
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContiner = document.createElement("div");
    deleteIconContiner.classList.add("deleteContainer")
    labelContainer.appendChild(deleteIconContiner);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon")
    deleteIcon.onclick = function(){
        onDelete(todoId)
    }
    deleteIconContiner.appendChild(deleteIcon);

}
for(todoItems of todoList){
    createAndAppendTodo(todoItems)
}
function onaddtask(){
    let todoInput = document.getElementById("inputElement");
     let inputValue = todoInput.value
     let listLength = todoList.length;
    listLength += 1
    let newTask = {
        text : inputValue,
        uniqueNo : listLength,
        isChecked : false
    }

    if(inputValue === ""){
        alert('Please Enter a Task')
        return;
    }
    else{
        createAndAppendTodo(newTask)

    }
    todoInput.value = ""
    todoList.push(newTask)

}
addButton.onclick = function(){
    onaddtask()
}

saveButton.onclick = function(){
    localStorage.setItem('todoList',JSON.stringify(todoList))
}
function getFromLocalStorage(){
    let stringifiedData = localStorage.getItem("todoList");
    let parsedData = JSON.parse(stringifiedData);
    if(parsedData === null){
        return []
    }
    else{
        return parsedData
    }
}

