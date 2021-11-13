import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/landing/Navbar";
import Landing from "./components/landing/Landing";
import Footer from "./components/landing/Footer";

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
