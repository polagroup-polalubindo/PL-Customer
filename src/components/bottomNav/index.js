import React, { useContext, useEffect } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Typography,
  Button,
} from "@material-ui/core";
import { useStyles } from "./styles";

import HomeIcon from "@material-ui/icons/Home";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import HelpIcon from "@material-ui/icons/Help";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

import { useHistory, useLocation } from "react-router";
import { Context } from "../../context/globalState";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const BottomNav = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const query = useQuery();
  const { carts, totalPrice, refCode, setRefCode } = useContext(Context);

  useEffect(() => {
    const queryParams = query.get("ref");
    if (queryParams !== null) {
      setRefCode(queryParams);
    }
  }, [])

  const allBottomActions = [
    {
      value: 0,
      label: "Produk",
      icon: <HomeIcon />,
      onClick: () => history.push(refCode ? `/?ref=${refCode}` : `/`),
    },
    {
      value: 1,
      label: "Keranjang",
      icon: <ShoppingBasketIcon />,
      onClick: () => history.push(refCode ? `/cart?ref=${refCode}` : "/cart"),
    },
    {
      value: 2,
      label: "Pesanan",
      icon: <LocalMallIcon />,
      onClick: () =>
        history.push(refCode ? `/transaksi?ref=${refCode}` : "/transaksi"),
    },
    {
      value: 3,
      label: "Warranty",
      icon: <VerifiedUserIcon />,
      onClick: () =>
        history.push(refCode ? `/warranty?ref=${refCode}` : "/warranty"),
    },
    {
      value: 4,
      label: "Bantuan",
      icon: <HelpIcon />,
      link: "https://api.whatsapp.com/send?phone=+6281806152968&text=hi",
    },
  ];
  const [value, setValue] = React.useState(0);
  return (
    <>
      {location.pathname !== "/pembayaran" && carts.length > 0 && (
        <div className={classes.carts}>
          <div style={{ marginTop: "0.5rem" }}>
            <Typography style={{ fontSize: "0.8rem" }}>
              Total Belanja({carts.length})
            </Typography>
            <Typography style={{ fontSize: "0.7rem", fontWeight: "bold" }}>
              Rp {new Number(totalPrice).toLocaleString("id-ID")}
            </Typography>
          </div>
          <div>
            <Button
              className={classes.btn}
              onClick={() =>
                history.push(refCode ? `/cart?ref=${refCode}` : "/cart")
              }
            >
              Lanjut
            </Button>
          </div>
        </div>
      )}
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className={classes.root}
        showLabels
      >
        {allBottomActions.map((item) => (
          <BottomNavigationAction
            key={item.value}
            label={item.label}
            icon={item.icon}
            onClick={item.onClick}
            href={item.link}
            target="_blank"
            selected={item.value === value}
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              color: item.value === value && item.onClick ? "red" : null,
            }}
          />
        ))}
      </BottomNavigation>
    </>
  );
};
