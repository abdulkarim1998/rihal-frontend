import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ModeToggle from "./ModeToggle";
import TabsMenu from "./TabsMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    borderRadius: "0",
    boxShadow: "none",
    transition: "all 0.5s ease",
  },

  paper: {
    margin: "5px",
  },
}));

function Main({ mode, setMode }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <header style={{ display: "flex", flexDirection: "row-reverse" }}>
        <div>
          <ModeToggle mode={mode} setMode={setMode} />
        </div>
      </header>
      <TabsMenu />
    </Paper>
  );
}

export default Main;
