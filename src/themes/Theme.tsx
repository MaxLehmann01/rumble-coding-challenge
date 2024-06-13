import { createTheme } from "@mui/material";
import Typography from "./Typography";
import Palette from "./Palette";

const palette = Palette();
const typography = Typography('Poppins, "Helvetica Neue", sans-serif');

const Theme = createTheme({
  palette,
  typography
})

export default Theme;