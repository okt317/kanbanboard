import React, {useState} from "react";
import {Card, CardContent, Grid, Typography, createTheme, Button, TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";
import clsx from 'clsx'
import {DeleteOutline} from "@mui/icons-material"
import {useStore} from "../useStore";

const theme = createTheme();
const useStyles = makeStyles(() => ({
    cardRoot: {
        margin: theme.spacing(2),
        marginBottom: 20,
    },
    details: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        paddingBottom: theme.spacing(2)
    },
    bottomBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    }
}));

export const Task = ({task, boardId, index}) => {
    const {mobxStore} = useStore();
    const [value, setValue] = useState()
    const classes = useStyles()

    const remove = () => {
        mobxStore.remove(boardId, index)
    }

    return (
        <Card
            className={clsx(classes.cardRoot)}
            variant="outlined"
        >
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Grid>
                        <Typography component="h5" variant="h6">
                            {task.title}
                        </Typography>

                    </Grid>
                    <Grid item xs={12} className={classes.bottomBox}>
                        <Typography variant='body2'>{task.start}</Typography>
                        <TextField type='date' value={task.start}/>
                        <Button onClick={remove}>
                            <DeleteOutline/>
                        </Button>
                    </Grid>
                </CardContent>
            </div>
        </Card>
    )
}