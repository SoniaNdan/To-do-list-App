// Basic setup
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

// Validation – Prevent Empty Tasks
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    done: false
  };

  tasks.push(task);
  taskInput.value = "";

  saveTasks();
  renderTasks();
});

// Render Tasks (Add, Toggle, Remove)
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const span = document.createElement("span");
    span.textContent = task.text;

    span.addEventListener("click", () => {
      task.done = !task.done;
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}


// Local Storage – Save Tasks on Refresh
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}

loadTasks();


// ✅ What This App Can Do

// ✔ Add tasks
// ✔ Prevent empty inputs
// ✔ Mark tasks as done
// ✔ Remove tasks
// ✔ Save tasks even after page refresh


// Optional Improvements (Next Level)

// If you want to stretch it a bit:

// Add “Enter” key support

// Show task count (total / completed)

// Add edit task feature

// Filter: All / Completed / Pending

// Animate task add/remove