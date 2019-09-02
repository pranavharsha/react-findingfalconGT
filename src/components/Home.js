import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Col, Row, Button, Container, Badge
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { fetchPlanetDetails } from '../actions/actions';
import '../styles/Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchPlanetDetails();
    }
    render() {
        let planetNames = this.props.planets.map((item, ix) => {
            return (
                <span key={item.name} className="PlanetBadgeHome mr-3" color="secondary">{item.name}</span>
            )
        });
        return (
            <React.Fragment>
                <Container fluid={true} className="p-25px">
                    <h4>Welcome to Lengaburu</h4>
                    <Col className="IntroDiv fs-14px mt-3">
                        After the recent Falicornian war, King Shan has exiled Queen Al Falcone for 15 years. But, if he finds her before the 15 years, she will be exiled for another 15 years!
                        <br></br>
                        King Shan has received intelligence that Al Falcone is hiding in one of six neighbouring planets. However he has limited resources at his disposal &amp; can send his army to only four of the below planets.
                    </Col>
                    <Col className="PlanetNamesDiv text-center pt-4 pb-3">
                        {planetNames}
                    </Col>
                    <Col className="text-center pt-4">
                        <Link to="/selectplanets">
                            <Button className="btn falconBtn">Go Ahead &amp; Search</Button>
                        </Link>
                    </Col>
                </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    planets: state.falcon.planets,
})

export default connect(mapStateToProps, {
    fetchPlanetDetails
})(Home);