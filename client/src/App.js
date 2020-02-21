import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import FormikOnboardingForm from "./components/OnboardingForm";
import FormikLoginForm from "./components/FormikLoginForm";
function App() {
  const testData = [
    {
      username: "BILL"
    }
  ];
  const [users, setUsers] = useState(testData);
  const addUser = newUser => {
    setUsers([...users, newUser]);
  };

  useEffect(() => {
    console.log(users);
  }, [users]);

  console.log(users);
  return (
    <div className="App">
      <FormikOnboardingForm addUser={addUser} />
      <h1>
        {users.map(userObj => {
          return <h1>{userObj.username}</h1>;
        })}
      </h1>
    </div>
  );
}

export default App;
