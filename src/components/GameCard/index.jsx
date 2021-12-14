import React, { useState } from 'react'
import { Image } from 'cloudinary-react'
import { Card, Box, Typography, Button, Stack, Grid } from '@mui/material'
import GameDescription from './GameDescription';
import GameCredentials from './GameCredentials';
import GameIconsInfos from './GameIconsInfos'
import { Link, useNavigate } from 'react-router-dom';
import APIManager from 'services/Api'
import { useSelector } from 'react-redux';
import isSigned from 'helpers/isSigned'
import isSubscribed from 'helpers/isSubscribed'
import EditGameForm from 'components/forms/EditGame/EditGameForm';

const GameCard = ({ game, edit }) => {
  const [editMode, setEditMode] = useState(false)
  const userReducer = useSelector(state => state.userReducer)
  const user = userReducer.user_info
  
  const navigate = useNavigate()
  const cardHeight = window.screen.width / 8
  
  const handleRent = async () => {
    if (!isSigned(userReducer)){
      navigate('/connexion')
    } else if (!isSubscribed(userReducer)) {
      navigate('/abonnement')
    } else {
      const response = await APIManager.createRent({quantity: 1, user_id: user.id , game_id: game.id})
      if(!response.error) alert("jeu ajouter au favoris")
    }
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
    document.querySelector("body").classList.toggle("fixed")
  }
  
  return (
    <>
      <Card elevation={8}
        sx={{
          border: "1px solid",
          borderColor: "primary.main",
          padding: "0.3em"
        }}
      >
        <Link to={`/jeu/${game.id}`}>
          <Typography variant="h4" align="center" noWrap py="0.5em" >
            {game.name}
          </Typography>
        </Link>

        <Grid container minHeight={`${cardHeight}px`}>
          <Grid item md={5} xs={12} display="flex" justifyContent="center" alignItems="center" overflow="hidden">
            <Image
              cloudName={process.env.REACT_APP_CLOUD_NAME}
              publicId={game.images ? game.images[0] : "default_game"}
              height={cardHeight}
              crop="scale"
            />
          </Grid>
          <Grid item md={7} xs={12} >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
              height="100%"
              pr="0.2em" pl="0.8em"
            >
              <GameDescription game={game} limit={cardHeight * 0.6} />
              <GameIconsInfos game={game} />
              <GameCredentials game={game} />
              <Stack direction="row" justifyContent="space-evenly">
                <Button disabled>Acheter</Button>
                <Button onClick={handleRent}> Louer</Button>
                {edit && <Button onClick={toggleEditMode}> Éditer</Button>}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Card>
      {editMode && <EditGameForm toggleEditMode={toggleEditMode} game={game}/>}
    </>
  )
}

export default GameCard
