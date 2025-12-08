import { create, deleteProject, addTodoToProject } from "../controllers/projectController";

import {
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";

import { renderProjectList, refreshTodoList } from "./render";
import { setActiveProject } from "../controllers/uiController"
import { saveProjects } from "../controllers/storage";

import {
  showModal,
  closeModal,
} from "../controllers/uiController";

const addBtn = document.querySelector(".addProject .button");
const delBtn = document.querySelector(".deleteProject .button");
const todoList = document.querySelector(".todoList");
const projectInput = document.querySelector(".projectInput");
const projectList = document.querySelector(".projectList");
const addTodoBtn = document.querySelector(".addTodo button");
const todoDialog = document.querySelector("#todoModal");
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

export default function initTodoMenu() {
  document.querySelectorAll(".menu-dropdown").forEach((menu) => {
    menu.addEventListener("click", (e) => e.stopPropagation());
  });

  document.addEventListener("click", (e) => {
    const isMenuBtn = e.target.classList.contains("menu-button");

    document.querySelectorAll(".menu-button").forEach((btn) => {
      if (btn !== e.target) btn.classList.remove("active");
    });

    if (isMenuBtn) {
      e.target.classList.toggle("active");
    }
  });
}

export function projectClickHandler() {
  projectList.addEventListener("click", (e) => {
    const projectDiv = e.target.closest(".project");
    if (!projectDiv) return;
    const allProjects = document.querySelectorAll(".project");
    allProjects.forEach((p) => p.classList.remove("active"));
    const projectName = e.target.textContent;
    setActiveProject(projectName);
    refreshTodoList(projectName);
  });
}
