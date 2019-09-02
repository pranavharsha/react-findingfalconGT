import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Col, Row, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { toggleErrorModal } from '../actions/actions';

class ErrorModal extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount() {

    }
    toggle() {
        this.props.toggleErrorModal();
    }
    render() {
        return (
            <React.Fragment>
                <Modal isOpen={this.props.err_modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Error</ModalHeader>
                    <ModalBody>
                        {this.props.err_modal_msg}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    err_modal: state.falcon.err_modal,
    err_modal_msg: state.falcon.err_modal_msg,
})

export default connect(mapStateToProps, {
    toggleErrorModal
})(ErrorModal);