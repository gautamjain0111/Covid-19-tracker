import React, {useEffect , useState} from 'react'
import { Line } from 'react-chartjs-2'

function LineGraph() {
    const [data , setData] = useState({}); //empty object
    
    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(response => response.json())
        .then(data => {
            //clever stuff here...
            console.log(data);
        });
    } , [])

    const buildChartData = data =>{
        const chartData = [];
        let lastDataPoint;

        data.cases.forEach(date => {
            if(lastDataPoint){
                const newDataPoint = {
                    x: date,
                    y: data['cases'][date - lastDataPoint] //calculating new cases in a single day
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data['cases'][date];
        })
    }
    
    return (
        <div>
            <h1>I am MAP</h1>
            <Line 
                dataoptions
            />
        </div>
    )
}

export default LineGraph
