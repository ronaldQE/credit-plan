import Button from '@mui/material/Button'
import {Link, useNavigate} from 'react-router-dom'

function Home() {
    let navigate = useNavigate()
    return (
        <div className="App">
            <h1>Matematica financiera</h1>
            <br />
            <Button variant="contained" onClick={()=>{navigate("/sim")}} >
                Generador de plan Crédito
            </Button>
            <br />
        </div>
    )
}
export default Home;