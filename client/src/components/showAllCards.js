import React, {useEffect, useState} from 'react';
//import { useLoaderData } from "react-router-dom";
import {allCards} from '../API';
import {
        Modal, 
        Typography,
        Card,
        CardHeader,
        CardMedia,
        Avatar,
        CardContent,
        CardActionArea} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useParams, useNavigate } from 'react-router-dom';

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
  maxWidth: 345
};

export default function AllCards() {
  const query = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [supertype, setSupertype] = useState("");
  const [subtypes, setSubtypes] = useState([]);
  const [hp, setHp] = useState("");
  const [types, setTypes] = useState([]);
  const [evolvesTo, setEvolvesTo] = useState([]);
  const [flavorText, setFlavorText] = useState("");
  const [attacks, setAttacks] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [setsName, setSetsName] = useState("");
  const [setsSeries, setSetsSeries] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [seriesLogo, setSeriesLogo] = useState("");
  const [seriesSymbol, setSeriesSymbol] = useState("");
  const [number, setNumber] = useState("");
  const [artist, setArtist] = useState("");
  const [rarity, setRarity] = useState("");
  const [imageLarge, setImageLarge] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
      allCards().then((response) => {
        setData(response);
        console.log(data);
      });
  },[])


  const viewDetails = (cardDetails) => {
    handleOpen();
    setId(cardDetails.id);
    setSupertype(cardDetails.supertype);
    setSubtypes(cardDetails.subtypes);
    setHp(cardDetails.hp);
    setTypes(cardDetails.types);
    setEvolvesTo(cardDetails.evolvesTo);
    setFlavorText(cardDetails.flavorText);
    setAttacks(cardDetails.attacks);
    setWeaknesses(cardDetails.weaknesses);
    setSetsName(cardDetails.setsName);
    setSetsSeries(cardDetails.setsSeries);
    setName(cardDetails.name);
    setImageUrl(cardDetails.imageUrl);
    setSeriesLogo(cardDetails.seriesLogo);
    setSeriesSymbol(cardDetails.seriesSymbol);
    setNumber(cardDetails.number);
    setArtist(cardDetails.artist);
    setRarity(cardDetails.rarity);
    setImageLarge(cardDetails.imageLarge);
  };

  return (
    <div>
      <Typography variant="h5">Ross Family Pokemon collection</Typography>
      <Grid container spacing={4} >
      {data.map(item => (
        <Grid xs={6} md={2} lg={2}  key={item.id}>
            <Card sx={{ maxWidth: 210, objectFit: "contain" }}>
            <CardActionArea onClick={() => viewDetails(item)}>
              <CardMedia
                component="img"
                height="140"
                image={`${item.imageUrl}`}
                alt={item.name}
                sx={{objectFit: "contain"}}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2">
                 Set: {item.setsName}
                </Typography>
                <Typography variant="body2">
                 Series: {item.setsSeries}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
      </Grid>

    <Modal
      open={open}
      onClose={handleClose}>
      <Card sx={style}>
        <CardHeader 
        title={<Typography variant="h5">{name}</Typography>}
        avatar={<Avatar src={seriesSymbol}/>} />
        <CardMedia
        component="img"
        height="500"
        image={imageUrl}
        alt={name}
        sx={{objectFit: "contain"}}
      />
      <CardMedia
        component="img"
        height="50"
        image={seriesLogo}
        alt={name}
        sx={{objectFit: "contain"}}
      />
      </Card>
        </Modal>    
    </div>
  )
}