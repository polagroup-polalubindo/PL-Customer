import React, { useState, useContext } from "react";
import {
  Paper,
  Typography,
  TextField,
  InputBase,
  Button,
  Grid,
  MenuItem,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PersonIcon from "@material-ui/icons/Person";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import InfoIcon from "@material-ui/icons/Info";
import { useHistory } from "react-router-dom";
import { useStyle } from "./styles";
import { Context } from "../../context/globalState";
import Swal from "sweetalert2";

const KonfirmasiPembayaran = () => {
  const classes = useStyle();
  const history = useHistory();
  const { confirmPayment, refCode } = useContext(Context);
  const [tanggal, setTanggal] = useState("");
  const [namaRek, setNamaRek] = useState("");
  const [total, setTotal] = useState(0);
  const [keterangan, setKeterangan] = useState("");
  const [bankAsal, setBankAsal] = useState("Bank Asal");
  const [bankTujuan, setBankTujuan] = useState("Bank Tujuan");
  const transaksiData = JSON.parse(localStorage.getItem("transaksi"));
  const minDate = transaksiData ? transaksiData.createdAt.slice(0,10) : null;
  const maxDate = transaksiData ? transaksiData.expiredAt.slice(0,10) : null;

  const back = () => {
    history.push(refCode ? `/pembayaran?ref=${refCode}` : "/pembayaran");
  };

  const allBank = [
    {
      value: "BCA",
    },
    {
      value: "BNI",
    },
    {
      value: "Mandiri",
    },
    {
      value: "BRI",
    },
    {
      value: "Permata",
    },
    {
      value: "CIMB",
    },
    {
      value: "Bank Lainnya"
    }
  ];

  const BankPola = [
    {
      value: "BCA",
    },
    {
      value: "BNI",
    },
  ];

  const handleBankAsal = (event) => {
    setBankAsal(event.target.value);
  };

  const handleBankTujuan = (event) => {
    setBankTujuan(event.target.value);
  };

  const handleKonfirm = async () => {
    const yearNow = new Date().getFullYear();
    let monthNow = new Date().getMonth();
    if (monthNow < 10) {
      monthNow = `0${monthNow + 1}`;
    }
    const dateNow = new Date().getDate();

    if (
      tanggal === "" ||
      namaRek === "" ||
      bankAsal === "Bank Asal" ||
      bankTujuan === "Bank Tujuan"
    ) {
      Swal.fire({
        title: "data belum lengkap",
        icon: "error",
      });
    } else if (`${yearNow}-${monthNow}-${dateNow}` > tanggal) {
      console.log("masuk");
      Swal.fire({
        title: "tanggal pembayaran tidak sesuai",
        icon: "error",
      });
    } else {
      if (total != transaksiData.totalHarga) {
        Swal.fire({
          title: `nominal transfer tidak sesuai dengan nominal total harga`,
          icon: "error",
        });
      } else {
        transaksiData.statusPembayaran = "menunggu konfirmasi";
        transaksiData.statusPesanan = "menunggu konfirmasi";
        transaksiData.statusPengiriman = "menunggu konfirmasi";
        transaksiData.metodePembayaran = "transfer";
        transaksiData.namaRekening = namaRek;
        transaksiData.jumlahBayar = total;
        transaksiData.bankAsal = bankAsal;
        transaksiData.bankTujuan = bankTujuan;
        transaksiData.expiredAt = null;
        const response = await confirmPayment(
          transaksiData,
          localStorage.getItem("transaksi id"),
          localStorage.getItem("access_token"),
          refCode ? refCode : null
        );
        if (response.message === "Success")
          history.push(refCode ? `/?ref=${refCode}` : "/");
      }
    }
  };
  return (
    <div>
      <Paper className={classes.nav}>
        <div className={classes.left}>
          <Typography className={classes.leftContent}>
            <ArrowBackIcon style={{ cursor: "pointer" }} onClick={back} />
          </Typography>
          <Typography className={classes.leftContent}>
            Konfirmasi Pembayaran
          </Typography>
        </div>
      </Paper>

      <Paper className={classes.box} elevation={0}>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={2}>
            <DateRangeIcon htmlColor="#f5a505" />
          </Grid>
          <Grid item xs={10}>
            <TextField
              InputProps={{ inputProps: { min: minDate, max: maxDate } }}
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              type="date"
              helperText="Tanggal Pembayaran Transaksi"
            />
          </Grid>
          <Grid item xs={2}>
            <PersonIcon htmlColor="#f5a505" />
          </Grid>
          <Grid item xs={10}>
            <InputBase
              value={namaRek}
              onChange={(e) => setNamaRek(e.target.value)}
              placeholder="Nama di Rekening"
              className={classes.inputBase}
            />
          </Grid>
          <Grid item xs={2}>
            <AccountBalanceWalletIcon htmlColor="#f5a505" />
          </Grid>
          <Grid item xs={10}>
            <InputBase
              value={total}
              type="number"
              onChange={(e) => setTotal(e.target.value)}
              placeholder="Jumlah"
              className={classes.inputBase}
            />
          </Grid>
          <Grid item xs={2}>
            <AccountBalanceIcon htmlColor="#f5a505" />
          </Grid>
          <Grid item xs={10}>
            <TextField
              id="standard-select-currency"
              select
              value={bankAsal}
              onChange={handleBankAsal}
            >
              <MenuItem value="Bank Asal">Bank Asal</MenuItem>
              {allBank.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            &emsp;
            <TextField
              id="standard-select-currency"
              select
              value={bankTujuan}
              onChange={handleBankTujuan}
            >
              <MenuItem value="Bank Tujuan">Bank Tujuan</MenuItem>
              {BankPola.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={2}>
            <InfoIcon htmlColor="#f5a505" />
          </Grid>
          <Grid item xs={10}>
            <InputBase
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              placeholder="Keterangan"
              className={classes.inputBase}
            />
          </Grid>
        </Grid>
      </Paper>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Button onClick={handleKonfirm} className={classes.btn}>
          Konfirmasi
        </Button>
      </div>
    </div>
  );
};

export default KonfirmasiPembayaran;
