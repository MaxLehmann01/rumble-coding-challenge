import { CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./components/Layout/Layout";
import AlertProvider from "./providers/AlertProvider";
import Theme from "./themes/Theme";

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <AlertProvider>
        <Layout />
      </AlertProvider>
    </ThemeProvider>
  )
}

export default App
