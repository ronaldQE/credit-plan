import React, { useState } from 'react'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import PaymentPlan from '../class/PaymentPlan';

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme, checked }) => ({
        '.MuiFormControlLabel-label': checked ? {
            color: theme.palette.primary.main,
            fontSize: 16,
        }:{fontSize: 14},
       
       
    }),
);

function MyFormControlLabel(props) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
        checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {
    /**
     * The value of the component.
     */
    value: PropTypes.any,
};


const FormPaymentPlan = (props) => {
    const [valueDate, setValueDate] = useState(new Date());
    const [valueRadio, setValueRadio] = useState('price');
    //const [showGracia, setShowGracia] = useState(false);
    const [tasa, setTasa] = useState('anual');
    //const [gracia, setGracia] = useState(0);


    const [datos, setDatos] = useState({
        monto: "",
        tasa: "",
        periodo: "",
        gracia: ""

    })
    // const [datosCal, setDatosCal] = useState({
    //     monto: '',
    //     tasa: '',
    //     periodo: '',
    //     gracia: '',
    //     fecha: ''

    // })

    const handleDateChange = (newValue) => {
        console.log(newValue)
        setValueDate(newValue);
        //console.log(newValue.getDate()) 

    };
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })

    }
    const calcule = () => {
        //console.log(datos)
        props.setDataCredit({
            monto: datos.monto,
            tasa: datos.tasa,
            periodo: datos.periodo,
            tipoTasa: tasa,
            gracia: datos.gracia,
            tipoCredit:valueRadio
        })
        let tasaI = 0
        if(tasa === "anual"){
            tasaI = datos.tasa/12
        }else{
            tasaI = datos.tasa
        }
        const paymentPlan = new PaymentPlan(datos.monto, tasaI, datos.periodo, valueDate)
        if(valueRadio === "price"){
            props.setDataTable(paymentPlan.generatePlan_Price())
            //console.table(paymentPlan.getTotales())
            
        }
        if(valueRadio === "const"){
           props.setDataTable( paymentPlan.generatePlan_Const())
           //console.table(paymentPlan.getTotales())

        }
        if(valueRadio === "gracia"){
            props.setDataTable(paymentPlan.generatePlan_Const_Gracia(datos.gracia))
            //console.table(paymentPlan.getTotales())

        }
        //clearForm()
    }
    // const clearForm = () => {
    //     setDatos({
    //         monto: "",
    //         tasa: "",
    //         periodo: "",
    //         gracia: ""
    //     })
    //     setTasa("anual")
    // }

    const handleRadioChange = (event) => {
        setValueRadio(event.target.value);
        //console.log(event.target.value)
    }

    const handleTasaChange = (event) => {
        //console.log(event.target.value)
        setTasa(event.target.value)
    }

    return (
        <Box sx={{ marginBottom:5, display: "block" }}>
            <Card sx={{ background: "#F4F5F5", margin: "auto", paddingInline:2 }}>
                <CardContent>

                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                            //'& .MuiForm-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <h3>Simulador de Credito</h3>
                        <FormLabel id="demo-radio-buttons-group-label">Plan de Pagos Amortización:</FormLabel>
                        <RadioGroup
                            name="use-radio-group"
                            onChange={handleRadioChange}
                            value={valueRadio}
                            
                        >
                            <MyFormControlLabel   value="price" label="Francés PRICE" control={<Radio />} />
                            <MyFormControlLabel value="const" label="Constante" control={<Radio />} />
                            <MyFormControlLabel value="gracia" label="Constante más Perido de Gracia" control={<Radio />} />
                        </RadioGroup>

                        <Box >
                            <Stack spacing={0} sx={{display:"block", margin:"auto"}}>
                                <TextField
                                    id="filled-number"
                                    name="monto"
                                    label="Monto del Crédito"
                                    type="number"
                                    value={datos.monto}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    onChange={handleInputChange}
                                    //helperText={datos.monto}

                                />
                                 <FormControl variant="filled" sx={{m:1, minWidth: "215px" }} >
                                    <InputLabel id="demo-simple-select-filled-label">Perido de tasa</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={tasa}
                                        onChange={handleTasaChange}
                                    >
                                        <MenuItem value="anual">Anual</MenuItem>
                                        <MenuItem value="mensual">Mensual</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    id="filled-number2"
                                    name="tasa"
                                    label="Tasa de Interés(%)"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    value={datos.tasa}
                                    onChange={handleInputChange}

                                />
                                <TextField
                                    id="filled-number3"
                                    name="periodo"
                                    label="Periodo del Crédito (meses)"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    value={datos.periodo}
                                    onChange={handleInputChange}

                                />
                                {valueRadio === "gracia" && <TextField
                                    id="filled-number"
                                    name="gracia"
                                    label="Periodo de Gracia (meses)"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    value={datos.gracia}
                                    onChange={handleInputChange}

                                />}
                                <LocalizationProvider dateAdapter={AdapterDateFns}>

                                    <DesktopDatePicker
                                        label="Fecha Primera Cuota"
                                        inputFormat="dd/MM/yyyy"
                                        value={valueDate}
                                        onChange={handleDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>


                            </Stack>
                        </Box>
                        <Button variant="contained" size="large" onClick={calcule}>
                            Generar Plan de pagos
                        </Button>
                    </Box>
                </CardContent>
            </Card>

        </Box>

    )
}
export default FormPaymentPlan