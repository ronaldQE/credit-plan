import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const headTable=["N°","Saldo","Amortización","Interés","Pago","Fecha"]
export default function TablePaymentPlan(props) {    
    return (
        <TableContainer component={Paper}>
            <Table  size="small" aria-label="a dense table">
                <TableHead sx={{background:"#CCCCCC"}}>
                    <TableRow>
                        { headTable.map((title)=>(
                            title==="N°"?
                            <TableCell align="center">{title}</TableCell>
                            :
                            <TableCell align="right">{title}</TableCell>
                        ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align="center">
                                {row.num}
                            </TableCell>
                            <TableCell align="right">{row.saldo}</TableCell>
                            <TableCell align="right">{row.amortizacion}</TableCell>
                            <TableCell align="right">{row.interes}</TableCell>
                            <TableCell align="right">{row.pago}</TableCell>
                            <TableCell align="right">{row.fecha}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
