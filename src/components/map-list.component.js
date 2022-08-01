import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import MapTableRow from "./MapTableRow";


export default class MapList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      maps: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/liquidmaps/')
      .then(res => {
        this.setState({
          maps: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.maps.map((res, i) => {   //res-obj i-index returning map table row
      return <MapTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name of Map</th>
            <th>Description</th>
            <th>Last Updated</th>
            <th>Version</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}