import { useNavigate } from "react-router-dom"
import { useState } from "react"
import "../css/patient.css"

export default function NewPatient(){

const navigate = useNavigate()

const [name,setName] = useState("")
const [phone,setPhone] = useState("")
const [age,setAge] = useState("")
const [issue,setIssue] = useState("")

const next = ()=>{

if(!name || !phone || !age){

alert("Fill all details")
return

}

navigate("/prescription",{
state:{name,phone,age,issue}
})

}

return(

<div className="patient">

<h2>New Patient</h2>

<input
placeholder="Patient Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Phone"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
/>

<input
placeholder="Age"
value={age}
onChange={(e)=>setAge(e.target.value)}
/>

<input
placeholder="Health Issue"
value={issue}
onChange={(e)=>setIssue(e.target.value)}
/>

<button onClick={next}>
Next
</button>

</div>

)

}