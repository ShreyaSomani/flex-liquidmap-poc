import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import axios from 'axios';


export default class ViewMapVersion extends Component {

  constructor(props) {
    super(props)

    // State
    this.state = {
      version: '',
      metadata: '',
      contributor: '',
      href: '',
      parentObj: '',
      id: '',
      fname: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/liquidmaps/get-map-version/' + this.props.match.params.id + '/' + this.props.match.params.vid)
      .then(res => {
        const obj = JSON.parse(res.data.vMap.metadata)
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
        
        var prettyData = JSON.stringify(obj, undefined, 4);
        
        var vername = res.data.fname;
        var nameSplit = vername.split(".");
        nameSplit.pop();    
        var name = nameSplit.join(".");

        this.setState({
          metadata: prettyData,
          href: "data:"+data,
          parentObj: res.data.pObj,
          id: res.data.vMap._id,
          version: res.data.vMap.version,
          contributor: res.data.vMap.contributor,
          fname: name+'_'+res.data.vMap.version+'.json'
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
        <>
            <h1>{this.state.fname}</h1>
            <Button marginLeft={'auto'} href={this.state.href} download={this.state.fname} size="sm" variant="info">
                Download
            </Button>
            <Link marginLeft={'auto'}
                className="edit-link" path={"product/:id"}
                to={'/edit-map-version/' + this.state.parentObj + '/' + this.state.id + '/' + this.state.version}
            >
              Edit
            </Link>
            <textarea cols={100} rows={20} value={this.state.metadata} disabled="true" />
        </>
    );
  }
}