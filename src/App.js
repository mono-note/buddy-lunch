import React, { Component } from "react";
import "./App.css";
import myData from "./buddy_Thai.json";
import  fireDatabase from "./Firebase";
let modifyedMember = [];
let groupA = [];
let groupB = [];
let checkPastBuddyFlg = true;
let firebaseData
const timeWait = 400
let monthOf
class App extends Component {
  constructor() {
    super();
    this.state = {
      groupA: [],
      groupB:[],
      btnState : true,
      showSpin: true,
      btnSave: true,
      countTo:0
    };    
  }
  componentWillMount() {    
    const data = fireDatabase.ref()


    data.once("value", snap => {
      firebaseData =snap.val()
    }, error => {
      console.log(`Error: ${error.code}`);
    }).then( ()=>{
      this.setState({btnState:false,showSpin:false})
      this.adjustJson();
      console.log('done')
    });
    
  }

  adjustJson = () => {
    this.monthOf = 'month'+(Object.keys(firebaseData[0]).length )
    console.log(this.monthOf)
    for (let n of firebaseData) {
      let person = {};
      let pastBuddy = [];
      person.name = n.name;
      // Object.keys(n).length
      Object.keys(n).forEach((key,val) => {
        if (key !== "name") {
          pastBuddy.push(n[key]);
        }        
      });
      person.pastBuddy = pastBuddy;
      modifyedMember.push(person);
    }
    this.divideGroup();
  };
  divideGroup = () => {
    for (let i in modifyedMember) {
      if (i % 2) {
        groupA.push(modifyedMember[i]);
      } else {
        groupB.push(modifyedMember[i]);
      }
    }
    if (groupA.length !== groupB.length) {
      let addParson = groupA[Math.floor(Math.random() * groupA.length)];
      groupA.push(addParson);
      // console.log('add Parson is ' + addParson.name);
    }
    
  };
  generateBuddy = () => {
    this.shuffleArray(groupA);
    this.shuffleArray(groupB);
    while (checkPastBuddyFlg) {
      if (!this.checkPastBuddy()) {
        // console.log("dupp");
        this.generateBuddy();
      } else {
        // console.log("no dupp");
        checkPastBuddyFlg = false;
      }
    }
    this.setState({groupA,groupB});
  };
  checkPastBuddy = s => {
    let n = groupA.length;
    while (n) {
      n--;
      let m = groupA[n].pastBuddy.length;
      while (m) {
        m--;
        if (groupA[n].pastBuddy[m] === groupB[n].name) {
          console.log(
            groupA[n].name + " and " + groupB[n].name + " were pastbuddy"
          );
          return false;
        }
      }
    }
    return true;
  };
  shuffleArray = a => {
    let n = a.length,
      t,
      i;
    while (n) {
      i = Math.floor(Math.random() * n--);
      t = a[n];
      a[n] = a[i];
      a[i] = t;
    }
    return a;
  };
  onButtonClick = () => {
  
    checkPastBuddyFlg = true;
    let cc = this.state.countTo
    this.setState({
      btnState:true,
      showSpin:true
    })
    let countInterval = setInterval(
      ()=>{
        cc++
        this.setState({countTo:cc})   

        if (cc===timeWait) {
          clearInterval(countInterval);
          
          this.setState({showSpin:false,btnSave:false})
          this.generateBuddy()
        }
      }
      ,1)
    
  }
  saveToJson = () => {
    let storeArr
    let output =[]
    storeArr = this.state.groupA.map((x, i) => ({
      "name": x.name,
      "pass": this.state.groupB[i].name
    }));
    
    firebaseData.forEach((k, v) => {
      const adaNameRef = fireDatabase.ref(v)
      const d = storeArr.find(x =>  (k.name === x.name) || (k.name === x.pass) ) 
        if(k.name !== d.name){
          output.push({
            "name":k.name,
            [this.monthOf]:d.name
          })
          adaNameRef.update({[this.monthOf]: d.name})
        }else{
          output.push({
            "name":k.name,
            [this.monthOf]:d.pass
          })
         adaNameRef.update({[this.monthOf]: d.pass})
        }
     })
    //  console.log(output)
     this.setState({
      btnSave:true,
    })
  }
  render() {
    return <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to Buddy Launch Generator</h1>
        </header>
        <p className="App-intro">
          That random the couple will going to eat lunch or dinner together.
        </p>
        <div className="container">
          <div className="row">
            <button 
              onClick={this.onButtonClick}
              style={{display: this.state.btnState ? 'none' : 'inline-block' }}
              className="btn btn-primary">random buddy lunch
            </button>
            <div className="box-spin" style={{display: this.state.showSpin ? 'flex' : 'none' }}>
              <div className="loader"></div>
            </div>
            <div className="flexitem">
              <div className="width50">
                <Gendata target={this.state.groupA} />
              </div>
              <div className="width50">
                <Gendata target={this.state.groupB} />
              </div>
            </div>
            <button 
              onClick={this.saveToJson}
              style={{display: this.state.btnSave ? 'none' : 'inline-block' }}
              className="btn btn-info">SAVE
            </button>
          </div>
        </div>
      </div>;
  }
}

function Gendata(props) {
  return (
    <ul>{props.target.map((data, key) => <li key={key}>{data.name}</li>)}</ul>
  );
}

export default App;
