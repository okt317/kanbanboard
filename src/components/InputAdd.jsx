import React, {useState} from "react";
import {Button, createTheme, IconButton, InputAdornment, TextField} from "@mui/material";
import {Close} from '@mui/icons-material'
import {makeStyles} from "@mui/styles";
import {useStore} from "../useStore";

const theme = createTheme();

const useStyles = makeStyles(() => ({
    inputAddCard: {
        marginBottom: theme.spacing(1)
    }
}))

export const InputAdd = ({handleClose, id}) => {
const {mobxStore} = useStore();
    const [text, setText] = useState(null);
    const classes = useStyles()
    const addList = () => {
        console.log('list')
        mobxStore.addList(text)
    }
    const addBoard = () => {
        console.log('board')
        mobxStore.addTask(id, text)
        console.log(id, text)
    }
    return (
        <div>
            <TextField
                label='New title'
                variant='outlined'
                fullWidth
                className={classes.inputAddCard}
                onChange={(event)=> setText(event.target.value)}
                // onBlur={() => handleClose(false)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => handleClose(false)}>
                                <Close/>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button color="primary" onClick={id === 'new'? addList : addBoard}>Add</Button>
            <Button color="error" onClick={() => handleClose(false)}>Cancel</Button>
        </div>
    )
}
