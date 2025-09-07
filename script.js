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

    const updateCompletedCount = () => {
        const completedCount = Array.from(todoList.children).filter(item => item.classList.contains('completed')).length;
        const totalCount = todoList.children.length;
        const counterElement = document.querySelector('.todo-counter');
        counterElement.textContent = `Completed: ${completedCount} / Total: ${totalCount}`;
    };

    // Add a task to the DOM
    const addTaskToDOM = (taskText, completed = false) => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.addEventListener('change', (event) => {
            if (event.target !== deleteButton) {
                todoItem.classList.toggle('completed', checkbox.checked);
                saveTasks();
                updateCompletedCount();
            }
        });

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(todoItem);
            saveTasks();
            updateCompletedCount();
        });

        todoItem.appendChild(checkbox);
        todoItem.appendChild(taskSpan);
        todoItem.appendChild(deleteButton);
        todoList.appendChild(todoItem);

        updateCompletedCount();
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
    updateCompletedCount();
});
