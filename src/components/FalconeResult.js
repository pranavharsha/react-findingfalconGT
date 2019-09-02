import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Col, Row, Button, Container
} from 'reactstrap';
import { Link } from 'react-router-dom';
import CustomLoader from '../components/CustomLoader';
import LoaderIcon from '../images/LoaderIcon.svg';
import { showLoader, findingFalconeAction, resetState } from '../actions/actions';

class FalconeResult extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (this.props.comp_planets_cnt > 4 || this.props.comp_planets_cnt <= 0) {
            this.props.history.push("selectvehicles");
        } else {
            this.props.showLoader();
            let final_obj = {};
            final_obj.planet_names = this.props.selected_planets.map((item) => item.name);
            final_obj.vehicle_names = this.props.selected_planets.map((item) => item.selected_vehicle.name);
            this.props.findingFalconeAction(final_obj);
        }
    }
    render() {
        return (
            <React.Fragment>
                <Container fluid={true} className="pl-2 pr-2">
                    <CustomLoader loading={this.props.isLoader} background='#f1f1f1'
                        heading='Finding Falcone!'
                        content={this.props.loadMessage} spinner={LoaderIcon} />

                    <h3 className="text-center pt-4 pb-3">Finding Falcone!</h3>

                    <Col className="pt-4 pl-0 pr-0 text-center">
                        {
                            this.props.final_result.hasOwnProperty("status") ? (
                                this.props.final_result.status === "success" ? (
                                    <Col>
                                        <h5>
                                            Success! Congratulations on Finding Falcone.
                                            <br></br>King Shan is mighty pleased.
                                            <br></br><br></br>
                                            Time Taken: {this.props.total_time_taken}
                                            <br></br>
                                            Planet found: {this.props.final_result.planet_name}
                                        </h5>
                                    </Col>
                                ) : (
                                        <Col>
                                            <h5>
                                                Better luck next time!
                                            </h5>
                                        </Col>
                                    )
                            ) : undefined
                        }
                    </Col>

                    <Col className="pt-5 text-center">
                        <Button className="btn falconBtn"
                            onClick={() => { this.props.resetState(); this.props.history.push("/selectplanets") }}
                        >Start Again</Button>
                    </Col>

                </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isLoader: state.falcon.isLoader,
    loadMessage: state.falcon.loadMessage,
    planets: state.falcon.planets,
    planets_err_msg: state.falcon.planets_err_msg,
    selected_planets: state.falcon.selected_planets,
    vehicles: state.falcon.vehicles,
    comp_planets_cnt: state.falcon.comp_planets_cnt,
    total_time_taken: state.falcon.total_time_taken,
    final_result: state.falcon.final_result,
});

export default connect(mapStateToProps, {
    showLoader, findingFalconeAction, resetState
})(FalconeResult);