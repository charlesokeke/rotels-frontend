import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import green from "@material-ui/core/colors/green";

const styles = {
  card: {
    maxWidth: 300,
    margin: 5
  },
  nameFont: {
    fontSize: 15
  },
  media: {
    height: 130
  },
  lightgreen: {
    color: green[500]
  }
};

function MediaCard(props) {
  const {
    classes,
    image,
    name,
    address,
    user_rating,
    openHours,
    rating,
    getPlaceDetails
  } = props;

  function trimAddress(address) {
    return address.length > 20 ? `${address.slice(0, 25)}...` : address;
  }

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title="hotel" />
        <CardContent>
          <Typography variant="h6" component="h6" className={classes.nameFont}>
            {`${trimAddress(name)}`}
          </Typography>

          <Typography component="p" size="small">
            {`Address: ${trimAddress(address)}`}
          </Typography>
          <Typography
            component="p"
            color="secondary"
            size="small"
            className={classes.lightgreen}
          >
            {`${user_rating} | ${openHours}`}
          </Typography>
          <Typography component="p" size="small" color="primary">
            {`${rating}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={getPlaceDetails}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};
MediaCard.defaultProps = { address: "Not available", name: "Not available" };
export default withStyles(styles)(MediaCard);
