import { displayProjects, getProject, getTodos } from "./projectController";
import { attachTodoEvents, refreshTodoList } from "./buttonController";

const projectList = document.querySelector(".projectList");
const todoList = document.querySelector(".todoList");

export function renderProjectList() {
  projectList.textContent = "";
  const project = Object.keys(displayProjects());
  project.forEach((element) => {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    projectDiv.textContent = `${element}`;
    projectList.append(projectDiv);
  });
  const firstProject = projectList.querySelector(".project");
  if (firstProject) {
    firstProject.classList.add("active");
  }
}

export function renderTodoList(todos) {
  todoList.textContent = "";
  todos.forEach((todo) => {
    const todoItem = `<div class="todo-item" data-id=${todo.id}>
          <div class="topSection">
            <label class="todo-check">
              <input type="checkbox" class="todo-done" />
              <span class="checkmark"></span>
            </label>
            <div class="todo-item_details">
              <h3 class="title">${todo.title}</h3>
              <p class="date">Due: ${todo.date}</p>
              <p class="priority">${todo.priority} Priority</p>
            </div>
            <div class="todo-menu">
              <button class="menu-button">⋮</button>
              <div class="menu-dropdown">
                <div class="menu-item edit">Edit</div>
                <div class="menu-item delete">Delete</div>
              </div>
            </div>
          </div>
          <div class="bottomSection">
            <div class="todo-extra">
              <p class="todo-notes">${todo.desc ? todo.desc : 'No notes found'}</p>
            </div>
          </div>
        </div>`;
    const parser = new DOMParser();
    const doc = parser.parseFromString(todoItem, "text/html");
    const item = doc.body.firstChild;
    attachTodoEvents(item,todo);
    todoList.appendChild(item);
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

export function setActiveProject(projectName) {
  const projectEls = document.querySelectorAll(".project");
  projectEls.forEach(el => {
    el.classList.toggle("active", el.textContent === projectName);
  });
}
