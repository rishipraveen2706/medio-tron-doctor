import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../css/prescription.css"

const medicines = [
"Paracetamol",
"Ibuprofen",
"Amoxicillin",
"Cough Syrup",
"Vitamin C"
]

export default function Prescription(){

const navigate = useNavigate()

const [selected,setSelected] = useState({})

const addMedicine = (med)=>{

setSelected(prev=>{

const qty = prev[med] ? prev[med] + 1 : 1

return {...prev,[med]:qty}

})

}

const increaseQty = (med)=>{
setSelected(prev=>({...prev,[med]:prev[med]+1}))
}

const decreaseQty = (med)=>{

setSelected(prev=>{

const qty = prev[med]-1

if(qty<=0){

const copy={...prev}

delete copy[med]

return copy

}

return {...prev,[med]:qty}

})

}

const generateCode = async ()=>{

try{

const res = await fetch("http://localhost:7000/generate-prescription",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
medicines:selected
})

})

const data = await res.json()

// print("Prescription Code : "+data.code)

/* Wait 2 seconds then go back to dashboard */

setTimeout(()=>{

navigate("/dashboard")

},1000)

}catch(err){

console.error("Error:",err)

}

}

return(

<div className="page">

<h1 className="title">Prescription Panel</h1>

<div className="container">

{/* LEFT PANEL */}

<div className="left">

<h2>Available Medicines</h2>

<div className="medicine-grid">

{medicines.map((med)=>(

<div
key={med}
className="medicine-card"
onClick={()=>addMedicine(med)}
>

💊 {med}

</div>

))}

</div>

</div>


{/* RIGHT PANEL */}

<div className="right">

<h2>Selected Medicines</h2>

<div className="table">

<div className="row header">

<span>Medicine</span>

<span style={{textAlign:"center"}}>Qty</span>

</div>


{Object.keys(selected).length === 0 && (

<p className="empty">No medicines selected</p>

)}


{Object.keys(selected).map((med)=>(

<div className="row" key={med}>

<span>{med}</span>

<div className="qty">

<button onClick={()=>decreaseQty(med)}>-</button>

<span className="qty-number">{selected[med]}</span>

<button onClick={()=>increaseQty(med)}>+</button>

</div>

</div>

))}

</div>


<button
className="generate"
onClick={generateCode}
>

Generate Prescription

</button>

</div>

</div>

</div>

)

}