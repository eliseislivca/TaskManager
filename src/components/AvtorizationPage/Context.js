import React, { createContext, useEffect, useState } from "react";

export const CustomContext = createContext();

export const Context = (props) => {
  const [user, setUser] = useState({
    email: ''
  });
  const [task, setTask] = useState({
    task: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const storedTask = localStorage.getItem('task');
    if (storedTask) {
      setTask(JSON.parse(storedTask));
    }
  }, []);

  const value = {
    user,
    setUser,
    task,
    setTask
  }
  return (
    <CustomContext.Provider value={value}>
      {props.children}
    </CustomContext.Provider>
  );
};
