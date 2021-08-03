import React, { useContext, useState, useEffect } from "react";
import { useStyles } from "./styles";
import {
  Paper,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router";
import { Context } from "../../context/globalState";
import Swal from "sweetalert2";

const AlamatPengiriman = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    dataProvince,
    dataCity,
    dataDistrict,
    refCode,
    updateAlamat,
    userData,
    address,
    getProvince,
    getCity,
    getDistrict, } = useContext(Context);
  const [jalan, setJalan] = useState("");
  const [detail, setDetail] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kota, setKota] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kodepos, setKodepos] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    async function fetch() {
      await getProvince()
    }
    fetch()
  }, [])

  useEffect(async () => {
    if (address && address.alamat) {
      console.log(address)
      await setIsEdit(true)
      await setJalan(address.alamat)
      await setDetail(address.detail)
      await setKelurahan(address.kelurahan)
      await setProvinsi(address.provinsiId)
      await setKota(address.kotaId)
      await setKecamatan(address.kecamatanId)
      await setKodepos(address.kodepos)
      await setKeterangan(address.keterangan)
    }
  }, [userData, address])

  useEffect(() => {
    async function fetch() {
      setKota()
      if (provinsi) {
        await getCity(provinsi)
      }
    }
    fetch()
  }, [provinsi])

  useEffect(() => {
    async function fetch() {
      setKecamatan()
      if (kota) {
        await getDistrict(kota)
      }
    }
    fetch()
  }, [kota])

  async function onSubmit(e) {
    e.preventDefault();
    if (!jalan || !detail || !kelurahan || !kecamatan || !kota || !provinsi || !kodepos || !keterangan) {
      Swal.fire({
        title: "data belum lengkap",
        icon: "error",
      });
    } else {
      if (localStorage.getItem("access_token")) {
        await updateAlamat({
          alamat: jalan,
          detail,
          kelurahan,
          kecamatan,
          kota,
          provinsi,
          kodepos,
          keterangan
        });
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
          <Typography className={classes.formText}>Provinsi</Typography>
          <FormControl variant="outlined" size="small" style={{ width: '100%' }}>
            <Select
              value={provinsi}
              onChange={(e) => setProvinsi(e.target.value)}
            >
              {
                dataProvince.map((province, index) =>
                  <MenuItem value={province.id} key={'province' + index}>{province.name}</MenuItem>
                )
              }
            </Select>
          </FormControl>
        </div>
        <div className={classes.formBox}>
          <Typography className={classes.formText}>Kota / Kabupaten</Typography>
          <FormControl variant="outlined" size="small" style={{ width: '100%' }}>
            <Select
              value={kota}
              onChange={(e) => setKota(e.target.value)}
              disabled={!provinsi && !isEdit}
            >
              {
                dataCity.map((kota, index) =>
                  <MenuItem value={kota.id} key={'kota' + index}>{kota.name}</MenuItem>
                )
              }
            </Select>
          </FormControl>
        </div>
        <div className={classes.formBox}>
          <Typography className={classes.formText}>Kecamatan</Typography>
          <FormControl variant="outlined" size="small" style={{ width: '100%' }}>
            <Select
              value={kecamatan}
              onChange={(e) => setKecamatan(e.target.value)}
              disabled={!kota && !isEdit}
            >
              {
                dataDistrict.map((kecamatan, index) =>
                  <MenuItem value={kecamatan.id} key={'kecamatan' + index}>{kecamatan.name}</MenuItem>
                )
              }
            </Select>
          </FormControl>
        </div>
        <div className={classes.formBox}>
          <Typography className={classes.formText}>Kelurahan</Typography>
          <TextField
            variant="outlined"
            size="small"
            name="kelurahan"
            style={{ width: '100%' }}
            value={kelurahan}
            onChange={(e) => setKelurahan(e.target.value.toUpperCase())}
          />
        </div>
        <div className={classes.formBox}>
          <Typography className={classes.formText}>
            Nama Jalan / No. Rumah / Unit
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            style={{ width: '100%' }}
            name="jalan"
            value={jalan}
            onChange={(e) => setJalan(e.target.value.toUpperCase())}
            placeholder="contoh: JALAN MEDAN MERDEKA"
          />
        </div>
        <div className={classes.formBox}>
          <Typography className={classes.formText}>
            Detail (Patokan/ Blok/ Unit No)
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            style={{ width: '100%' }}
            name="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value.toUpperCase())}
            placeholder="contoh: BLOK AA"
          />
        </div>
        <div className={classes.formBox}>
          <Typography className={classes.formText}>
            Kode Pos
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            style={{ width: '100%' }}
            name="kodepos"
            value={kodepos}
            onChange={(e) => !isNaN(+e.target.value) && e.target.value.length < 6 && setKodepos(e.target.value)}
            placeholder="contoh: 12345"
          />
        </div>
        <div className={classes.formBox}>
          <Typography className={classes.formText}>
            Keterangan
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            style={{ width: '100%' }}
            name="keterangan"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value.toUpperCase())}
            placeholder="contoh: ALAMAT RUMAH"
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
