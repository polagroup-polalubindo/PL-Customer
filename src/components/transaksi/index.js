import React, { useContext, useEffect, useState } from "react";
import { Paper, Typography, Grid, Button } from "@material-ui/core";

import { useStyle } from "./styles";

import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { BottomNav } from "../bottomNav";
import { Context } from "../../context/globalState";
import { useHistory } from "react-router";
import ModalLacak from "./ModalLacak";
import Swal from 'sweetalert2';

const Transaksi = () => {
  const classes = useStyle();
  const history = useHistory();
  const {
    fetchTransaksiBeforePayment,
    fetchTransaksiAfterPayment,
    transaksiBeforePayment,
    transaksiAfterPayment,
    refCode,
    pesananSelesai,
  } = useContext(Context);

  const [transaksiType, setTransaksiType] = useState("Menunggu Pembayaran");
  const [openModalLacak, setOpenModalLacak] = useState(false)
  const allTransaksiType = [
    {
      value: "Menunggu Pembayaran",
      icon: <AccountBalanceWalletOutlinedIcon fontSize="large" />,
    },
    {
      value: "Transaksi Berlangsung",
      icon: <AutorenewIcon fontSize="large" />,
    },
  ];

  const handleKonfirmasi = async (data) => {
    let transaksiData = {
      totalHarga: data.totalHarga,
      ongkosKirim: data.ongkosKirim,
      namaPenerima: data.namaPenerima,
      alamatPengiriman: data.alamatPengiriman,
      statusPembayaran: data.statusPembayaran,
      createdAt: data.createdAt,
      expiredAt: data.expiredAt
    };
    localStorage.setItem("transaksi", JSON.stringify(transaksiData));
    localStorage.setItem("transaksi id", data.id);
    history.push(
      refCode
        ? `/konfirmasi-pembayaran?ref=${refCode}`
        : `/konfirmasi-pembayaran`
    );
  };

  const handlePesananSampai = async (data) => {
    Swal.fire({
      title: 'Apa pesanan anda sudah sampai?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iya',
      cancelButtonText: 'Tidak'
    }).then(async (result) => {
      if (result.isConfirmed) {
        data.statusPengiriman = "pesanan selesai";
        data.statusPesanan = "pesanan selesai";
        const response = await pesananSelesai(data);
        if (response.message) {
          fetchTransaksiAfterPayment();
        }
      }
    })


  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      fetchTransaksiBeforePayment();
      fetchTransaksiAfterPayment();
    }
  }, []);

  return (
    <>
      <div className={classes.transaksiPage}>
        <Typography variant="h5" gutterBottom>
          Daftar Transaksi
        </Typography>

        <Grid container alignItems="center">
          {allTransaksiType.map((option) => (
            <Grid
              item
              xs={6}
              key={option.value}
              onClick={() => setTransaksiType(option.value)}
              className={
                transaksiType === option.value ? classes.optColor : null
              }
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {option.icon}
              {option.value}
            </Grid>
          ))}
        </Grid>

        {transaksiType === "Menunggu Pembayaran" ? (
          <>
            {transaksiBeforePayment.map((item) => (
              <>
                <Paper className={classes.paper}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={2} style={{ textAlign: "right" }}>
                      <LocalMallIcon />
                    </Grid>
                    <Grid item xs={10}>
                      <b>Belanja</b>
                      {
                        item.referralCode && <Grid style={{ backgroundColor: '#aaff7f', padding: 1, borderRadius: 3, width: 75, textAlign: 'center', marginTop: 3 }}>
                          <p style={{ color: 'green', margin: 0, fontSize: 12 }}>{item.referralCode}</p>
                        </Grid>
                      }
                      <p style={{ margin: 0, marginTop: 3, color: 'gray', fontSize: 13 }}>{item.createdAt.split("T")[0]}</p>
                    </Grid>
                  </Grid>

                  <hr />

                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={3}>
                      <img
                        src={item.Carts[0].Produk && item.Carts[0].Produk.fotoProduk}
                        alt={item.Carts[0].Produk && item.Carts[0].Produk.namaProduk}
                        width="50"
                        height="50"
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body2">
                        <b> {item.Carts[0].Produk && item.Carts[0].Produk.namaProduk}</b>
                        <br />
                        {item.Carts.length} barang
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2">
                        konfirmasi sebelum <br />
                        {item.expiredAt && item.expiredAt.split("T")[0]}-
                        {item.expiredAt && item.expiredAt.split("T")[1].split(".")[0]}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {item.Carts.length > 1 ? (
                          <>{item.Carts.length} barang lainnya <br /> </>
                        ) : null}
                        Total belanja
                        <br />
                        Rp. {item.totalHarga}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          fontSize: "0.7rem",
                        }}
                        onClick={() => handleKonfirmasi(item)}
                      >
                        Konfirmasi Pembayaran
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
                <br />
              </>
            ))}
          </>
        ) : (
          <>
            {transaksiAfterPayment &&
              transaksiAfterPayment.map((item) => (
                <Paper className={classes.paper}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={2} style={{ textAlign: "right" }}>
                      <LocalMallIcon />
                    </Grid>
                    <Grid item xs={4}>
                      <b>Belanja</b>
                      {
                        item.referralCode && <Grid style={{ backgroundColor: '#aaff7f', padding: 1, borderRadius: 3, width: 75, textAlign: 'center', marginTop: 3 }}>
                          <p style={{ color: 'green', margin: 0, fontSize: 12 }}>{item.referralCode}</p>
                        </Grid>
                      }
                      <p style={{ margin: 0, marginTop: 3, color: 'gray', fontSize: 13 }}>{item.createdAt.split("T")[0]}</p>
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="contained"
                        disableElevation
                        style={{
                          backgroundColor: "#ffbbbe",
                          color: "red",
                          fontSize: "0.7rem",
                        }}
                        onClick={() => item.statusPengiriman === "dalam pengiriman" ? setOpenModalLacak(true) : null}
                      >
                        {item.statusPengiriman}
                      </Button>
                    </Grid>
                  </Grid>

                  <hr />

                  <Grid container alignItems="center">
                    <Grid item xs={2}>
                      <img
                        src={item.Carts[0].Produk && item.Carts[0].Produk.fotoProduk}
                        alt={item.Carts[0].Produk && item.Carts[0].Produk.namaProduk}
                        width="50"
                        height="50"
                      />
                    </Grid>
                    <Grid item xs={item.statusPengiriman === "dalam pengiriman" ? 7 : 9} style={{ paddingLeft: 5 }}>
                      <Typography variant="body2">
                        <b> {item.Carts[0].Produk && item.Carts[0].Produk.namaProduk}</b>
                        <br />
                        {item.Carts[0].qty} barang
                      </Typography>
                    </Grid>
                    {
                      item.statusPengiriman === "dalam pengiriman" && <Grid item xs={3} style={{ textAlign: 'right' }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => setOpenModalLacak(true)}
                        >
                          Lacak
                        </Button>
                        {
                          openModalLacak && <ModalLacak open={openModalLacak} handleClose={() => setOpenModalLacak(false)} id={item.noResi} />
                        }
                      </Grid>
                    }
                  </Grid>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={5}>
                      <Typography variant="body2">
                        +{item.Carts.length} barang lainnya
                        <br />
                        Total belanja
                        <br />
                        Rp. {item.totalHarga}
                      </Typography>
                    </Grid>
                    <Grid item xs={7} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {item.statusPengiriman === "dalam pengiriman" ? (
                        <Button
                          style={{
                            backgroundColor: "green",
                            color: "white",
                            fontSize: "0.7rem",
                            marginLeft: "4rem",
                          }}
                          onClick={() => handlePesananSampai(item)}
                        >
                          Pesanan sudah sampai
                        </Button>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </Grid>
                </Paper>
              ))}

            <br />
          </>
        )}
      </div>
      <BottomNav />
    </>
  );
};

export default Transaksi;
