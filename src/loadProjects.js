import { displayProjects } from "./projectController";

const projectList = document.querySelector(".projectList");

export function renderProjectList() {
  projectList.textContent = '';
  const project = Object.keys(displayProjects());
  project.forEach((element) => {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    projectDiv.textContent = `${element}`;
    projectList.append(projectDiv);
  });
}
