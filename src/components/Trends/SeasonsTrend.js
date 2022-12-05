import axios from 'axios';
import {React,useState,useEffect} from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Piechart from './pieChart';
import './styles.css';

export default function Seasons () {
  const [toggle, settoggle] = useState(true);

  const dummyData = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
  ];
  const [data, setData] = useState(dummyData);
  useEffect(() => {
    axios.post('http://localhost:5000/api/q1').then((response)=>{
      const rows = response.data.rows;
      const map = new Map();
      for(let i=0;i<rows.length;i++){
        // console.log(rows[i]);
        if(!map.has(rows[i].YEAR)){
          let obj ={
            Year : rows[i].YEAR,
            Summer: 0,
            Winter: 0,
            Spring: 0,
            Autumn: 0
          };
          map.set(rows[i].YEAR,obj);
        }
        let obj = map.get(rows[i].YEAR);
        if(rows[i].SEASON === "Summer"){
          obj.Summer = rows[i].PERCENTAGE;
        } else if(rows[i].SEASON === "Winter"){
          obj.Winter = rows[i].PERCENTAGE;
        } else if(rows[i].SEASON === "Spring"){
          obj.Spring = rows[i].PERCENTAGE;
        }else {
          obj.Autumn = rows[i].PERCENTAGE;
        }
      }
      let array =[];
      for (const item of map[Symbol.iterator]()) {
        array.push(item[1])
      }
      setData(array);
      console.log(array)
    })
  }, [])
    return (
      <div className='container'>
      <button onClick={()=> settoggle(!toggle)}>barChart</button>
      {toggle ? <BarChart
      width={700}
      height={500}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Year" />
      <YAxis/>
      <Tooltip style={{color:'black'}}/>
      <Legend />
      <Bar dataKey="Autumn" stackId="a" fill="#8d00ff" />
      <Bar dataKey="Spring" stackId="a" fill="#3aff55" />
      <Bar dataKey="Summer" stackId="a" fill="#ff4000" />
      <Bar dataKey="Winter" stackId="a" fill="#0080ff" />
    </BarChart> :
      <Piechart/>}
      </div>
    );
  }
