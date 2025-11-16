export default function createProject(project_name) {
  const todos = [];
  return {
    project_name,
    addTodo: (todo) => {
      todos.push(todo);
    },
    getTodos: () => [...todos],
  };
}
