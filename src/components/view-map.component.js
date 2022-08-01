import React, { Component } from "react";
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default class ViewMap extends Component {

  constructor(props) {
    super(props)

    // State
    this.state = {
      nameofmap: '',
      metadata: '',
      href: '',
      lastupdated: '',
      version: '',
      _id: ''
    }

    this.deleteMap = this.deleteMap.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:4000/liquidmaps/get-map/' + this.props.match.params.id)
      .then(res => {
        const obj = JSON.parse(res.data.metadata)
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
        
        var prettyData = JSON.stringify(obj, undefined, 4);

        this.setState({
          nameofmap: res.data.nameofmap,
          metadata: prettyData,
          href: "data:"+data,
          lastupdated: res.data.lastupdated,
          version: res.data.version,
          _id: res.data._id
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteMap() {
    axios
      .delete(
        'http://localhost:4000/liquidmaps/delete-map/' + this.props.match.params.id,
      )
      .then((res) => {
        console.log('Map successfully deleted!')
      })
      .catch((error) => {
        console.log(error)
      })
    
    // Redirect to Map List 
    this.props.history.push('/map-list')
  }

  render() {
    return (
        <>
            <h1>{this.state.nameofmap}</h1>
            <Link marginLeft={'auto'}
                className="edit-link" path={"product/:id"}
                to={'/edit-map/' + this.state._id}
            >
              Edit
            </Link>
            <Button marginLeft={'auto'} onClick={this.deleteMap} size="sm" variant="danger">
                Delete
            </Button>
            <Button marginLeft={'auto'} href={this.state.href} download={this.state.nameofmap} size="sm" variant="info">
                Download
            </Button>
            <textarea cols={100} rows={20} value={this.state.metadata} disabled="true" />
        </>
    );
  }
}