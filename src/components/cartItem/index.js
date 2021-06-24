import React, { useContext, useEffect } from "react";
import { Checkbox, Typography, Button, Grid } from "@material-ui/core";
import { useStyles } from "./styles";
import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { Context } from "../../context/globalState";

const CartItem = ({ nama, weight, price, qty, id, discount }) => {
  const classes = useStyles();
  const {
    carts,
    editCart,
    deleteCart,
    checkedItem,
    products,
    editTotalprice,
    fetchCarts,
    fetchCityListAPI,
    cityLists,
  } = useContext(Context);
  const filtered = carts.filter((cart) => cart.product.id === id);
  const filterQty = products.filter((product) => product.id === id);

  const addOne = () => {
    filtered[0].qty += 1;
    editCart(filtered[0]);
    editTotalprice({ status: "increment", price: discount ? Math.round(price - (price * (discount / 100))) : price });
  };

  const minusOne = () => {
    filtered[0].qty -= 1;
    if (filtered[0].qty === 0) {
      deleteCart(filtered[0].product.id);
      editTotalprice({ status: "decrement", price: discount ? Math.round(price - (price * (discount / 100))) : price });
    } else {
      editCart(filtered[0]);
      editTotalprice({ status: "decrement", price: discount ? Math.round(price - (price * (discount / 100))) : price });
    }
  };
  Math.round(price - (price * (discount / 100)))
  const handleCheck = () => {
    filtered[0].checked = !filtered[0].checked;
    checkedItem(filtered[0]);
    if (!filtered[0].checked) {
      editTotalprice({ status: "decrement", price: (discount ? Math.round(price - (price * (discount / 100))) : price) * qty });
    } else {
      editTotalprice({ status: "increment", price: (discount ? Math.round(price - (price * (discount / 100))) : price) * qty });
    }
  };

  useEffect(() => {
    fetchCarts();
    if (cityLists.length < 1) {
      fetchCityListAPI();
    }
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Checkbox
          checked={filtered[0].checked}
          onChange={handleCheck}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <div>
          <Typography style={{ fontSize: 10 }}>{nama}</Typography>
          <Typography style={{ fontSize: 9 }}>{weight}Gr</Typography>
          {
            discount
              ? <Grid style={{ display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <p style={{ margin: 0, marginRight: 5, color: 'gray', fontSize: 8, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>Rp. {(price).toLocaleString("id-ID")},-</p>
                <b style={{ margin: 0, fontSize: 10 }}>Rp. {(Math.round(price - (price * (discount / 100)))).toLocaleString("id-ID")},-</b>
              </Grid>
              : <Typography style={{ fontSize: 10, fontWeight: "bold" }}>
                Rp {new Number(price).toLocaleString("id-ID")}
              </Typography>
          }
        </div>
      </div>
      {filterQty[0]?.stock === qty ? (
        filterQty[0].checked ? (
          <div className={classes.counter}>
            <Button className={classes.btn} onClick={minusOne}>
              <RemoveCircleIcon />
            </Button>
            <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
              {qty}
            </Typography>
            <Button className={classes.btn} onClick={addOne}>
              <AddCircleSharpIcon />
            </Button>
          </div>
        ) : (
            <div className={classes.counter}>
              <Button className={classes.btn} onClick={minusOne}>
                <RemoveCircleIcon />
              </Button>
              <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
                {qty}
              </Typography>
              <Button className={classes.btn} onClick={addOne} disabled>
                <AddCircleSharpIcon />
              </Button>
            </div>
          )
      ) : (
          <div className={classes.counter}>
            {filterQty[0]?.stock === 0 ? (
              <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
                Stock Habis
              </Typography>
            ) : (
                <>
                  <Button className={classes.btn} onClick={minusOne}>
                    <RemoveCircleIcon />
                  </Button>
                  <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
                    {qty}
                  </Typography>
                  <Button className={classes.btn} onClick={addOne}>
                    {filtered[0]?.qty >= filterQty[0]?.stock ? (
                      ""
                    ) : (
                        <AddCircleSharpIcon />
                      )}
                  </Button>
                </>
              )}
          </div>
        )}
    </div>
  );
};

export default CartItem;
