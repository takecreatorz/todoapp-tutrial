document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.querySelector('.todo-input');
    const todoButton = document.querySelector('.todo-button');
    const todoList = document.querySelector('.todo-list');

    // Load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.completed);
        });
    };

    // Save tasks to localStorage
    const saveTasks = () => {
        const tasks = Array.from(todoList.children).map(item => {
            return {
                text: item.querySelector('span').textContent,
                completed: item.classList.contains('completed')
            };
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add a task to the DOM
    const addTaskToDOM = (taskText, completed = false) => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        if (completed) todoItem.classList.add('completed');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.addEventListener('click', () => {
            todoItem.classList.toggle('completed');
            saveTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(todoItem);
            saveTasks();
        });

        todoItem.appendChild(taskSpan);
        todoItem.appendChild(deleteButton);
        todoList.appendChild(todoItem);
    };

    // Add a new task
    todoButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === '') return;

        addTaskToDOM(taskText);
        saveTasks();
        todoInput.value = '';
    });

    loadTasks();
});
