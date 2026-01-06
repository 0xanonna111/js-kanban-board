let tasks = JSON.parse(localStorage.getItem("kanban")) || [];

function save() {
  localStorage.setItem("kanban", JSON.stringify(tasks));
}

function render() {
  ["todo", "doing", "done"].forEach(col => {
    document.getElementById(col).innerHTML = "";
  });

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerText = task.text;

    li.onclick = () => moveTask(index);

    document.getElementById(task.status).appendChild(li);
  });
}

function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  if (!text) return;

  tasks.push({ text, status: "todo" });
  document.getElementById("taskInput").value = "";
  save();
  render();
}

function moveTask(index) {
  const order = ["todo", "doing", "done"];
  const current = tasks[index].status;
  const next = order[(order.indexOf(current) + 1) % 3];
  tasks[index].status = next;
  save();
  render();
}

render();
