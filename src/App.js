import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import WebsiteItem from './components/WebsiteItem'

import './App.css'

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    search: '',
    isTrue: true,
    listDetails: [],
    checkBox: false,
    count: 0,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }

  onSubmitItem = event => {
    event.preventDefault()
    const {username, password, website, count} = this.state

    const details = {
      id: uuidv4(),
      password,
      username,
      website,
    }
    if (username !== '' && password !== '' && website !== '') {
      this.setState(prevState => ({count: prevState.count + 1}))

      if (count >= 0) {
        this.setState({isTrue: false})
      } else if (count <= 0) {
        this.setState({isTrue: true})
      }

      this.setState(prevState => ({
        listDetails: [...prevState.listDetails, details],
        username: '',
        password: '',
        website: '',
      }))
    }
  }

  onClickCheckBox = () => {
    this.setState(prevState => ({checkBox: !prevState.checkBox}))
  }

  deleteItem = id => {
    const {listDetails} = this.state
    const newList = listDetails.filter(each => each.id !== id)

    this.setState({listDetails: newList})

    this.setState(prevState => ({count: prevState.count - 1}))
  }

  render() {
    const {
      website,
      username,
      password,
      search,
      isTrue,
      listDetails,
      checkBox,
      count,
    } = this.state

    const finalList = listDetails.filter(each =>
      each.website.toLowerCase().includes(search.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="input-cont">
          <div className="form-cont">
            <h1 className="pass-heading">Add New Password</h1>
            <form className="form" onSubmit={this.onSubmitItem}>
              <div className="mini">
                <div className="div">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="img"
                  />
                </div>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsite}
                  value={website}
                />
              </div>
              <div className="mini">
                <div className="div">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="img"
                  />
                </div>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="mini">
                <div className="div">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="img"
                  />
                </div>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <button type="submit" className="submit-btn">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="image"
          />
        </div>
        <div className="password-cont">
          <div className="search-cont">
            <div className="pass-count-cont">
              <h1 className="your">Your Passwords</h1>
              <div className="count-cont">
                <p className="count">{count}</p>
              </div>
            </div>
            <div className="mini">
              <div className="div">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="img"
                />
              </div>
              <input
                type="search"
                className="input"
                placeholder="Search"
                value={search}
                onChange={this.onChangeSearch}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="show-cont">
            <input
              type="checkbox"
              className="select"
              onClick={this.onClickCheckBox}
              id="checkbox"
            />
            <label className="p" htmlFor="checkbox">
              Show Passwords
            </label>
          </div>
          {isTrue ? (
            <div className="div-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="pass-img"
              />
              <p className="p">No passwords</p>
            </div>
          ) : (
            <ul className="list-cont">
              {finalList.map(each => (
                <WebsiteItem
                  item={each}
                  key={each.id}
                  deleteItem={this.deleteItem}
                  checkBox={checkBox}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
