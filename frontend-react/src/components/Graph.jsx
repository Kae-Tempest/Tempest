import React from 'react';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Tooltip,Legend,} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { URL_API } from '../../config'

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Tooltip,Legend,);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {beginAtZero: true},
        x: {
            display: true,
            position: "top",
        },
    },
};

export function Graph() {

    const { id } = useParams()
    const [reports, setReports] = useState([])

    useEffect(() => {
        axios.get(`http://${URL_API}/graphreport/${id}`)
        .then((data) => { setReports(data.data.rows)})
        .catch((err) => { console.log(err) })
    setInterval(() => {
    let mounted = true
    axios.get(`http://${URL_API}/graphreport/${id}`)
        .then((data) => { if(mounted) { setReports(data.data.rows) } })
        .catch((err) => { console.log(err) })
        return () => mounted = false;
    }, 300000)
    }, [id])

    let dateArray = [];
    let TempArray = [];
    let HumArray = [];
    reports.map((report) => {
        let date = new Date(Number(report.mesured_at)).toLocaleString();
        dateArray.push(date);
        TempArray.push(report.temperature);
        HumArray.push(report.humidity);
    })
    const data = {
        labels : [...dateArray.reverse()],
        datasets: [
        {
            label: 'Temperature',
            data: [...TempArray.reverse()],
            backgroundColors: '#B4BEFE',
            borderColor: '#B4BEFE',
            tension: 0.3
        },
        {
            label: 'Humidity',
            data: [...HumArray.reverse()],
            backgroundColors: '#89B4FA',
            borderColor: '#89B4FA',
            tension: 0.3
        },
        ],
  };

    return (
        <Line options={options} data={data} width={"100%"}/>
    )
  }