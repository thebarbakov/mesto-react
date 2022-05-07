class Api{
    constructor(config){
        this._urlRequest = config.urlRequest
        this._headers = config.headers
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
    }

    getUserInfo(){
        return fetch(`${this._urlRequest}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then( res => this._checkResponse(res))
    }

    getInitialCards(){
        return fetch(`${this._urlRequest}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then( res => this._checkResponse(res))
    }

    getInitialInfo(){
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }

    setUserInfo(newUserInfo){
        return fetch(`${this._urlRequest}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(newUserInfo)
        })
        .then( res => {return this._checkResponse(res)})
    }

    setUserAvatar(newAvatar){
        return fetch(`${this._urlRequest}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(newAvatar)
        })
        .then( res => {return this._checkResponse(res)})
    }

    addCard(cardData){
        return fetch(`${this._urlRequest}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(cardData)
        })
        .then( res => {return this._checkResponse(res)})
    }

    deleteCard(cardId){
        return fetch(`${this._urlRequest}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
        })
        .then( res => {
            return this._checkResponse(res)
        })
    }

    changeLikeStatus(cardId, isLiked){
        if (!isLiked){
            return fetch(`${this._urlRequest}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: this._headers
                })
                .then(res => {
                    return this._checkResponse(res)
                })
        } else {
            return fetch(`${this._urlRequest}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this._headers
                })
                .then(res => {
                    return this._checkResponse(res)
                })
        }
    }
    
}

const api = new Api(
    {
        urlRequest: 'https://nomoreparties.co/v1/cohort-39',
        headers: {
            'authorization': 'c194112f-b44f-441c-9a8f-47ca2f04bd5c',
            'Content-Type': 'application/json'
        }
    }
)

export default api