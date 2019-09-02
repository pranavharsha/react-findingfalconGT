import React, { Component } from 'react';
import {
    Navbar, Col
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md" className="topnavbar" data-test="topnavbar">
                    <Col xs="12" className="pl-0 pr-0">
                        <a href="/" className="nav-title">
                            <img data-test="talogo" className="talogo" src="/images/Logo.PNG"></img> Finding Falcon
                        </a>
                    </Col>
                </Navbar>
            </React.Fragment>
        )
    }
}

export default Header;