import React, {useState} from 'react';
import {Button, CardActionArea, CardContent, Grid, Typography} from "@mui/material";
import {AddCard} from '../AddCard/AddCard'
import {makeStyles} from "@mui/styles";
import {Add} from "@mui/icons-material";

const useStyles = makeStyles(() => ({
    boardButton: {
        width: "300px",
        justifyContent: 'center'
    }
}))

export const BoardFooter = ({id}) => {
    const classes = useStyles();
    const [showInput, setShowInput] = useState(false)

    const openAddCard = () => {
        setShowInput(true)
    }
    const closeInput = () => {
        setShowInput(false)
    }

    return (
        <Grid className={classes.boardButton}>
            {showInput ?
                <AddCard handleClose={closeInput} id={id}/>
                :
                <CardActionArea>
                    <CardContent onClick={openAddCard}>
                        <Typography component='span' variant='h6' style={{paddingLeft: '45%'}}>
                            <Add/>
                        </Typography>
                    </CardContent>
                </CardActionArea>}
        </Grid>
    )

}