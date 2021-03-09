import React, { useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function Card({ id, photo, name, oldrating,category,company,number }) {
  const history=useHistory()
  const [rating, setRating] = useState("")
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const PostData = () => {
    console.log({rating})
    fetch("/rate", {
        method: "post",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id,
            rating:parseInt(rating)
        })
    }).then(res => res.json())
        .then(data => {
            console.log(data)
                if (data.error) { 
                    M.toast({html: data.error, classes:"#e57373 red"})
                }
                else {
                    M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                    history.push('/')
                }
            }).catch(err => {
                console.log(err)
            })
    }
  
  return (
      <div className="row ">
    <div className="col s40 m40">
          <div className="card sticky-action #212121 grey darken-4">
          {/* <div className="product__rating">
                {Array(rating)
	         	.fill()
	         	.map((_) => (
	         		<p>🔥</p>
	         	))}
	        </div>  */}
    <div class="card-image waves-effect waves-block waves-light">
              <img className="activator" src={photo} alt={name} />
              
    </div>
            <div class="card-action">
            
              <span className="card-title activator white-text text-darken-4">{ name}<i class="material-icons right">more_vert</i></span>
              <p class="rate white-text text-darken-4">{oldrating}/10 ({number} reviews)</p>
              
              
    </div>
    <div class="card-reveal">
      <span class="card-title text-darken-4">{name}<i class="material-icons right">close</i></span>
              <p>genre: {category}</p>
            <p>company: {company}</p>

  <div>
    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      Write Review
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Review</DialogTitle>
      <DialogContent>
        <DialogContentText>
                    Game: {name}
                    
                  </DialogContentText>
        <textarea
                    className="review-text"
                    type='text'
                    rows = "5" cols = "60"
                    placeholder='lets talk about the game'
                    //onChange={(e) => setRating(e.target.value)}
                />
        <input
                    type='text'
                    placeholder='rate from 1 to 10'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          close
        </Button>
        <button className="waves-effect waves-light btn #1b5e20 green darken-1"
                onClick={()=>{PostData()}}>
                    rate
                </button>
      </DialogActions>
    </Dialog>
  </div>

              
    </div>
  </div>
    </div>
  </div>
    )
}

export default Card
