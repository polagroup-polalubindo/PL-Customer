import React, { useContext, useState } from "react";
import {
  Modal,
  Grid,
  InputBase,
  Checkbox,
  Button,
  Paper,
  FormHelperText,
  Fade,
  Backdrop,
  Select,
  MenuItem
} from "@material-ui/core";
import { useStyles } from "./styles";
import { Context } from "../../context/globalState";
import { useHistory, Link } from "react-router-dom";
import ModalSK from '../SKPremierModal';

import Swal from "sweetalert2";

const PremierModal = ({ visible, handleClose }) => {
  const classes = useStyles();
  const history = useHistory();
  const { addKtpAndNPWP } = useContext(Context);
  const [checked, setChecked] = useState(false);
  const [notChecedText, setNotCheckedText] = useState("");
  const [input, setInput] = useState({
    noKtp: "",
    noNPWP: "",
    namaRekening: "",
    noRekening: "",
    bank: ""
  });
  const [Error, setError] = useState({
    ktpError: false,
    npwpError: false,
    namaRekeningError: false,
    noRekeningError: false,
    bankError: false
  })
  const [OpenSKModal, setOpenSKModal] = useState(false)
  const bankList = ['BNI', 'BCA']

  const handleChecked = () => {
    setChecked(!checked);
    setNotCheckedText("");
  };

  const handleChange = (e) => {
    let newValue = "" + e.target.value
    if (e.target.name === 'noKtp') newValue = newValue.slice(0, 16)
    else newValue = newValue = newValue.slice(0, 15)
    setInput({ ...input, [e.target.name]: newValue });
  };

  const handleSubmit = async () => {
    if (await validateForm()) {
      const response = await addKtpAndNPWP(input);
      if (response.message) {
        handleClose();
        setInput({ ...input, noKtp: "", noNPWP: "" });
      } else {
        let newError = {
          ktpErrorDuplicate: response.errors.find(el => el.message.match('KTP')) ? true : false,
          npwpErrorDuplicate: response.errors.find(el => el.message.match('NPWP')) ? true : false,
        }
        setError(newError)
      }
    }
  };

  const validateForm = () => {
    let valid = true, error = {}

    if (!input.noKtp || isNaN(input.noKtp) || input.noKtp.length !== 16 || +input.noKtp < 0) {
      console.log(!input.noKtp)
      console.log(isNaN(input.noKtp))
      console.log(input.noKtp.length !== 16)
      console.log(+input.noKtp < 0, +input.noKtp)
      console.log("<>>>")
      valid = false
      error.ktpError = true
    }
    else error.ktpError = false

    if (!input.noNPWP || isNaN(input.noNPWP) || input.noNPWP.length !== 15 || +input.noNPWP < 0) {
      valid = false
      error.npwpError = true
    }
    else error.npwpError = false

    if (!input.namaRekening) {
      valid = false
      error.nameError = true
    }
    else error.nameError = false

    if (!input.noRekening || isNaN(input.noRekening) || +input.noRekening < 0) {
      valid = false
      error.noRekeningError = true
    }
    else error.noRekeningError = false

    if (!input.bank) {
      valid = false
      error.bankError = true
    }
    else error.bankError = false

    if (!checked) setNotCheckedText("checklist menyetujui s&k untuk lanjut");

    setError(error)

    return valid
  }

  return (
    <>
      <Modal
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none'
        }}
        open={visible}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={visible} >
          <Grid container className={classes.root}>
            <Grid xs={12}>
              <b style={{ fontSize: 20 }}>Upgrade Premier</b>
            </Grid>
            <Grid xs={12} style={{ margin: "0.5rem 0" }}>
              Dapatkan Komisi dengan bagi link
            </Grid>

            <Grid xs={12} style={{ margin: "0.5rem 0" }}>
              <InputBase
                name="noKtp"
                type="number"
                value={input.noKtp}
                className={classes.input}
                placeholder="KTP"
                onChange={handleChange}
                style={{ border: Error.ktpError ? "1px solid red" : "1px solid black" }}
              />
              {
                Error.ktpErrorDuplicate && <FormHelperText style={{ color: "red", textAlign: 'center' }}>No KTP sudah digunakan</FormHelperText>
              }
            </Grid>
            <Grid xs={12} style={{ margin: "0.5rem 0" }}>
              <InputBase
                name="noNPWP"
                type="number"
                value={input.noNPWP}
                className={classes.input}
                placeholder="NPWP"
                onChange={handleChange}
                style={{ border: Error.npwpError ? "1px solid red" : "1px solid black" }}
              />
              {
                Error.npwpErrorDuplicate && <FormHelperText style={{ color: "red", textAlign: 'center' }}>No NPWP sudah digunakan</FormHelperText>
              }
            </Grid>
            <Grid xs={12} style={{ margin: "0.5rem 0" }}>
              <InputBase
                name="namaRekening"
                value={input.namaRekening}
                className={classes.input}
                placeholder="Nama di Rekening"
                onChange={handleChange}
                style={{ border: Error.nameError ? "1px solid red" : "1px solid black" }}
              />
            </Grid>
            <Grid xs={12} style={{ margin: "0.5rem 0" }}>
              <InputBase
                name="noRekening"
                type="Number"
                value={input.noRekening}
                className={classes.input}
                placeholder="Nomor Rekening"
                onChange={handleChange}
                style={{ border: Error.noRekeningError ? "1px solid red" : "1px solid black" }}
              />
            </Grid>
            <Grid xs={12} style={{ margin: "0.5rem 0" }}>
              <Select
                name="bank"
                value={input.bank}
                className={classes.input}
                placeholder="Bank"
                onChange={handleChange}
                style={{ border: Error.bankError ? "1px solid red" : "1px solid black", width:215 }}
              >
              <MenuItem value="BNI">BNI</MenuItem>
              <MenuItem value="BCA">BCA</MenuItem>
              </Select>
            </Grid>

            <Grid xs={12}>
              <span style={{ color: checked ? "black" : "red", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Checkbox checked={checked} onChange={handleChecked} style={{ margin: 0 }} /> saya menyetujui <u style={{ margin: 0, marginLeft: 3, cursor: 'pointer' }} onClick={() => setOpenSKModal(!OpenSKModal)}>S&K</u>
              </span>
              <span>{notChecedText.length > 0 ? notChecedText : ""}</span>
            </Grid>

            <Grid xs={12}>
              <Button className={classes.button} onClick={handleSubmit}>
                Simpan
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>

      <ModalSK
        visible={OpenSKModal}
        handleClose={() => setOpenSKModal(!OpenSKModal)}
      />
    </>
  );
};

export default PremierModal;
