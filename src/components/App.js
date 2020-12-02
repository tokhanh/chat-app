import React from "react"
import Signup from "./auth/Signup"
import { AuthProvider } from "../context/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./Home/Home"
import Login from "./auth/Login"
import PrivateRoute from "./auth/PrivateRoute"
import NewPost from "./Post/NewPost"
import ChatRooms from "./ChatRooms/ChatRooms"


function App() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="w-100">
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/new-post" component={NewPost} />
              <PrivateRoute exact path="/chatroom" component={ChatRooms} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </div>
  )
}

export default App