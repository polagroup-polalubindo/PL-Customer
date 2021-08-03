import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    position:'relative'
  },
  produkTitle: {
    fontWeight: "bold",
    fontSize: "0.875rem",
    // marginBottom: "1rem",
    // height: "4.8rem",
  },
  beli: {
    backgroundColor: "red",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "0.7rem",
  },
  jml_komisi: {
    position: "absolute",
    top: 16,
    right: 12,
    width: 20,
    textAlign:'center'
  },
  logo_komisi: {
    position: "absolute",
    top: 0,
    right: -3,
  },
});
