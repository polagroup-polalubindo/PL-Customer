import React, { useContext, useState, useEffect } from "react";
import { useStyles } from "./styles";
import {
  Paper,
  Typography,
  Button,
  TextField,
  Grid
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router";
import { Context } from "../../context/globalState";
import Swal from "sweetalert2";

const Warranty = ({ location }) => {
  const classes = useStyles();
  const history = useHistory();
  const {
    refCode,
    addWarranty,
    editWarranty,
    login,
    register,
    userData
  } = useContext(Context);
  const [noMachine, setNoMachine] = useState('')
  const [purchasePlace, setPurchasePlace] = useState('')
  const [purchaseDate, setPurchaseDate] = useState('')
  const [invoice, setInvoice] = useState('')

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [nama, setNama] = useState('')
  const [pass, setPass] = useState('')
  const [rePass, setRePass] = useState('')
  const [isEdit, setIsEdit] = useState(false);


  useEffect(() => {
    async function fetch() { }
    if (location.state?.data) {
      console.log(location.state?.data)
      setNoMachine(location.state?.data.noMachine)
      setPurchasePlace(location.state?.data.purchasePlace)
      setPurchaseDate(location.state?.data.purchaseDate.slice(0,10))
      setInvoice(location.state?.data.invoice)
      setIsEdit(true)
    }
    fetch()
  }, [location.state]);

  useEffect(() => {
    if (!userData?.id || userData?.message === "jwt malformed") {
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
    }
  }, []);

  async function onSubmit(e) {
    try {
      e.preventDefault();
      if (!noMachine || !purchasePlace || !purchaseDate || !invoice) {
        Swal.fire({
          title: "data belum lengkap",
          icon: "error",
        });
      } else {
        if (!userData?.id || userData?.message === "jwt malformed") {
          if (pass !== rePass) {
            throw 'Password dan konfimasi password tidak sama'
          } else {
            const response = await register({ email: email, phone: phone, nama: nama, password: pass });
            if (response.message === "Success") {
              await login({ email: email, password: pass })
            }
          }
        }

        let submit

        if (isEdit) {
          submit = await editWarranty({
            noMachine,
            purchasePlace,
            purchaseDate,
            invoice,
          },
            location.state?.data.id
          )
        } else {
          submit = await addWarranty({
            noMachine,
            purchasePlace,
            purchaseDate,
            invoice,
          })
        }

        if (submit?.message !== "error") {
          history.push(!refCode ? "/warranty" : `/warranty?ref=${refCode}`);
        }
        // }
      }
    } catch (err) {
      Swal.fire({
        title: err,
        icon: "error",
      });
    }

  }

  return (
    <div
    >
      <Paper className={classes.nav}>
        <div className={classes.left}>
          <Typography className={classes.leftContent}>
            <ArrowBackIcon
              style={{ cursor: "pointer" }}
              onClick={() =>
                history.push(refCode ? `/warranty?=ref=${refCode}` : "/warranty")
              }
            />
          </Typography>
          <Typography className={classes.leftContent}>
            Form Warranty
          </Typography>
        </div>
      </Paper>
      <Grid style={{}}>
      </Grid>
      {
        (!userData?.id || userData?.message === "jwt malformed") && <Paper className={classes.box1} elevation={3} style={{ padding: 10 }}>

          <Typography className={classes.boxText}>Informasi Pembeli</Typography>
          <div>
            <Typography className={classes.formText}>Nama Lengkap</Typography>
            <TextField
              name="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              variant="outlined"
              size="small"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <Typography className={classes.formText}>Email</Typography>
            <TextField
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              size="small"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <Typography className={classes.formText}>
              Nomor HP (whatsapp)
            </Typography>
            <TextField
              type="number"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              variant="outlined"
              size="small"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <Typography className={classes.formText}>
              Kata Sandi
            </Typography>
            <TextField
              type="password"
              name="pass"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              variant="outlined"
              size="small"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <Typography className={classes.formText}>
              Konfirmasi Kata Sandi
            </Typography>
            <TextField
              type="password"
              name="rePass"
              value={rePass}
              onChange={(e) => setRePass(e.target.value)}
              variant="outlined"
              size="small"
              style={{ width: '100%' }}
            />
          </div>
        </Paper>
      }

      <Paper className={classes.box1} elevation={3} style={{ padding: 10 }}>
        <Typography className={classes.boxText}>Informasi Produk</Typography>
        <div>
          <Typography className={classes.formText}>
            Nomor Mesin
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            style={{ width: '100%' }}
            name="noMachine"
            value={noMachine}
            onChange={(e) => setNoMachine(e.target.value)}
            disabled={isEdit}
          />
        </div>

        <div>
          <Typography className={classes.formText}>
            Tempat Pembelian
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            style={{ width: '100%' }}
            name="purchasePlace"
            value={purchasePlace}
            onChange={(e) => setPurchasePlace(e.target.value)}
            placeholder="contoh: Online (Tokopedia, Website, etc) / Offline"
          />
        </div>

        <div>
          <Typography className={classes.formText}>
            Tanggal Pembelian
          </Typography>
          <TextField
            variant="outlined"
            style={{ width: '100%' }}
            size="small"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            type="date"
            helperText="format: mm/dd/yyyy"
          />
        </div>

        <div>
          <Typography className={classes.formText}>
            Invoice
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            style={{ width: '100%' }}
            name="invoice"
            value={invoice}
            onChange={(e) => setInvoice(e.target.value)}
            placeholder="contoh: INV/20210101/VK/0001"
          />
        </div>

      </Paper>
      <Button className={classes.btn} onClick={onSubmit} fullWidth>
        Daftar
      </Button>
    </div>
  );
};

export default Warranty;
