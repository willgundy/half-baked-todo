import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
    incompleteTodo
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // on submit, create a todo, reset the form, and display the todos
    const data = new FormData(todoForm);

    const todoName = data.get('todo');

    const todo = generateToDoObject(todoName);

    await createTodo(todo);

    todoForm.reset();

    displayTodos();
});

async function displayTodos() {
    todosEl.innerHTML = '';
    // fetch the todos
    const todos = await getTodos();
    // display the list of todos
    for (let toDo of todos) {
        console.log(toDo);
        const todoEl = renderTodo(toDo);
        // be sure to give each todo an event listener

        // on click, complete that todo
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('complete');

            if (todoEl.classList.contains('complete')) {
                completeTodo(toDo.id);
            } else {
                incompleteTodo(toDo.id);
            }
            
        });

        todosEl.append(todoEl);
    }
}

// add an on load listener that fetches and displays todos on load
window.addEventListener('load', displayTodos);


logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async () => {
    // delete all todos
    await deleteAllTodos();
    // then refetch and display the updated list of todos
    displayTodos();
});

function generateToDoObject(todoName) {
    return {
        todo: todoName,
        complete: false
    };
}
