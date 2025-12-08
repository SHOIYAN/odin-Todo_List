import { saveProjects } from "./storage";
import { getProject } from "./projectController";
import { refreshTodoList } from "../dom/render";


export function deleteTodo(id) {
  const projectName = document.querySelector(".active").textContent;
  const project = getProject(projectName);

  project.todos = project.todos.filter(t => t.id !== id);

  saveProjects();
  refreshTodoList(projectName);
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

