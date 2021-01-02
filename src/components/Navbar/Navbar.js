import React, {useState} from 'react'
import { useAuth } from '../../context/AuthContext'
import { useHistory } from 'react-router-dom'
import { Alert, Nav } from 'react-bootstrap'
import styled from 'styled-components'
 
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
        <NavbarWrapper className="d-flex flex-row align-items-center">
            <Nav.Item className="text-center pr-2">
                <Nav.Link href="/">
                    <i className="fas fa-home" /> Home
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className="text-center pr-2">
                <Nav.Link href="/new-post">
                    <i className="fas fa-paper-plane"/> New Post
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/your-post">
                    <i className="fas fa-sticky-note"/> Your Posts
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link>
                    <i className="fas fa-user"/> Guest{currentUser.uid}
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                {error && <Alert variant="danger">{error}</Alert>}
                <Nav.Link onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt" /> Log Out
                </Nav.Link>
            </Nav.Item>
        </NavbarWrapper>
    )
}

const NavbarWrapper = styled.div`
    width: 100%;
    height: 50px;
    background-color: whitesmoke; 
`