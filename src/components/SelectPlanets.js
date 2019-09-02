import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Col, Row, Button, Container, Card, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody
} from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/SelectPlanet.css';
import { fetchPlanetDetails, addSearchPlanet, removeSearchPlanet, addSearchPlanetError } from '../actions/actions';

class SelectPlanets extends Component {
    constructor(props) {
        super(props);
        this.addPlanet = this.addPlanet.bind(this);
        this.removePlanet = this.removePlanet.bind(this);
    }
    componentDidMount() {
        this.props.fetchPlanetDetails();
    }
    addPlanet(planet) {
        if(this.props.selected_planets.length < 4 ){
            this.props.addSearchPlanet(planet);
        }else{
            this.props.addSearchPlanetError("You can select maximum of 4 planets for search operation.");
        }
    }
    removePlanet(planet) {
        this.props.removeSearchPlanet(planet);
    }
    render() {
        let planetCards = this.props.planets.map((item, ix) => {
            let is_Sel = this.props.selected_planets.filter((plt) => plt.name.toLowerCase() === item.name.toLowerCase());
            return (
                <Card key={item.name}>
                    <Col className="pl-0 pr-0 cardImgPlanetDiv text-center">
                        <CardImg top className="cardImgPlanet" src={`/images/${item.name.toLowerCase()}.PNG`} alt="Card image cap" />
                    </Col>
                    <CardBody>
                        <CardTitle className="text-center text-uppercase">{item.name}</CardTitle>
                        <CardSubtitle className="text-center">{item.distance} megamiles</CardSubtitle>
                        <Col className="cardBtnsDiv mt-3 text-center">
                            {
                                is_Sel.length > 0 ? (
                                    <Button className="falconBtn rmBtn" onClick={() => this.removePlanet(item)}>Remove</Button>
                                ) : (
                                        <Button className="falconBtn" onClick={() => this.addPlanet(item)}>Search</Button>
                                    )
                            }
                        </Col>
                    </CardBody>
                </Card>
            )
        })
        return (
            <React.Fragment>
                <Container fluid={true} className="p-25px">
                    <h3 className="text-center pb-3">Potential Hideouts</h3>
                    <CardDeck>
                        {planetCards}
                    </CardDeck>
                    <Col className="text-center pt-5">
                        <Link to="/selectvehicles">
                            <Button className="btn falconBtn"
                                disabled={this.props.selected_planets.length === 4 ? false : true}
                            >Prepare Vehicles</Button>
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
})

export default connect(mapStateToProps, {
    fetchPlanetDetails, addSearchPlanet, removeSearchPlanet, addSearchPlanetError
})(SelectPlanets);