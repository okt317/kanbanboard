import React from "react";
import {Grid} from "@mui/material";
import {Task} from "./Task";
import {makeStyles} from "@mui/styles";
import {Draggable} from "react-beautiful-dnd";


const useStyles = makeStyles(() => ({
    boardContent: {
        // overflowY: 'auto',
        // height: '100%'
    }
}))

export const TaskList = ({board}) => {
    const classes = useStyles();
    return (
        board.tasks.map((task, index) => (
                <Draggable draggableId={task.title+'/'+task.id} index={index} key={task.id}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                        >
                            <Grid className={classes.boardContent}  item xs={12}>
                                <Task task={task} boardId={board.id} index={index}/>
                            </Grid>
                        </div>
                    )}
                </Draggable>
            )
        )
    )
}