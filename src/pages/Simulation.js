import * as React from "react"
import Info from "../components/Info";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
//import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import imgAPrice from '../img/credit/APrice.PNG';
import imgInteresPrice from '../img/credit/interesPrice.PNG';
import imgKPrice from '../img/credit/kPrice.PNG';
import imgKConst from '../img/credit/kConst.PNG';
import imgAConst from '../img/credit/AConst.PNG';
import imgKGracia from '../img/credit/kGracia.PNG';
import imgTablaPrice from '../img/credit/tablaPrice.PNG';
import imgTablaConst from '../img/credit/tablaConst.PNG';
import imgTablaGracia from '../img/credit/tablaGracia.PNG';
import TablePaymentPlan from "../components/TablePaymentPlan";
import FormPaymentPlan from "../components/FormPaymentPlan";

const DESCRIPTION_PRICE = [
  "El sistema francés de amortización consiste en la amortización de éste mediante una renta constante de n términos. Es un sistema matemático que se utiliza para amortizar un crédito. Su característica principal radica en la cuota de amortización, ya que es igual para todo el período del préstamo, en créditos a tasa fija. Su cálculo es complejo pero en líneas generales se puede decir que el capital se amortiza en forma creciente, mientras que los intereses se calculan sobre el saldo, motivo por el cual son decrecientes. Es el sistema de amortización más difundido entre los bancos y usualmente va asociado a una tasa más baja que el crédito con sistema alemán de amortización. Sin embargo, presenta la desventaja de que si existen posibilidades de precancelar el crédito en un lapso breve de su otorgamiento, el capital adeudado sea más abultado.",
  "Cada anualidad es la suma de la cuota de interés y la cuota de amortización correspondiente al año de que se trate. Este sistema se llama también progresivo, porque a medida que transcurre el tiempo las cuotas destinadas a la amortización de capital van siendo mayores, mientras que las cuotas de interés irán disminuyendo porque el capital pendiente por amortizar irá siendo menor."
]

const DESCRIPTION_CONST = [
  "En este tipo de préstamos la amortización de capital es constante en todas las cuotas. También y a efectos de simplificar, vamos a considerar que el tipo de interés es constante durante toda la operación, aunque este requisito no es necesario. Calculamos fácilmente el importe de la amortización de capital constante. Basta con dividir el importe del préstamo por el número de períodos."
]

const FORMULA_CONST = [
  {
    description: "La amortización será:",
    img: imgKConst
  },
  {
    description: "El interés es:",
    img: imgInteresPrice
  },
  {
    description: "La cuota (Pago) es:",
    img: imgAConst
  },
  {
    description: "Representado en una tabla será:",
    img: imgTablaConst
  },
]
const DESCRIPTION_GRACIA = [
  "La facilidad que se brinda con este concepto es que no existe amortización a capital durante el periodo o los periodos de gracia y solo se cancela interés ya sea para la amortización francés o amortización constante."
]

const FORMULA_GRACIA = [
  {
    description: "La amortización constante será:",
    img: imgKGracia
  },
  {
    description: "El interés es:",
    img: imgInteresPrice
  },
  {
    description: "La cuota (Pago) es:",
    img: imgAConst
  },
  {
    description: "Representado en una tabla será:",
    img: imgTablaGracia
  },
]

const Simulation = () => {

  const [dataTable, setDataTable] = React.useState([])
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
          <br />
          <Button variant="contained" href="#simulation">
            Simular Credito
          </Button>
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
            <Card variant="outlined" sx={element.img === imgTablaPrice ? styleImg(300) : styleImg(200)}>

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
      <Info
        title="Sistema de amortización constante"
        paragraph={DESCRIPTION_CONST}
        formulaImg={null}
        descriptionFormula={[]}
      />
      {
        FORMULA_CONST.map((element) => (
          <Box sx={{ margin: "30px" }}>
            <Typography variant="body2" sx={{ margin: "10px" }}>
              {element.description}
              <br />
            </Typography>
            <Card variant="outlined" sx={element.img === imgTablaConst ? styleImg(300) : styleImg(200)}>

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
      <Info
        title="Período de Gracia"
        paragraph={DESCRIPTION_GRACIA}
        formulaImg={null}
        descriptionFormula={[]}
      />
      {
        FORMULA_GRACIA.map((element) => (
          <Box sx={{ margin: "30px" }}>
            <Typography variant="body2" sx={{ margin: "10px" }}>
              {element.description}
              <br />
            </Typography>
            <Card variant="outlined" sx={element.img === imgTablaGracia ? styleImg(300) : styleImg(200)}>

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
      <Box id="simulation">
        <FormPaymentPlan setDataTable={setDataTable} />
      </Box>
      <Box sx={{ display: "block", margin: "auto" }}>
        <h3>Plan de Crédito</h3>
        <TablePaymentPlan data={dataTable} />
        <br />
      </Box>

    </div>
  )
}

const styleImg = (widthImg) => {
  return ({
    width: widthImg,
    display: "block",
    margin: "auto"
  })
}
export default Simulation;