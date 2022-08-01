import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class VersionTableRow extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <tr>
        <td>
          <Link
            path={"product/:id"}
            to={'/view-map-version/' + this.props.id + '/' + this.props.obj.version}
          >
            {this.props.latest ? 'latest' : this.props.obj.version}
          </Link>
        </td>
        <td>{this.props.obj.contributor}</td>
      </tr>
    )
  }
}
