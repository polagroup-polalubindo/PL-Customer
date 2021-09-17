import React, { useContext, useState, useEffect } from "react";
import { useStyles } from "./styles";
import {
  Paper,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Grid
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useHistory } from "react-router";
import { Context } from "../../context/globalState";
import Swal from "sweetalert2";
import { BottomNav } from '../bottomNav';
import moment from 'moment';

const ClaimWarranty = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const {
    dataProvince,
    dataCity,
    dataDistrict,
    refCode,
    updateAlamat,
    userData,
    address,
    getProvince,
    getCity,
    getDistrict,
    setAlamat,
    claimWarranty
  } = useContext(Context);
  const [noMachine, setNoMachine] = useState('')
  const [claimDate, setClaimDate] = useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}`)
  const [claim, setClaim] = useState('')
  const [issue, setIssue] = useState('')

  useEffect(() => {
    if (history.location?.state.data) {
      setNoMachine(history.location?.state.data.noMachine)
    }
  }, [])

  async function onSubmit(e) {
    e.preventDefault();
    if (!claim || !issue) {
      Swal.fire({
        title: "data belum lengkap",
        icon: "error",
      });
    } else {
      let submit = await claimWarranty({
        noMachine,
        claimDate,
        claim,
        issue,
      }, history.location?.state.data.id)

      if (submit?.message !== "error") {
        history.push(!refCode ? "/warranty" : `/warranty?ref=${refCode}`);
      }
    }
  }

  return (
    <div
    >
      <Paper className={classes.nav}>
        <div className={classes.left}>
          <Typography className={classes.leftContent}>
            <ArrowBackIcon
              style={{ cursor: "pointer" }}
              onClick={() =>
                history.push(refCode ? `/warranty?=ref=${refCode}` : "/warranty")
              }
            />
          </Typography>
          <Typography className={classes.leftContent}>
            Claim Warranty
          </Typography>
        </div>
      </Paper>
      <Grid style={{}}>
      </Grid>
      <Paper className={classes.box1} elevation={3} style={{ padding: 10 }}>
        <div>
          <Typography className={classes.formText}>
            Nomor Mesin
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            style={{ width: '100%' }}
            name="noMachine"
            value={noMachine}
            onChange={(e) => setNoMachine(e.target.value)}
            disabled
          />
        </div>

        <div>
          <Typography className={classes.formText}>
            Tanggal claim
          </Typography>
          <TextField
            type="date"
            variant="outlined"
            size="small"
            style={{ width: '100%' }}
            name="claimDate"
            value={claimDate}
            onChange={(e) => setClaimDate(e.target.value)}
            disabled
          />
        </div>

        <div>
          <Typography className={classes.formText}>
            claim
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            style={{ width: '100%' }}
            name="claim"
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
          />
        </div>

        <div>
          <Typography className={classes.formText}>
            Kendala
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            style={{ width: '100%' }}
            name="issue"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            multiline
            rows={5}
          />
        </div>

      </Paper>
      <Button className={classes.btn} onClick={onSubmit} fullWidth>
        Klaim
      </Button>
    </div>
  );
};

export default ClaimWarranty;
