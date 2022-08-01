import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class MapTableRow extends Component {
  constructor(props) {
    super(props)
    this.deleteStudent = this.deleteStudent.bind(this)
  }

  deleteStudent() {
    axios
      .delete(
        'http://localhost:4000/liquidmaps/delete-map/' + this.props.obj._id,
      )
      .then((res) => {
        console.log('Map successfully deleted!')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <tr>
        <td>
          <Link
            path={"product/:id"}
            to={'/view-map/' + this.props.obj._id}
          >
            {this.props.obj.nameofmap}
          </Link>
        </td>
        <td>{this.props.obj.description}</td>
        <td>{this.props.obj.lastupdated}</td>
        <td>
          <Link
            path={"product/:id"}
            to={'/map-version-list/' + this.props.obj._id}
          >
            Versions
          </Link>
        </td>
      </tr>
    )
  }
}
