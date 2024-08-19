import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    // Fetch existing todos when the component mounts
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });

    return () => subscription.unsubscribe();
  }, []);

  function createTodo() {
    // Prompt the user for each field
    const name = window.prompt("Enter the employee's name:");
    const surname = window.prompt("Enter the employee's surname:");
    const role = window.prompt("Enter the employee's role:");
    const hiringDateVal = window.prompt("Enter the employee's hiring date (YYYY-MM-DD):");

    // Validate the input (you can add more validation logic here)
    if (name && surname && role) {
      client.models.Todo.create({
        name,
        surname,
        role,
        hiringDate: hiringDateVal
      });
    } else {
      alert("All fields are required!");
    }
  }

    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <main>
      <h1>Codeland Employees</h1>
      <button onClick={createTodo}>+ ADD</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.name} {todo.surname}</strong> - ROLE: {todo.role}  - HIRING DATE: {todo.hiringDate}
            <br/>
            <button onClick={() => deleteTodo(todo.id)}>- Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;