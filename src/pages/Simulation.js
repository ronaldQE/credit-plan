import * as React from "react"
import Info from "../components/Info";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import imgAPrice from '../img/credit/APrice.PNG';
import imgInteresPrice from '../img/credit/interesPrice.PNG';
import imgKPrice from '../img/credit/kPrice.PNG';
import imgTablaPrice from '../img/credit/tablaPrice.PNG';
import TablePaymentPlan from "../components/TablePaymentPlan";


const Simulation = () => {

  const DESCRIPTION_PRICE = [
    "El sistema francés de amortización consiste en la amortización de éste mediante una renta constante de n términos. Es un sistema matemático que se utiliza para amortizar un crédito. Su característica principal radica en la cuota de amortización, ya que es igual para todo el período del préstamo, en créditos a tasa fija. Su cálculo es complejo pero en líneas generales se puede decir que el capital se amortiza en forma creciente, mientras que los intereses se calculan sobre el saldo, motivo por el cual son decrecientes. Es el sistema de amortización más difundido entre los bancos y usualmente va asociado a una tasa más baja que el crédito con sistema alemán de amortización. Sin embargo, presenta la desventaja de que si existen posibilidades de precancelar el crédito en un lapso breve de su otorgamiento, el capital adeudado sea más abultado.",
    "Cada anualidad es la suma de la cuota de interés y la cuota de amortización correspondiente al año de que se trate. Este sistema se llama también progresivo, porque a medida que transcurre el tiempo las cuotas destinadas a la amortización de capital van siendo mayores, mientras que las cuotas de interés irán disminuyendo porque el capital pendiente por amortizar irá siendo menor."
  ]

  let formulaPrince = [
    {
      description: "Para el cálculo primero se debe calcular el valor de la serie A:",
      img: imgAPrice
    },
    {
      description: "El interés es:",
      img: imgInteresPrice
    },
    {
      description: "Para de determinar el valor de la amortización k:",
      img: imgKPrice
    },
    {
      description: "Representado en una tabla será:",
      img: imgTablaPrice
    },
  ]
  return (
    <div className="App">
      <h2>Amortización de Deudas</h2>
      <Box sx={{ textAlign: "start" }}>
        <Typography variant="body2">
          Amortización es el proceso de cancelar una deuda con sus intereses por medio de pagos periódicos. La amortización toma curso cuando un prestarario le paga a su prestamista un monto de dinero en un cierto lapso de tiempo, incluyendo las correspondientes tasas de interés. La deuda puede extinguirse de una sola vez, o bien hacerlo en forma gradual por medio de pagos parciales por una determida cantidad de tiempo, la que ha sido previamente establecida.
          <br />

        </Typography>

      </Box>
      <Info
        title="Sistema de amortización francés PRICE"
        paragraph={DESCRIPTION_PRICE}
        formulaImg={null}
        descriptionFormula={[]}
      />
      {
        formulaPrince.map((element) => (
          <Box sx={{ margin: "30px" }}>
            <Typography variant="body2" sx={{ margin: "10px" }}>
              {element.description}
              <br />
            </Typography>
            <Card variant="outlined" sx={element.img === imgTablaPrice ? { width: "40%", display: "block", marginTop: "20px", marginBottom: "10px", margin: "auto" } : { width: "20%", display: "block", marginTop: "20px", marginBottom: "10px", margin: "auto" }}>

              <CardMedia
                sx={{ width: "100%", display: "block", margin: "auto" }}
                component="img"
                height="100%"
                image={element.img}
                alt="tasa"
              />
            </Card>
          </Box>

        ))

      }
      <TablePaymentPlan />

    </div>
  )
}
export default Simulation;