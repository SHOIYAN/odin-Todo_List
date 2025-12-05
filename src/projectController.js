import createProject from "./project";
import createTodo from "./todo";
import { saveProjects } from "./storage";
import { refreshTodoList } from "./buttonController";

const projects = {};

export function create(project_name) {
  if (projects[project_name]) return projects[project_name];
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

export function getTodos(project_name) {
  const project = getProject(project_name);
  return project.todos;
}

export function updateTodo(id, projectName, newData) {
  const todos = getTodos(projectName);
  const todo = todos.find(t => t.id === id);

  if (!todo) return;

  Object.assign(todo, newData);
}

export function deleteTodo(id) {
  const projectName = document.querySelector(".active").textContent;
  const project = getProject(projectName);

  project.todos = project.todos.filter(t => t.id !== id);

  saveProjects();
  refreshTodoList(projectName);
}

export function addTodoToProject(project_name, todoData) {
  const project = getProject(project_name);
  if (!project) return null;
  const todo = createTodo(
    todoData.title,
    todoData.desc,
    todoData.date,
    todoData.priority
  );
  project.todos.push(todo);
  return todo;
}

export function displayProjects() {
  return projects;
}

export function loadAll(jsonData) {
  if (jsonData && Object.keys(jsonData).length > 0) {
    for (const name in jsonData) {
      const savedProject = jsonData[name];
      const project = createProject(name);
      project.todos = savedProject.todos || [];
      projects[name] = project;
    }
    return;
  }

  const defaultProject = create("Home");

  defaultProject.todos.push(
    createTodo("Buy groceries", "Milk, bread, eggs", "No date", "Low"),
    createTodo("Finish portfolio", "Work on homepage", "No date", "High"),
    createTodo("Workout", "Leg day", "No date", "Medium")
  );

  projects["Home"] = defaultProject;
}

