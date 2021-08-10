import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  box: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "2.5rem 0 0",
    borderRadius: "35px",
    width: "80%",
    textAlign: "center",
    alignItems: "center",
    background: "#f6f7fb",
    padding: '1rem'
  },
  content: {
    margin: "1rem 1rem 0 1rem",
  },
});
