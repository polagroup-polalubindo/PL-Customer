import React from "react";
import {
  Modal,
  Grid,
  Button,
  Fade,
  Backdrop,
  Divider,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';


const ModalFAQ = ({ open, handleClose, id }) => {
  return (
    <Modal
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none'
      }}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open} >
        <Grid style={{
          backgroundColor: 'white',
          boxShadow: 5,
          maxWidth: '80%',
          width: 500,
          maxHeight: '90%',
          minHeight: 320,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 10,
          overflowX: 'auto',
          position: 'relative'
        }}>
          <CloseIcon style={{ position: 'absolute', right: 15, top: 17, cursor: 'pointer' }} onClick={handleClose} />
          <Grid style={{ padding: "20px 20px 10px" }}>
            <b style={{ fontSize: 13, color: 'gray' }}>FAQ Warranty</b>
          </Grid>
          <Divider />
          <Grid style={{ padding: "10px 20px 10px" }}>
            <Grid style={{ marginBottom: 17 }}>
              <Grid style={{ display: 'flex', marginBottom: 5 }}>
                <b style={{ fontSize: 11, minWidth: 17 }}>Q: </b>
                <b style={{ fontSize: 11 }}>Perlukah mendaftarkan mesin pada website?</b>
              </Grid>
              <Grid style={{ display: 'flex' }}>
                <p style={{ margin: 0, fontSize: 11, minWidth: 17 }}>A: </p>
                <p style={{ margin: 0, fontSize: 11 }}>Anda dianjurkan untuk mendaftarkan mesin Anda untuk mempermudah proses garansi. Kami tidak melayani klaim garansi jika mesin Anda tidak terdaftar pada system.</p>
              </Grid>
            </Grid>

            <Grid style={{ marginBottom: 17 }}>
              <Grid style={{ display: 'flex', marginBottom: 5 }}>
                <b style={{ fontSize: 11, minWidth: 17 }}>Q: </b>
                <b style={{ fontSize: 11 }}>Bagaimana cara mendaftarkan mesin pada website?</b>
              </Grid>
              <Grid style={{ display: 'flex' }}>
                <p style={{ margin: 0, fontSize: 11, minWidth: 17 }}>A: </p>
                <Grid style={{ margin: 0, fontSize: 11 }}>
                  <ul style={{ padding: 0, paddingLeft: 10, margin: 0 }}>
                    <li>Masuk ke <a href="http://store.polalubindo.co.id/warranty" target="_blank">http://store.polalubindo.co.id/warranty</a></li>
                    <li>Klik DAFTARKAN PRODUK pada sudut kanan atas</li>
                    <li>Lengkapi form</li>
                  </ul>
                </Grid>
              </Grid>
            </Grid>

            <Grid style={{ marginBottom: 17 }}>
              <Grid style={{ display: 'flex', marginBottom: 5 }}>
                <b style={{ fontSize: 11, minWidth: 17 }}>Q: </b>
                <b style={{ fontSize: 11 }}>Bagaimana cara klaim garansi jika terjadi kerusakan?</b>
              </Grid>
              <Grid style={{ display: 'flex' }}>
                <p style={{ margin: 0, fontSize: 11, minWidth: 17 }}>A: </p>
                <p style={{ margin: 0, fontSize: 11 }}>Hubungi toko tempat Anda membeli produk, atau hubungi Pola Healthy Life via Instagram. Anda cukup memberikan nomor mesin, staff kami akan menghubungi Anda. Pastikan Anda telah mendaftarkan mesin Anda pada website.</p>
              </Grid>
            </Grid>

            <Grid style={{ marginBottom: 17 }}>
              <Grid style={{ display: 'flex', marginBottom: 5 }}>
                <b style={{ fontSize: 11, minWidth: 17 }}>Q: </b>
                <b style={{ fontSize: 11 }}>Berapa lama masa garansi?</b>
              </Grid>
              <Grid style={{ display: 'flex' }}>
                <p style={{ margin: 0, fontSize: 11, minWidth: 17 }}>A: </p>
                <p style={{ margin: 0, fontSize: 11 }}>Garansi berlaku selama 12 (dua belas) bulan terhitung sejak tanggal pembelian selama menggunakan cairan Pola Heal Multi Purpose Sterilizer.</p>
              </Grid>
            </Grid>

            <Grid style={{ marginBottom: 17 }}>
              <Grid style={{ display: 'flex', marginBottom: 5 }}>
                <b style={{ fontSize: 11, minWidth: 17 }}>Q: </b>
                <b style={{ fontSize: 11 }}>Bagaimana jika menggunakan cairan / liquid merek lain?</b>
              </Grid>
              <Grid style={{ display: 'flex' }}>
                <p style={{ margin: 0, fontSize: 11, minWidth: 17 }}>A: </p>
                <p style={{ margin: 0, fontSize: 11 }}>Garansi 12 bulan otomatis batal jika ditemukan penggunaan cairan / liquid merek lain.</p>
              </Grid>
            </Grid>

            <Grid style={{ marginBottom: 17 }}>
              <Grid style={{ display: 'flex', marginBottom: 5 }}>
                <b style={{ fontSize: 11, minWidth: 17 }}>Q: </b>
                <b style={{ fontSize: 11 }}>Kenapa tidak dianjurkan menggunakan cairan/ liquid merek lain?</b>
              </Grid>
              <Grid style={{ display: 'flex' }}>
                <p style={{ margin: 0, fontSize: 11, minWidth: 17 }}>A: </p>
                <Grid style={{ margin: 0, fontSize: 11 }}>
                  <ul style={{ padding: 0, paddingLeft: 10, margin: 0 }}>
                    <li>Kami tidak menjamin efektifitas cairan lain dalam membunuh virus, bakteri dan jamur</li>
                    <li>Kami tidak menjamin jika terjadi kerusakan pada mesin, akibat kandungan cairan / liquid merek lain</li>
                    <li>Kami tidak menjamin jika terjadi masalah pada kesehatan dan keselamatan Anda setelah penggunaan cairan/ liquid merek lain</li>
                    <li>KKami tidak menjamin kandungan cairan/liquid merek lain aman digunakan, bebas alkohol, tidak mudah terbakar dan tidak beracun bagi manusia dan hewan peliharaan</li>
                  </ul>
                </Grid>
              </Grid>
            </Grid>

            <Grid style={{ marginBottom: 17 }}>
              <Grid style={{ display: 'flex', marginBottom: 5 }}>
                <b style={{ fontSize: 11, minWidth: 17 }}>Q: </b>
                <b style={{ fontSize: 11 }}>Apakah bisa dibawa untuk berpergian menggunakan pesawat?</b>
              </Grid>
              <Grid style={{ display: 'flex' }}>
                <p style={{ margin: 0, fontSize: 11, minWidth: 17 }}>A: </p>
                <p style={{ margin: 0, fontSize: 11 }}>Bisa. Pola Heal Thermal Fogger aman masuk pesawat karena tidak mengandung baterai, aerosol, cairan tidak mudah terbakar dan tidak mengandung zat berbahaya lainnya. Perhatikan regulasi maskapai penerbangan tentang volume maksimum cairan yang boleh dibawa.</p>
              </Grid>
            </Grid>

            <Grid style={{ marginBottom: 17 }}>
              <Grid style={{ display: 'flex', marginBottom: 5 }}>
                <b style={{ fontSize: 11, minWidth: 17 }}>Q: </b>
                <b style={{ fontSize: 11 }}>Kapan saat terbaik untuk melakukan sterilisasi / fogging ruangan?</b>
              </Grid>
              <Grid style={{ display: 'flex' }}>
                <p style={{ margin: 0, fontSize: 11, minWidth: 17 }}>A: </p>
                <p style={{ margin: 0, fontSize: 11 }}>Untuk ruangan  low risk seperti area rumah, dianjurkan untuk melakukan sterilisasi seminggu sekali
                  Untuk area high risk seperti area perkantoran, bisnis, dll dianjurkan untuk melakukan sterilisasi setiap 3-4 hari sekali</p>
              </Grid>
            </Grid>

            <Grid style={{ marginBottom: 17 }}>
              <Grid style={{ display: 'flex', marginBottom: 5 }}>
                <b style={{ fontSize: 11, minWidth: 17 }}>Q: </b>
                <b style={{ fontSize: 11 }}>Apa bedanya tombol (I) dan (II)? (Pada Mesin)</b>
              </Grid>
              <Grid style={{ display: 'flex' }}>
                <p style={{ margin: 0, fontSize: 11, minWidth: 17 }}>A: </p>
                <p style={{ margin: 0, fontSize: 11 }}>Tombol (I) adalah mode pre-heating, digunakan untuk memanasan mesin 2-5 menit hingga lampu indikator menyala sebelum proses sterilisasi.</p>
              </Grid>
            </Grid>


            <Grid style={{ marginBottom: 17 }}>
              <Grid style={{ display: 'flex', marginBottom: 5 }}>
                <b style={{ fontSize: 11, minWidth: 17 }}>Q: </b>
                <b style={{ fontSize: 11 }}>Apa yang terjadi jika tidak melakukan proses pre-heating?</b>
              </Grid>
              <Grid style={{ display: 'flex' }}>
                <p style={{ margin: 0, fontSize: 11, minWidth: 17 }}>A: </p>
                <p style={{ margin: 0, fontSize: 11 }}>Maka mesin tidak bisa memproduksi asap, output yang keluar akan berupa cairan.</p>
              </Grid>
            </Grid>
          </Grid>

          <Divider />

          <Grid style={{ margin: '10px auto 20px', textAlign: "center" }}>
            <Button color="secondary" variant="contained" onClick={handleClose}>
              Oke
            </Button>
          </Grid>
        </Grid>
      </Fade>
    </Modal >
  );
};

export default ModalFAQ;
