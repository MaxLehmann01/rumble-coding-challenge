import { CssBaseline, ThemeProvider } from "@mui/material";
import Feed from "./components/Feed/Feed";
import Theme from "./themes/Theme";
import AlertProvider from "./providers/AlertProvider";

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <AlertProvider>
        <Feed />
      </AlertProvider>
    </ThemeProvider>
  )
}

export default App
