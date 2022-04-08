import React, {useState} from "react";
import {Button, createTheme, Grid, Input, TextField, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {MoreVert} from "@mui/icons-material";
import {useStore} from "../useStore";

const theme = createTheme();
const useStyles = makeStyles(() => ({
    boardHeader: {
        padding: theme.spacing(2)
    },
    boardTitle: {
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        flexGrow: '1',
    }
}));
export const BoardHeader = ({board}) => {
    const {mobxStore} = useStore();
    const [updateOpen, setUpdateOpen] = useState(true)
    const [newTitle, setNewTitle] = useState(board.title)
    const classes = useStyles()
    const remove = () => {
        mobxStore.remove(board.id)
    }
    const updateTitle = () => {
        if (newTitle.length > 0 && newTitle.length < 31) {

            mobxStore.updateTitle(newTitle, board.id)
            setUpdateOpen(!updateOpen)
        } else {

        }
    }

    const updateCancel = () => {
        setNewTitle(board.title)
        setUpdateOpen(!updateOpen)
    }
    return (

        <Grid container className={classes.boardHeader}>
            {
                updateOpen ?
                    (
                        <Grid onClick={() => setUpdateOpen(!updateOpen)} className={classes.boardTitle}>
                            <Typography component='h5' variant='h5'>{board.title}</Typography>
                            <Button onClick={remove}>
                                <MoreVert/>
                            </Button>
                        </Grid>
                    )
                    :
                    (
                        <>
                            <TextField
                                value={newTitle}
                                type="text"
                                onChange={(e) => {
                                    setNewTitle(e.target.value)
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        updateTitle();
                                    }
                                }}
                            />
                            <Grid>

                            <Button onClick={updateTitle}>ok</Button>
                            <Button color="error" onClick={updateCancel}>Cancel</Button>
                            </Grid>
                        </>
                    )
            }

        </Grid>
    )
}