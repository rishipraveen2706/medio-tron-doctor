import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

export default function Login(){

const navigate = useNavigate();

const [doctorId,setDoctorId] = useState("");
const [password,setPassword] = useState("");

const handleLogin = () => {

if(doctorId === "DOC101" && password === "1234"){

navigate("/dashboard");

}else{

alert("Invalid Doctor ID or Password");

}

};

return(

<div className="login">

<h2>Doctor Login</h2>

<input
placeholder="Doctor ID"
value={doctorId}
onChange={(e)=>setDoctorId(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={handleLogin}>Login</button>

</div>

);

}