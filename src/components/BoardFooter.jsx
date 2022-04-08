import React, { useState } from 'react';
import {Button, CardActionArea, CardContent, createTheme, Grid, Typography} from "@mui/material";
import { InputAdd } from './InputAdd'
import {makeStyles} from "@mui/styles";
import {Add} from "@mui/icons-material";


const theme = createTheme();
const useStyles = makeStyles(() => ({
    boardButton: {
        width:"300px",
        padding: theme.spacing(2),
        justifyContent: 'center'
    }
}))

export const BoardFooter = ({id}) => {
    const classes = useStyles();
    const [showInput, setShowInput] = useState(false)

    const handleAddCard = () => {
        setShowInput(true)
    }
    const handleCloseInput = () => {
        setShowInput(false)
    }

    return (
        <Grid className={classes.boardButton} >
            {showInput ?
                <form>
                    <InputAdd handleClose={handleCloseInput} id={id}/>
                </form>
                :
                <CardActionArea>
                    <CardContent onClick={handleAddCard}>
                        <Typography component='span' variant='h6' style={{paddingLeft:'45%'}}>
                            <Add/>
                        </Typography>
                    </CardContent>
                </CardActionArea>}
        </Grid>
    )

}