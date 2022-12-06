// import { Card } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid';
import Card from '../Card/card';
import Seasons from '../../images/seasons.png';
import Violation from '../../images/car2.jpg';
import Safety from '../../images/Safety.jpg';
import Race from '../../images/Race.jpg'

export default function Landing() {
  return (
    <div>
      {/* <Navbar/> */}
      {/* <Grid item style={{ textAlign: 'center', padding: '2em 0em' }}>
              <Carousel />
      </Grid> */}
      <Grid container style={{ alignItems: 'center', padding: '2em 10%' }}>
         <Grid item xs={12} sm={6} md={4} style={{ padding: '2em' }}>
          <Card Name={"Violation Trend"} image={Violation} description={"Percentage change in the frequency of different types of violations over the years Tries to identify the effectiveness of the awareness campaigns undertaken by the local government body."}/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} style={{ padding: '2em' }}>
          <Card Name={"Safety of District"}  image={Race} description={"The safety of each district of Montgomery over the years. Tries to provide valuable information to the police department if more patrols are needed in any particular area, and to potential home buyers about safer neighborhoods."}/>
        </Grid>
         <Grid item xs={12} sm={6} md={4} style={{ padding: '2em' }}>
          <Card Name={"Vehicle Manufacturer Safety"} image={Safety}description={"Car make and models most involved in accidents over the years. Tries to find the safety of brands so that consumers may make an informed decision while buying cars. Also shows how quality has improved or degraded over time."}/>
        </Grid>
        <Grid item xs={12} sm={6}  md={4} style={{ padding: '2em' }}>
          <Card Name={"Race"} image={Race} description={"Relationship between the race of the driver, and the charges levied against them over the years. Tries to find if there is a correlation between charge and race, and how this trend has changed over the years."}/>
        </Grid>
         <Grid item xs={12} sm={6}  md={4}style={{ padding: '2em' }}>
          <Card Name={"Seasons Trends"} image={Seasons} description={"Relationship between the different seasons of the year, and number of accidents resulting in fatalities. Tries to find if more season-specific motor safety awareness is required."}/>
        </Grid>
         
      </Grid>
    </div>
  )
}
