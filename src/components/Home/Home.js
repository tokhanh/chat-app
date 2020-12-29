import React from "react"
import Navbar from '../Navbar/Navbar'
import PostList from '../Post/PostList'

export default function Home() {

  return (
    <>  
        <Navbar />
        <div className="d-flex flex-row justify-content-center">
          <div style={{width: "70%"}}>
            <PostList />
          </div>
        </div>
    </>
  )
}