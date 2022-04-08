import {CssBaseline, Grid} from "@mui/material";
import {MainPage} from "./components/Main/MainPage";
import {Header} from "./components/NavBar/Header";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    flex: '1 1 auto',
    padding: '64px 15px 15px',
    width: '100%',
    height: '100vh',
    overflow: 'hidden'
  },
}));

function App() {
  const classes = useStyles()
  return (
      <Grid container>
        <CssBaseline />
        <Header />
        <main className={classes.content}>
          <MainPage />
        </main>
      </Grid>
  );
}

export default App;
