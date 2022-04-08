import React, {useState} from "react";
import {Button, IconButton, InputAdornment, TextField, Grid} from "@mui/material";
import {Close} from '@mui/icons-material'
import {useStore} from "../../store/useStore";

export const AddCard = ({handleClose, id}) => {
    const {mobxStore} = useStore();
    const [text, setText] = useState('');
    const addList = () => {
        if (text.trim().length > 0) {
            mobxStore.addList(text)
            handleClose(false)
        }else {
            alert('최소 1자 이상')
        }
    }
    const addTask = () => {
        if (text.trim().length > 0) {
            mobxStore.addTask(id, text)
            handleClose(false)
        }else {
            alert('최소 1자 이상')
        }
    }
    return (
        <Grid>
            <TextField
                label='New title'
                variant='outlined'
                fullWidth
                onChange={(event) => setText(event.target.value)}
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
            <Button color="primary" onClick={id === 'new' ? addList : addTask}>Add</Button>
            <Button color="error" onClick={() => handleClose(false)}>Cancel</Button>
        </Grid>
    )
}
