const todoDialog = document.querySelector("#todoModal");
const todoInput = document.querySelectorAll(".todoInput");
const todoTitle = document.querySelector(".todoTitleInput");
const todoPriority = document.querySelector(".todoPrioritySelect");
const todoDate = document.querySelector(".todoDateInput");

export function showModal() {
  for (const input of todoInput) {
    input.value = "";
  }
  todoDialog.showModal();
}

export function closeModal() {
  todoDialog.close();
}

export function openEditTodoModal(todo) {
  todoDialog.dataset.editing = todo.id;

  todoTitle.value = todo.title;
  todoPriority.value = todo.priority;
  todoDate.value = todo.date !== "No date" ? todo.date : "";
  document.querySelector(".todoDescInput").value = todo.desc || "";

  todoDialog.showModal();
}

export function setActiveProject(projectName) {
  const projectEls = document.querySelectorAll(".project");
  projectEls.forEach((el) => {
    el.classList.toggle("active", el.textContent === projectName);
  });
}
