import React from "react";
// container for rendering the assignments to the UI
function AssignContainer(props) {
  return (
    <div className='due-assignments mt-5'>
      <div className='jumbotron'>
        <div className='h1 text-center text-dark'>{props.message}</div>
        <div className='list-group assignment-list mt-2'>
          {props.assignments}
        </div>
      </div>
    </div>
  );
}

export default AssignContainer;
