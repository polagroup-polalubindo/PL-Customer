import React, { useContext, useState, useEffect } from "react";
import { useStyles } from "./styles";
import {
  Paper,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Divider
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useHistory } from "react-router";
import { Context } from "../../context/globalState";
import Swal from "sweetalert2";
import { BottomNav } from '../bottomNav'
import moment from 'moment';

const Warranty = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    fetchWarranty,
    dataWarranty,
    fetchUserData,
    userData,
    dataProvince,
    dataCity,
    dataDistrict,
    refCode,
    updateAlamat,
    address,
    getProvince,
    getCity,
    getDistrict,
    setAlamat } = useContext(Context);
  const [noMachine, setNoMachine] = useState('')
  const [purchaseDate, setPurchaseDate] = useState('')
  const [purchasePlace, setPurchasePlace] = useState('')
  const [invoice, setInvoice] = useState('')
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchUserData()
  }, [])

  useEffect(() => {
    if (userData?.id) {
      fetchWarranty(`?user=${userData.id}`)
    }
  }, [userData])

  function claim(data) {
    history.push(refCode ? `/warranty/claim?ref=${refCode}` : "/warranty/claim", { data })
  }

  return (
    <>
      <div
        style={{
          margin: "1rem 1rem 10rem 1rem",
          height: '80%'
        }}
      >
        <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Warranty
          </Typography>

          <Button
            style={{
              fontSize: "0.7rem",
              color: "red",
              fontWeight: "bold"
            }}
            onClick={() => history.push(refCode ? `/warranty/form?ref=${refCode}` : "/warranty/form")}
          >
            Daftarkan produk
          </Button>
        </Grid>


        {
          dataWarranty.map(el =>
            <Paper className={classes.box1} elevation={2}>
              <Grid style={{ backgroundColor: '#c4cdc7', padding: '0.5rem 1rem', borderTopRightRadius: 10, borderTopLeftRadius: 10, textAlign: 'center' }}>
                {el.noMachine}
              </Grid>
              <Grid
                container
                style={{ padding: '10px 20px' }}
              >
                <Grid item xs={6}>
                  <p style={{ margin: 0, fontSize: 13, color: 'gray' }}>Tanggal pembelian</p>
                  <p style={{ margin: 0, fontSize: 13, marginBottom: 5 }}>{el.purchaseDate && moment(el.purchaseDate).format('L')}</p>
                </Grid>
                <Grid item xs={6}>
                  <p style={{ margin: 0, fontSize: 13, color: 'gray' }}>Tempat pembelian</p>
                  <p style={{ margin: 0, fontSize: 13 }}>{el.purchasePlace}</p>
                </Grid>
                <Grid item xs={6}>
                  <p style={{ margin: 0, fontSize: 13, color: 'gray' }}>Status Klaim</p>
                  <p style={{ margin: 0, fontSize: 13, marginBottom: 5 }}>{el.statusClaim}</p>
                </Grid>
                <Grid item xs={6}>
                  <p style={{ margin: 0, fontSize: 13, color: 'gray' }}>Status</p>
                  <p style={{ margin: 0, fontSize: 13 }}>{el.isValid ? 'valid' : 'expired'}</p>
                </Grid>
              </Grid>
              <Divider />
              {
                !el.hasClaim && <Button fullWidth style={{ padding: '0px', fontSize: 13, color: '#ff3838', textTransform: 'none', padding: '3px 0px' }} onClick={() => claim(el)}>
                  Klaim Garansi
                </Button>
              }

            </Paper>
          )
        }



      </div>
      <BottomNav />
    </>
  );
};

export default Warranty;

