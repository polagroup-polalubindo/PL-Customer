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
            <Button variant="outlined" onClick={handleClose}>
              Kembali
            </Button>
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  );
};

export default PremierModal;
