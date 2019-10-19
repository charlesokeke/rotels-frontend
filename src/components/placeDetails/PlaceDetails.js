import React from "react";
import "./placeDetails.css";
import ImageGridList from "../../components/placePhotos/Placephotos";
import ReviewsContainer from "../../components/reviewsContainer/reviewsContainer";
import PlaceWeekDays from "../../components/placeWeekDays/placeWeekDays";
import RenderMap from "../../components/renderMap/renderMap";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FormDialog from "../../components/changeOriginAddress/changeOriginAddress";
import Icon from "@material-ui/core/Icon";

class PlaceDetailsInfo extends React.PureComponent {
  state = {
    open: false,
    changeOriginAddress: ""
  };

  handleClose = (value) => {
    console.log("handleclose")
      this.setState({
        open: false,
        changeOriginAddress: value
      });

  };


  render() {
    const { placeDetailsData, lng, lat } = this.props;

    const {
      formatted_address,
      formatted_phone_number,
      rating,
      user_ratings_total,
      opening_hours,
      international_phone_number,
      website,
      url,
      photos,
      name,
      reviews
    } = placeDetailsData;

    const { changeOriginAddress} = this.state;

    return (
      <div className="place-details-info-container">
        <div className="place-details-boxes">
          <Typography variant="h6" component="h6" align="center">
            {name}
          </Typography>
          <br />
          <ImageGridList photos={photos} />
          <br />
          <Divider light />
          <div style={{ paddingTop: "30px" }}>
            <div className="weekdays-add-phone-and-rating-container">
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <Typography variant="h6" align="center">
                    {" "}
                    Place Details
                  </Typography>
                  <p className="place-icons">
                    {" "}
                    <Icon color="primary">place</Icon>
                    {formatted_address || "None available"}
                  </p>
                  <p className="place-icons">
                    {" "}
                    <Icon color="primary">call</Icon>
                    {formatted_phone_number || "None available"}
                  </p>
                  <p className="place-icons">
                    {" "}
                    <Icon color="primary">call</Icon>
                    {international_phone_number || "None available"}
                  </p>
                  <p className="place-icons">
                    {" "}
                    <Icon color="primary">star</Icon>Rating:{" "}
                    {Number.isInteger(rating)
                      ? `${rating}.0`
                      : `${rating.toFixed(1)}`}
                  </p>
                  <p className="place-icons">
                    <Icon color="primary">star</Icon>Total rating:{" "}
                    {user_ratings_total || "None available"}
                  </p>
                </div>
              </div>
              <div className="weekdays-container">
                <div>
                  <PlaceWeekDays
                    days={
                      opening_hours !== undefined
                        ? opening_hours.weekday_text
                        : []
                    }
                  />
                </div>
              </div>
            </div>
            <p>
              Status:{" "}
              {opening_hours !== undefined && opening_hours.open_now ? (
                <span className="status-color-open"> Currently Open</span>
              ) : (
                <span className="status-color-closed"> Currently closed</span>
              )}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <p>
                <a
                  href={`${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wesite-navigation-button"
                >
                  {" "}
                  Website
                </a>
              </p>
              <p>
                <a
                  href={`${url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wesite-navigation-button"
                >
                  Navigation
                </a>
              </p>
              <FormDialog
                handleClose={this.handleClose}
                margin="dense"
                autofocus
                fullwidth
              />
            </div>
            <Divider variant="middle" />
            <RenderMap
              destination={formatted_address}
              lat={lat}
              lng={lng}
              changedAddress={changeOriginAddress}
            />
          </div>
        </div>
        <div className="place-details-boxes">
          <ReviewsContainer reviews={reviews} />
        </div>
      </div>
    );
  }
}
export default PlaceDetailsInfo;
