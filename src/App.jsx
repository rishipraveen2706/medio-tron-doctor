import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewPatient from "./pages/NewPatient";
import Prescription from "./pages/Prescription";

export default function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/dashboard" element={<Dashboard/>}/>
<Route path="/new-patient" element={<NewPatient/>}/>
<Route path="/prescription" element={<Prescription/>}/>

</Routes>

</BrowserRouter>

)

}