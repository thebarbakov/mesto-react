import React from 'react';

class Card extends React.Component {
    constructor(props){
        super(props)
    }

    handleCardClick = () => {
        this.props.onClickImage(this.props.data)
    }

    render(){
        return(
            <div className="element">
                <img className="element__image" src={this.props.data.link} alt={this.props.data.name} onClick={this.handleCardClick} />
                <div className="element__description">
                    <p className="element__title">{this.props.data.name}</p>
                    <div className="element__like">
                        <button className="like__button" type="button"></button>
                        <p className="like__counter"></p>
                    </div>
                </div>
                <button className="element__delete" type="button"></button>
            </div>
        )
    }
}

export default Card 

