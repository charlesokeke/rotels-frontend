import React from 'react'



const PlaceWeekDays = (props) => {
	const weekdays = props.days.map((element, index) =>{
		return <li key={index}> {element}</li>
	})
	
	return(
		<div>
		     <p>Weekdays</p>
		    <ul style={{listStyleType:'none',padding:'0px',marginLeft:'0px',fontSize:'0.9rem'}}>
				  {weekdays}
		    </ul>
		</div>

		)
}
export default React.memo(PlaceWeekDays);