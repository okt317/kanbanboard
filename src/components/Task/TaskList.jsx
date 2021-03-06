import React, {useState} from "react";
import {Grid} from "@mui/material";
import {Task} from "./Task";
import {makeStyles} from "@mui/styles";
import {Draggable} from "react-beautiful-dnd";


const useStyles = makeStyles(() => ({
    boardContent: {
        // height: '100%'
    }
}))

export const TaskList = ({tasks, boardId}) => {
    const classes = useStyles();
    const [taskList, setTaskList] = useState(tasks);
    return (
        taskList.map((task, index) => (
                <Draggable draggableId={task.title+'/'+task.id} index={index} key={task.id}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                        >
                            <Grid className={classes.boardContent}  item xs={12}>
                                <Task task={task} boardId={boardId} index={index}/>
                            </Grid>
                        </div>
                    )}
                </Draggable>
            )
        )
    )
}