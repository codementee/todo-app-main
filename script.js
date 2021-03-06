const todoInput = document.querySelector('#todo_input');
const todosContainer = document.querySelector('.todo_list');
const todoFooter = document.querySelector('.todo_footer_row');

function createTodo(todoText) {
    let num = Math.random() * 30;
    const div = document.createElement('div');
    const input = document.createElement('input');
    const label = document.createElement('label');
    const img = document.createElement('img');
    input.type = 'checkbox';
    input.classList.add('todoCheckbox');
    input.id = num;
    label.setAttribute('for', num);
    label.append(todoText);
    img.src = './images/icon-cross.svg';
    img.setAttribute('class', 'delete-item');
    img.alt = 'remove';
    div.setAttribute('class', 'todo active');
    div.append(input, label, img);
    todosContainer.prepend(div);
}

todoInput.addEventListener('keyup', (e)=> {
    if(e.keyCode === 13 || e.key === "Enter") {
        if(e.target.value != "" && e.target.value != null) {
            createTodo(e.target.value);
            itemsLeft.innerText = getTotalNumOfItems().length - 1;
        }
    }
})

document.body.addEventListener('click', (e)=> {
    removeTodo(e);
    addCheckClass(e);
})

function addCheckClass(e) {
    const todoItems = getTotalNumOfItems();
    const todoItemsArr = Array.from(todoItems);
    if(e.target.parentElement.classList.contains('todo')) {
        for(let i = 0; i < todoItemsArr.length - 1; i++) {
            if(todoItemsArr[i].children[0].checked) {
                todoItemsArr[i].classList.add('checked');
                todoItemsArr[i].classList.remove('active');
            } else {
                todoItemsArr[i].classList.remove('checked');
                todoItemsArr[i].classList.add('active');
            }
        }
    }
}

function removeTodo(e) {
    if(e.target.classList.contains('delete-item')) {
        e.target.parentElement.remove();
        itemsLeft.innerText = getTotalNumOfItems().length - 1;
    }
}

function getTotalNumOfItems(){
    return todosContainer.children;
}

function checkedItemsCount() {
    let num = 0;
    for(let i = 0; i < getTotalNumOfItems().length - 1; i++) {
        if(getTotalNumOfItems()[i].children[0].checked) {
            num++;
        }
    }
    return num;
}

function activeItemsCount() {
    let num = 0;
    for(let i = 0; i < getTotalNumOfItems().length - 1; i++) {
        if(!getTotalNumOfItems()[i].children[0].checked) {
            num++;
        }
    }
    return num;
}


const completedTasks = document.querySelector('.completed');
const allTasks = document.querySelector('.all');
const activeTasks = document.querySelector('.active');
const clearCompleted = document.querySelector('.clearComp');
const itemsLeft = document.querySelector('.todo_footer_row span span');

completedTasks.addEventListener('click', ()=> {
    const todoItems = getTotalNumOfItems();
    const todoItemsArr = Array.from(todoItems);
    for(let i = 0; i < todoItemsArr.length - 1; i++) {
        if(todosContainer.children[i].classList.contains('checked')) {
            todoItemsArr[i].classList.add('show');
            todoItemsArr[i].classList.remove('hide');
            itemsLeft.innerText = checkedItemsCount();
            completedTasks.classList.add('color');
            activeTasks.classList.remove('color');
            allTasks.classList.remove('color');

        } else {
            todoItemsArr[i].classList.add('hide');
            todoItemsArr[i].classList.remove('show');
        }
        if(todosContainer.children[i].classList.contains('hide')) {
            itemsLeft.innerText = checkedItemsCount();
            completedTasks.classList.add('color');
            activeTasks.classList.remove('color');
            allTasks.classList.remove('color');
        }
    }
})

allTasks.addEventListener('click', ()=> {
    const todoItems = getTotalNumOfItems();
    const todoItemsArr = Array.from(todoItems);
    for(let i = 0; i < todoItemsArr.length - 1; i++) {
        if(todosContainer.children[i].classList.contains('todo')) {
            todosContainer.children[i].classList.remove('hide'); 
            itemsLeft.innerText = getTotalNumOfItems().length - 1;
            allTasks.classList.add('color');
            completedTasks.classList.remove('color');
            activeTasks.classList.remove('color');
        }
    }
})

activeTasks.addEventListener('click', ()=> {
    const todoItems = getTotalNumOfItems();
    const todoItemsArr = Array.from(todoItems);

    for(let i = 0; i < todoItemsArr.length - 1; i++) {
        if(todosContainer.children[i].classList.contains('active')) {
            todoItemsArr[i].classList.add('show');
            todoItemsArr[i].classList.remove('hide');
            itemsLeft.innerText = activeItemsCount();
            activeTasks.classList.add('color');
            completedTasks.classList.remove('color');
            allTasks.classList.remove('color');
            
        } else {
            todoItemsArr[i].classList.add('hide');
            todoItemsArr[i].classList.remove('show');completedTasks.classList.add('color');
        }
        if(todosContainer.children[i].classList.contains('hide')) {
            itemsLeft.innerText = activeItemsCount();
            activeTasks.classList.add('color');
            completedTasks.classList.remove('color');
            allTasks.classList.remove('color');
        }
    }
})

clearCompleted.addEventListener('click', ()=> {
    const todoItems = getTotalNumOfItems();
    const todoItemsArr = Array.from(todoItems);

    const completedTodos = todoItemsArr.filter((todo) => {
        return todo.classList.contains('checked')
    })
    completedTodos.forEach(completedTodo => {
        completedTodo.remove();
        itemsLeft.innerText = getTotalNumOfItems().length - 1;
        activeTasks.classList.remove('color');
        completedTasks.classList.remove('color');
        allTasks.classList.remove('color');
    })
})