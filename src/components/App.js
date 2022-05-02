import React from 'react';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';


class App extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            isEditProfilePopupOpen: false,
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            selectedCard: false
        }
    }

    handleCardClick = (data) => {
        this.setState({selectedCard: data})
    }

    handleEditAvatarClick = () => {
        this.setState({isEditAvatarPopupOpen: true})
    }

    handleEditProfileClick = () => {
        this.setState({isEditProfilePopupOpen: true})
    }

    handleAddPlaceClick = () => {
        this.setState({isAddPlacePopupOpen: true})
    }
    

    closeAllPopups = () => {
        this.setState({
            isEditProfilePopupOpen: false,
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            selectedCard: false
        })
    }

  render() { 
      return(
            <>
                <Header />
                <Main 
                onEditAvatar={this.handleEditAvatarClick}
                onEditProfile={this.handleEditProfileClick}
                onAddPlace={this.handleAddPlaceClick}
                onOpenCard={this.handleCardClick}
                />
                <Footer />
                <ImagePopup
                data={this.state.selectedCard}
                onClose={this.closeAllPopups}
                />
                <PopupWithForm name="profile-avatar"
                title="Обновить аватар"
                isOpen={this.state.isEditAvatarPopupOpen}
                onClose={this.closeAllPopups}
                children={
                    <fieldset className="popup__set">
                        <label className="popup__field">
                            <input type="url" className="popup__input" id="profile-avatar-input" name="avatarLink" 
                            placeholder="URL" required/>
                            <span className="popup__input-error profile-avatar-input-error"></span>
                        </label>
                        <button type="submit" className="popup__button-save">Сохранить</button>
                     </fieldset> 
                }
                />
                <PopupWithForm 
                name="profile"
                title="Редактировать профиль"
                isOpen={this.state.isEditProfilePopupOpen}
                onClose={this.closeAllPopups}
                children={
                    <>
                        <fieldset className="popup__set">
                            <label className="popup__field">
                                <input type="text" className="popup__input" id="profile-name-input" name="profileName" 
                                placeholder="Имя" required minLength="2" maxLength="40"/>
                                <span className="popup__input-error profile-name-input-error"></span>
                            </label>
                            <label className="popup__field">
                                <input type="text" className="popup__input" id="profile-job-input" name="profileJob" 
                                placeholder="Работа" required minLength="2" maxLength="200"/>
                                <span className="popup__input-error profile-job-input-error"></span>
                            </label>
                            <button type="submit" className="popup__button-save">Сохранить</button>
                        </fieldset> 
                    </>
                }
                />
                <PopupWithForm 
                name="new-card"
                title="Новое место"
                isOpen={this.state.isAddPlacePopupOpen}
                onClose={this.closeAllPopups}
                children={
                    <>
                        <fieldset className="popup__set">
                            <label className="popup__field">
                                <input type="text" className="popup__input" id="card-name-input" name="cardName" 
                            placeholder="Название" required minLength="2" maxLength="30"/>
                                <span className="popup__input-error card-name-input-error"></span>
                            </label>
                            <label className="popup__field">
                                <input type="url" className="popup__input" id="card-link-input" name="cardLink" 
                                placeholder="Ссылка на картинку" required/>
                                <span className="popup__input-error card-link-input-error"></span>
                            </label>
                            <button type="submit" className="popup__button-save">Сохранить</button>
                        </fieldset> 
                    </>
                }
                />
                 <PopupWithForm 
                name="new-card"
                title="Вы уверены?"
                onClose={this.closeAllPopups}
                children={
                    <>
                    <fieldset className="popup__set">
                        <button type="submit" className="popup__button-save">Да</button>
                    </fieldset>  
                    </>
                }
                />
            </>
  )};
}

export default App;
