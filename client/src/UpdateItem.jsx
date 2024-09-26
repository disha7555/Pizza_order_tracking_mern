//import React from 'react'
import PropTypes from "prop-types";
const UpdateItem = (props) => {
    const {updateitemid}=props;
  return (
    <div>{updateitemid}</div>
  )
}

UpdateItem.propTypes = {
  
    handleUpdateItemId: PropTypes.func.isRequired, 
    updateitemid: PropTypes.number.isRequired, 
    
    };
export default UpdateItem