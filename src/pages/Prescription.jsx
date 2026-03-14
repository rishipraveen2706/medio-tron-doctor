
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../css/prescription.css"

const medicines = [

{id:1,name:"Paracetamol"},
{id:2,name:"Ibuprofen"},
{id:3,name:"Amoxicillin"},
{id:4,name:"Cough Syrup"},
{id:5,name:"Vitamin C"},
{id:6,name:"Tablet 6"},
{id:7,name:"Tablet 7"},
{id:8,name:"Tablet 8"},
{id:9,name:"Tablet 9"},
{id:10,name:"Tablet 10"},
{id:11,name:"Tablet 11"},
{id:12,name:"Tablet 12"},
{id:13,name:"Tablet 13"},
{id:14,name:"Tablet 14"},
{id:15,name:"Tablet 15"}

]

export default function Prescription(){

  const navigate = useNavigate()

  const [selected,setSelected] = useState({})
  const [code,setCode] = useState("")

  // ADD MEDICINE
  const addMedicine = (id,name)=>{

    setSelected(prev=>{

      const current = prev[id]

      if(!current){
        return {...prev,[id]:{name:name,qty:1}}
      }

      if(current.qty >= 3) return prev

      return {...prev,[id]:{...current,qty:current.qty+1}}

    })

  }

  // INCREASE
  const increaseQty = (id)=>{

    setSelected(prev=>{

      const current = prev[id]

      if(!current || current.qty >= 3) return prev

      return {...prev,[id]:{...current,qty:current.qty+1}}

    })

  }

  // DECREASE
  const decreaseQty = (id)=>{

    setSelected(prev=>{

      const current = prev[id]
      if(!current) return prev

      if(current.qty === 1){
        const copy = {...prev}
        delete copy[id]
        return copy
      }

      return {...prev,[id]:{...current,qty:current.qty-1}}

    })

  }

  // GENERATE PRESCRIPTION
  const generateCode = async ()=>{

    if(Object.keys(selected).length === 0){
      alert("Please select medicines first")
      return
    }

    try{

      // convert to {id:qty} format for backend
      const sendData = {}

      Object.keys(selected).forEach(id=>{
        sendData[id] = selected[id].qty
      })

      const res = await fetch(
        `${window.API_URL}/generate-prescription`,
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            medicines:sendData
          })
        }
      )

      const data = await res.json()

      setCode(data.code)

      alert("Prescription Code : " + data.code)

      setTimeout(()=>{
        navigate("/dashboard")
      },1000)

    }catch(err){

      console.error("Error:",err)
      alert("Server error")

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
  key={med.id}
  className="medicine-card"
  onClick={()=>addMedicine(med.id,med.name)}
  >

  💊 {med.name}

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

  {Object.keys(selected).map((id)=>{

    const med = selected[id]

    return (

    <div className="row" key={id}>

      <span>{med.name}</span>

      <div className="qty">

        <button onClick={()=>decreaseQty(id)}>-</button>

        <span className="qty-number">{med.qty}</span>

        <button
        onClick={()=>increaseQty(id)}
        disabled={med.qty >= 3}
        >
        +
        </button>

      </div>

    </div>

    )

  })}

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
