import './styles/style.css';
import {create,loadAll,addTodoToProject} from "./projectController";
import { loadProjects, saveProjects } from './storage';
import initTodoMenu from './menu';
import { renderProjectList,projectClickHandler } from './loadProjects';
import { addProjectListener, todoModalHandler } from './buttonController';

const savedProjects = loadProjects();
loadAll(savedProjects);
renderProjectList();
initTodoMenu();
projectClickHandler();
addProjectListener();
todoModalHandler();