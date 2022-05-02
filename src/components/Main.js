import React from 'react'
import Card from './Card.js'
import api from '../utils/api.js'

class Main extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            userName: '',
            userDescription: '',
            userAvatar: '',
            cards: []
        }
    }

    componentDidMount() {
        api.getInitialInfo()
        .then(res => {
            this.setState({
                userName: res[0].name,
                userDescription: res[0].about,
                userAvatar: res[0].avatar,
                cards: res[1]
            })
        })
        .catch(rej => console.error((`Error: ${rej.status}`)))
    }

    render(){
        return(
            <main className="main">
                    <section className="profile">
                        <div className="profile__block">
                            <div className="profile__avatar">
                                <img className="profile__photo" src={this.state.userAvatar} alt="Аватар"/>
                                <div className="profile__photo-overllay" onClick={this.props.onEditAvatar}></div>
                            </div>
                            <div className="profile__info">
                                <h1 className="profile__name">{this.state.userName}</h1>
                                <button className="profile__button-edit" type="button" onClick={this.props.onEditProfile}></button>
                                <p className="profile__job">{this.state.userDescription}</p>
                            </div>
                        </div>
                        <button className="profile__button-add" type="button" onClick={this.props.onAddPlace}></button>
                    </section>
                    <section className="elements">
                    {this.state.cards.map((card) => (
                    <Card data={card} key={card._id} onClickImage={this.props.onOpenCard}/>
                    ))}
                    </section>
                </main>
        )
    }
}

export default Main 