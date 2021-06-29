import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    boxShadow: "0 0 10px rgb(0 0 0 / 12%)",
    zIndex: 100,
    maxWidth: "500px",
  },
  carts: {
    width: "90%",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    bottom:55,
    position:"fixed",
    maxWidth: "468px",
    padding: "0.5rem 1rem"
  },
  btn: {
    backgroundColor: "green",
    color: "#fff",
    padding: "0 1rem",
  },
});
