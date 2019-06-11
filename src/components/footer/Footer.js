import React from 'react'
import './footer.css'


class Footer extends React.PureComponent{
	
toTop = () => {
  window.scrollTo(0,0)


}
	render () {
	return (
	  <footer className="footer">
		  
		  <span style={{marginTop:"10px",color:'#fcc', fontSize:'12px'}}> &copy; Copyright 2019 Chukwuemeka Okeke</span>
		  <button id="myBtn" onClick={this.toTop}>Top</button>
	  </footer>
	)



	}
}
export default Footer