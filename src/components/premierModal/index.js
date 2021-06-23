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
  Backdrop
} from "@material-ui/core";
import { useStyles } from "./styles";
import { Context } from "../../context/globalState";
import { useHistory } from "react-router-dom";

import logo from "./logo.png";
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
  });
  const [Error, setError] = useState({
    ktpError: false,
    npwpError: false
  })

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
    if (!checked) {
      setNotCheckedText("checklist menyetujui s&k untuk lanjut");
    } else {
      const response = await addKtpAndNPWP(input);
      if (response.message) {
        handleClose();
        setInput({ ...input, noKtp: "", noNPWP: "" });
      } else {
        let newError = {
          ktpError: response.errors.find(el => el.message.match('KTP')) ? true : false,
          npwpError: response.errors.find(el => el.message.match('NPWP')) ? true : false,
        }
        setError(newError)
      }
    }
  };

  return (
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
          <Grid xs={12} style={{ margin: "-3rem 0" }}>
            <img src={logo} width="280px" />
          </Grid>
          <Grid xs={12} style={{ textAlign: 'left' }}>
            <ol>
              <li>
                Akun pelanggan dapat diupgrade menjadi premier dengan melakukan
                minimum total transaksi sejumlah Rp.100.000,-
            </li>
              <li style={{ padding: "0.5rem 0" }}>
                Pendaftaran untuk menjadi pelanggan premier akan otomatis muncul
                di halaman utama setelah menyelesaikan minimum total transaksi.
            </li>
              <li>
                Pelanggan diwajibkan untuk mengisi data diri dan nomor npwp pada
                bagian pendaftaran.
            </li>
              <li style={{ padding: "0.5rem 0" }}>
                Customer service kami akan menghubungi via Whatsapp untuk
                melakukan verifikasi data diri.
            </li>
              <li>
                Jika data sudah sesuai maka akun akan langsung menjadi pelanggan
                premier dan dapat menggunakan kode referall.
            </li>
              <li style={{ padding: "0.5rem 0" }}>
                Jika ditemukan adanya ketidaksesuaian data maka pihak customer
                service akan melakukan konfirmasi ulang.
            </li>
              <li>
                Pihak perusahaan berhak untuk menolak pengajuan premier apabila
                data yang diberikan tidak sesuai dan atau tidak benar.
            </li>
            </ol>
          </Grid>
          <Grid xs={12}>
            <b>Upgrade Premier</b>
          </Grid>
          <Grid xs={12} style={{ margin: "0.5rem 0" }}>
            Dapatkan Komisi dengan bagi link
        </Grid>
          <Grid xs={12}>
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
              Error.ktpError && <FormHelperText style={{ color: "red", textAlign: 'center' }}>No KTP sudah digunakan</FormHelperText>
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
              Error.npwpError && <FormHelperText style={{ color: "red", textAlign: 'center' }}>No NPWP sudah digunakan</FormHelperText>
            }
          </Grid>
          <Grid xs={12}>
            <span style={{ color: checked ? "black" : "red" }}>
              <Checkbox checked={checked} onChange={handleChecked} /> Menyetujui
            S&K
          </span>
            <br />
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
  );
};

export default PremierModal;
