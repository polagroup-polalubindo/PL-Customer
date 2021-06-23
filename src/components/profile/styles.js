import { makeStyles } from "@material-ui/core";

export const useStyle = makeStyles((theme) => ({
  nav: {
    border: "none",
    boxShadow: "none",
    display: "flex",
    justifyContent: "space-between",
    margin: "-0.5rem -1rem",
    padding: "0.3rem 1.7rem",
    backgroundColor: "#f4e8e9",
  },
  left: {
    display: "flex",
    justifyContent: "space-around",
    color: "red",
    margin: "0.5rem 0 0 0",
  },
  leftContent: {
    margin: "0 0.3rem",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  box: {
    margin: "2.5rem 1rem 1rem 1rem",
    padding: "0.5rem",
    backgroundColor: "#f6f7fb",
  },
  innerBox: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: "0.5rem 0",
  },
  inputBase: {
    borderBottom: "1px black solid",
  },
  btn: {
    backgroundColor: "green",
    textAlign: "center",
    margin: "0.5rem 1rem 0 1rem",
    borderRadius: "8px",
    fontWeight: "bold",
    color: "#fff",
  },
  root: {
    flexGrow: 1,
    marginTop: "2rem",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  logoutBtn: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
  },
  profileBox: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "1rem 0.5rem",
    padding: "1rem",
    borderRadius: "10px",
    width: "100%",
  },
}));

export default useStyle;
