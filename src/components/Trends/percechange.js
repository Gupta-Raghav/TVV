import axios from 'axios';
import React, { PureComponent, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

export default function PrecenChange(){
  const [startDate, setStartDate] = useState(new Date('2015/01/1'));
  const [endDate, setendDate] = useState(new Date('2020/12/1'));
  const [data, setData] = useState();
  const [DUI, setDUI] = useState(true);
  const [Bl, setBl] = useState(true);
  const [Mobile, setMobile] = useState(false);
  const [OS, setOS] = useState(true);
  const [Registeration, setRegisteration] = useState(false);
  const [SS, setSS] = useState(false);
  useEffect(() => {
    let variable ={
      startDate:startDate.toLocaleDateString('en-uk'),
      endDate:endDate.toLocaleDateString('en-uk')
    }
    axios.post('http://localhost:5000/api/q5',variable).then((response)=>{
      const rows = response.data.rows;
      const map = new Map();
      console.log(rows)
      for(let i=0;i<rows.length;i++){
        // console.log(rows[i]);
        if(!map.has(rows[i].YEAR)){
          let obj ={
            Time : rows[i].YEAR,
            DUI: 0,
            BROKEN_LIGHTS:0,
            MOBILE:0,
            OVER_SPEEDING:0,
            REGISTRATION:0,
            STOPSIGN:0
          };
          map.set(rows[i].YEAR,obj);
        }
        let obj = map.get(rows[i].YEAR);
        if(rows[i].DESCRIPTION === "DUI"){
          obj.DUI = rows[i].CHANGE;
        } else if(rows[i].DESCRIPTION === "BROKEN LIGHTS"){
          obj.BROKEN_LIGHTS = rows[i].CHANGE;
        } else if(rows[i].DESCRIPTION === "MOBILE"){
          obj.MOBILE = rows[i].CHANGE;
        } else if(rows[i].DESCRIPTION === "OVER-SPEEDING"){
          obj.OVER_SPEEDING = rows[i].CHANGE;
        }else if(rows[i].DESCRIPTION === "REGISTRATION"){
          obj.REGISTRATION = rows[i].CHANGE;
        }else {
          obj.STOPSIGN = rows[i].CHANGE;
        }
      }
      let array =[];
      for (const item of map[Symbol.iterator]()) {
        array.push(item[1])
      }
      setData(array);
      console.log(array)
    })
  }, [startDate,endDate])

  return (
    <div className='container'>
      <div className='date'>
       <label>Start-Date</label>
      <DatePicker
       selected={startDate}
       onChange={(d) => setStartDate(d)}
       Format="dd/MM/yyyy"
       showMonthYearPicker
       showFullMonthYearPicker
    />
    <label>End-Date</label>
    <DatePicker
       selected={endDate}
       onChange={(d) => setendDate(d)}
       Format="dd/MM/yyyy"
       showMonthYearPicker
       showFullMonthYearPicker
    />
       </div>
      <BarChart
        width={900}
        height={600}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        {DUI?<Bar dataKey="DUI" fill="#8884d8" />:<Bar/>}
        {Bl? <Bar dataKey="BROKEN_LIGHTS" fill="#82ca9d" />:<Bar/>}
        {Mobile?<Bar dataKey="MOBILE"  fill="#8d00ff" />:<Bar/>}
        {OS? <Bar dataKey="OVER_SPEEDING"  fill="#3aff55" />:<Bar/>}
        {Registeration? <Bar dataKey="REGISTRATION"  fill="#ff4000" />:<Bar/>}
        {SS?<Bar dataKey="STOPSIGN"  fill="#0080ff" />:<Bar/>}
      </BarChart>
      <div className='buttons'>
        <ul>
        <li style={{decoration:'None'}}> <label>
        <input type="checkbox" onClick={()=>setDUI(!DUI)} defaultChecked={true} />
        Driver under Influence
      </label>
      </li>
      <li>
      <label>
        <input type="checkbox" onClick={()=> setBl(!Bl)} defaultChecked={true}/>
        Brokent Lights
      </label>
      </li>
      <li><label>
        <input type="checkbox" onClick={()=> setMobile(!Mobile)} />
        Mobile
      </label></li>
      <li>
      <label>
        <input name ="Hispanic" type="checkbox" onClick={()=> setOS(!OS)} defaultChecked={true}/>
        Over Speeding
      </label>
      </li>
      <li>
      <label>
        <input type="checkbox" onClick={()=> setRegisteration(!Registeration)}/>
        Registeration
      </label>
      </li>
      <li>
      <label>
        <input type="checkbox"  onClick={()=> setSS(!SS)}/>
        Stop Sign
      </label>
      </li>
      </ul>
    </div>
      </div>
  );
}

