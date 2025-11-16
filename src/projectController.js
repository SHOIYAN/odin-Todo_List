import createProject from "./project";

const projects = {};

export function create(project_name) {
  const project = createProject(project_name);
  projects[project_name] = project;
  return project;
}

export function deleteProject(project_name) {
  delete projects[project_name];
}

export function getProject(project_name) {
  return projects[project_name] || null;
}

export function displayProjects() {
  return projects;
}
