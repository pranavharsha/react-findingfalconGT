import React, { Component } from 'react';
import '../styles/CustomLoader.css';

class CustomLoader extends Component {

    render() {
        let loaderStyle = { display: this.props.loading ? 'block' : 'none' }
        return (
            <div className="CustomLoader" style={loaderStyle}>
                <div className="CustLoaderOuterDiv CustLoaderOuterDiv-overlay">
                    <div className="CustLoaderDiv" style={{ background: this.props.background, paddingTop: window.innerHeight * 0.3 }}>
                        <div className="CustLoadImage text-center">
                            <img src={this.props.spinner}></img>
                        </div>
                        <div className="CustLoadHead text-center">{this.props.heading}</div>
                        <div className="CustLoadContent text-center">{this.props.content}</div>
                    </div>
                </div>
            </div >
        )
    }
}

export default CustomLoader;
