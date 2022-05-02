import React from 'react';
import logo from '../images/logo_white.svg';

class ImagePopup extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className={`popup popup_element ${this.props.data != false ? 'popup_opened' : ''}`}>
                <figure className="popup__box-image">
                    <button className="popup__button-close" type="button" onClick={this.props.onClose}></button>
                    <img className="popup__image" src={this.props.data ? this.props.data.link : ''} alt={this.props.data ? this.props.data.name : ''}/>
                    <figcaption className="popup__description">{this.props.data ? this.props.data.name : ''}</figcaption>
                </figure>
                <div className="popup__overlay" onClick={this.props.onClose}></div>
            </div>
        )
    }
}

export default ImagePopup 