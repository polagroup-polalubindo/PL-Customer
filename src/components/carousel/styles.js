import { makeStyles } from "@material-ui/core";
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles({
  img: {
    width: "95%",
    height: isMobile ? "190px" : "232px",
    borderRadius: "10px",
  },
});

export default useStyles;
