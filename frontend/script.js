const API_URL = "http://localhost:5000/api/tasks"; // Change this to match your backend URL

// Function to fetch and display tasks
async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear old tasks

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask('${task._id}')">X</button>
        `;
        li.addEventListener("click", () => toggleComplete(task._id));
        taskList.appendChild(li);
    });
}

// Function to add a new task
async function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: taskText }),
    });

    taskInput.value = "";
    fetchTasks(); // Refresh tasks
}

// Function to delete a task
async function deleteTask(taskId) {
    await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
    fetchTasks(); // Refresh tasks
}

// Function to toggle task completion
async function toggleComplete(taskId) {
    await fetch(`${API_URL}/${taskId}`, { method: "PUT" });
    fetchTasks();
}

// Load tasks when the page loads
window.onload = fetchTasks;
