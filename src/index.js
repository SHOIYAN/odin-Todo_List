import './styles/style.css';
import {create,loadAll,addTodoToProject} from "./projectController";
import { loadProjects, saveProjects } from './storage';

const savedProjects = loadProjects();
loadAll(savedProjects);
