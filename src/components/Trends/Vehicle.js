import axios from 'axios';
import React, { useState,useEffect} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
export default function Race() {
  const [startDate, setStartDate] = useState(new Date('2012/01/1'));
  const [endDate, setendDate] = useState(new Date('2014 /12/1'));
  const [data, setData] = useState( );
  const [make, setmake] = useState(new Set());
  useEffect(() => {
    let variable ={
      startDate:startDate.toLocaleDateString('en-uk'),
      endDate:endDate.toLocaleDateString('en-uk')
    }
    // console.log(variable);
    axios.post('http://localhost:5000/api/q3',variable).then((response)=>{
      const rows = response.data.rows;
      // console.log(rows);
      const map = new Map();
      
      
      for(let i = 0; i<rows.length; i++) {
        
        make.add(rows[i].MAKE);

      }
      let k;
      let array =[];
      for (let i = 0; i <rows.length; i +=5) {
        let key = rows[i].YEAR + '/' + rows[i].QUARTER;
        k = key;
        // if(!map.has(key)){
          let obj ={
            Time : key,
            M1: rows[i].COUNT,
            M2: rows[i+1].COUNT,
            M3: rows[i+2].COUNT,
            M4: rows[i+3].COUNT,
            M5: rows[i+4].COUNT,
            c1: rows[i].MAKE,
            c2: rows[i+1].MAKE,
            c3: rows[i+2].MAKE,
            c4: rows[i+3].MAKE,
            c5: rows[i+4].MAKE
            
          };
          array.push(obj)
          // map.set(key,obj)
        // }
      }
      console.log(map.get(k));
      setData(array);
      // console.log(map);
      })
    }, [startDate,endDate])
    // console.log(startDate.toLocaleDateString());
    // console.log(endDate.toLocaleDateString());
    
    return (
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
       <BarChart
					width={1000}
					height={1000}
					data={data}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
					m="auto"
					layout="vertical"
				>
					<Tooltip />
					<Legend />
					<Bar dataKey="M1"  fill="#8884d8">
						<LabelList dataKey="c1" position="inside" style={{ fill: 'white' }} />
					</Bar>
					<Bar dataKey="M2" fill="#82ca9d">
						{' '}
						<LabelList dataKey="c2" position="inside" style={{ fill: 'white' }} />
					</Bar>
					<Bar dataKey="M3" fill="orange">
						<LabelList dataKey="c3" position="inside" style={{ fill: 'white' }} />
					</Bar>
					<Bar dataKey="M4" fill="blue">
						<LabelList dataKey="c4" position="inside" style={{ fill: 'white' }} />
					</Bar>
					<Bar dataKey="M5" fill="green">
						<LabelList dataKey="c5" position="inside" style={{ fill: 'white' }} />
					</Bar>

					<XAxis type="number" orientation="top" />
					<YAxis type="category" dataKey="Time" />
				</BarChart>
      </div>
    );
}
