import { create } from "./projectController";
import { renderProjectList } from "./loadProjects";
import { saveProjects } from "./storage";

const addProjectButton = document.querySelector(".addProject");
const projectDialog = document.querySelector(".projectDialog");
const projectInput = document.querySelector(".projectInput");

export function addProjectListener () {
  addProjectButton.addEventListener("click",() => {
    const project = projectInput.value.trim();
    projectInput.value = '';
    if (project){
      create(project);
      renderProjectList();
      saveProjects();
    }
})};

