import React from 'react'

const PlaceWeekDays = (props) => {
	const weekdays = props.days.map((element, index) =>{
		return <li key={index}> {element}</li>
	})
	return(
		<div>
		     <h6 style={{fontSize:"1.25rem",margin:"0px",padding:"0px", fontWeight:"500"}}>{props.days.length ?"Weekdays" : null}</h6>
		    <ul style={{listStyleType:'none',padding:'0px',marginLeft:'0px',fontSize:'0.9rem'}}>
				  {weekdays}
		    </ul>
		</div>

		)
}
export default React.memo(PlaceWeekDays);