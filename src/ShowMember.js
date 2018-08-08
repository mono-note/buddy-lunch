import React, { Component } from 'react'
import DataSync from "./Firebase/DataSync"
import "./ShowMem.css";
let firebaseData;
let member = []
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
      this.setState({showSpin:false})
       this.totalMonth = (Object.keys(firebaseData[0]).length -1)
       firebaseData.forEach((k, v) => {
         let buddy =[]
         for (var key in k) {
           if (k.hasOwnProperty(key) && key !== 'name') {
             buddy.push(k[key])
           }
         }
         member.push({
          'name':k.name,
          'buddy':buddy
         })
       })       
       this.setState({data:member})
       //console.log(firebaseData)
    }).catch((err) => console.log(err))
  }

  render() {
    return (
      <div>
        <div className="box-spin" style={{display: this.state.showSpin ? 'flex' : 'none' }}>
          <div className="loader"></div>
        </div>
        <ListName target={this.state.data}/>
        <h1 className="box-spin" style={{display: this.state.showSpin ? 'none' : 'block' }}>member </h1>
      </div>
    )
  }
}
function ListName(props) {
  if(props.target.length === 22){
  return (
    <ul>
      {props.target.map(
        (data, key) => 
        <li key={key}>
        <div>{data.name}</div>
        <ListBuddy buddy={data.buddy}/>
        </li>
      )}
    </ul>
  );}
  return <div></div>
}
function ListBuddy(props) {
  return (
  <div>
    {props.buddy.map((data,index) => 
    <span key={index}>-{data}<br/></span>)}
  </div>
  );
}

export default ShowMember
