import axios from 'axios';
import React, { useState,useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
export default function Race() {
  const [startDate, setStartDate] = useState(new Date('2012/01/1'));
  const [endDate, setendDate] = useState(new Date('2022/12/1'));
  const [data, setData] = useState( );
  const [Rockville, setRockville] = useState(true);
  const [Bethesda, setBethesda] = useState(true);
  const [Silver_Spring, setSilver_Spring] = useState(true);
  const [Wheaton, setWheaton] = useState(false);
  const [Germantown, setGermantown] = useState(false);
  const [Gaithersburg, setGaithersburg] = useState(false);

  useEffect(() => {
    let variable ={
      startDate:startDate.toLocaleDateString('en-uk'),
      endDate:endDate.toLocaleDateString('en-uk')
    }
    // console.log(variable);
    axios.post('http://localhost:5000/api/q4',variable).then((response)=>{
      const rows = response.data.rows;
      console.log(rows);
      const map = new Map();
      for(let i = 0; i<rows.length; i++) {
        let key = rows[i].YEAR + "/" +(rows[i].QUARTER);
        if(!map.has(key)){
          let obj ={
            Time : key,
            Rockville: 0,
            Bethesda: 0,
            Silver_Spring: 0,
            Wheaton: 0,
            Germantown: 0,
            Gaithersburg: 0,
          };
          map.set(key,obj);
        }
        let obj = map.get(key);
        if(rows[i].DISTRICT === "1st District, Rockville"){
            obj.Rockville = rows[i].COUNT;
          }else if(rows[i].DISTRICT === "2nd District, Bethesda"){
            obj.Bethesda = rows[i].COUNT;
          }else if(rows[i].DISTRICT === "3rd District, Silver Spring"){
            obj.Silver_Spring = rows[i].COUNT;
          }else if(rows[i].DISTRICT === "4th District, Wheaton"){
              obj.Wheaton = rows[i].COUNT;
          }else if(rows[i].DISTRICT === "5th District, Germantown"){
                obj.Germantown = rows[i].COUNT;
          }else {
            obj.Gaithersburg = rows[i].COUNT;
          }
      }
      
      let array =[];
      for (const item of map[Symbol.iterator]()) {
        array.push(item[1])
      }
      setData(array);
      // console.log(map);
      })
    }, [startDate,endDate])

    return (
      <div className="container">
      <div >
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
        <LineChart
          width={1300}
          height={500}
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
          {Rockville? <Line type="monotone" dataKey="Rockville" stroke="#8884d8"  dot={false}/>: <Line/>}
          {Bethesda?<Line type="monotone" dataKey="Bethesda" stroke=" #dd0000 " dot={false}/>: <Line/>}
          {Silver_Spring?<Line type="monotone" dataKey="Silver_Spring" stroke="#117a65" dot={false}/>:<Line/>}
          {Wheaton? <Line type="monotone" dataKey="Wheaton" stroke="orange" dot={false}/>:<Line/>}
          {Germantown? <Line type="monotone" dataKey="Germantown" stroke="#117a65" dot={false}/>:<Line/>}
          {Gaithersburg? <Line type="monotone" dataKey="Gaithersburg" stroke="#82ca9d"dot={false} />:<Line/> }
        </LineChart>
      </div>
      <div className='buttons'>
        <ul>
        <li style={{decoration:'None'}}> <label>
        <input type="checkbox" onClick={()=>setRockville(!Rockville)} defaultChecked={true} />
        Rockville
      </label>
      </li>
      <li>
      <label>
        <input type="checkbox" onClick={()=> setBethesda(!Bethesda)} defaultChecked={true}/>
        Bethesda
      </label>
      </li>
      <li><label>
        <input type="checkbox" onClick={()=> setSilver_Spring(!Silver_Spring)} defaultChecked={true}/>
        Silver_Spring
      </label></li>
      <li>
      <label>
        <input name ="Hispanic" type="checkbox" onClick={()=> setWheaton(!Wheaton)}/>
        Wheaton
      </label>
      </li>
      <li>
      <label>
        <input type="checkbox" onClick={()=> setGermantown(!Germantown)}/>
        Germantown
      </label>
      </li>
      <li>
      <label>
        <input type="checkbox"  onClick={()=> setGaithersburg(!Gaithersburg)}/>
        Gaithersburg
      </label>
      </li>
      </ul>
    </div>
    </div>
    );
}