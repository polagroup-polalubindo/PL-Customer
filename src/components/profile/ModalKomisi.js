import React, { useContext } from 'react'
import {
  Modal,
  Grid,
  Fade,
  Backdrop,
  Divider,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Table
} from "@material-ui/core";
import { Context } from "../../context/globalState";
import CloseIcon from '@material-ui/icons/Close';

const monthName = [
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

export default function ModalKomisi({ open, close }) {
  const {
    komisi,
  } = useContext(Context);

  return (
    <Modal
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none'
      }}
      open={open}
      onClose={close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open} >
        <Grid style={{
          maxWidth: '75%',
          width: 400,
          backgroundColor: 'white',
          borderRadius: 5,
          padding: 20
        }}>
          <Grid style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <b>Daftar Komisi Perbulan</b>
            <CloseIcon style={{ cursor: 'pointer' }} onClick={() => close()} />
          </Grid>
          <Divider style={{ margin: '5px 0px' }} />
          <Grid style={{ maxHeight: 500, overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="5%" style={{ padding: '10px 5px', fontWeight: 'bold' }}>No</TableCell>
                  <TableCell width="30%" style={{ padding: '10px 5px', fontWeight: 'bold' }}>Bulan</TableCell>
                  <TableCell width="30%" style={{ padding: '10px 5px', fontWeight: 'bold' }}>Total Komisi</TableCell>
                  <TableCell width="35%" style={{ padding: '10px 5px', fontWeight: 'bold' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {
                  komisi.map((el, index) =>
                    <TableRow>
                      <TableCell style={{ padding: 5, textAlign: 'center' }}>{index + 1}</TableCell>
                      <TableCell style={{ padding: 5 }}>{monthName[+el.month]} {el.year}</TableCell>
                      <TableCell style={{ padding: 5 }}>Rp. {Number(el.totalKomisi).toLocaleString(
                        "id-ID"
                      )}</TableCell>
                      <TableCell style={{ padding: 5 }}>{el.status}</TableCell>
                    </TableRow>
                  )
                }
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  )
}
