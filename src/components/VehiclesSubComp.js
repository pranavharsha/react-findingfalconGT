import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Col, Row, Button, Container
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { addVehicleAction, removeVehicleAction } from '../actions/actions';

class VehiclesSubComp extends Component {
    constructor(props) {
        super(props);
        this.AddVehicle = this.AddVehicle.bind(this);
        this.RemoveVehicle = this.RemoveVehicle.bind(this);
    }
    componentDidMount() {

    }
    AddVehicle(vehicle, planet) {
        this.props.addVehicleAction(vehicle, planet);
    }
    RemoveVehicle(vehicle, planet) {
        this.props.removeVehicleAction(vehicle, planet);
    }
    render() {
        let vehiclesComp = this.props.vehicles.map((item) => {
            let chk_flag = false;
            if (this.props.planet.hasOwnProperty("selected_vehicle")) {
                if (this.props.planet.selected_vehicle.hasOwnProperty("name")) {
                    chk_flag = true;
                }
            }

            if (chk_flag && this.props.planet.selected_vehicle.name === item.name) {
                return (
                    <div key={this.props.planet.name + " - " + item.name} className="VehicleBtnOuter">

                        <Button className="btn ActiveVehicleBtn"
                            onClick={() => this.RemoveVehicle(item, this.props.planet)}
                        >
                            {item.name}
                        </Button>
                    </div>
                )
            } else {
                return (
                    <div key={this.props.planet.name + " - " + item.name} className="VehicleBtnOuter">
                        {
                            this.props.planet.distance <= item.max_distance
                                ? (
                                    <Button className="btn VehicleBtn"
                                        disabled={item.total_no > 0 ? false : true}
                                        onClick={() => this.AddVehicle(item, this.props.planet)}
                                    >
                                        {item.name} - ({item.total_no})
                                    </Button>
                                ) : undefined
                        }
                    </div>
                )
            }
        });
        return (
            <React.Fragment>
                <Col className="VehicleSelDivOuter text-center">
                    {vehiclesComp}
                </Col>
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
})

export default connect(mapStateToProps, {
    addVehicleAction, removeVehicleAction
})(VehiclesSubComp);