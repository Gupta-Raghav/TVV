import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import carimage2 from '../../images/car2.jpg'
import { useState } from 'react';
import { Link } from "react-router-dom";
// import Modal from '../Modal/Modal';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { image } from 'd3';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function ImgMediaCard({Name,image, description}) {
  const [open, setOpen] = React.useState(false);
  const fetchData = () => {
    axios.get()
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Violations"
        height="140"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {Name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
      <Link to={Name}><Button onClick={fetchData}>Show Graph</Button></Link>

      </CardActions>
    </Card>
  );
}