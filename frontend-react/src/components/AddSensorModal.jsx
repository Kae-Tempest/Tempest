import {useState} from 'react'
import axios from 'axios';
import { HiOutlineXMark } from 'react-icons/hi2';
import { URL_API } from '../../config'
export function AddSensorModal({onClose}) {
    const [Emplacement, setEmplacement] = useState('Salon')
    const [ID, setID] = useState('')
    const [Longitude, setLongitude] = useState('')
    const [Latitude, setLatitude] = useState('')
    const [Error, setError] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`http://${URL_API}/createSensor`, {
                name: Emplacement,
                id: ID,
                longitude: Longitude,
                latitude: Latitude
            })
            location.reload()
        } catch (err) {
            setError(err.response.data.msg)
        }

    }

  return (
    <>
      <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex font-['Arial_Black'] bg-ctp-crust/75">
        <div className="relative w-1/2 my-6 max-w-5xl">
          <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-ctp-base outline-none focus:outline-none border-ctp-peach">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl font-semibold text-ctp-text pt-3 ml-auto">Add New Sensor</h3>
              <button className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={onClose}>
                <HiOutlineXMark size={32} className='text-ctp-peach'/>
              </button>
            </div>
            <form method="POST">
            { Error ? <div className="text-ctp-red pl-3 pt-5 flex justify-center"> { Error } </div> : ''}
            <div className="relative pt-3 pb-6 px-6 flex-auto">
              <div className="grid gap-6 mb-6 grid-cols-2">
                <div>
                  <label htmlFor="emplacement" className="block mb-2 text-sm font-medium dark:text-white">Emplacement</label>
                  <select value={Emplacement} onChange={(e) => {setEmplacement(e.target.value)} } id="emplacement" className=" border text-sm rounded-lg block w-full p-2.5 bg-ctp-surface0 dark:border-ctp-surface2 placeholder-ctp-surface2 text-white">
                    <option value="Salon">Salon</option>
                    <option value="Cuisine">Cuisine</option>
                    <option value="Chambre 1">Chambre 1</option>
                    <option value="Chambre 2">Chambre 2</option>
                    <option value="Chambre 3">Chambre 3</option>
                    <option value="Garage">Garage</option>
                    <option value="Exterieur">Exterieur</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="id" className="block mb-2 dark:text-white">ID</label>
                  <input value={ID} onChange={(e) => {setID(e.target.value)} } type="text" className="block w-full p-2 border rounded-lg sm:text-xs bg-ctp-surface0 dark:border-ctp-surface2 placeholder-ctp-surface2 text-white" />
                </div>
              </div>
                <hr className="border-ctp-overlay2 my-4" />
                <div className="grid gap-6 mb-6 grid-cols-2">
                  <div>
                    <label htmlFor="Longitude" className="block mb-2 dark:text-white">Longitude</label>
                    <input value={Longitude} onChange={(e) => {setLongitude(e.target.value)} } type="text" className="block w-full p-2 border rounded-lg sm:text-xs bg-ctp-surface0 dark:border-ctp-surface2 placeholder-ctp-surface2 text-white" />
                </div>
                <div>
                    <label htmlFor="Latitude" className="block mb-2 dark:text-white">Latitude</label>
                    <input value={Latitude} onChange={(e) => {setLatitude(e.target.value)} } type="text" className="block w-full p-2 border rounded-lg sm:text-xs bg-ctp-surface0 dark:border-ctp-surface2 placeholder-ctp-surface2 text-white" />
                </div>
                </div>
            </div>
            <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
              <button className="text-ctp-sapphire border border-ctp-sapphire rounded-md hover:bg-ctp-sapphire hover:text-ctp-peach background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={handleSubmit}>
                add Sensor
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </>
  )
}
