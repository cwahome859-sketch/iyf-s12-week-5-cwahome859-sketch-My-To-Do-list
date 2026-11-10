
// Select HTML elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filters");
const clearCompletedButton = document.getElementById("clear-completed");

// Load saved tasks from localStorage
let tasks = [];

try {
    const savedTasks = JSON.parse(
        localStorage.getItem("myTasks") || "[]"
    );

    if (Array.isArray(savedTasks)) {
        tasks = savedTasks.filter(
            task =>
                task &&
                typeof task.text === "string" &&
                typeof task.completed === "boolean"
        );
    }
} catch (error) {
    tasks = [];
}

// Save tasks
function saveTasks() {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {
    todoList.textContent = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("todo-item");

        if (task.completed) {
            li.classList.add("completed");
        }

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute(
            "aria-label",
            `Mark ${task.text} as completed`
        );

        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        // Task text
        const span = document.createElement("span");
        span.textContent = task.text;

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.setAttribute(
            "aria-label",
            `Delete ${task.text}`
        );

        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.append(checkbox, span, deleteButton);
        todoList.appendChild(li);
    });

    // Count remaining tasks
    const remainingTasks = tasks.filter(
        task => !task.completed
    ).length;

    taskCount.textContent =
        `You have ${remainingTasks} task${remainingTasks === 1 ? "" : "s"} remaining.`;
}

// Add a new task
todoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskText = todoInput.value.trim();

    if (taskText === "") {
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    displayTasks();

    todoInput.value = "";
    todoInput.focus();
});

// Clear all tasks
clearButton.addEventListener("click", () => {
    if (tasks.length === 0) {
        return;
    }

    const confirmClear = confirm(
        "Are you sure you want to delete all tasks?"
    );

    if (confirmClear) {
        tasks = [];
        saveTasks();
        displayTasks();
    }
});

// Display saved tasks when the page loads
displayTasks();