import { displayProjects } from "./projectController";


export function saveProjects() {
    const putProjects = JSON.stringify(displayProjects());
    localStorage.setItem("projects",putProjects);

}

export function loadProjects() {
    const projects = localStorage.getItem("projects");
    return JSON.parse(projects);
}