import axios from 'axios';
import React, { useState,useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
export default function Race() {
  const [startDate, setStartDate] = useState(new Date('2015/01/1'));
  const [endDate, setendDate] = useState(new Date('2022/12/1'));
  const [toggle, settoggle] = useState(true);
  const [data, setData] = useState( );
  const [Black, setBlack] = useState(true);
  const [white, setwhite] = useState(true);
  const [asian, setasian] = useState(true);
  const [Na, setNA] = useState(false);
  const [Hisp, setHispa] = useState(false);
  const [oth, setoth] = useState(false);

  useEffect(() => {
    let variable ={
      startDate:startDate.toLocaleDateString('en-uk'),
      endDate:endDate.toLocaleDateString('en-uk')
    }
    // console.log(variable);
    axios.post('http://localhost:5000/api/q2',variable).then((response)=>{
      const rows = response.data.rows;
      const map = new Map();
      for(let i = 0; i<rows.length; i++) {
        let key = rows[i].YEAR + "/" + toMonthName(rows[i].MONTH);
        if(!map.has(key)){
          let obj ={
            Time : key,
            Hispanic: 0,
            Black: 0,
            white: 0,
            Asian: 0,
            Native_American :0,
            Other :0
          };
          map.set(key,obj);
        }
        
        let obj = map.get(key);
        if(rows[i].RACE === "HISPANIC"){
          obj.Hispanic = rows[i].COUNT;
        }else if(rows[i].RACE === "BLACK"){
          obj.Black = rows[i].COUNT;
        }else if(rows[i].RACE === "WHITE"){
          obj.white = rows[i].COUNT;
        }else if(rows[i].RACE === "ASIAN"){
            obj.Asian = rows[i].COUNT;
        }else if(rows[i].RACE === "NATIVE AMERICAN"){
              obj.Native_American = rows[i].COUNT;
        }else {
          obj.Other = rows[i].COUNT;
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
          {Black ? 
          <Line type="monotone" dataKey="Black" stroke="#8884d8"  dot={false}/>:<Line/>}
          {white?<Line type="monotone" dataKey="white" stroke=" #dd0000 " dot={false}/>:<Line/>}
          {asian?<Line type="monotone" dataKey="Asian" stroke="#117a65" dot={false}/>:<Line/>}
          {Hisp?<Line type="monotone" dataKey="Hispanic" stroke=" #ecf0f1" dot={false}/>:<Line/>}
          {Na?<Line type="monotone" dataKey="Native_American" stroke="#117a65" dot={false}/>:<Line/>}
          {oth?<Line type="monotone" dataKey="Other" stroke="#82ca9d"dot={false} />:<Line/>}
        </LineChart>
      </div>
      <div className='buttons'>
        <ul>
        <li style={{decoration:'None'}}> <label>
        <input type="checkbox" onClick={()=> setBlack(!Black)} defaultChecked={true} />
        Black
      </label>
      </li>
      <li>
      <label>
        <input type="checkbox" onClick={()=> setwhite(!white)} defaultChecked={true}/>
        White
      </label>
      </li>
      <li><label>
        <input type="checkbox" onClick={()=> setasian(!asian)} defaultChecked={true}/>
        Asian
      </label></li>
      <li>
      <label>
        <input name ="Hispanic" type="checkbox" onClick={()=> setHispa(!Hisp)}/>
        Hispanic
      </label>
      </li>
      <li>
      <label>
        <input type="checkbox" onClick={()=> setNA(!Na)}/>
        Native_American
      </label>
      </li>
      <li>
      <label>
        <input type="checkbox"  onClick={()=> setoth(!oth)}/>
       Other
      </label>
      </li>
      </ul>
    </div>
    </div>
    );
}

function toMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'long',
  });
}