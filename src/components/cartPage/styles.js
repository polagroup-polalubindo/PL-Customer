import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  cartPage: {
    display: "flex",
    flexDirection: "column",
  },
  nav: {
    border: "none",
    boxShadow: "none",
    display: "flex",
    justifyContent: "space-between",

    padding: "0.3rem 1.7rem",
    backgroundColor: "#f4e8e9",
  },
  box1: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "1rem 1rem 0 1rem",
    padding: "1rem",
    borderRadius: "10px",
  },
  box2: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "0 1rem 1rem 1rem",
    padding: "0.5rem",
    borderRadius: "10px",
  },
  boxText: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "black",
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
  formBox: {
    margin: "0 0.3rem",
  },
  formText: {
    fontSize: "0.5rem",
    color: "grey",
    margin: "0.4rem 0 0.2rem 0rem",
  },
  form: {
    padding: "0.1rem 0.5rem",
    display: "flex",
    alignItems: "center",

    border: "1px solid grey",
    justifyContent: "space-between",
    boxShadow: "none",
    borderRadius: "10px",
  },
  innerBox: {
    backgroundColor: "#f4e8e9",
    margin: "0 0.2rem",
    padding: "0.5rem",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  innerBoxText: {
    fontSize: "0.7rem",
    fontWeight: "bold",
  },
  box: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "green",
    textAlign: "center",
    margin: "0.5rem 1rem 0 1rem",
    borderRadius: "8px",
    fontWeight: "bold",
    color: "#fff",
  },
  select: {
    textDecoration: "none",
    padding: "0.6rem",
    textAlign: "left",
    backgroundColor: "#f4e8e9",
    borderRadius: "8px",
    border: "none",
  },
  option: {
    marginLeft: "0.3rem",
    marginTop: "0.2rem",
  },
});