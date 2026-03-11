import { useNavigate } from "react-router-dom"
import "../css/home.css"

export default function Home(){

const navigate = useNavigate()

return(

<div 
className="home-screen"
onClick={()=>navigate("/login")}
>

<div className="center-text">

<h1>SRM Hospital</h1>

<h2>Smart Medical Dispenser</h2>

<p className="tap">Tap Anywhere To Start</p>

</div>

</div>

)

}