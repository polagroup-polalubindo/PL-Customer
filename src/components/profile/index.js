import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography, Avatar, TextField, Button } from "@material-ui/core";
import { ArrowBack, Edit, Close } from "@material-ui/icons";
import { useHistory } from "react-router";
import useStyles from "./styles";
import komisiLogo from "./asset/komisi.png";
import { useContext } from "react";
import { Context } from "../../context/globalState";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import ModalKomisi from "./ModalKomisi";

export default function CenteredGrid() {
  const classes = useStyles();
  const {
    fetchKomisiData,
    fetchUserData,
    komisi,
    userData,
    refCode,
    resetLocal,
    setRefCode,
    logout,
    editProfil,
    address
  } = useContext(Context);

  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false)
  const [dataUser, setDataUser] = useState({
    nama: '',
    email: '',
    phone: '',
    alamat: '',
    totalPembelian: 0
  })
  const [OpenModalKomisi, setOpenModalKomisi] = useState(false)

  const back = () => {
    history.push(refCode ? `/?ref=${refCode}` : "/");
  };

  const handleLogout = () => {
    history.push("/login");
    localStorage.removeItem("access_token");
    localStorage.removeItem("carts");
    localStorage.removeItem("totalPrice");
    logout();
    setRefCode(null);
  };

  useEffect(async () => {
    await fetchKomisiData();
    await fetchUserData();
  }, []);

  useEffect(() => {
    userData && setDataUser({
      nama: userData.nama,
      email: userData.email,
      phone: userData.phone,
      totalPembelian: userData.totalPembelian,
      alamat: address && address.alamat ? `${address.alamat}, ${address.kelurahan}, ${address.District.name}, ${address.City.name}, ${address.Province.name} ${address.kodepos} (${address.detail})` : ''
    })
  }, [userData, address])

  const handleChange = (e) => {
    if (e.target.name === 'phone') {
      if (!isNaN(e.target.value)) setDataUser({ ...dataUser, [e.target.name]: e.target.value })
    } else {
      setDataUser({ ...dataUser, [e.target.name]: e.target.value })
    }
  }

  const handleIsEdit = async () => {
    let newData = { nama: dataUser.nama }

    if (userData.email !== dataUser.email) newData.email = dataUser.email
    if (userData.phone !== dataUser.phone) newData.phone = dataUser.phone

    await editProfil(userData.id, newData)
    setIsEdit(!isEdit)
  }

  return (
    <>
      <Paper className={classes.nav}>
        <div className={classes.left}>
          <Typography className={classes.leftContent}>
            <ArrowBack style={{ cursor: "pointer" }} onClick={back} />
          </Typography>
          <Typography className={classes.leftContent}>Profile</Typography>
        </div>
      </Paper>
      <div className={classes.root}>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Paper className={classes.profileBox} elevation={3}>
            <Grid container>
              <Grid xs={3}>
                <Avatar style={{ width: "3.5rem", height: "3.5rem", marginLeft: 20 }}>
                  {dataUser.nama}
                </Avatar>
              </Grid>
              {
                isEdit
                  ? <Grid xs={8}>
                    <TextField
                      value={dataUser.nama}
                      name='nama'
                      style={{ marginBottom: 5, width: '100%' }}
                      onChange={handleChange} />
                    <TextField
                      value={dataUser.email}
                      name='email'
                      style={{ marginBottom: 5, width: '100%' }}
                      onChange={handleChange} />
                    <TextField
                      type="Number"
                      value={dataUser.phone}
                      name='phone'
                      style={{ marginBottom: 5, width: '100%' }}
                      onChange={handleChange} />
                  </Grid>
                  : <Grid xs={8}>
                    <Grid style={{ fontWeight: "bold" }}>{userData && userData.nama}</Grid>
                    <Grid style={{ margin: "0.2rem 0", color: "gray" }}>{userData && userData.email}</Grid>
                    <Grid>{userData && userData.phone}</Grid>
                  </Grid>
              }
              <Grid xs={1} style={{ display: "flex", justifyContent: "flex-end" }}>
                {
                  isEdit
                    ? <Close onClick={() => setIsEdit(!isEdit)} style={{ cursor: 'pointer' }} />
                    : <Edit onClick={() => setIsEdit(!isEdit)} style={{ cursor: 'pointer' }} />
                }
              </Grid>
            </Grid>

            {
              isEdit
                ? <Button variant="contained" style={{ marginTop: 10 }} onClick={handleIsEdit}>simpan</Button>
                : <Grid xs={12} style={{ margin: "1rem 20px" }}>
                  <Grid style={{ fontWeight: "bold" }}>Alamat : </Grid>
                  <Grid>{dataUser.alamat}</Grid>
                </Grid>
            }
          </Paper>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid
                container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
                style={{ color: "#000" }}
              >
                <Grid item xs={2}>
                  <AccountBalanceWalletIcon />
                </Grid>
                <Grid item xs={6}>
                  Total Pembelian
                </Grid>
                <Grid item xs={4}>
                  Rp.{" "}
                  {new Number(dataUser.totalPembelian || 0).toLocaleString(
                    "id-ID"
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid
                container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
                style={{ color: "#000" }}
              >
                <Grid item xs={2}>
                  <img src={komisiLogo} alt="Komisi" />
                </Grid>
                <Grid item xs={6}>
                  Total Komisi Bulan Ini
                  <p style={{ margin: 0, cursor: 'pointer', fontSize: 13, color: 'blue' }} onClick={() => setOpenModalKomisi(true)}>lihat selengkapnya</p>
                </Grid>
                <Grid item xs={4}>
                  {komisi && komisi.length > 0
                    ? (
                      <p style={{ margin: 0 }}> Rp. {new Number(komisi[0].totalKomisi || 0).toLocaleString("id-ID")}</p>
                    )
                    : 0}
                </Grid>
              </Grid>

              {/* <Button
                variant="outlined"
                fullWidth
                style={{ borderColor: "green", color: "green" }}
                onClick={() =>
                  history.push(
                    refCode
                      ? `/riwayat-transaksi?ref=${refCode}`
                      : `/riwayat-transaksi`
                  )
                }
              >
                Lihat Riwayat Transaksi
              </Button>
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ backgroundColor: "green" }}
              >
                Transaksi Komisi
              </Button> */}
            </Paper>
          </Grid>
        </Grid>

        <div className={classes.logoutBtn}>
          <Button
            fullWidth
            style={{ backgroundColor: "green", color: "#fff" }}
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </div>
      </div>

      {
        OpenModalKomisi && <ModalKomisi open={OpenModalKomisi} close={() => setOpenModalKomisi(false)} />
      }
    </>
  );
}
