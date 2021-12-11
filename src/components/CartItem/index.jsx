import React from 'react'
import { List, ListItem, ListItemText, ListItemAvatar, ListItemButton, ListItemIcon, 
         Typography, Grid, Container, Avatar } from '@mui/material'
import { Image } from 'cloudinary-react'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartItem = (props) => {

  const cardHeight = window.screen.width / 5
  const games = props.cartGames

  return (
    <div>
      <Typography
          variant="h2"
          color="primary"
          sx={{textAlign:"center"}}
      >
          Mon panier
      </Typography>
        <List sx={{ width: '100%', bgcolor: 'background.primary' }}>
          {games.map( gameObj => (
            <>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Image
                      cloudName={process.env.REACT_APP_CLOUD_NAME}
                      publicId="default_game"
                      height={cardHeight}
                      crop="scale"            
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={gameObj.game.name} secondary={`${gameObj.game.price}€ x ${gameObj.quantity} = ${gameObj.game.price * gameObj.quantity}€ `} />
                {props.quantityButton? 
                  <Grid container spacing={2} direction="row"  width='25%'>
                    <ListItemButton component="button" onClick={props.handleAdd} sx={{display: "flex", justifyContent: "center"}}>
                      <ListItemIcon sx={{display: "flex", justifyContent: "center"}}>
                        <AddIcon />
                      </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton component="button" onClick={props.handleRemove} sx={{display: "flex", justifyContent: "center"}}>
                      <ListItemIcon sx={{display: "flex", justifyContent: "center"}}>
                        <RemoveIcon />
                      </ListItemIcon>
                    </ListItemButton>
                  </Grid>
                  :
                  <></>
                }
                {props.deleteButton? 
                  <ListItemButton component="button" onClick={props.handleDelete} sx={{display: "flex", justifyContent: "center"}}>
                    <ListItemIcon >
                      <DeleteRoundedIcon />
                    </ListItemIcon>
                  </ListItemButton>
                  :
                  <></>
                }
              </ListItem>
            </>
          ))}

        </List>
    </div>
  )
}

export default CartItem



{/* <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            p: 1,
            m: 1
          }}
          className="box-cart"
          >
          </Box> */}