import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
//import RatingComponent from "../../../node_modules/@cogent-labs/react-rating-component/es/RatingComponent";
import StarRatingComponent from 'react-star-rating-component';
import green from "@material-ui/core/colors/green";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 10
  },
  margin: {
    margin: theme.spacing.unit * 2
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: "auto",
    maxWidth: 700
  },
  badge: {
    color: green[500]
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
});

class ComplexGrid extends React.PureComponent {
  render() {
    const { classes, text, time, url, rating, name } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={16}>
            <Grid item>
              <Avatar>
                <img className={classes.img} alt="complex" src={url} />
              </Avatar>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={16}>
                <Grid item xs>
                  <Typography variant="subtitle1">{name}</Typography>
                  <Typography color="textSecondary">{time}</Typography>
                   <StarRatingComponent 
                    name="rate2" 
                    editing={false}
                    starCount={Math.round(rating)}
                    value={8}
                  />
                  <Typography>{text}</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Badge
                  badgeContent={`${rating}.0`}
                  className={classes.margin}
                  color="primary"
                >
                  <Typography
                    className={classes.padding}
                    color="primary"
                  ></Typography>
                </Badge>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

ComplexGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ComplexGrid);
