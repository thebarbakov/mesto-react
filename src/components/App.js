import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import PopupWithForm from "./PopupWithForm.js";
import api from "../utils/api.js";
import EditProfilePopup from "../components/EditProfilePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import AddPlacePopup from "../components/AddPlacePopup";
import DeleteCardPopup from "../components/DeleteCardPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      cards: [],
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: null,
      deletingCard: null,
      isLoading: false,
    };
  }

  handleCardClick = (card) => {
    this.setState({ selectedCard: card });
  };

  handleEditAvatarClick = () => {
    this.setState({ isEditAvatarPopupOpen: true });
  };

  handleEditProfileClick = () => {
    this.setState({ isEditProfilePopupOpen: true });
  };

  handleAddPlaceClick = () => {
    this.setState({ isAddPlacePopupOpen: true });
  };

  handleDeleteCardClick = (card) => {
    this.setState({ deletingCard: card });
  };

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: null,
      deletingCard: null,
      isLoading: false,
    });
  };

  componentDidMount() {
    api
      .getInitialInfo()
      .then((res) => {
        this.setState({
          currentUser: res[0],
          cards: res[1],
        });
      })
      .catch((rej) => console.error(`Error: ${rej.status}`));
  }

  handleCardLike = (card) => {
    const isLiked = card.likes.some(
      (cardLiker) => cardLiker._id === this.state.currentUser._id
    );

    api
      .changeLikeStatus(card._id, isLiked)
      .then((res) => {
        this.setState({
          cards: this.state.cards.map((i) => (i._id === card._id ? res : i)),
        });
      })
      .catch((rej) => console.error(`Error: ${rej.status}`));
  };

  handleCardDeleteSubmit = () => {
    this.setState({ isLoading: true });
    api
      .deleteCard(this.state.deletingCard._id)
      .then((res) => {
        this.setState({
          cards: this.state.cards.filter(
            (i) => i._id !== this.state.deletingCard._id
          ),
        });
        this.closeAllPopups();
      })
      .catch((rej) => console.error(`Error: ${rej.status}`))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleUpdateUserSubmit = ({ profileName, profileJob }) => {
    this.setState({ isLoading: true });
    api
      .setUserInfo({ name: profileName, about: profileJob })
      .then((newUserInfo) => {
        this.setState({ currentUser: newUserInfo });
        this.closeAllPopups();
      })
      .catch((rej) => console.error(`Error: ${rej.status}`))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleUpdateAvatarSubmit = ({ avatarUrl }) => {
    this.setState({ isLoading: true });
    api
      .setUserAvatar({ avatar: avatarUrl })
      .then((newUserInfo) => {
        this.setState({ currentUser: newUserInfo });
        this.closeAllPopups();
      })
      .catch((rej) => console.error(`Error: ${rej.status}`))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleAddPlaceSubmit = ({ name, link }) => {
    this.setState({ isLoading: true });
    api
      .addCard({ name: name, link: link })
      .then((newCard) => {
        this.setState((prevState) => ({
          cards: [newCard, ...prevState.cards],
        }));
        this.closeAllPopups();
      })
      .catch((rej) => console.error(`Error: ${rej.status}`))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    return (
      <>
        <Header />
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Main
            onEditAvatar={this.handleEditAvatarClick}
            onEditProfile={this.handleEditProfileClick}
            onAddPlace={this.handleAddPlaceClick}
            onOpenCard={this.handleCardClick}
            onLikeCard={this.handleCardLike}
            onDeleteCard={this.handleDeleteCardClick}
            cards={this.state.cards}
          />
          <Footer />
          <ImagePopup
            data={this.state.selectedCard}
            onClose={this.closeAllPopups}
            isOpen={this.state.isEditAvatarPopupOpen}
          />
          <EditAvatarPopup
            isOpen={this.state.isEditAvatarPopupOpen}
            onClose={this.closeAllPopups}
            onUpdateAvatar={this.handleUpdateAvatarSubmit}
            isLoading={this.state.isLoading}
          />
          <EditProfilePopup
            isOpen={this.state.isEditProfilePopupOpen}
            onClose={this.closeAllPopups}
            onUpdateUser={this.handleUpdateUserSubmit}
            isLoading={this.state.isLoading}
          />
          <AddPlacePopup
            isOpen={this.state.isAddPlacePopupOpen}
            onClose={this.closeAllPopups}
            onAddPlace={this.handleAddPlaceSubmit}
            isLoading={this.state.isLoading}
          />
          <DeleteCardPopup
            isOpen={this.state.deletingCard}
            onClose={this.closeAllPopups}
            onDeleteCard={this.handleCardDeleteSubmit}
            isLoading={this.state.isLoading}
          />
        </CurrentUserContext.Provider>
      </>
    );
  }
}

export default App;
