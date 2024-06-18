import { Alert, Snackbar } from "@mui/material";
import useAlert from "../../hooks/useAlert"
import Feed from "../Feed/Feed";

const Layout = () => {
  const {alert, setAlert} = useAlert();

  return (
    <div className="h-full w-full">
      <Feed />
      { alert && (
        <Snackbar
          open={alert !== null}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={() => setAlert(null)}
          children={
            <Alert 
              severity={alert?.severity} 
              icon={alert?.icon} 
              children={alert?.children} 
            />
          }
        />
      )}
    </div>
  )
}

export default Layout;