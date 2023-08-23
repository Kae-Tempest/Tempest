import {useState} from 'react'
import { HiOutlineXMark } from 'react-icons/hi2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { URL_API } from '../../config'
export function EditModal({id, onClose}) {
    const [emplacement, setEmplacement] = useState('Salon')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [error, setError] = useState('')
    const naviate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`http://${URL_API}/updateSensor/${id}`, {
                name : emplacement,
                latitude : latitude,
                longitude : longitude
            })
            location.reload()
        } catch (error) {
            setError(error.response.data.msg)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            await axios.delete(`http://${URL_API}/deleteSensor/${id}`)
            naviate('/')
        } catch (error) {
            setError(error.response.data.msg)
        }
    }


  return (
        <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-[1001] outline-none focus:outline-none justify-center items-center flex bg-ctp-crust/75 font-['Arial_Black']">
        <div className="relative w-1/2 my-6 max-w-5xl">
            <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-ctp-base outline-none focus:outline-none border-ctp-peach">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-xl font-semibold text-ctp-text pt-3 ml-auto">Update Sensor</h3>
                <button className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={onClose}>
                    <HiOutlineXMark size={32} className='text-ctp-peach'/>
                </button>
            </div>
            <form method="PUT">
                {error && <div className="text-ctp-red pl-3 pt-5 flex justify-center">
                    {error}
                </div>}
            <div className="relative pt-3 pb-6 px-6 flex-auto">
                <div>
                    <label htmlFor="emplacement" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Emplacement</label>
                    <select value={emplacement} onChange={(e) => {setEmplacement(e.target.value)}} id="emplacement" className=" border text-sm rounded-lg block w-full p-2.5 bg-ctp-surface0 dark:border-ctp-surface2 placeholder-ctp-surface2 text-white">
                    <option value="Salon">Salon</option>
                    <option value="Cuisine">Cuisine</option>
                    <option value="Chambre 1">Chambre 1</option>
                    <option value="Chambre 2">Chambre 2</option>
                    <option value="Chambre 3">Chambre 3</option>
                    <option value="Garage">Garage</option>
                    <option value="Exterieur">Exterieur</option>
                    </select>
                </div>

                <hr className="border-ctp-overlay2 my-4" />
                <div className="grid gap-6 mb-6 grid-cols-2">
                    <div>
                    <label htmlFor="Longitude" className="block mb-2 dark:text-white">Longitude</label>
                    <input value={longitude} onChange={(e) => {setLongitude(e.target.value)}} type="text" className="block w-full p-2 border rounded-lg sm:text-xs bg-ctp-surface0 dark:border-ctp-surface2 placeholder-ctp-surface2 text-white" />
                </div>
                <div>
                    <label htmlFor="Latitude" className="block mb-2 dark:text-white">Latitude</label>
                    <input value={latitude} onChange={(e) => {setLatitude(e.target.value)}} type="text" className="block w-full p-2 border rounded-lg sm:text-xs bg-ctp-surface0 dark:border-ctp-surface2 placeholder-ctp-surface2 text-white" />
                </div>
                </div>
            </div>
            <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                <button className="text-ctp-sapphire border border-ctp-sapphire rounded-md hover:bg-ctp-sapphire hover:text-ctp-maroon background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={handleSubmit}>
                Update Sensor
                </button>
                <button className="text-ctp-maroon border border-ctp-maroon rounded-md hover:bg-ctp-maroon hover:text-ctp-sky background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={handleDelete}>
                Delete Sensor
                </button>
            </div>
            </form>
            </div>
        </div>
        </div>
  )
}


