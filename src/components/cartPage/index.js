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
  Switch
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
    userData,
    register,
    login,
    updateAlamat,
    fetchUserData,
    setAlamat,
    dataDistrict,
    dataCity,
    dataProvince
  } = useContext(Context);
  const [check, setCheck] = useState(true);
  const [courierPicked, setCourierPicked] = useState('ID Express');
  const [servicePicked, setServicePicked] = useState("");
  const [codeService, setCodeService] = useState(null);
  const [insurance, setInsurance] = useState(false);
  const [insuranceFee, setInsuranceFee] = useState('');
  const [checked, setCheked] = useState(ongkosKirim);
  const [disableInsurance, setDisableInsurance] = useState(false);

  function back() {
    history.push(!refCode ? "/" : `/?ref=${refCode}`);
    resetServices();
    setInformasiPembeli({ nama: "", email: "", phone: "", pass: "", rePass: "" });
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

  const selected = (e) => { //PERLU ACTION DISINI
    setCourierPicked(e.target.value);
    getOngkir({
      destination: address.kabupaten,
      courier: e.target.value,
      weight: 1000,
    });
  };

  const handleChecked = (kurir) => {
    setCheked(kurir);
    setOngkir(kurir.cost);
    setServicePicked(kurir.type);
    setCodeService(kurir.code)
  };

  const checkout = async () => {
    try {
      const chekedItem = carts.filter((item) => item.checked);
      if (
        informasiPembeli.nama === "" ||
        informasiPembeli.phone === "" ||
        informasiPembeli.email === "" ||
        (!userData && informasiPembeli.pass === "" || informasiPembeli.rePass === "")
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

        if (!userData) {
          if (informasiPembeli.pass !== informasiPembeli.rePass) {

            throw 'Password dan konfimasi password tidak sama'
          } else {
            const response = await register({ email: informasiPembeli.email, phone: informasiPembeli.phone, nama: informasiPembeli.nama, password: informasiPembeli.pass });
            if (response.message === "Success") {
              await login({ email: informasiPembeli.email, password: informasiPembeli.pass })

              await updateAlamat({
                alamat: address.alamat,
                detail: address.detail,
                kelurahan: address.kelurahan,
                kecamatan: address.kecamatan,
                kota: address.kota,
                provinsi: address.provinsi,
                kodepos: address.kodepos,
                keterangan: address.keterangan
              });
            }
          }
        }


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

        let totalQuantity = 0, totalWeight = 0, itemName = ''
        chekedItem.map((item, index) => {
          totalQuantity += item.qty
          totalWeight = totalWeight + (+item.qty * +item.product.weight)
          itemName = `${index === 0 ? itemName : `${itemName},`} ${item.product.namaProduk}`
        });

        let data = {
          userData: informasiPembeli,
          transaksiData: {
            totalHarga: totalPrice + ongkosKirim + insuranceFee,
            ongkosKirim: ongkosKirim,
            kurir: courierPicked,
            serviceKurir: servicePicked,
            namaPenerima: informasiPembeli.nama,
            alamatPengiriman: `${address.alamat}, ${address.kelurahan}, ${address.District.name}, ${address.City.name}, ${address.Province.name} ${address.kodepos} (${address.detail})`,
            telfonPenerima: informasiPembeli.phone,
            statusPesanan: "menunggu pembayaran",
            statusPembayaran: "menunggu pembayaran",
            statusPengiriman: "menunggu pembayaran",
            expiredAt: newDate,
            createdAt: created,
            referralCode: refCode ? refCode : null,
            insurance,
            insuranceFee,
            recipientProvinceId: address.provinsiId,
            recipientCityId: address.kotaId,
            recipientDistrictId: address.kecamatanId,
            recipientAddress: `${address.alamat} [DETAIL: ${address.detail}], ${address.kelurahan}`,
            recipientZipCode: address.kodepos,
            itemQuantity: totalQuantity,
            weight: (totalWeight / 1000).toFixed(2),
            expressType: codeService,
            itemName
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
        // setCheked(services ? services.find(el=> ongkosKirim : null);
        const response = await checkoutCart(data);
        if (response.message === "Success") {
          history.push(!refCode ? "/pembayaran" : `/pembayaran?ref=${refCode}`);
          setInformasiPembeli({ nama: "", email: "", phone: "", pass: "", rePass: "" });
        } else if (response.message === "go to login page") {
          // history.push(!refCode ? "/login" : `/login?ref=${refCode}`);
          // resetServices();
          // resetAddress();
        }
      }
    } catch (err) {
      Swal.fire({
        title: err,
        icon: "error",
      });
    }
  };

  // 
  useEffect(() => {
    if (!userData && !informasiPembeli.nama && !address.alamat) {
      Swal.fire({
        title: 'Apa anda sudah punya akun?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Iya',
        cancelButtonText: 'Tidak'
      }).then((result) => {
        if (result.isConfirmed) {
          history.push(!refCode ? "/login" : `/login?ref=${refCode}`);
        }
      })
    } else {
      fetchProduct();
    }
  }, []);

  // 
  useEffect(() => {
    if (userData) {
      setInformasiPembeli({ nama: userData.nama || '', email: userData.email || '', phone: userData.phone || '' })
    }
  }, [userData])

  // 
  useEffect(() => {
    let countTotalWeight = 0, isInsuranceRequired = false
    carts.forEach(cart => {
      if (cart.product?.asuransiPengiriman === "Wajib") isInsuranceRequired = true
      countTotalWeight += ((cart.qty * cart.product.weight) / 1000)
    })
    if (address && address.kecamatanId) {
      let data = {
        senderCityId: 38,
        recipientDistrictId: address.kecamatanId,
        weight: countTotalWeight
      }
      getOngkir(data);
    }

    if (isInsuranceRequired) {
      setDisableInsurance(true)
      setInsurance(true)
    }
  }, [address, carts])

  useEffect(() => {
    if (insurance) {
      setInsuranceFee(Math.round(totalPrice * (0.2 / 100)))
    }
    else setInsuranceFee(0)
  }, [insurance, totalPrice]);

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
        <Typography style={{ fontSize: 10, color: 'gray', marginTop: -3 }}>(Jika data tidak sesuai harap diupdate di menu profil)</Typography>
        <div>
          <Typography className={classes.formText}>Nama Lengkap</Typography>
          <InputBase
            className={classes.form}
            name="nama"
            value={informasiPembeli.nama}
            onChange={handleInput}
            disabled={userData}
          />
        </div>
        <div>
          <Typography className={classes.formText}>Email</Typography>
          <InputBase
            className={classes.form}
            name="email"
            value={informasiPembeli.email}
            onChange={handleInput}
            disabled={userData}
          />
        </div>
        <div>
          <Typography className={classes.formText}>
            Nomor HP (whatsapp)
          </Typography>
          <InputBase
            className={classes.form}
            type="number"
            name="phone"
            value={informasiPembeli.phone}
            onChange={handleInput}
            disabled={userData}
          />
        </div>
        {
          !userData && <>
            <div>
              <Typography className={classes.formText}>
                Kata Sandi
              </Typography>
              <InputBase
                className={classes.form}
                type="password"
                name="pass"
                value={informasiPembeli.pass}
                onChange={handleInput}
                disabled={userData}
              />
            </div>
            <div>
              <Typography className={classes.formText}>
                Konfirmasi Kata Sandi
              </Typography>
              <InputBase
                className={classes.form}
                type="password"
                name="rePass"
                value={informasiPembeli.rePass}
                onChange={handleInput}
                disabled={userData}
              />
            </div>
          </>
        }
        {address.alamat ? (
          <div>
            <Typography className={classes.formText}>
              Alamat Pengiriman
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                className={classes.innerBoxText}
              >
                {address.alamat}, {address.kelurahan}, {address.District.name}, {address.City.name}, {address.Province.name} {address.kodepos} ({address.detail})
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
      <Paper className={classes.box1} elevation={3}>
        <Typography className={classes.boxText}>Pengiriman</Typography>
        <select
          className={classes.select}
          value={courierPicked}
          onChange={selected}
          disabled={!address.alamat}
          style={{ marginTop: '0.5rem' }}
        >
          <option className={classes.option}>ID Express</option>
        </select>
        <Grid container alignItems="center">
          {address.alamat && services === null && courierPicked !== "" && (
            <Grid alignItems="center" style={{ textAlign: 'center', width: '100%' }}>
              <CircularProgress
                style={{ marginTop: "1rem" }}
              />
            </Grid>
          )}
          {services &&
            services.map((service, index) => (
              service.cost !== 0 && <>
                <Grid item xs={8} key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          checked === service ? true : false
                        }
                        onChange={() => handleChecked(service)}
                        key={service.type}
                      />
                    }
                    label={
                      <Grid style={{ fontSize: 14 }}>
                        {service.type}
                      </Grid>
                    }
                  />
                </Grid>

                <Grid item xs={4} style={{ fontSize: 14, textAlign: 'right' }}>
                  Rp. {service.cost}
                </Grid>
              </>
            ))}
        </Grid>
      </Paper>
      <Paper className={classes.box1} elevation={3}>
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
            discount={cart.product.discount}
            qty={cart.qty}
            key={cart.product.id}
          />
        ))}
        <div
          style={{
            borderTop: "2px solid grey",
            margin: "0.3rem",
            marginTop: "0.5rem",
            display: "flex",
            justifyContent: "space-between",
            padding: "0.4rem",
          }}
        >
          <Typography style={{ fontSize: 13, fontWeight: "bold" }}>
            Total Belanja
          </Typography>
          <Typography style={{ fontSize: 13, fontWeight: "bold" }}>
            Rp {new Number(totalPrice).toLocaleString("id-ID")}
          </Typography>
        </div>
      </Paper>

      <Paper className={classes.box1} elevation={3}>
        <div
          style={{
            display: 'flex',
            justifyContent: "space-between",
            alignItems: 'center'
          }}
        >
          <Grid style={{ display: 'flex', alignItems: 'center' }}>
            <Typography style={{ fontSize: 13, fontWeight: "bold" }}>
              Asuransi
            </Typography>
            <Switch
              checked={insurance}
              onChange={(e) => setInsurance(e.target.checked)}
              name="insurance"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              label="Small"
              disabled={disableInsurance}
            />
          </Grid>
          <Typography style={{ fontSize: 13, fontWeight: "bold" }}>
            Rp {new Number(insuranceFee).toLocaleString("id-ID")}
          </Typography>
        </div>
        {
          disableInsurance && <p style={{ margin: 0, fontSize: 13, fontStyle: "italic", color: 'red' }}>* terdapat produk yang wajib asuransi</p>
        }
      </Paper>

      <Paper className={classes.box1} elevation={3} style={{ marginBottom: '1rem' }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography style={{ fontSize: 13, fontWeight: "bold" }}>
            Total Tagihan
          </Typography>
          <Typography style={{ fontSize: 13, fontWeight: "bold" }}>
            Rp {new Number(totalPrice + ongkosKirim + insuranceFee).toLocaleString("id-ID")}
          </Typography>
        </div>
      </Paper>

      <Button className={classes.btn} onClick={checkout} disabled={(carts && carts.length === 0) || !informasiPembeli.nama}>
        Bayar
      </Button>
    </>
  );
};

export default CartPage;
