import React from 'react';
import './Remote.css';

class Remote extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            remoteUrl: ""
        };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div className="remote main-container">
                <input className="remote-input" name="remoteUrl" value={this.state.remoteUrl} onChange={(e) => this.handleChange(e)} />
                <iframe title="the-iframe" src={this.state.remoteUrl} className="remote-iframe" />
            </div>
        );
    }
}

export default Remote;
