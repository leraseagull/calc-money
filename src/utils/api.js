    class Api {
        constructor({ address, token }) {
            this._address = address;
            this._token = token;
    }
  
    _checkResponse(res) {
      return res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`);
    }
    
    getUserInfo() { 
        return fetch(`${this._address}/users/me`,
          {
            headers: {
              authorization: this._token
            }
          }).then(this._checkResponse);
      }

      setUserInfo({ name, about }) {
        return fetch(`${this._address}/users/me`,
          {
            method: 'PATCH',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              about: about
            })
          }
        ).then(this._checkResponse);
      }
    
      getInitialCards() {
        return fetch(`${this._address}/cards`,
          {
            headers: {
              authorization: this._token
            }
          }).then(this._checkResponse);
      }

      addCard({ name, link }) {
        return fetch(`${this._address}/cards`,
          {
            method: 'POST',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              link: link
            })
          }).then(this._checkResponse);
      }

    deleteCard(cardId) {
        return fetch(`${this._address}/cards/${cardId}`,
        {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            },
        }).then(this._checkResponse);
    }

    setCurrentElement(elem) {
        this.elem = elem;
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return fetch(`${this._address}/cards/likes/${cardId}`,
            {
            method: 'Delete',
            headers: {
                authorization: this._token
            }
        }).then(this._checkResponse);
    } else {
        return fetch(`${this._address}/cards/likes/${cardId}`,
        {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        }).then(this._checkResponse);
    }
}

    setUserAvatar({ avatar }) {
        return fetch(`${this._address}/users/me/avatar`,
        {
            method: "PATCH",
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar
            })
        }).then(this._checkResponse);
    }
}


const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1/cohort-23',
    token: '3ba80848-84c8-48bd-a97a-d35ecfe36586'
  });

export default api;