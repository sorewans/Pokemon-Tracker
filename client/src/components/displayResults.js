import React, {useEffect, useState} from 'react';
//import { useLoaderData } from "react-router-dom";
import {cardSearch, addCard} from '../API';
import {
        Modal, 
        Typography,
        Button,
        Card,
        CardHeader,
        CardMedia,
        Avatar,
        CardActions,
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

export default function DisplayResults() {
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
      cardSearch(query.cardName).then((response) => {
        setData(response.data);
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
    setSetsName(cardDetails.set.name);
    setSetsSeries(cardDetails.set.series);
    setName(cardDetails.name);
    setImageUrl(cardDetails.images.small);
    setSeriesLogo(cardDetails.set.images.logo);
    setSeriesSymbol(cardDetails.set.images.symbol);
    setNumber(cardDetails.number);
    setArtist(cardDetails.artist);
    setRarity(cardDetails.rarity);
    setImageLarge(cardDetails.images.large);
  };

  const addNewCard = () => {
    const card = {
      name: name,
      id: id,
      supertype: supertype,
      subtypes: subtypes,
      hp: hp,
      types: types,
      evolvesTo: evolvesTo,
      flavorText: flavorText,
      attacks: attacks,
      weaknesses: weaknesses,
      setsName: setsName,
      setsSeries: setsSeries,
      imageUrl: imageUrl,
      seriesLogo: seriesLogo,
      seriesSymbol: seriesSymbol,
      number: number,
      artist: artist,
      rarity: rarity,
      imageLarge: imageLarge
    }
    addCard(card);
    handleClose();
    navigate('/');
    console.log(card);

  }

  return (
    <div>
      <Typography variant="h5">Select your card</Typography>
      <Grid container spacing={4} >
      {data.map(item => (
        <Grid xs={6} md={2} lg={2}  key={item.id}>
            <Card sx={{ maxWidth: 210, objectFit: "contain" }}>
            <CardActionArea onClick={() => viewDetails(item)}>
              <CardMedia
                component="img"
                height="140"
                image={`${item.images.small}`}
                alt={item.name}
                sx={{objectFit: "contain"}}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2">
                 Set: {item.set.name}
                </Typography>
                <Typography variant="body2">
                 Series: {item.set.series}
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
      <CardActions>
        <Button size="small" color="primary" variant="contained" onClick={addNewCard}>
          Add
        </Button>
      </CardActions>
      </Card>
        </Modal>    
    </div>
  )
}