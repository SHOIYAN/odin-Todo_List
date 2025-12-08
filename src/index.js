import "./styles/style.css";
import { loadAll,loadProjects } from "./modules/controllers/storage";
import {
  projectClickHandler,
  addProjectListener,
  todoModalHandler,
  todoListHandler,
} from "./modules/dom/events";
import initTodoMenu from "./modules/dom/events";
import { renderProjectList } from "./modules/dom/render";


renderProjectList();
initTodoMenu();
projectClickHandler();
addProjectListener();
todoModalHandler();
todoListHandler();

const firstProject = document.querySelector(".project");
if (firstProject) refreshTodoList(firstProject.textContent);
