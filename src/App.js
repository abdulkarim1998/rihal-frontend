import Main from "./component/Main";
import "./App.css";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { useEffect, useState } from "react";

function App() {
  const [mode, setMode] = useState("light");

  const theme = createTheme({
    palette: {
      type: mode,
    },
  });

  useEffect(() => {
    if (localStorage.getItem("mode")) {
      setMode(localStorage.getItem("mode"));
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Main mode={mode} setMode={setMode} />
    </ThemeProvider>
  );
}

export default App;
