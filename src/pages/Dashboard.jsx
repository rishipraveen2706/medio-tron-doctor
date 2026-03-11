import { useNavigate } from "react-router-dom"
import "../css/dashboard.css"

export default function Dashboard(){

const navigate = useNavigate()

return(

<div className="dashboard">

<h1 className="title">Doctor Dashboard</h1>

<div className="card-container">

<div 
className="card"
onClick={()=>navigate("/new-patient")}
>
<div className="icon">➕</div>
<h2>New Patient</h2>
<p>Create new prescription</p>
</div>

<div className="card">
<div className="icon">📋</div>
<h2>Visited Patients</h2>
<p>View patient history</p>
</div>

</div>

</div>

)

}