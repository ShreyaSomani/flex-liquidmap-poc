import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import VersionTableRow from "./VersionTableRow";


export default class MapVersionList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      versionMap: [],
      id: ''
    };

    this.DataTable = this.DataTable.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:4000/liquidmaps/get-map/' + this.props.match.params.id)
      .then(res => {
        this.setState({
            versionMap: res.data.versionMap,
            id: this.props.match.params.id
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.versionMap.reverse().map((res, i) => {
      return <VersionTableRow obj={res} key={i} id={this.state.id} latest={i===0} />;
    });
  }


  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Version Number</th>
            <th>Contributor</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}