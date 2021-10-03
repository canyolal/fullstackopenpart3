const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="notifMessage">
        {message}
      </div>
    )
  }

  export default Notification