import './styles/style.css';
import {create,loadAll,addTodoToProject} from "./projectController";
import { loadProjects, saveProjects } from './storage';
import initTodoMenu from './menu';
import { renderProjectList,projectClickHandler } from './loadProjects';

const savedProjects = loadProjects();
loadAll(savedProjects);
initTodoMenu();
renderProjectList();
projectClickHandler();