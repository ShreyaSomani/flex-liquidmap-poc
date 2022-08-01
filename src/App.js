import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import CreateMap from './components/create-map.component'
import EditMap from './components/edit-map.component'
import EditMapVersion from './components/edit-map-version.component'
import ViewMap from './components/view-map.component'
import ViewMapVersion from './components/view-map-version.component'
import MapList from './components/map-list.component'
import MapVersionList from './components/map-version-list.component'

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={'/create-map'} className="nav-link">
                  Liquid Maps Application
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={'/create-map'} className="nav-link">
                    Create new Map
                  </Link>
                </Nav>

                <Nav>
                  <Link to={'/map-list'} className="nav-link">
                    List Liquid Maps
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch> 
                {/* what content to render into the body based on route */}
                  <Route
                    exact
                    path="/"
                    component={(props) => <MapList {...props} />}
                  />
                  <Route
                    exact
                    path="/create-map"
                    component={(props) => <CreateMap {...props} />}
                  />
                  <Route
                    exact
                    path="/view-map/:id"
                    component={(props) => <ViewMap {...props} />}
                  />
                  <Route
                    exact
                    path="/view-map-version/:id/:vid"
                    component={(props) => <ViewMapVersion {...props} />}
                  />
                  <Route
                    exact
                    path="/edit-map/:id"
                    component={(props) => <EditMap {...props} />}
                  />
                  <Route
                    exact
                    path="/edit-map-version/:id/:vid/:idx"
                    component={(props) => <EditMapVersion {...props} />}
                  />
                  <Route
                    exact
                    path="/map-list"
                    component={(props) => <MapList {...props} />}
                  />
                  <Route
                    exact
                    path="/map-version-list/:id"
                    component={(props) => <MapVersionList {...props} />}
                  />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  )
}

export default App
