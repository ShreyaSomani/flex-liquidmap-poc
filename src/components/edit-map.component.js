import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default class EditMap extends Component {

  constructor(props) {
    super(props)
    
    this.onChangeMapDescription = this.onChangeMapDescription.bind(this);
    this.onChangeMapMetadata = this.onChangeMapMetadata.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      nameofmap: '',
      metadata: '',
      description: '',
      lastupdated: '',
      version: '',
      versionMap: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/liquidmaps/get-map/' + this.props.match.params.id)
      .then(res => {
        const obj = JSON.parse(res.data.metadata) 
        
        var prettyData = JSON.stringify(obj, undefined, 4);

        this.setState({
          nameofmap: res.data.nameofmap,
          metadata: prettyData,
          description: res.data.description,
          lastupdated: res.data.lastupdated,
          version: res.data.version,
          versionMap: res.data.versionMap
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeMapMetadata(e) {
    this.setState({ metadata: e.target.value })
  }

  onChangeMapDescription(e) {
    this.setState({ description: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    
    try {
      JSON.parse(this.state.metadata);
    } catch (err) {
      this.setState({error: "Ïnvalid file format, please verify your update!"})
      return
    }

    this.setState({error: ""})
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

    const studentObject = {
      nameofmap: this.state.nameofmap,
      metadata: this.state.metadata,
      description: this.state.description,
      lastupdated: datetime,
      version: this.state.version + 1,
    };

    const reqBody = {
      obj: studentObject,
      vMap: { //new version of json
        version: this.state.version + 1,
        contributor: "Shreya",
        metadata: this.state.metadata
      }
    }

    axios.put('http://localhost:4000/liquidmaps/update-map/' + this.props.match.params.id, reqBody)
      .then((res) => {
        console.log(res.data)
        console.log('Map successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Map List 
    this.props.history.push('/map-list')
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <p style={{color: "red",}}>{this.state.error}</p>
        <Form.Group controlId="Name">
          <Form.Label>Name of Map</Form.Label>
          <Form.Control type="text" value={this.state.nameofmap} disabled="true" />
        </Form.Group>
        
        <Form.Group controlId="Name">
          <Form.Label>Metadata</Form.Label>
          <Form.Control as="textarea" cols={100} rows={20} value={this.state.metadata} onChange={this.onChangeMapMetadata} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" value={this.state.description} onChange={this.onChangeMapDescription} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Last Updated</Form.Label>
          <Form.Control type="text" value={this.state.lastupdated} disabled="true" />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Version</Form.Label>
          <Form.Control type="text" value={this.state.version} disabled="true" />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Update Map
        </Button>
      </Form>
    </div>);
  }
}