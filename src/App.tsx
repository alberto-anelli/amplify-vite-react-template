import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

import { Authenticator } from '@aws-amplify/ui-react'
import { signInWithRedirect } from 'aws-amplify/auth';

import '@aws-amplify/ui-react/styles.css'

const client = generateClient<Schema>();

function App() {

  const [employees, setEmployees] = useState<Array<Schema["Employee"]["type"]>>([]);

  useEffect(() => {
    signInWithRedirect({
      provider: {custom: 'MicrosoftEntraIDSAML'}
    });
    // Fetch existing todos when the component mounts
    const subscription = client.models.Employee.observeQuery().subscribe({
      next: (data) => setEmployees([...data.items]),
    });

    return () => subscription.unsubscribe();
  }, []);

  function createEmployee() {
    // Prompt the user for each field
    const name = window.prompt("Enter the employee's name:");
    const surname = window.prompt("Enter the employee's surname:");
    const role = window.prompt("Enter the employee's role:");
    const hiringDateVal = window.prompt("Enter the employee's hiring date (YYYY-MM-DD):");

    // Validate the input (you can add more validation logic here)
    if (name && surname && role) {
      client.models.Employee.create({
        name,
        surname,
        role,
        hiringDate: hiringDateVal
      });
    } else {
      alert("All fields are required!");
    }
  }

    
  function deleteEmployee(id: string) {
    client.models.Employee.delete({ id })
  }

  return (
        
    <Authenticator>
      {({ signOut, user }) => (
            <main>
              <h1>Hello {user?.username}</h1>
              <h1>Codeland Employees</h1>
              <button onClick={createEmployee}>+ ADD</button>
              <ul>
                {employees.map((empl) => (
                  <li key={empl.id}>
                    <strong>{empl.name} {empl.surname}</strong> - ROLE: {empl.role}  - HIRING DATE: {empl.hiringDate}
                    <br/>
                    <button onClick={() => deleteEmployee(empl.id)}>- Delete</button>
                  </li>
                ))}
              </ul>
              <button onClick={signOut}>Sign out</button>
            </main>
                
      )}
      </Authenticator>
  );
}

export default App;