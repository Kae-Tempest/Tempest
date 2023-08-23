import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { ReportCard } from '../components/ReportCard'
import { Graph } from '../components/Graph'
import { Map } from '../components/Map'
import { DayData } from '../components/DayData'
import { URL_API } from '../../config'
export function SensorDetails() {
  const { id } = useParams()
  const [position, setPosition] = useState([])

  axios.get(`http://${URL_API}/sensorPosition/${id}`)
  .then((data) => { 
    let pos = [data.data.rows[0].latitude, data.data.rows[0].longitude]
    setPosition(pos) 
  })
  .catch((err) => { console.log(err) })
  
  return (
    <>
      <NavBar />
      <div id='screen' className="grid grid-rows-2 grid-flow-col gap-4">
        <div className='col-span-1 flex flex-col my-auto'>
          <ReportCard key={id} id={id} customClass='w-1/2 mx-auto'/>
          <DayData id={id}/> 
        </div>
        <div className='col-span-3'><Graph/></div>
        <div className="row-span-1 col-span-2">{position.length > 0 ? <Map lat={position[0]} lng={position[1]}/> : <div>Loading...</div>}</div>
      </div>
    </>
  )
}
