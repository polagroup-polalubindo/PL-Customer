import React, { useContext, useEffect, useState } from "react";
import { useStyles } from "./styles";
import { Navbar } from "../navbar";
import { CardProduct } from "../card";
import { BottomNav } from "../bottomNav";
import { Typography, Fab, Button, Grid } from "@material-ui/core";
import { Context } from "../../context/globalState";
import brandLogo from "../../assets/brand1.png";
import allBrand from "../../assets/allBrand.png";
import { useLocation } from "react-router-dom";
import ShareIcon from "@material-ui/icons/Share";

import PremierModal from "../premierModal";
import Swal from "sweetalert2";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const HomePage = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [visible, setVisible] = useState(false);
  const query = useQuery();
  const classes = useStyles();
  const {
    fetchBrands,
    fetchProduct,
    fetchUserData,
    brands,
    products,
    setRefCode,
    getRefcode,
    userData,
    carts,
    address
  } = useContext(Context);
  const premier = 100000;

  const handleCopy = async () => {
    const refCode = await getRefcode();

    function copyToClipboard(textToCopy) {
      // navigator clipboard api needs a secure context (https)
      if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        Swal.fire({
          title: "Link Copied",
          // text: `http://157.230.35.207/?ref=${refCode}`,
          text: `http://store.polalubindo.co.id/?ref=${refCode}`,
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        return navigator.clipboard.writeText(textToCopy);
      } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        Swal.fire({
          title: "Link Copied",
          // text: `http://157.230.35.207/?ref=${refCode}`,
          text: `http://store.polalubindo.co.id/?ref=${refCode}`,
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        return new Promise((res, rej) => {
          // here the magic happens
          document.execCommand("copy") ? res() : rej();
          textArea.remove();
        });
      }
    }
    // copyToClipboard(`http://157.230.35.207/?ref=${refCode}`);
    copyToClipboard(`http://store.polalubindo.co.id/?ref=${refCode}`);
  };

  useEffect(async () => {
    const queryParams = query.get("ref");
    if (queryParams !== null) {
      setRefCode(queryParams);
    }
    fetchBrands();
    fetchProduct();
    await fetchUserData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={classes.topRoot}>
        <div className={classes.root}>
          <div className={classes.brandBox}>
            <Fab className={classes.Fab} onClick={() => setSelectedBrand("")}>
              <img src={allBrand} />
            </Fab>
            <Typography className={classes.brandText}>Semua Produk</Typography>
          </div>
          {brands.map((el) => (
            <div className={classes.brandBox} key={el.id}>
              <Fab
                className={classes.Fab}
                onClick={() => setSelectedBrand(el.namaBrand)}
              >
                <img src={brandLogo} />
              </Fab>
              <Typography className={classes.brandText}>
                {el.namaBrand}
              </Typography>
            </div>
          ))}
        </div>
        {localStorage.getItem("access_token") &&
        userData?.totalPembelian >= premier &&
        (!userData?.statusPremier ||
        (userData?.statusPremier === "aktif" && !userData?.referralStatus))? (
          <div className={classes.share} style={{ verticalAlign: "middle" }}>
            <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
              Dapatkan komisi tambahan
            </Typography>
            <Button
              style={{
                color: "#fff",
                border: "2px solid #fff",
                fontSize: 10,
                fontWeight: "bold",
              }}
              onClick={() => setVisible(!visible)}
            >
              upgrade premiere
            </Button>
          </div>
        ) : userData?.statusPremier === "menunggu approval" ? (
          <div className={classes.share} style={{ verticalAlign: "middle" }}>
            <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
              Status: Menunggu Proses persetujuan premiere
            </Typography>
          </div>
        ) : (userData?.statusPremier === "aktif" && userData?.referralStatus) ? (
          <div className={classes.share} style={{ verticalAlign: "middle" }}>
            <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
              Bagikan link untuk komisi
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div style={{ marginRight: "0.5rem", marginTop: "0.2rem" }}>
                <ShareIcon />
              </div>
              <div>
                <Button
                  style={{
                    color: "#fff",
                    border: "2px solid #fff",
                    fontSize: 10,
                    fontWeight: "bold",
                  }}
                  onClick={handleCopy}
                >
                  bagikan
                </Button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <PremierModal
          visible={visible}
          handleClose={() => setVisible(!visible)}
        />
        <Grid container spacing={2} className={classes.produkCard} style={{ marginBottom: carts.length > 0 ? "8rem" : "4rem", padding: '0px 20px' }}>
          {!selectedBrand
            ? products.map((product) => (
                <CardProduct product={product} key={product.id} />
              ))
            : products
                .filter((prod) => prod.Brand.namaBrand === selectedBrand)
                .map((product) => (
                  <CardProduct product={product} key={product.id} />
                ))}
        </Grid>
      </div>
      <BottomNav />
    </div>
  );
};

export default HomePage;
