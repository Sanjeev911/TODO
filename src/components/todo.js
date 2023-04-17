import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Task from './task';
import '../styles/todo.css';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { TASK_STATUS } from '../constants';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Button } from "@mui/material";

const getCurrentUserEmail = () => {
    const currentUserEmail = JSON.parse( localStorage.getItem('currentLoggedInUserEmail'));
    return currentUserEmail
}

const getCurrentUserTasks = () => {
    const currentUserEmail = getCurrentUserEmail();
    if (currentUserEmail) {
        const allTasks = JSON.parse(localStorage.getItem("tasks")) ?? {};
        const userTasks = allTasks[currentUserEmail] ?? [];
        return userTasks
    }
    else {
        return []
    }
}

const getTaskJSX = (task, setUserTasks, setInput, userTasks) => {
    return <Task task={task} setUserTasks={setUserTasks} setInput={setInput} userTasks={userTasks} key={task.id}/>
}

const updateUserTaskCounter = () => {
    const currentUserEmail = getCurrentUserEmail();
    const allUsers = JSON.parse(localStorage.getItem("users"));
    const user =  allUsers.find((user) => {
        return user.email == currentUserEmail
    })

    user.taskCounter += 1
    localStorage.setItem("users", JSON.stringify(allUsers))
}

const Todos = () => {
    const [currentLoggedInUserEmail, setCurrentLoggedInUserEmail] = useState("");
    const [tabSelected, setTab] = useState("1");
    const [userTasks, setUserTasks] = useState(() => {
        return getCurrentUserTasks()
    });
    const [input, setInput] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        const currentUserEmail =JSON.parse( localStorage.getItem('currentLoggedInUserEmail'));
        if (currentUserEmail){
            setCurrentLoggedInUserEmail(currentUserEmail)
        } else {
            navigate('/login',{setCurrentLoggedInUserEmail: setCurrentLoggedInUserEmail()})
        }
    },[currentLoggedInUserEmail])
    
    useEffect(() => {
        updateLocalStorageTasks()
    },[userTasks])

    const updateLocalStorageTasks = () => {
        const currentUserEmail = getCurrentUserEmail();
        if (currentUserEmail) {
            const allTasks = JSON.parse(localStorage.getItem("tasks")) ?? {};
            const updatedAllTasks = {
                ...allTasks,
                [currentUserEmail]: userTasks
                }
            localStorage.setItem("tasks", JSON.stringify(updatedAllTasks))
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("currentLoggedInUserEmail");
        setCurrentLoggedInUserEmail("")
    }

    const getTasks = () => {
        const tasksToDisplay =  userTasks.filter((task) =>{
            if (tabSelected == '2') {
                return task.status == TASK_STATUS.COMPLETED 
            }
            else if (tabSelected == '3') {
                return task.status == TASK_STATUS.PENDING
            } else {
                return true
            }
        }).map((task) => getTaskJSX(task, setUserTasks, setInput, userTasks));
    
        return tasksToDisplay;
    }
    const getUserTasksCounter = () => {
        const currentUserEmail = getCurrentUserEmail();
        const allUsers = JSON.parse(localStorage.getItem("users"));
        const user = allUsers.find((user) => {
            return user.email == currentUserEmail
        });
        return user?.taskCounter ?? 0;
    }

    const addTask = (e) => {
        e.preventDefault()
        if (! (e.target.todoTask?.value ?? "")) return;
        const currentCounter = getUserTasksCounter();
        const newTask = {
            id: currentCounter,
            description: e.target.todoTask.value,
            status: TASK_STATUS.PENDING
        }
        const updatedTasks = [...userTasks, newTask]
        setUserTasks(() => updatedTasks)
        setInput('')
        updateUserTaskCounter()
    }

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }
    const handleTabChange = (e, newValue) => {
        setTab(newValue)
    }

    return <div>
        <div className='logoutContainer'>
            <Button variant="contained" className="logoutButton" style={{backgroundColor: "black"}} onClick={handleLogout}>
                Logout
            </Button>
        </div>
        <div className="container">
            <form  onSubmit={addTask}>
                <div id="addTask">
                    <input type="text" placeholder="Add task" value= {input} name='todoTask' onChange={handleInputChange}/>
                    <IconButton color="primary" aria-label="add to shopping cart" type='submit'>
                        <AddIcon />
                    </IconButton>
                </div>
            </form> 
        <Box className='toggleOptions'>
            <Tabs value={tabSelected} onChange={handleTabChange} aria-label="icon label tabs example" centered>
                <Tab icon={<ListAltIcon />} label="ALL" value="1"/>
                <Tab icon={<AssignmentTurnedInIcon />} label="COMPLETED" value="2"/>
                <Tab icon={<PendingActionsIcon />} label="PENDING" value="3"/>
            </Tabs>
        </Box>   
        <div id="tasks">
            {getTasks()}
        </div>
    </div> 
</div>
}

export default Todos