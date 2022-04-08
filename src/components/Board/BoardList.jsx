import {BoardHeader} from "./BoardHeader";
import {createTheme, Divider, Paper, Grid, Typography} from "@mui/material";
import {TaskList} from "../Task/TaskList";
import {BoardFooter} from "./BoardFooter";
import React, {useState} from "react";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {makeStyles} from "@mui/styles";

const theme = createTheme();
const useStyles = makeStyles(() => ({
    boardCard: {
        width: '300px',
        display: 'flex',
        maxHeight: '100%',
        overflowX: 'hidden',
        overflowY: 'hidden',
        // marginLeft: '8px',
        marginRight: '8px',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            width: '300px',
        }
    },
    divider: {
        marginTop: theme.spacing(2)
    },
    listTasks: {
        width: "300px",
        backgroundColor: "#ebecf0",
        marginRight: "0.5rem",
        borderRadius: " 5px",
    },
    listContainer: {
        overflowX: 'auto',
        overflowY: "hidden",
        margin: '0.5rem 0'
    }
}))

export const BoardList = ({board, index}) => {
    const [boardList, setBoardList] = useState(board);
    const classes = useStyles();

    return (

        <Draggable draggableId={board.title+ "/" + board.id} index={index}>
            {(provided) => (
                <div {...provided.draggableProps} ref={provided.innerRef}>
                    <div className={classes.listTasks} {...provided.dragHandleProps}>
                        <Paper key={board.id} elevation={3} className={classes.boardCard}>
                            <BoardHeader board={board}/>
                            <Divider/>
                            <Droppable droppableId={board.title + "/" + board.id} type="task">
                                {(provided) => (
                                    <Grid
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={classes.listContainer}
                                    >
                                        {
                                            board.tasks.length > 0 ?
                                        <TaskList tasks={board.tasks} boardId={board.id}/>
                                                :
                                                <Typography variant='h6' style={{paddingLeft:"10px"}}>
                                                    Nothing in the List
                                                </Typography>
                                        }
                                        {provided.placeholder}
                                    </Grid>
                                )}
                            </Droppable>
                            <Divider className={classes.divider}/>
                            <BoardFooter id={board.id}/>
                        </Paper>

                    </div>
                </div>
            )}
        </Draggable>
    )
}