import './index.css'

const WebsiteItem = props => {
  const {item, deleteItem, checkBox} = props
  const {username, website, password, id} = item

  const word = username[0]

  const onClickDelete = () => {
    deleteItem(id)
  }

  const passwordText = checkBox ? (
    <p className="name">{password}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars"
    />
  )

  return (
    <li className="list">
      <div className="initial">
        <p className="word">{word}</p>
      </div>
      <div className="text-cont">
        <p className="name">{website}</p>
        <p className="name">{username}</p>
        {passwordText}
      </div>
      <button
        type="button"
        className="del-btn"
        onClick={onClickDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="imgs"
        />
      </button>
    </li>
  )
}

export default WebsiteItem
