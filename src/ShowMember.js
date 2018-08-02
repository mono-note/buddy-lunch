import React, { Component } from 'react'
import DataSync from "./Firebase/DataSync"
let firebaseData;
let totalMonth = 0;
export class ShowMember extends Component {
  constructor() {
    super();
    this.state = {
      showSpin: true,
      data:[]
    };    
  }

  componentWillMount() {
    DataSync().then((result) => {
      firebaseData = result.val()
      this.setState({btnState:false,showSpin:false})      
       this.setState({data:firebaseData})
       this.totalMonth = (Object.keys(firebaseData[0]).length -1)
       console.log(firebaseData)
    }).catch((err) => console.log(err))
  }
  render() {
    return (
      <div>
        <div className="box-spin" style={{display: this.state.showSpin ? 'flex' : 'none' }}>
          <div className="loader"></div>
        </div>
        <Gendata target={this.state.data}/>
        <h1 className="box-spin" style={{display: this.state.showSpin ? 'none' : 'block' }}>member </h1>
      </div>
    )
  }
}
function Gendata(props) {
  return (
    <ul>
      {props.target.map(
        (data, key) => 
        <li key={key}>
          {data.name}
          ##{data.month1}
          ##{data.month2}
        </li>
      )}
    </ul>
  );
}
export default ShowMember
