import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default class EditMapVersion extends Component {

  constructor(props) {
    super(props)
    
    this.onChangeMapMetadata = this.onChangeMapMetadata.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
        version: 0,
        metadata: '',
        contributor: '',
        totVer: 0
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/liquidmaps/get-map-version/' + this.props.match.params.id + '/' + this.props.match.params.idx)
      .then(res => {
        const obj = JSON.parse(res.data.vMap.metadata)
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
        
        var prettyData = JSON.stringify(obj, undefined, 4);

        this.setState({
          metadata: prettyData,
          version: res.data.vMap.version,
          contributor: res.data.vMap.contributor,
          totVer: res.data.totVer
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeMapMetadata(e) {
    this.setState({ metadata: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    
    if(this.state.version == this.state.totVer)
    {
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "/"
                        + (currentdate.getMonth()+1)  + "/" 
                        + currentdate.getFullYear() + " "  
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getSeconds();

        const studentObject = {
            metadata: this.state.metadata,
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
    } else {
        try {
        JSON.parse(this.state.metadata);
        } catch (err) {
        this.setState({error: "Ïnvalid file format, please verify your update!"})
        return
        }

        this.setState({error: ""})

        const reqBody = {
        metadata: this.state.metadata,
        version: this.state.version,
        contributor: "Shreya"
        };

        axios.put('http://localhost:4000/liquidmaps/update-map-version/' + this.props.match.params.id + '/' + this.props.match.params.vid, reqBody)
        .then((res) => {
            console.log(res.data)
            console.log('Map successfully updated')
        }).catch((error) => {
            console.log(error)
        })
    }
    
    // Redirect to Map List 
    this.props.history.push('/map-list')
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <p style={{color: "red",}}>{this.state.error}</p>
        <Form.Group controlId="Name">
          <Form.Label>Version of Map</Form.Label>
          <Form.Control type="text" value={this.state.version} disabled="true" />
        </Form.Group>
        
        <Form.Group controlId="Name">
          <Form.Label>Metadata</Form.Label>
          <Form.Control as="textarea" cols={100} rows={20} value={this.state.metadata} onChange={this.onChangeMapMetadata} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Update Map
        </Button>
      </Form>
    </div>);
  }
}