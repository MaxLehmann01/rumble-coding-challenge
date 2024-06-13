import { createContext } from "react";
import { tAlert } from "../types/tAlert"

type tAlertContext = {
  alert: tAlert | null,
  setAlert: (alert: tAlert | null) => void
}

const AlertContext = createContext<tAlertContext | undefined>(undefined);

export default AlertContext;