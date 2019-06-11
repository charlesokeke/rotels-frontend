import React from 'react'


const AddStyles = (WrappedComponent,parentLayout) => {
	return class centerContent extends React.Component{

		render(){
			const props = {...this.props,center:{flexDirection:parentLayout,display:'flex',justifyContent:'center',alignItems:'center'}}
		   return (
			<WrappedComponent {...props}/>
           )
		}



	}
}
export default AddStyles