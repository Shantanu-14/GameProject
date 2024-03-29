import React, { useContext, useRef, useEffect, useState } from 'react'
import {UserContext} from '../App'
import {Link,useHistory} from 'react-router-dom'

function Navbar() {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  const renderList = () => {
    if (state) {
      return [
        <li><Link className="link" to="/">Home</Link></li>,
        <li><Link className="link" to="/allGames">All Games</Link></li>,
        <li><Link className="link" to="/mylist"><img //class="dp"
        style={{ width: "50px", height: "50px", borderRadius: "15px", margin:""}}
        src={state?.photo,`https://robohash.org/${state?.firstName}?size=200x200`}
        />{state.firstName}'s List</Link></li>,
        <li>{console.log(state)}
             <button className="logout waves-effect waves-light #c62828 red darken-3 btn-small"
            onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }}
            >
                Logout
            </button>
            </li>
      ]
    } else {
      return [
        <li><Link className="link" to="/signin">Sign in</Link></li>,
        <li><Link className="link" to="/signup">Sign up</Link></li>
      ]
    }
  }
    return (
    <nav>
    <div className="nav-wrapper #212121 grey darken-4">
      <Link to={state?"/":"/signin"} className="brand-logo left">GameGeek.GG</Link>
          <ul id="nav-mobile" className="right">
        {renderList()}
      </ul>
    </div>
            
    </nav> 
        
    )
}

export default Navbar