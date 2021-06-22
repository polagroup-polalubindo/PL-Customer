import React, { useState, useContext } from "react";
import { Checkbox, Paper, Button } from "@material-ui/core";
import { useStyles } from "./style";
import { useHistory } from "react-router-dom";
import logo from "./logo.png";
import { Context } from "../../context/globalState";

const Syaratketentuan = () => {
  const classes = useStyles();
  const history = useHistory();
  const { refCode } = useContext(Context);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "#f4e8e9",
        }}
      >
        <img src={logo} />
      </div>
      <Paper className={classes.box}>
        <div style={{ padding: "0.5rem", marginTop: "-2rem" }}>
          <h3 style={{ textAlign: "center" }}>
            Pertanyaan Seputar Member Premier
          </h3>
          <ol style={{ listStyle: "none", padding: 0 }}>
            <li style={{ padding: "1rem 0" }}>
              <b>Q: Apa itu Member Premier?</b>
              <br />
              Member Premier adalah peningkatan dari member biasa yang dapat
              membagikan kode referral untuk kesempatan mendapatkan komisi dari
              pembelian member lain melalui kode tersebut.
            </li>
            <li style={{ padding: "1rem 0" }}>
              <b>Q: Keuntungan apa ya didapatkan menjadi Member Premier?</b>
              <br />
              Member Premier dapat memperoleh komisi sebesar 10% dari pembelian
              member lain yang menggunakan kode referral pada seluruh produk
              Virus Keeper.
            </li>
            <li style={{ padding: "1rem 0" }}>
              <b>Q: Bagaimana cara bergabung menjadi Member Premier?</b>
              <br />
              1. Akun member dapat diupgrade menjadi premier dengan melakukan
              minimum total transaksi sejumlah Rp.100.000,-
              <br />
              2. Pendaftaran akan otomatis muncul di halaman utama setelah
              menyelesaikan minimum total transaksi.
              <br />
              3. Pelanggan diwajibkan untuk mengisi data diri dan nomor npwp
              pada bagian pendaftaran.
              <br />
              4. Customer service kami akan menghubungi via Whatsapp untuk
              melakukan verifikasi data diri.
              <br />
              5. Jika data sudah sesuai maka akun akan langsung menjadi
              pelanggan premier dan dapat menggunakan kode referall.
            </li>
            <li style={{ padding: "1rem 0" }}>
              <b>Q: Bagaimana saya mendapatkan komisi dari Member Premier?</b>
              <br />
              Komisi akan didapatkan bila ada member lain yang sudah
              menyelesaikan pembelian menggunakan kode referral-mu.
            </li>
            <li style={{ padding: "1rem 0" }}>
              <b>
                Q: Kenapa saya tidak mendapatkan link untuk menjadi Member
                Premier?
              </b>
              <br />
              Apabila tidak terdapat link pendaftaran Member Premier, artinya
              kamu belum menyelesaikan transaksi dengan minimum Rp.100, 000.
            </li>
          </ol>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{ background: "#f4e8e9", width: "100%" }}
              onClick={() => history.push(refCode ? `/?ref=${refCode}` : "/")}
            >
              Kembali
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Syaratketentuan;
