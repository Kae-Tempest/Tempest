import {useState} from 'react'
import { BiPlus } from 'react-icons/bi'
import { AddSensorModal } from './AddSensorModal'

export function AddSensor() {
    const [Show, setShow] = useState(false)

    const handleModal = () => {
        setShow(!Show)
    }

  return (
    <>
    <button className="absolute bottom-5 right-5 bg-ctp-lavender text-white font-bold uppercase p-1 rounded-full border border-ctp-overlay2 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={handleModal}>
        <BiPlus size={32} color='#000'/>
    </button>
    {Show ? <AddSensorModal onClose={handleModal}/> : ''} 
    </>
  )
}
