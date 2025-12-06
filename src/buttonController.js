import {
  create,
  getTodos,
  deleteProject,
  addTodoToProject,
  updateTodo,
  deleteTodo,
} from "./projectController";
import {
  renderProjectList,
  renderTodoList,
  setActiveProject,
} from "./loadProjects";
import { saveProjects } from "./storage";

const addBtn = document.querySelector(".addProject .button");
const delBtn = document.querySelector(".deleteProject .button");
const todoList = document.querySelector(".todoList");
const projectInput = document.querySelector(".projectInput");
const addTodoBtn = document.querySelector(".addTodo button");
const todoDialog = document.querySelector("#todoModal");
const todoInput = document.querySelectorAll(".todoInput");
const todoTitle = document.querySelector(".todoTitleInput");
const todoPriority = document.querySelector(".todoPrioritySelect");
const todoDesc = document.querySelector(".todoDescInput");
const todoDate = document.querySelector(".todoDateInput");
const cancelTodo = document.querySelector(".cancelTodo");

export function todoModalHandler() {
  addTodoBtn.addEventListener("click", showModal);
  todoDialog.addEventListener("close", checkReturnvalue);
  cancelTodo.addEventListener("click", closeModal);
}

function checkReturnvalue() {
  if (todoDialog.returnValue === "save") {
    const date = todoDate.valueAsDate;
    const formattedDate = date ? date.toDateString() : "No date";
    const todoData = {
      title: todoTitle.value.trim(),
      desc: todoDesc.value.trim(),
      date: formattedDate,
      priority: todoPriority.value,
    };
    const project = document.querySelector(".active").textContent;

    if (todoDialog.dataset.editing) {
      updateTodo(todoDialog.dataset.editing, project, todoData);
    } else {
      addTodoToProject(project, todoData);
    }

    delete todoDialog.dataset.editing;
    saveProjects();
    refreshTodoList(project);
  }
}

function showModal() {
  for (const input of todoInput) {
    input.value = "";
  }
  todoDialog.showModal();
}

function closeModal() {
  todoDialog.close();
}

export function addProjectListener() {
  addBtn.addEventListener("click", addProject);
  delBtn.addEventListener("click", delProject);
}

function addProject() {
  const project = projectInput.value.trim();
  projectInput.value = "";
  if (project) {
    create(project);
    renderProjectList();
    saveProjects();
    setActiveProject(project);
    refreshTodoList(project);
  }
}

function delProject() {
  const projectEl = document.querySelector(".active");
  const project = projectEl.textContent;
  deleteProject(project);
  todoList.textContent = "";
  renderProjectList();
  saveProjects();
}

export function refreshTodoList(projectName) {
  const todos = getTodos(projectName);
  renderTodoList(todos);
}

export function todoListHandler() {
  document.addEventListener("click", (e) => {
    const item = e.target.closest(".todo-item");

    if (!item) return;

    if (e.target.closest(".todo-check")) return;

    if (e.target.closest(".menu-button") || e.target.closest(".menu-dropdown"))
      return;

    item.classList.toggle("expanded");
  });
}

export function attachTodoEvents(todoElement, todo) {
  const editBtn = todoElement.querySelector(".menu-item.edit");
  const deleteBtn = todoElement.querySelector(".menu-item.delete");

  if (!editBtn || !deleteBtn) return;

  editBtn.addEventListener("click", () => openEditTodoModal(todo));
  deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

  const checkbox = todoElement.querySelector(".todo-done");

  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    saveProjects();
  });
}

function openEditTodoModal(todo) {
  todoDialog.dataset.editing = todo.id;

  todoTitle.value = todo.title;
  todoPriority.value = todo.priority;
  todoDate.value = todo.date !== "No date" ? todo.date : "";
  document.querySelector(".todoDescInput").value = todo.desc || "";

  todoDialog.showModal();
}
