import { create, getTodos, deleteProject, addTodoToProject } from "./projectController";
import { renderProjectList, renderTodoList, setActiveProject } from "./loadProjects";
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
      desc: todoTitle.value.trim(),
      date: formattedDate,
      priority: todoPriority.value,
    };
    const project = document.querySelector(".active").textContent;
    addTodoToProject(project, todoData);
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

