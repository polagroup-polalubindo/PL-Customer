import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useHistory } from "react-router";
import useStyles from "./styles";
import { useContext } from "react";
import { Context } from "../../context/globalState";

export default function CenteredGrid() {
  const classes = useStyles();
  const { fetchTransaksiKomisi, transaksiKomisi, refCode } =
    useContext(Context);
  const history = useHistory();
  const back = () => {
    history.push(refCode ? `/profile?ref=${refCode}` : "/profile");
  };

  useEffect(() => {
    fetchTransaksiKomisi();
  }, []);
  return (
    <>
      <Paper className={classes.nav}>
        <div className={classes.left}>
          <Typography className={classes.leftContent}>
            <ArrowBack style={{ cursor: "pointer" }} onClick={back} />
          </Typography>
          <Typography className={classes.leftContent}>
            Riwayat Transaksi
          </Typography>
        </div>
      </Paper>

      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {transaksiKomisi &&
              transaksiKomisi.map((transaksi) =>
                transaksi.komisiId === null ? (
                  <Typography variant="subtitle2">
                    <b>Pencairan Komisi</b>
                    <br />
                    {transaksi.createdAt}
                    <p style={{ color: "red", fontSize: "20px" }}>
                      - Rp.{" "}
                      {Number(transaksi.nominal).toLocaleString("id-ID")}
                    </p>
                    {transaksi?.User.bank} - {transaksi?.User.noRekening}
                    <hr />
                  </Typography>
                ) : (
                  <Typography variant="subtitle2">
                    <b>Komisi</b>
                    <br />
                    {transaksi.createdAt}
                    <p style={{ color: "green", fontSize: "20px" }}>
                      + Rp.{" "}
                      {new Number(transaksi.nominal).toLocaleString("id-ID")}
                    </p>
                    Transaksi penjualan {transaksi?.User?.nama}
                    <hr />
                  </Typography>
                )
              )}
            {/* <Typography variant="subtitle2">
              <b>Komisi</b>
              <br />
              21 Mar 2021 11:40 WIB
              <p style={{ color: "green", fontSize: "20px" }}>+ Rp. 27.000</p>
              Transaksi penjualan Irene, Inv/20232/123/2222
              <hr />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">
              <b>Pencairan Komisi</b>
              <br />
              20 Mar 2021 11:40 WIB
              <p style={{ color: "red", fontSize: "20px" }}>+ Rp. 27.000</p>
              BCA 1123232 - Erwin
              <hr />
            </Typography> */}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
