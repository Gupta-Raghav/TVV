// import { Card } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid';
import Card from '../Card/card'



export default function Landing() {
  return (
    <div>
      {/* <Navbar/> */}
      {/* <Grid item style={{ textAlign: 'center', padding: '2em 0em' }}>
              <Carousel />
      </Grid> */}
      <Grid container style={{ alignItems: 'center', padding: '2em 10%' }}>
        <Grid item xs={12} sm={6}  md={4} style={{ padding: '2em' }}>
          <Card Name={"Race"}/>
        </Grid>
         <Grid item xs={12} sm={6}  md={4}style={{ padding: '2em' }}>
          <Card Name={"Seasons"}/>
        </Grid>
         <Grid item xs={12} sm={6} md={4} style={{ padding: '2em' }}>
          <Card Name={"Vehicle_safety"}/>
        </Grid>
         <Grid item xs={12} sm={6} md={4} style={{ padding: '2em' }}>
          <Card Name={"Location"}/>
        </Grid>
         <Grid item xs={12} sm={6} md={4} style={{ padding: '2em' }}>
          <Card Name={"Location_"}/>
        </Grid>
      </Grid>
    </div>
  )
}
