export function renderTodo(todo) {
    // create a div and a p tag
    // depending on whether the todo is complete, give the div the appropriate css class ('complete' or 'incomplete')
    const toDoDiv = document.createElement('div');
    const toDoName = document.createElement('div');

    if (todo.complete) {
        toDoDiv.classList.add('complete');
    } else {
        toDoDiv.classList.add('incomplete');
    }

    // add the 'todo' css class no matter what
    toDoDiv.classList.add('todo');

    // put the todo's text into the p tag
    toDoName.textContent = todo.todo;

    // append stuff
    toDoDiv.append(toDoName);

    // return the div
    return toDoDiv;
}