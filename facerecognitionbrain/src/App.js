import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/faceRecognition/faceRecognition';
import Particles from 'react-particles-js'
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
 apiKey: 'd067e01249524501b8500a9f43c38789'
});

const particlesOptions = {
    particles: {
    number:{
      value:150,
      density:{
        enable:true,
        value_area:800
      }
    }
  }
}
class App extends Component {
  constructor(){
    super();
    this.state ={
      input:'',
      imageUrl:''
    }
  };

  onInputChange= (event) => {
    this.setState({input:event.target.value});
  };

  onButtonSubmit = () =>{
    this.setState({imageUrl:this.state.input})
 
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    function(response) {
      // do something with response
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
    }
  );

  }

  render() {
    return (
      <div className="App">
      <Particles  className='particles'
              params={particlesOptions}
            
            />
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm 
      onInputChange={this.onInputChange} 
      onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
