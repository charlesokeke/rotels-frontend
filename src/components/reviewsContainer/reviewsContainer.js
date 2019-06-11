import React from 'react'
import ComplexGrid from '../../components/placeReview/Reviews'
import Typography from '@material-ui/core/Typography';





const ReviewsContainer = (props)  => {
	const {reviews} = props 
	

	const data = reviews.map((element, index) => {
		return <ComplexGrid 
				name={element.author_name}
				url ={element.profile_photo_url}
				rating={element.rating}
				time= {element.relative_time_description}
				text= {element.text}
				key={index}
		      />
	})


	return(

		<div>
		  <Typography variant="title" align='center' gutterBottom>
        		{reviews.length ? "Reviews" : "Reviews not available"}
      		</Typography>
			{data}
		</div>


	)
	



}
ReviewsContainer.defaultProps = { reviews: []};

export default React.memo(ReviewsContainer)