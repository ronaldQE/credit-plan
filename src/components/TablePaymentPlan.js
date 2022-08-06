import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PaymentPlan from '../class/PaymentPlan'


let plan1 = new PaymentPlan(30000, 4.5, 6, "2022-8-7");
export default function TablePaymentPlan() {
    let data = plan1.generatePlan_Price()
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>n</TableCell>
                        <TableCell align="right">Saldo</TableCell>
                        <TableCell align="right">Amotizacion</TableCell>
                        <TableCell align="right">Interes</TableCell>
                        <TableCell align="right">Pago</TableCell>
                        <TableCell align="right">Fecha</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
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
