// import { Card } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid';
import Card from '../Card/card';
import Seasons from '../../images/seasons.png';
import District from '../../images/district.jpg';


export default function Landing() {
  return (
    <div>
      {/* <Navbar/> */}
      {/* <Grid item style={{ textAlign: 'center', padding: '2em 0em' }}>
              <Carousel />
      </Grid> */}
      <Grid container style={{ alignItems: 'center', padding: '2em 10%' }}>
        <Grid item xs={12} sm={6}  md={4} style={{ padding: '2em' }}>
          <Card Name={"Race"} description={"Relationship between the race of the driver, and the charges levied against them over the years. Tries to find if there is a correlation between charge and race, and how this trend has changed over the years."}/>
        </Grid>
         <Grid item xs={12} sm={6}  md={4}style={{ padding: '2em' }}>
          <Card Name={"Seasons"} image={Seasons} description={"Relationship between the different seasons of the year, and number of accidents resulting in fatalities. Tries to find if more season-specific motor safety awareness is required."}/>
        </Grid>
         <Grid item xs={12} sm={6} md={4} style={{ padding: '2em' }}>
          <Card Name={"Vehicle_safety"}/>
        </Grid>
         <Grid item xs={12} sm={6} md={4} style={{ padding: '2em' }}>
          <Card Name={"district"} image={District} description={"Relationship between the race of the driver, and the charges levied against them over the years. Tries to find if there is a correlation between charge and race, and how this trend has changed over the years."}/>
        </Grid>
         <Grid item xs={12} sm={6} md={4} style={{ padding: '2em' }}>
          <Card Name={"percentage_change"}/>
        </Grid>
      </Grid>
    </div>
  )
}
