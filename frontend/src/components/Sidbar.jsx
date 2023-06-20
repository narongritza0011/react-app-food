
const Sidbar = () => {
  return (
    <div className="columns">
    <div className="column is-one-quarter">
      <aside className="menu">
        <p className="menu-label">
          General
        </p>
        <ul className="menu-list">
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Customers</a></li>
          <li><a href="#">Orders</a></li>
        </ul>
        <p className="menu-label">
          Administration
        </p>
        <ul className="menu-list">
          <li><a href="#">Team Settings</a></li>
          <li>
            <a className="is-active" href="#">Manage Your Team</a>
            <ul>
              <li><a href="#">Members</a></li>
              <li><a href="#">Plugins</a></li>
              <li><a href="#">Add a member</a></li>
            </ul>
          </li>
          <li><a href="#">Invitations</a></li>
          <li><a href="#">Cloud Storage Environment Settings</a></li>
          <li><a href="#">Authentication</a></li>
        </ul>
      </aside>
    </div>
    
  </div>
  )
}

export default Sidbar