import React from "react"
import Signup from "./auth/Signup"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./Home/Home"
import Login from "./auth/Login"
import PrivateRoute from "./auth/PrivateRoute"
import NewPost from "./Post/NewPost"
import { useAuth } from "../context/AuthContext"
import Navbar from "./Navbar/Navbar"
import PostDetail from './Post/PostDetail'
import YourPost from "./Post/YourPost"

function App() {
  const {currentUser} = useAuth();
  return (
    <>
      <div>
        {currentUser && <Navbar />}
      </div>
      <div>
          <Router>
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/new-post" component={NewPost} />
                <PrivateRoute exact path="/post/:postId" component={PostDetail}/>
                <PrivateRoute exact path="/your-post" component={YourPost} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
              </Switch>
          </Router>
      </div>
    </>
  )
}

export default App