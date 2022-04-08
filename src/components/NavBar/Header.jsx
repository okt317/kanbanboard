import {AppBar, Toolbar, Typography} from "@mui/material";

export const Header = () => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6">
                    Kanban board
                </Typography>
            </Toolbar>
        </AppBar>
    )
}