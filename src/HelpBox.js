import './HelpBox.css';

function HelpBox(props) {
    return (
        <div className="help-box">
            <span className="material-icons help-box-icon">help</span>
            <div className="help-box-box">{props.text}</div>
        </div>
    );
}

export default HelpBox;