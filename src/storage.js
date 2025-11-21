import { displayProjects } from "./projectController";


export function saveProjects() {
    const stringProjects = JSON.stringify(displayProjects());
    localStorage.setItem("projects",stringProjects);

}

export function loadProjects() {
    const projects = localStorage.getItem("projects");
    return JSON.parse(projects);
}