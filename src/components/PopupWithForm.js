import React from 'react'

class PopupWithForm extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className={`popup popup_${this.props.name} ${this.props.isOpen ? "popup_opened" : ''}`}>
                <div className="popup__container">
                    <button className="popup__button-close" type="button" onClick={this.props.onClose}></button>
                    <h2 className="popup__title">{this.props.title}</h2>
                    
                    <form className="popup__form" name={this.props.name} noValidate>
                            {this.props.children}
                    </form>
                </div>
                <div className="popup__overlay" onClick={this.props.onClose}></div>
            </div>
        )
    }s
}

export default PopupWithForm 