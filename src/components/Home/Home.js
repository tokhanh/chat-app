import React from "react"
import PostList from '../Post/PostList'

export default function Home() {
  return (
    <>  
        <div className="d-flex flex-row justify-content-center">
          <div style={{width: "70%"}}>
            <PostList />
          </div>
        </div>
    </>
  )
}