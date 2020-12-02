import React from "react"
import Navbar from '../Navbar/Navbar'
import PostList from '../Post/PostList'

export default function Dashboard() {
  

  return (
    <>  
        <Navbar />
        <div className="d-flex flex-row justify-content-center">
          <div style={{width: "70%"}}>
            <PostList />
          </div>
          <div style={{width: "30%"}}>
            Tags
          </div>
        </div>
    </>
  )
}