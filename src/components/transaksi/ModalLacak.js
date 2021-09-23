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

import Swal from "sweetalert2";

const statusIDExpress = {
  "00": "Picked up",
  "03": "Loading (on Vehicle to Branch)",
  "04": "Sending to Branch",
  "05": "Arrival at Branch",
  "06": "Unloading at Branch",
  "09": "Delivery to Customer",
  "10": "Delivered (POD)",
  "14": "Return on process (based on return confirmation)",
  "16": "Return POD",
  "18": "Problem on Shipment",
  "19": "Cancelled by IDE System",
  "20": "Cancelled by Customer",
  "21": "Pickup failure",
  "22": "Order created",
}

const ModalLacak = ({ open, handleClose, id }) => {
  const [data, setData] = useState(
  //   {
  //   noResi: "IDE005617475152",
  //   tanggalPengiriman: 1628149384,
  //   kurir: "ID Express (STD)",
  //   namaPembeli: "Muhamad Prasetio",
  //   kecamatan: "Ciledug",
  //   kota: "Tangerang",
  //   historys: [
  //     {
  //       "waybillNo": "IDD955255915888",
  //       "operationType": "01",
  //       "operationTime": 1294890876859,
  //       "courierName": "CourierAdmin",
  //       "currentBranch": "HEAD QUARTER",
  //       "nextBranchName": "BranchName",
  //       "relation": "01",
  //       "signer": "signer1"
  //     },
  //     {
  //       "waybillNo": "IDD955255915888",
  //       "operationType": "03",
  //       "operationTime": 1294890876859,
  //       "courierName": "CourierAdmin",
  //       "currentBranch": "HEAD QUARTER",
  //       "nextBranchName": "BranchName",
  //       "relation": "01",
  //       "signer": "signer1"
  //     }
  //   ]
  // },
  {
    noResi: "",
    tanggalPengiriman: Date.now(),
    kurir: "",
    namaPembeli: "",
    kecamatan: "",
    kota: "",
    historys: []
  }
  )
  const { trackingOrder } = useContext(Context);

  useEffect(() => {
    async function fetch() {
      let data = await trackingOrder(id)
      setData(data)
    }

    fetch()
  }, [])

  const formatDate = (date) => {
    let newDate = new Date(date)
    let monthName = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember'
    ]

    return `${newDate.getDate()} ${monthName[newDate.getMonth()]} ${newDate.getFullYear()}`
  }

  const formatHour = (date) => {
    let newDate = new Date(date)
    let hour = newDate.getHours()
    let minute = newDate.getMinutes()

    if (hour < 10) hour = `0${hour}`
    if (minute < 10) minute = `0${minute}`

    return `${hour}:${minute} WIB`
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
            <b style={{ fontSize: 13, color: 'gray' }}>Nomor Resi</b>
            <p style={{ margin: 0, marginTop: 5 }}>{data.noResi}</p>
          </Grid>
          <Divider />
          <Grid style={{ padding: "10px 20px" }}>
            <Grid container style={{ display: 'flex', }}>
              <Grid item xs={6} style={{ marginBottom: 10 }}>
                <b style={{ fontSize: 13, color: 'gray' }}>Tanggal Pengiriman</b>
                <p style={{ margin: 0, marginTop: 5 }}>{formatDate(data.tanggalPengiriman)}</p>
              </Grid>
              <Grid item xs={6} style={{ marginBottom: 10 }}>
                <b style={{ fontSize: 13, color: 'gray' }}>Kurir</b>
                <p style={{ margin: 0, marginTop: 5 }}>{data.kurir}</p>
              </Grid>
            </Grid>
            <Grid>
              <b style={{ fontSize: 13, color: 'gray' }}>Pembeli</b>
              <p style={{ margin: 0, marginTop: 5 }}>{data.namaPembeli}</p>
              <p style={{ margin: 0 }}>{`${data.kecamatan}, ${data.kota}`}</p>
            </Grid>
          </Grid>
          <Divider />
          <Grid style={{ padding: '0px 20px 20px' }}>
            <Timeline style={{ margin: 0 }} >
              {
                data.historys.map((el, index) =>
                  <TimelineItem >
                    <TimelineOppositeContent
                      style={{ display: 'none' }}
                    />
                    <TimelineSeparator>
                      <TimelineDot color={index === 0 ? "secondary" : ""} />
                      {
                        index !== data.historys.length - 1 && <TimelineConnector color={index === 0 ? "secondary" : ""} />
                      }
                    </TimelineSeparator>
                    <TimelineContent style={{ paddingRight: 0 }}>
                      <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                        <p style={{ margin: 0, color: index === 0 ? "#f50057" : null, fontSize: 13 }}>{formatDate(el.operationTime)}</p>
                        <p style={{ margin: 0, color: index === 0 ? "#f50057" : null, fontSize: 13 }}>{formatHour(el.operationTime)}</p>
                      </Grid>
                      {/* <p style={{ margin: 0, fontSize: 13 }}>{statusIDExpress[el.operationType]}</p> */}
                      <p style={{ margin: 0, fontSize: 14 }}>{
                        el.operationType === "Pick up scan"
                          ? `Pesanan berhasil di pick up`
                          : el.operationType === "Arrival scan"
                            ? `Pesanan telah tiba di ${data.kecamatan}`
                            : el.operationType === "Delivery scan"
                              ? `Pesanan telah dibawa oleh kurir [${el.courierName}]`
                              : el.operationType === "POD scan"
                                ? `Pesanan telah sampai. Penerima ${el.signer} (${el.relation})`
                                : el.operationType === "Return POD Scan"
                                  ? `Pengembalian pesanan telah sampai.`
                                  : el.operationType === "Create Return Bill"
                                    ? `Membuat Tagihan Pengembalian pesanan`
                                    : el.operationType === "Confirm Return Bil"
                                      ? `Konfirmasi Pembayaran Kembali`
                                      : el.operationType === "Problem On Shipment scan"
                                      && `Masalah Pada Pengiriman.`
                      }</p>
                      {
                        el.operationType === "Problem On Shipment scan" && <p style={{ margin: 0, fontSize: 14 }}>
                          {`${el.description.split(',')[1][1].toUpperCase()}${el.description.split(',')[1].slice(2)}`}
                        </p>

                      }
                    </TimelineContent>
                  </TimelineItem>
                )
              }
            </Timeline>
          </Grid>
        </Grid>
      </Fade>
    </Modal >
  );
};

export default ModalLacak;
