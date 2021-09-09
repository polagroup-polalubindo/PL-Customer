import React, { useContext, useState, useEffect } from "react";
import {
  Modal,
  Grid,
  Button,
  Fade,
  Backdrop,
  Divider,
} from "@material-ui/core";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from "@material-ui/lab";
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from "react-router-dom";
import { Context } from "../../context/globalState";
import moment from 'moment';

import Swal from "sweetalert2";

const ModalVoucher = ({ open, handleClose, id, setVoucher, voucher1, voucher2, cancelVoucher, cart }) => {

  const { fetchVoucher, dataVoucher, totalPrice, carts } = useContext(Context);
  const [DataVoucher, setDataVoucher] = useState([])
  const [disabledVoucher1, setDisabledVoucher1] = useState(false) //voucher cant combine
  const [disabledVoucher2, setDisabledVoucher2] = useState(false) //voucher can combine
  const [selectedVoucher1, setSelectedVoucher1] = useState(null) //voucher cant combine
  const [selectedVoucher2, setSelectedVoucher2] = useState(null) //voucher can combine

  useEffect(() => {
    async function fetch() {
      await fetchVoucher()

      setSelectedVoucher1(voucher1)
      setSelectedVoucher2(voucher2)
      if (voucher1) setDisabledVoucher1(true)
      if (voucher2) setDisabledVoucher2(true)
    }
    fetch()
  }, [])

  useEffect(() => {
    let newList = []
    dataVoucher.forEach(voucher => {
      let checkProduct
      voucher.VoucherProducts.forEach(element => {
        checkProduct = carts.find(product => product.product.id === element.productId)
      })

      if (voucher.forAll || (!voucher.forAll && checkProduct)) {
        if (voucher.minimumPurchase === 0 || totalPrice > voucher.minimumPurchase) {
          newList.push(voucher)
        }
      }
    })

    setDataVoucher(newList)
  }, [dataVoucher])

  const selectVoucher = (voucher) => {
    if (voucher.canCombine) {

      if (selectedVoucher1?.id === voucher.id || selectedVoucher2?.id === voucher.id) {
        if (selectedVoucher1?.id === voucher.id) {
          if (selectedVoucher2) {
            setSelectedVoucher1(selectedVoucher2)
            setSelectedVoucher2(null)
            setDisabledVoucher2(false)
          }
          else {
            setSelectedVoucher1(null)
            setDisabledVoucher1(false)
          }
        } else {
          setSelectedVoucher2(null)
          setDisabledVoucher2(false)
        }
      } else {
        if (!selectedVoucher1) {
          setDisabledVoucher1(true)
          setSelectedVoucher1(voucher)
        } else {
          setDisabledVoucher2(true)
          setSelectedVoucher2(voucher)
        }
      }
    } else {
      if (selectedVoucher1?.id === voucher.id) {
        setSelectedVoucher1(null)
        setDisabledVoucher1(false)
        setDisabledVoucher2(false)
      } else {
        setSelectedVoucher1(voucher)
        setDisabledVoucher1(true)
        setDisabledVoucher2(true)
      }
    }
  }

  const submit = () => {
    setVoucher(selectedVoucher1, selectedVoucher2)
  }

  return (
    <Modal
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none'
      }}
      open={open}
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
          maxHeight: '80%',
          minHeight: 200,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 10,
          position: 'relative'
        }}>
          <CloseIcon style={{ position: 'absolute', right: 15, top: 15, cursor: 'pointer' }} onClick={handleClose} />
          <Grid style={{ padding: "20px 20px 10px", display: 'flex' }}>
            <b style={{ fontSize: 14, color: '#414443', marginRight: 10 }}>Daftar Voucher</b>
            <p style={{ margin: 0, fontSize: 14, color: 'gray' }}>{selectedVoucher2 ? '(2 Voucher terpilih)' : (selectedVoucher1 ? '(1 Voucher terpilih)' : '')}</p>
          </Grid>
          <Divider />
          <Grid style={{
            overflowX: 'auto',
          }}>
            {/* <Divider />
            <p style={{ margin: 0 }}>Voucher kombinasi</p>
            {
              [...voucherCanCombine, ...voucherCanCombine, ...voucherCanCombine].map(voucher =>
                <Grid style={{ margin: '10px 20px', cursor: 'pointer', border: '1px solid gray', padding: 10, borderRadius: 5 }}>
                  <p style={{ margin: 0, fontSize: 14 }}>{voucher.name}</p>
                  <p style={{ margin: 0, fontSize: 12, color: 'gray' }}>{voucher.keterangan}</p>
                  <p style={{ margin: 0, color: 'gray', fontSize: 9 }}>Berlaku sampai dengan {voucher.periodeEnd}</p>
                </Grid>
              )
            }
            <Divider /> */}
            {
              DataVoucher.map(voucher =>
                // <>
                //   {
                //     (voucher.minimumPurchase === 0 || totalPrice > voucher.minimumPurchase)
                //     && 
                    <Grid style={{
                      margin: '10px 20px',
                      cursor:
                        voucher.canCombine ? (disabledVoucher2 && selectedVoucher1?.id !== voucher.id && selectedVoucher2?.id !== voucher.id ? null : 'pointer') : (disabledVoucher1 && selectedVoucher1?.id !== voucher.id && selectedVoucher2?.id !== voucher.id ? null : 'pointer'),
                      border: '1px solid gray',
                      padding: 10,
                      borderRadius: 5,
                      position: 'relative',
                      backgroundColor: (selectedVoucher1?.id === voucher.id || selectedVoucher2?.id === voucher.id) ? '#6AFF4D' : null
                    }} onClick={() => voucher.canCombine ? (disabledVoucher2 && selectedVoucher1?.id !== voucher.id && selectedVoucher2?.id !== voucher.id ? null : selectVoucher(voucher)) : (disabledVoucher1 && selectedVoucher1?.id !== voucher.id && selectedVoucher2?.id !== voucher.id ? null : selectVoucher(voucher))}>
                      {
                        voucher.canCombine
                          ? (
                            disabledVoucher2 && selectedVoucher1?.id !== voucher.id && selectedVoucher2?.id !== voucher.id &&
                            <Grid style={{ position: 'absolute', zIndex: 5, backgroundColor: 'black', opacity: 0.5, top: 0, bottom: 0, left: 0, right: 0 }} />) : (disabledVoucher1 && selectedVoucher1?.id !== voucher.id && selectedVoucher2?.id !== voucher.id &&
                              <Grid style={{ position: 'absolute', zIndex: 5, backgroundColor: 'black', opacity: 0.5, top: 0, bottom: 0, left: 0, right: 0 }} />)
                      }
                      <p style={{ margin: 0, fontSize: 14, }}>{voucher.name}</p>
                      <p style={{ margin: 0, fontSize: 12, color: '#414443' }}>{voucher.keterangan}</p>
                      <p style={{ margin: 0, color: '#414443', fontSize: 9 }}>Berlaku sampai dengan {moment(voucher.periodeEnd).format('L')}</p>
                    </Grid>
                //   }
                // </>
              )
            }
          </Grid>
          <Divider />
          <Grid style={{ padding: '10px 20px', textAlign: 'right' }}>
            <Button variant="outlined" style={{ marginRight: 10 }} onClick={cancelVoucher}>Batal</Button>
            {
              selectedVoucher1 && <Button variant="contained" style={{ backgroundColor: "green", color: 'white' }} onClick={submit}>Pakai Voucher</Button>
            }
          </Grid>
        </Grid>
      </Fade>
    </Modal >
  );
};

export default ModalVoucher;
