import React, { useContext, useState, useEffect } from "react";
import { useStyles } from "./styles";
import {
  Paper,
  Typography,
  InputBase,
  Button,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router";
import { Context } from "../../context/globalState";
import Swal from "sweetalert2";

const AlamatPengiriman = () => {
  const classes = useStyles();
  const history = useHistory();
  const { addAddress, cityLists, refCode, addAlamat, userData, address } = useContext(Context);
  const [kabupaten, setKabupaten] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [jalan, setJalan] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    if (address && address.kabupaten) {
      setKabupaten(address.kabupaten)
      setKecamatan(address.kecamatan)
      setJalan(address.jalan)
      setDetail(address.detail)
    } else if (userData && userData.alamat) {
      let alamatSplit = userData.alamat.split(',')

      setKabupaten(alamatSplit[alamatSplit.length - 1])
      setKecamatan(alamatSplit[alamatSplit.length - 2])

      let checkDetail = alamatSplit[alamatSplit.length - 3]

      if (checkDetail.split('[').length > 1) {
        let temp = checkDetail.split('[')

        setJalan(alamatSplit.slice(0, alamatSplit.length - 2).join(',').split('[')[0])
        setDetail(temp[temp.length - 1].slice(0, temp[temp.length - 1].length - 1))
      } else {
        setJalan(alamatSplit.slice(0, alamatSplit.length - 2).join(','))
      }
    }
  }, [userData, address])

  async function onSubmit(e) {
    e.preventDefault();
    if (kabupaten === "" || kecamatan === "" || jalan === "") {
      Swal.fire({
        title: "data belum lengkap",
        icon: "error",
      });
    } else {
      await addAddress({ kabupaten, kecamatan, jalan, detail });
      if (localStorage.getItem("access_token")) {
        await addAlamat({ alamat: `${jalan}${detail ? `[${detail}]` : ''},${kecamatan},${kabupaten}` });
      }
      history.push(!refCode ? "/cart" : `/cart?ref=${refCode}`);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paper className={classes.nav}>
        <div className={classes.left}>
          <Typography className={classes.leftContent}>
            <ArrowBackIcon
              style={{ cursor: "pointer" }}
              onClick={() =>
                history.push(refCode ? `/cart?=ref=${refCode}` : "/cart")
              }
            />
          </Typography>
          <Typography className={classes.leftContent}>
            Alamat Pengiriman
          </Typography>
        </div>
      </Paper>
      <Paper className={classes.box1} elevation={3}>
        <Typography className={classes.boxText}>Informasi Pembeli</Typography>
        <div className={classes.formBox}>
          <Typography className={classes.formText}>Kota / Kabupaten</Typography>
          <Autocomplete
            options={cityLists}
            getOptionLabel={(option) => option.city_name}
            onChange={(event, newValue) => setKabupaten(newValue?.city_name)}
            renderInput={(params) => (
              <div ref={params.InputProps.ref} className={classes.form}>
                <InputBase {...params.inputProps} value={kabupaten} />
              </div>
            )}
          />
        </div>
        <div className={classes.formBox}>
          <Typography className={classes.formText}>Kecamatan</Typography>
          <InputBase
            className={classes.form}
            name="kecamatan"
            value={kecamatan}
            onChange={(e) => setKecamatan(e.target.value)}
          />
        </div>
        <div className={classes.formBox}>
          <Typography className={classes.formText}>
            Nama Jalan / No. Rumah / Unit
          </Typography>
          <InputBase
            className={classes.form}
            name="jalan"
            value={jalan}
            onChange={(e) => setJalan(e.target.value)}
          />
        </div>
        <div className={classes.formBox}>
          <Typography className={classes.formText}>
            Detail (Patokan/ Blok/ Unit No)
          </Typography>
          <InputBase
            className={classes.form}
            name="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
      </Paper>
      <Button className={classes.btn} onClick={onSubmit}>
        Simpan Alamat
      </Button>
    </div>
  );
};

export default AlamatPengiriman;
