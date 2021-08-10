import React, { useContext } from "react";
import { Button, Paper, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import { BottomNav } from "../bottomNav";
import bca from "../../assets/logo-bca.png";
import bni from "../../assets/logo-BNI.png";
import { useHistory } from "react-router";
import { Context } from "../../context/globalState";

const Pembayaran = () => {
  const classes = useStyles();
  const history = useHistory();
  const { totalPrice, ongkosKirim, refCode, resetLocal } = useContext(Context);
  let dataTransaksi = JSON.parse(localStorage.getItem("transaksi"));

  const handleBackToHome = () => {
    history.push(refCode ? `/?ref=${refCode}` : "/");
    localStorage.removeItem("transaksi");
    localStorage.removeItem("transaksi id");
    resetLocal();
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Paper className={classes.box} elevation={3}>
        <div>
          <Typography>Bank Pembayaran</Typography>
          <Typography style={{ fontSize: "0.8rem" }}>
            Pembayaran Hanya melalui rekening
          </Typography>
        </div>
        <div className={classes.content}>
          <img src={bca} alt="BCA" width="100px" />
          <Typography>Bank BCA, Jakarta</Typography>
          <Typography>1113017876</Typography>
          <Typography>PT. POLA LUBINDO</Typography>
        </div>
        <div className={classes.content}>
          <img src={bni} alt="BNI" width="100px" />
          <Typography>Bank BNI, Jakarta</Typography>
          <Typography>0208398743</Typography>
          <Typography>PT. POLA LUBINDO</Typography>
        </div>
        <div className={classes.content}>
          <Typography style={{ fontWeight: "bold" }}>Total Belanja</Typography>
          <Typography
            style={{ fontWeight: "bold", fontSize: "2rem", color: "#ff6701" }}
          >
            Rp. {new Number(totalPrice + ongkosKirim + dataTransaksi.insuranceFee).toLocaleString("id-ID")}
          </Typography>
          <Typography>Bayar Sebelum</Typography>
          <Typography>{dataTransaksi.expiredAt.split("T")[0]} - {dataTransaksi.expiredAt.split("T")[1].split(".")[0]}</Typography>
        </div>
      </Paper>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "2rem 0",
          flexDirection: "column",
          width:'80%'
        }}
      >
        <Button
          style={{
            background: "green",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "10px",
          }}
          onClick={() =>
            history.push(
              refCode
                ? `/konfirmasi-pembayaran?ref=${refCode}`
                : "/konfirmasi-pembayaran"
            )
          }
        >
          Konfirmasi Pembayaran
        </Button>
        <Button
          onClick={handleBackToHome}
          style={{
            border: "2px solid green",
            color: "green",
            fontWeight: "bold",
            margin: "1rem 0",
            borderRadius: "10px",
          }}
        >
          Kembali Ke Produk
        </Button>
      </div>
    </div>
  );
};

export default Pembayaran;
