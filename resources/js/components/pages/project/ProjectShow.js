import React, { Component } from 'react';

import { useParams } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams()
    return <Component {...props} params={params} />
  }
  return ComponentWithRouter
}
class ProjectShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
    render() {
      console.log(this.props);
        return (
            <div>Username: </div>
        );
    }
}

const HOCTaskDetail = withRouter(ProjectShow);

export default HOCTaskDetail;

// import React from 'react';
// import { useParams } from 'react-router-dom';
// const ProjectShow = () => {
//     const { id } = useParams();
//     return (
//         <div>id: { id }</div>
//     );
// }
// export default ProjectShow;
