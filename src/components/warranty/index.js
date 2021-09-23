import React, { useContext, useEffect, useState } from "react";
import { useStyles } from "./styles";
import {
  Paper,
  Typography,
  Button,
  Grid,
  Divider
} from "@material-ui/core";
import { useHistory } from "react-router";
import { Context } from "../../context/globalState";
import { BottomNav } from '../bottomNav'
import moment from 'moment';
import ModalFAQ from './ModalFAQ';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from "sweetalert2";

const Warranty = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    fetchWarranty,
    dataWarranty,
    deleteWarranty,
    fetchUserData,
    userData,
    refCode, } = useContext(Context);
  const [openModalFAQ, setOpenModalFAQ] = useState(false)

  useEffect(() => {
    fetchUserData()
    handleOpenModalFAQ()
  }, [])

  useEffect(() => {
    if (userData?.id) {
      fetchWarranty(`?user=${userData.id}`)
    }
  }, [userData])

  function claim(data) {
    history.push(refCode ? `/warranty/claim?ref=${refCode}` : "/warranty/claim", { data })
  }

  const handleOpenModalFAQ = () => {
    setOpenModalFAQ(!openModalFAQ)
  }

  const deleteData = async (id) => {
    Swal.fire({
      title: "Hapus warranty permanen?",
      showCancelButton: true,
      confirmButtonText: `Iya`,
      cancelButtonText: `Batal`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteWarranty(id)
        fetchWarranty(`?user=${userData.id}`)
      }
    });
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
              <Grid style={{
                backgroundColor: '#c4cdc7', padding: '0.5rem 1rem', borderTopRightRadius: 10, borderTopLeftRadius: 10, textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <Grid style={{ width: 65 }} />
                <p style={{ margin: 0 }}>{el.noMachine}</p>
                {
                  (!el.hasClaim && el.isValid) && <Grid style={{ width: 65, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="outlined" style={{ height: 25, padding: 0, minWidth: 30, backgroundColor: 'white', color: 'red' }} onClick={() => deleteData(el.id)}><DeleteIcon /></Button>
                    <Button variant="outlined" style={{ height: 25, padding: 0, minWidth: 30, backgroundColor: 'white' }} onClick={() => history.push("/warranty/form", { data: el })}><EditIcon /></Button>
                  </Grid>
                }
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
                  <p style={{ margin: 0, fontSize: 13 }}>{el.isValid ? 'Valid' : 'Expired'}</p>
                </Grid>
              </Grid>
              <Divider />
              {
                (!el.hasClaim && el.isValid) && <Button fullWidth style={{ padding: '0px', fontSize: 13, color: '#ff3838', textTransform: 'none', padding: '3px 0px' }} onClick={() => claim(el)}>
                  Klaim Garansi
                </Button>
              }

            </Paper>
          )
        }
      </div>

      {
        openModalFAQ && <ModalFAQ open={openModalFAQ} handleClose={handleOpenModalFAQ} />
      }

      <BottomNav />
    </>
  );
};

export default Warranty;

