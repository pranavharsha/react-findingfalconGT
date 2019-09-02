import React, { Component } from 'react';
import {
    Col, Row, Button, Container
} from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
				<Container fluid={true} className="pl-0 pr-0 pt-2 pb-2 Footer">
                    <Col className="text-center fs-12px text-white">
                        Finding Falcon - Geektrust - 2019
                    </Col>
                </Container>
            </React.Fragment>
        )
    }
}

export default Footer;