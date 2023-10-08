import { useEffect, useState } from "react";
import { useLocation  } from 'react-router-dom'
import axios from 'axios';
import { HiDotsVertical } from 'react-icons/hi';
import { EditModal } from './EditModal';
import { useStoreState } from 'easy-peasy'
import { URL_API } from '../../config'
export function ReportCard({id, name, customClass}) {
  const connect = useStoreState(state => state.connect)
  const [reports, setReports] = useState([])
  const [Show, setShow] = useState(false)
  let isTempColored
  let isHumColored
  const pathname = useLocation().pathname

  const handleModal = () => {
    setShow(!Show)
  }


  useEffect(() => {
      axios.get(`http://${URL_API}/lastreport/${id}`)
      .then((data) => {
        setReports(data.data.rows[0])
      })
      .catch((err) => { console.log(err) })
    setInterval(() => {
    let mounted = true
        axios.get(`http://${URL_API}/lastreport/${id}`)
        .then((data) => { if(mounted) { setReports(data.data.rows[0])} })
        .catch((err) => { console.log(err) })
      return () => mounted = false;
    }, 300000)
  }, [id])

  if(reports) {
    isTempColored = reports.temperature > 26 ? "text-ctp-red" : reports.temperature < 15 ? "text-ctp-sky" : "text-ctp-green"
    isHumColored = reports.humidity > 70 ? "text-ctp-red" : reports.humidity < 40 ? "text-ctp-sky" : "text-ctp-green"
  }

  return (
    <div className={`bg-ctp-surface1 h-1/3 ${customClass} rounded-3xl border border-white`}>
        <div className={`${name ? "pt-3" : "pt-10"} text-center`}>
            {name && <div className="col-span-2 text-4xl pb-10 font-['Arial_Black']">{name}</div>}
            <div>
              <div className="flex px-5 h-1/2 mb-5">
                <div id="temp" className={`text-4xl font-['Arial_Black'] grow ${isTempColored}`}>{reports ? reports.temperature + '°C' : 'Any...' }</div>
                <hr className="border-l border-l-white h-16 grow-0"/>
                <div id="hum" className={`text-4xl font-['Arial_Black'] grow ${isHumColored}`}>{reports ? Math.trunc(reports.humidity * 10000) / 10000 + '%' : 'Any...' }</div>
              </div>
            </div>
            {pathname === `/SensorDetails/${id}` && connect &&
              <div className="flex justify-end">
                <button className="w-10 h-10" onClick={handleModal}>
                    <HiDotsVertical size={32}/>
                </button>
                { Show ? <EditModal id={id} onClose={handleModal}/> : null}
              </div>}
        </div>
    </div>
  )
}
