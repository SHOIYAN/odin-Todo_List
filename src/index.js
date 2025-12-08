import "./styles/style.css";
import { loadProjects } from "./modules/controllers/storage";
import {
  projectClickHandler,
  addProjectListener,
  todoModalHandler,
  todoListHandler,
} from "./modules/dom/events";
import initTodoMenu from "./modules/dom/events";
import { loadAll } from "./modules/controllers/projectController";
import { renderProjectList } from "./modules/dom/render";

const savedProjects = loadProjects();
loadAll(savedProjects);
renderProjectList();
initTodoMenu();
projectClickHandler();
addProjectListener();
todoModalHandler();
todoListHandler();

const firstProject = document.querySelector(".project");
if (firstProject) refreshTodoList(firstProject.textContent);
