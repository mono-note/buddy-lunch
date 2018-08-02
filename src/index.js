import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ShowMember from "./ShowMember";
import { BrowserRouter as Router, Route} from 'react-router-dom'

const CustomLink = () => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/show" component={ShowMember} />
    </div>
  </Router>
)
ReactDOM.render(<CustomLink/> ,
  document.getElementById("root")
);

