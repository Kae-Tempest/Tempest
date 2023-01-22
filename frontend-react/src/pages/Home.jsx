import axios from 'axios';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { ReportCard } from "../components/ReportCard";
import { AddSensor } from '../components/AddSensor';
import { useStoreState } from 'easy-peasy'
import { URL_API } from '../../config'

export function Home() {
  const [sensors, setSensors] = useState([])
  const connect = useStoreState(state => state.connect)
  
  useEffect(() => {
    let mounted = true;
      axios.get(`http://${URL_API}/sensor/`)
      .then((data) => { if(mounted) {
        setSensors(data.data.rows)
      }})
      .catch((err) => { console.log(err) })
    return () => mounted = false;
  }, [])

  return (
    <div className="App">
      <NavBar />
        <div className="pt-10 pl-10 flex flex-wrap gap-10">
          {sensors.map((sensor) => (
            <div className="h-full" key={sensor.id}>
              <Link key={sensor.id} to={`/SensorDetails/${sensor.id}`}>
                <ReportCard key={sensor.id} id={sensor.id} name={sensor.sensor_name} customClass={"mr-10 w-full"}/>
              </Link>
            </div>
            ))}
        </div>
      {connect ? <AddSensor/> : '' }
    </div>
  )
}

