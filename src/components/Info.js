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
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent sx={{ textAlign: "start" }}>

                        <Typography variant="h5" component="div">
                            {props.title}
                        </Typography>

                        <Typography variant="body2">
                            {props.paragraph}
                            <br />

                        </Typography>
                        <Card variant="outlined" sx={{ width: "220px", display: "block", marginTop: "10px", marginBottom: "10px", margin: "auto" }}>

                            <CardMedia
                                sx={{ width: "200px", display: "block", margin: "auto" }}
                                component="img"
                                height="100%"
                                image={props.formulaImg}
                                alt="tasa"
                            />
                        </Card>
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
