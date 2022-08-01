import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios'; 

export default class CreateMap extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeMapMetadata = this.onChangeMapMetadata.bind(this)
    this.onChangeMapDescription = this.onChangeMapDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    // Setting up state
    this.state = {
      nameofmap: '',
      error: '',
      metadata: '',
      description: '',
      lastupdated: datetime,
    }
  }

  onChangeMapMetadata(e) {
    let file = e.target.files[0];
    // accesing file at 0 index

    this.setState({ nameofmap: e.target.value.split(/(\\|\/)/g).pop() })
    // file name picked through regex
    let reader = new FileReader();

    reader.onload = ev => {
      this.setState({ metadata: ev.target.result });
    }

    reader.readAsText(file) //reads & returns text from file
  }

  onChangeMapDescription(e) {
    this.setState({ description: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    
    //json file check
    try {
      JSON.parse(this.state.metadata);
    } catch (err) {
      this.setState({error: "Ïnvalid file format, please try uploading again!"})
      return
    }
    
    this.setState({error: ""})
    const mapObject = {
      nameofmap: this.state.nameofmap,
      metadata: this.state.metadata,
      description: this.state.description,
      lastupdated: this.state.lastupdated,
      versionMap: [{
        version: 0,
        contributor: "Shreya",
        metadata: this.state.metadata
      }]
    };

    axios.post('http://localhost:4000/liquidmaps/create-map', mapObject)
      .then(res => console.log(res.data));

    // Redirect to map List 
    this.props.history.push('/map-list')
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <p style={{color: "red",}}>{this.state.error}</p>
        <Form.Group controlId="Name">
          <Form.Label>Liquid Map</Form.Label> 
          {/* file type field */}
          <Form.Control type="file" onChange={this.onChangeMapMetadata} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" value={this.state.description} onChange={this.onChangeMapDescription} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
          Create Map
        </Button>
      </Form>
    </div>);
  }
} 
