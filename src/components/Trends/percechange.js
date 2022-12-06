import React, { PureComponent } from 'react';
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

export default PrecenChange=()=> {

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
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

