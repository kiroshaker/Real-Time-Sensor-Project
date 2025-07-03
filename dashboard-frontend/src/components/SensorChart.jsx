import React from 'react';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2'

import { 
    Chart as ChartJS,
    CategoryScale, 
    LinearScale, 
    LineElement, 
    PointElement, 
    Tooltip, 
    Legend, 
    Title,
    TimeScale
} from 'chart.js';

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    LineElement,
    PointElement,
    Tooltip, 
    Legend,
    Title,
    TimeScale
);

function SensorChart({ messages }) {
    //const labels = messages.map(msg => new Date(msg.timestamp).toLocaleTimeString([], { hour: 'numeric', hour12: true }));
    const temperatureData = messages.map(msg => ({x: msg.timestamp, y: msg.temperature}));
    const humidityData = messages.map(msg => ({x: msg.timestamp, y: msg.humidity}));

    const chartData = {
        datasets: [
            {
                label: "Temperature (°F)",
                data: temperatureData,
                borderColor: 'red',
                tension: 0.1
            },
            {
                label: "Humidity (%)",
                data: humidityData,
                borderColor: 'blue',
                tension: 0.1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                font: { size: 14 }
            },
            title: {
                display: true,
                text: 'Sensor Data Over Time',
                font : { size: 20}
            }
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    displayFormats: {
                       minute: 'h:mm a',
                       hour: 'h a',
                       day: 'MMM d'
                    },
                    tooltipFormat: 'h:mm a',
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                },
                title: {
                    display: true,
                    text: 'Time (hourly)',
                    font: { size: 14}
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Sensor Values',
                    font: { size: 14 }
                }
            }
        }
    };

    return <Line data={chartData} options={chartOptions} />;
}

export default SensorChart;