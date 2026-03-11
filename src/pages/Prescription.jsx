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
  const [code,setCode] = useState("")

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

    const res = await fetch(
      `${window.API_URL}/generate-prescription`,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          medicines:selected
        })
      }
    )

    const data = await res.json()

    const printContent = `
Prescription Code : ${data.code}

Medicines:
${Object.entries(selected).map(([m,q]) => `${m} x ${q}`).join("\n")}
`

    const newWindow = window.open("", "", "width=400,height=600")

    newWindow.document.write("<pre>" + printContent + "</pre>")

    newWindow.document.close()

    newWindow.print()

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

  {code && (
    <div style={{marginTop:"20px",fontWeight:"bold"}}>
      Prescription Code : {code}
    </div>
  )}

  </div>

  </div>

  </div>

  )

}