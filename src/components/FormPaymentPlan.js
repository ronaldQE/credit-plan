import * as React from 'react'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme, checked }) => ({
        '.MuiFormControlLabel-label': checked && {
            color: theme.palette.primary.main,
        },
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

const FormPaymentPlan = () => {
    return (
        <Box sx={{marginBottom:"50px", display:"block"}}>
            <Card sx={{ background: "#F4F5F5", width:700, margin:"auto", padding:"40px" }}>
                <CardContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <h3>Simulador de Credito</h3>

                        <RadioGroup name="use-radio-group" defaultValue="price">
                            <MyFormControlLabel value="price" label="Plan de Pagos Amortización francés PRICE" control={<Radio />} />
                            <MyFormControlLabel value="const" label="Plan de Pagos Amortización Constante" control={<Radio />} />
                            <MyFormControlLabel value="gracia" label="Plan de Pagos Amortización Constante más Perido de Gracia" control={<Radio />} />
                        </RadioGroup>

                        <Box>
                            <TextField
                                id="filled-number"
                                label="Monto del Crédito"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="filled"
                            />
                            <TextField
                                id="filled-number2"
                                label="Tasa de Interés(%)"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="filled"
                            />
                            <TextField
                                id="filled-number3"
                                label="Periodo del Crédito (meses)"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="filled"
                            />
                            <TextField
                                id="filled-number"
                                label="Periodo de Gracia (meses)"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="filled"
                            />
                        </Box>
                        <Button variant="contained" size="large">
                            Generar Plan de pagos
                        </Button>
                    </Box>
                </CardContent>
            </Card>

        </Box>

    )
}
export default FormPaymentPlan