import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../services/firebase'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

export default function YourPost() {
    const {currentUser} = useAuth();
    const [loadingData, setLoadingData] = useState(true);

    const [yourPost, setYourPost] = useState([]);
    const onDelete = id => {
        if (window.confirm('Do you want to delete this ?')) {
            db.collection('Posts').doc(id).delete();
        }
    }
    useEffect(() => {
        const fetchYourPost = async _ => {
            const snap = await db.collection('Posts').where('author', '==', currentUser.email).get();
            setYourPost(snap.docs.map(i => ({
                ...i.data(),
                created: (new Date(i.data())).toLocaleDateString('en-US', {timeZone: 'UTC'})
            })));
            setLoadingData(false);
        }
        return fetchYourPost()
    }, [yourPost])

    return (
        <div>
            {!loadingData && (
                <PostListWrapper>
                    {yourPost.map(i => (
                        <Post key={i.id} className="d-flex justify-content-between">
                            <Link to={'/post/' + i.id}>
                                <div><p>{i.content}</p></div>
                            </Link>
                            <div>
                                <i className="fas fa-trash" onClick={_ => onDelete(i.id)} />
                            </div>
                        </Post>
                    ))}
                </PostListWrapper>
            )}
        </div>
    )
}

const PostListWrapper = styled.div`
    width: 500px;
`

const Post= styled.div`
    width: 100%;
    border: 1px solid grey;
    border-radius: 10px;
    background: #750185;
    margin: 10px;
    i {
        cursor: pointer;
        color: red;
    }
`