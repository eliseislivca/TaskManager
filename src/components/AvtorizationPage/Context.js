import { createContext, useEffect, useState } from "react";

export const CustomContext = createContext();

export const Context = (props) => {
    const [user, setUser] = useState({
        email: ''
    });
    const [task, setTask] = useState({
        task: ''
    })

    useEffect(() => {
        if (localStorage.getItem('user') !== null) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('task') !== null) {
            setTask(JSON.parse(localStorage.getItem('task')));
        }
    }, []);    

    const value = {
        user,
        setUser,
        task,
        setTask
    }

    return <CustomContext.Provider value={value}>
        {props.children}
    </CustomContext.Provider>
}