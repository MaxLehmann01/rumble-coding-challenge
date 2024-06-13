import { useState } from "react"
import { tAlert } from "../types/tAlert"
import AlertContext from "../contexts/AlertContext"

type tAlertProvider = {
  children: React.ReactNode
}

const AlertProvider = ({ children }: tAlertProvider) => {
  const [ alert, setAlert ] = useState<tAlert | null>(null);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>{ children }</AlertContext.Provider>
  )
}

export default AlertProvider