import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/firebase';

export default function NewPost() {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const {currentUser} = useAuth();
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        db.collection("Posts").add({
            author: currentUser.email,
            content: content,
            liked: [],
            comments: [],
            createdAt: new Date()
        }).then(doc => db.collection('Posts').doc(doc.id).update({id: doc.id}));
        setLoading(false);
        history.push("/");
    }

    return (
        <CreatePostContainer>
            <Form onSubmit={onSubmit}>
            <Form.Label variant="primary">Create New Post</Form.Label>
            <Form.Group>
                <Form.Label>Content</Form.Label>
                <Form.Control 
                    rows={3}
                    as="textarea" 
                    value={content}
                    required 
                    onChange={e => setContent(e.target.value)}/>
            </Form.Group>
                <Button type="primary" htmlType="submit" loading={loading}>Create</Button>
            </Form>
        </CreatePostContainer>
    )
}

const CreatePostContainer = styled.div`
    padding-left: 20%;
    width: 60%;
    height: 200px;
`