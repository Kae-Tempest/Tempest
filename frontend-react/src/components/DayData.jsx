import { useState } from 'react'
import axios from 'axios'
import { DayDataModal } from './DayDataModal'
import { URL_API } from '../../config'
export function DayData({id}) {
    const [Show, setShow] = useState(false)
    const [Data, setData] = useState([])

    const handleModal = () => {
        if (Show) {
            setShow(!Show)
        } else {
            setShow(!Show)
            getData()
        }
    }
    const getData = async () => {
        try {
            const res = await axios.get(`http://${URL_API}/dayreport/${id}`)
            setData(res.data.rows)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='mx-auto mt-10 w-1/4'>
        <button className='bg-ctp-surface0 hover:bg-ctp-surface1 text-ctp-blue py-2 px-4 rounded border border-white font-["Arial_Black"] w-full' onClick={handleModal}>Last 24h report</button>
        {Show ? <DayDataModal data={Data} onClose={handleModal}/> : ''} 
    </div>
  )
}
