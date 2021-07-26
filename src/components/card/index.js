import React, { useState, useContext } from "react";
import { useStyles } from "./styles";
import { Context } from "../../context/globalState";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import komisiLogo from "../../assets/komisi.png";
import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

export const CardProduct = ({ product }) => {
  const classes = useStyles();
  const { addTocart, carts, editTotalprice } = useContext(Context);
  const [count, setCount] = useState(0);

  function addCart(product) {
    const filtered = carts.filter((cart) => cart.product.id === product.id);
    editTotalprice({
      status: "increment",
      price:
        product.discount
          ? Math.round(+product.hargaSatuan - Math.round((+product.hargaSatuan * (+product.discount / 100))))
          : +product.hargaSatuan
    });
    if (filtered.length > 0) {
      filtered[0].qty += 1;
    } else {
      addTocart({ product, qty: 1, checked: true });
    }
  }

  return (
    <Grid item xs={6}>
      <Card style={{ height: "auto" }}>
        <CardMedia
          className={classes.media}
          image={product.fotoProduk}
          title={product.namaProduk}
        >
          {product.komisiStatus === true &&
            userData?.statusPremier === "aktif" ? (
            <>
              <img
                src={komisiLogo}
                alt="logo komisi"
                width="50"
                height="50"
                className={classes.logo_komisi}
              />
              <Typography variant="subtitle2" className={classes.jml_komisi}>
                {product.komisiLevel1}
              </Typography>
            </>
          ) : null}
        </CardMedia>
        <CardContent style={{ padding: '0.3125rem 0.625rem 0rem' }}>
          <Typography className={classes.produkTitle}>
            {product.namaProduk}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.deskripsi.split(' ').length > 10 ? `${product.deskripsi.split(' ').slice(0, 10).join(' ')} ...` : product.deskripsi}
          </Typography>
          {
            product.discount
              ? <Grid style={{ display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <p style={{ margin: 0, marginRight: 5, color: 'gray', fontSize: 13, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>Rp. {(product.hargaSatuan).toLocaleString("id-ID")},-</p>
                <b style={{ margin: 0 }}>Rp. {(Math.round(product.hargaSatuan - Math.round((product.hargaSatuan * (product.discount / 100))))).toLocaleString("id-ID")},-</b>
              </Grid>
              : <Typography component="p">
                Rp. {product.hargaSatuan.toLocaleString("id-ID")},-
              </Typography>
          }
        </CardContent>
        <CardActions style={{ padding: '0.625rem' }} >
          {product.stock === 0 ? (
            <Typography variant="body2" color="textSecondary" component="p">
              Stock habis
            </Typography>
          ) : (
            <Button
              fullWidth
              className={classes.beli}
              onClick={() => addCart(product)}
            >
              Beli
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};
