import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    boxSizing:'border-box'
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
});

class ImageGridList extends React.PureComponent {
  render() {
    const { classes, photos } = this.props;
    return (
      <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={2.5}>
          {photos.map((element, index) => {
            return (
              <GridListTile key={index}>
                <img
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${element.photo_reference}&key=AIzaSyDBUOAf-TRFXcQkDLaGk4kiQZ7ZJSyJzJc`}
                  alt={"pic"}
                />
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    );
  }
}
ImageGridList.propTypes = {
  classes: PropTypes.object.isRequired
};
ImageGridList.defaultProps = { photos: [] };

export default withStyles(styles)(ImageGridList);
