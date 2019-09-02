import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Col, Row, Button, Container, Card, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody
} from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/SelectVehicles.css';
import { fetchVehicleDetails } from '../actions/actions';
import VehiclesSubComp from './VehiclesSubComp';

class SelectVehicles extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (this.props.selected_planets.length > 4 || this.props.selected_planets.length <= 0) {
            this.props.history.push("selectplanets");
        }
        this.props.fetchVehicleDetails();
    }
    render() {
        let planetCards = this.props.selected_planets.map((item, ix) => {
            return (
                <Card key={item.name}>
                    <Col className="pl-0 pr-0 cardImgPlanetDiv text-center">
                        <CardImg top className="cardImgPlanet" src={`/images/${item.name.toLowerCase()}.PNG`} alt="Card image cap" />
                    </Col>
                    <CardBody>
                        <CardTitle className="text-center text-uppercase">{item.name}</CardTitle>
                        <CardSubtitle className="text-center mb-2">{item.distance} megamiles</CardSubtitle>
                        {
                            item.hasOwnProperty("time_taken") ? (
                                <CardSubtitle className="text-center">Time Taken: {item.time_taken}</CardSubtitle>
                            ) : (
                                    <CardSubtitle className="text-center">Time Taken: 0</CardSubtitle>
                                )
                        }
                        <VehiclesSubComp planet={item} />
                    </CardBody>
                </Card>
            )
        })
        return (
            <React.Fragment>
                <Container fluid={true} className="p-25px pos-relative">
                    <h3 className="text-center pb-3">Selected Planets</h3>
                    <CardDeck>
                        {planetCards}
                    </CardDeck>
                    <div className="text-center pt-5 totalTTDiv">
                        <h5 className="text-center pb-3">Total Time Taken: {this.props.total_time_taken}</h5>
                    </div>
                    <Col className="text-center pt-3">
                        <Link to="/falconeresult">
                            <Button className="btn falconBtn"
                                disabled={this.props.comp_planets_cnt === 4 ? false : true}
                            >Launch Vehicles</Button>
                        </Link>
                    </Col>
                </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    planets: state.falcon.planets,
    planets_err_msg: state.falcon.planets_err_msg,
    selected_planets: state.falcon.selected_planets,
    vehicles: state.falcon.vehicles,
    comp_planets_cnt: state.falcon.comp_planets_cnt,
    total_time_taken: state.falcon.total_time_taken,
})

export default connect(mapStateToProps, {
    fetchVehicleDetails
})(SelectVehicles);