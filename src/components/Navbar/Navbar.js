import React, {useState} from 'react'
import { useAuth } from '../../context/AuthContext'
import { useHistory } from 'react-router-dom'
import { Button, Alert, Nav } from 'react-bootstrap'
 
export default function Navbar() {

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError("")
        try {
        await logout()
        history.push("/login")
        } catch {
        setError("Failed to log out")
        }
    }

    return (
        <div 
            className="d-flex flex-row justify-content-center align-items-center"
            style={{width: '100%', height: "75px", backgroundColor: "whitesmoke"}}>
            <Nav.Item className="text-center pr-2">
                <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item className="text-center pr-2">
                <Nav.Link href="/new-post">New Post</Nav.Link>
            </Nav.Item>
            <Nav.Item className="text-center pr-2">
                <Nav.Link href="/chatroom">Chat Room</Nav.Link>
            </Nav.Item>
            <div>{currentUser.email}</div>
            <div className="w-100 text-center mt-2">
                {error && <Alert variant="danger">{error}</Alert>}
                <Button variant="link" onClick={handleLogout}>
                    Log Out
                </Button>
            </div>
        </div>
    )
}
