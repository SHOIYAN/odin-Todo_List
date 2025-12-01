import { create, deleteProject } from "./projectController";
import { renderProjectList, renderTodoList } from "./loadProjects";
import { saveProjects } from "./storage";

const addBtn = document.querySelector(".addProject .button");
const delBtn = document.querySelector(".deleteProject .button");
const todoList = document.querySelector(".todoList");
const projectInput = document.querySelector(".projectInput");

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
