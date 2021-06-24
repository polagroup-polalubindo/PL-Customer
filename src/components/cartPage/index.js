import React, { useContext, useState, useEffect } from "react";
import {
  Paper,
  Typography,
  InputBase,
  Checkbox,
  Button,
  CircularProgress,
  Grid,
  FormControlLabel,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useStyles } from "./styles";
import { useHistory } from "react-router";
import CartItem from "../cartItem";
import { Context } from "../../context/globalState";
import Swal from "sweetalert2";

const CartPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    carts,
    address,
    addAddress,
    getOngkir,
    services,
    totalPrice,
    fetchProduct,
    checkoutCart,
    ongkosKirim,
    setOngkir,
    refCode,
    resetServices,
    resetAddress,
    informasiPembeli,
    setInformasiPembeli,
    fetchCarts,
  } = useContext(Context);
  const [check, setCheck] = useState(true);
  const [courierPicked, setCourierPicked] = useState("");
  const [servicePicked, setServicePicked] = useState("");
  const [checked, setCheked] = useState(ongkosKirim);
  function back() {
    history.push(!refCode ? "/" : `/?ref=${refCode}`);
    resetServices();
    setInformasiPembeli({ nama: "", email: "", phone: "" });
    addAddress("");
  }

  const handleInput = (e) => {
    setInformasiPembeli({
      ...informasiPembeli,
      [e.target.name]: e.target.value,
    });
  };

  const handleGantiAlamat = () => {
    history.push(!refCode ? "/shipping" : `/shipping?ref=${refCode}`);
    resetServices();
  };

  const selected = (e) => {
    setCourierPicked(e.target.value);
    getOngkir({
      destination: address.kabupaten,
      courier: e.target.value,
      weight: 1000,
    });
  };

  const handleChecked = (kurir) => {
    setCheked(kurir.cost[0].value);
    setOngkir(kurir.cost[0].value);
    setServicePicked(kurir.service);
  };

  const checkout = async () => {
    const chekedItem = carts.filter((item) => item.checked);
    if (
      informasiPembeli.nama === "" ||
      informasiPembeli.phone === "" ||
      informasiPembeli.email === ""
    ) {
      Swal.fire({
        title: "Informasi Pembeli belum lengkap",
        icon: "error",
      });
    } else if (
      informasiPembeli.phone.length < 10 ||
      informasiPembeli.phone.length > 13
    ) {
      Swal.fire({
        title: "nomor hp minimum 10 digit dan maksimum 13 digit",
        icon: "error",
      });
    } else if (courierPicked === "" || servicePicked === "") {
      Swal.fire({
        title: "Pilih Kurir untuk pengiriman",
        icon: "error",
      });
    } else if (chekedItem.length === 0) {
      Swal.fire({
        title: "Tidak ada barang di cart",
        icon: "error",
      });
    } else {
      let created = new Date(
        Date.UTC(
          2021,
          new Date().getMonth(),
          new Date().getDate(),
          new Date().getHours(),
          new Date().getMinutes(),
          new Date().getSeconds()
        )
      );
      let newDate = new Date(
        Date.UTC(
          2021,
          new Date().getMonth(),
          new Date().getDate() + 1,
          new Date().getHours(),
          new Date().getMinutes(),
          new Date().getSeconds()
        )
      );

      let data = {
        userData: informasiPembeli,
        transaksiData: {
          invoice: `INV/${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}/${new Date().getMinutes()}${new Date().getSeconds()}`,
          totalHarga: totalPrice + ongkosKirim,
          ongkosKirim: ongkosKirim,
          kurir: courierPicked,
          serviceKurir: servicePicked,
          namaPenerima: informasiPembeli.nama,
          alamatPengiriman: `${address?.jalan},${address?.kecamatan},${address?.kabupaten},
          ${address?.detail}`,
          telfonPenerima: informasiPembeli.phone,
          statusPesanan: "menunggu pembayaran",
          statusPembayaran: "menunggu pembayaran",
          statusPengiriman: "menunggu pembayaran",
          expiredAt: newDate,
          createdAt: created,
          referralCode: refCode ? refCode : null,
        },
        value: [],
      };
      if (localStorage.getItem("access_token")) {
        data.access_token = localStorage.getItem("access_token");
      }

      chekedItem.map((item) => {
        item.product.stock -= item.qty;
        data.value.push({
          produk: item.product,
          ProdukId: item.product.id,
          qty: item.qty,
        });
      });
      localStorage.setItem("transaksi", JSON.stringify(data.transaksiData));
      localStorage.setItem("carts", "[]")
      fetchCarts()
      setCourierPicked("");
      setCheked(ongkosKirim);
      const response = await checkoutCart(data);
      if (response.message === "Success") {
        history.push(!refCode ? "/pembayaran" : `/pembayaran?ref=${refCode}`);
        setInformasiPembeli({ nama: "", email: "", phone: "" });
      } else if (response.message === "go to login page") {
        history.push(!refCode ? "/login" : `/login?ref=${refCode}`);
        resetServices();
        resetAddress();
      }
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <Paper className={classes.nav}>
        <div className={classes.left}>
          <Typography className={classes.leftContent}>
            <ArrowBackIcon style={{ cursor: "pointer" }} onClick={back} />
          </Typography>
          <Typography className={classes.leftContent}>
            Keranjang Belanja
          </Typography>
        </div>
      </Paper>
      <Paper className={classes.box1} elevation={3}>
        <Typography className={classes.boxText}>Informasi Pembeli</Typography>
        <div className={classes.formBox}>
          <Typography className={classes.formText}>Nama Lengkap</Typography>
          <InputBase
            className={classes.form}
            name="nama"
            value={informasiPembeli.nama}
            onChange={handleInput}
          />
        </div>
        <div className={classes.formBox}>
          <Typography className={classes.formText}>Email</Typography>
          <InputBase
            className={classes.form}
            name="email"
            value={informasiPembeli.email}
            onChange={handleInput}
          />
        </div>
        <div className={classes.formBox}>
          <Typography className={classes.formText}>
            Nomor HP (whatsapp)
          </Typography>
          <InputBase
            className={classes.form}
            type="number"
            name="phone"
            value={informasiPembeli.phone}
            onChange={handleInput}
          />
        </div>
        {address.kabupaten ? (
          <div>
            <Typography className={classes.formText}>
              Alamat Pengiriman
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                style={{ margin: "0.5rem 0 1rem 0.5rem" }}
                className={classes.innerBoxText}
              >
                {address.jalan},{address.kecamatan},{address.kabupaten},
                {address.detail}
              </Typography>
              <Button
                style={{
                  background: "#f4e8e9",
                  color: "red",
                  fontSize: "0.6rem",
                }}
                onClick={handleGantiAlamat}
              >
                Ubah Alamat Pengiriman
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Typography className={classes.formText}>
              Alamat Pengiriman
            </Typography>
            <Paper
              className={classes.innerBox}
              onClick={() =>
                history.push(
                  !refCode ? "/shipping" : `/shipping?ref=${refCode}`
                )
              }
            >
              <Typography className={classes.innerBoxText}>
                Tetapkan Alamat Pengiriman
              </Typography>
              <Typography className={classes.innerBoxText}>
                <ArrowForwardIcon />
              </Typography>
            </Paper>
          </>
        )}
      </Paper>
      <Paper className={classes.box2} elevation={3}>
        <Typography className={classes.boxText}>Pengiriman</Typography>
        <select
          className={classes.select}
          value={courierPicked}
          onChange={selected}
        >
          <option className={classes.option}>Pilih Kurir</option>
          <option className={classes.option}>tiki</option>
          <option className={classes.option}>jne</option>
        </select>
        <Grid container alignItems="center">
          {services === null && courierPicked !== "" && (
            <CircularProgress
              style={{ marginLeft: "40%", marginTop: "1rem" }}
            />
          )}
          {services &&
            services.map((service) => (
              <>
                <Grid item xs={9} key={service.service}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          checked === service.cost[0].value ? true : false
                        }
                        onChange={() => handleChecked(service)}
                        key={service.service}
                      />
                    }
                    label={
                      <>
                        {service.service} | {service.cost[0].etd} Day
                      </>
                    }
                  />
                </Grid>

                <Grid item xs={3}>
                  Rp. {service.cost[0].value}
                </Grid>
              </>
            ))}
        </Grid>
      </Paper>
      <Paper className={classes.box2} elevation={3}>
        <Typography className={classes.boxText}>Ringkasan Belanja</Typography>
        <div className={classes.box}>
          <Checkbox
            inputProps={{ "aria-label": "primary checkbox" }}
            onChange={() => setCheck(!check)}
          />
          <div>
            <Typography style={{ fontSize: 11, fontWeight: "bold" }}>
              Pilih Semua Produk
            </Typography>
          </div>
        </div>
        {carts.map((cart) => (
          <CartItem
            id={cart.product.id}
            nama={cart.product.namaProduk}
            weight={cart.product.weight}
            price={cart.product.hargaSatuan}
            qty={cart.qty}
            key={cart.product.id}
          />
        ))}
        <div
          style={{
            borderTop: "2px solid grey",
            margin: "0.3rem",
            display: "flex",
            justifyContent: "space-between",
            padding: "0.4rem",
          }}
        >
          <Typography style={{ fontSize: 10, fontWeight: "bold" }}>
            Total Belanja
          </Typography>
          <Typography style={{ fontSize: 10, fontWeight: "bold" }}>
            Rp {new Number(totalPrice).toLocaleString("id-ID")}
          </Typography>
        </div>
      </Paper>
      <Button className={classes.btn} onClick={checkout}>
        Bayar
      </Button>
    </>
  );
};

export default CartPage;
