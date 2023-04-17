import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch';
import { useState } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TASK_STATUS } from "../constants";



const Task = ({task ,setUserTasks, userTasks, setInput}) => {
    const [isComplete, setComplete] = useState(() => {
        return task.status == TASK_STATUS.COMPLETED});
    const [editMode, setEditMode] = useState(false);
    const [updatedDescription, setUpdatedDescription] = useState(task?.description ?? "")

    let editingMode = {};
    let viewingMode = {};
    if (editMode) {
        viewingMode.display = 'none';
    } else {
        editingMode.display = 'none';
    }

    const handleEditing = () => {
        setEditMode(true);
    }
    const handleTaskUpdate = (e,val) => {
        const updatedTasks = userTasks.map((userTask) => {
            if (userTask.id == task.id){
                return {
                    ...userTask,
                    description: updatedDescription
                }
            } else {
                return userTask
            }
        });
        setUserTasks(updatedTasks);
        setEditMode(false);
    }

    const removeTask = () => {
        const updatedTasks = userTasks.filter((t) => {
            return t.id != task.id
        });
        setUserTasks(updatedTasks)
    };
    const handleComplete = (e, value) => {
        const clonedTasks = [...userTasks];
        for (let i=0; i<clonedTasks.length; i+=1){
            if (clonedTasks[i].id == task.id){
                const oldStatus = clonedTasks[i].status;
                clonedTasks[i].status = oldStatus == TASK_STATUS.COMPLETED ? TASK_STATUS.PENDING : TASK_STATUS.COMPLETED
            }
        }
        setComplete(value);
        setUserTasks(clonedTasks);
    }

    
    return <>
            <div className={`task-${isComplete ? 'completed' : 'pending'}`} draggable style={viewingMode}>
                <span id="taskDescription" >
                    {task.description}
                </span>
                <span id= "actionButtons" >
                <Button variant="contained" startIcon={<DeleteIcon/> } className="delete" style={{marginRight: "20px"}} color="error" onClick={removeTask} sx={{fontSize: 16}}>
                    Delete
                </Button>
                <Button variant="contained" startIcon={<EditIcon />} className="edit" style={{marginRight: "20px"}} sx={{fontSize: 16}} onClick={handleEditing}>
                    Edit
                </Button>
                    <FormGroup style={{display: "inline-block"}}>
                        <FormControlLabel control={
                            <Switch
                                checked={isComplete}
                                onChange={handleComplete}
                            />} 
                        label="Done" />
                    </FormGroup>
                </span>
            </div>
            <div className={`task-${isComplete ? 'completed' : 'pending'}`} style={editingMode}>
                <input type="text" value={updatedDescription} className="editTaskInput" onChange={ (e) => {setUpdatedDescription(e.target.value)} }/>
                <span id= "actionButtons" style={editingMode}>
                    <Button variant="contained" className="update" style={{marginRight: "20px", display: editingMode.display}} color="success" onClick={handleTaskUpdate} sx={{fontSize: 16}}>
                        Update
                    </Button>
                </span>
            </div>
        </>;
}

export default Task;