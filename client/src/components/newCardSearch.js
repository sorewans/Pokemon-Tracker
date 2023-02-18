import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button,
         TextField,
         Typography,
         AppBar,
         Toolbar,
         IconButton,
        } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {countCards} from '../API';

const NewCardSearch = () => {

  const [searchParams, setSearchParams] = useSearchParams({})
  const navigate = useNavigate();   
  const cardName = searchParams.get("card");  
  const [count, setCount] = useState("");

  const SearchOnSubmit = () => {
    navigate(`/results/${cardName}`)

   // console.log(searchParams.get("card"));
  };

  useEffect(() => {
    countCards().then((response) => {
      console.log(response);
      setCount(response);
    });
},[])

  return (
    <>
    {/* <AppBar position="static">
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <IconButton color="inherit" onClick={navigate('/all')}>All cards</IconButton>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar> */}
    
    <div>
      <Typography variant="h5">Add a new card to the database</Typography>
      <TextField onChange={(e) => setSearchParams({card:e.target.value})}/>
      <Button onClick={SearchOnSubmit} variant="contained">Search</Button>
      <Typography variant ="h4">We currently have {count} Pokemon cards</Typography>
    </div>
    </>
  )
}

export default NewCardSearch;

