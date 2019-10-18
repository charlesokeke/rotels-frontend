import React from 'react'
import './footer.css'

class Footer extends React.PureComponent{
	toTop = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	}
	render () {
	return (
		<footer className="footer">
			<span style={{marginTop: "10px", color: "rgb(102, 102, 102)", fontSize: "14px", fontWeight: "500"}}>
				 © Copyright 2019 Chukwuemeka Okeke
			</span>
				 <button id="myBtn" onClick={this.toTop}>Top</button>
	  </footer>
	)
	}
}
export default Footer