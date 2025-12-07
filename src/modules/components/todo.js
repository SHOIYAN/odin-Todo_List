export default function createTodo(title, desc, date, priority) {
   return {
    id: crypto.randomUUID(),
    title,
    desc,
    date,
    priority,
    completed: false,
  };
}

