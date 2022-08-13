import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const Info = (props) => {

    return (
        <Box sx={{ minWidth: 275, marginTop:"20px" }}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent sx={{ textAlign: "start" }}>

                        <Typography variant="h5" component="div">
                            {props.title}
                        </Typography>

                        {props.paragraph.map((parr)=>(
                            <Typography variant="body2">
                            {parr}
                            <br />

                        </Typography>
                        ))}
                        {props.formulaImg ? <Card variant="outlined" sx={{ width: "220px", display: "block",margin: "auto", marginBlock:2 , marginBottom: "10px",  }}>

                            <CardMedia
                                sx={{ width: 200, display: "block", margin:"auto" }}
                                component="img"
                                height="100%"
                                image={props.formulaImg}
                                alt="tasa"
                            />
                        </Card> : null}
                        <Box>
                            {
                                props.descriptionFormula.map((des, index) => (
                                    <Typography key={index} variant="body2">
                                        {des}
                                        <br />
                                    </Typography>

                                ))
                            }
                        </Box>
                    </CardContent>
                    <CardActions>
                        {/* <Button size="small">Learn More</Button> */}
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    )
}


export default Info;
