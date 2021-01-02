import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/firebase'
import { Input, Button, Form } from 'antd'

export default function PostDetail() {
    const { postId } = useParams()
    const {currentUser} = useAuth()
    const [loadingData, setLoadingData] = useState(true)
    const [isLike, setIsLike] = useState(false)
    const [info, setInfo] = useState({});
    const [comment, setComment] = useState('');

    const onChangeLike = _ => setIsLike(p => !p)

    useEffect(() => {
        const unsubscribe = db.doc('Posts/'+ postId).onSnapshot(
            snap => {
                setInfo(snap.data())
                if (info.id) {
                    setIsLike(snap.data().liked.some(i => i === currentUser.uid))
                }
            }
        )
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (info.id) {
            setLoadingData(false);
        }
    }, [info])

    const addComments = e => {
        e.preventDefault();
        const writeData = _ => {
            const _comment = {}
            _comment[currentUser.email] = comment
            db.collection('Posts').doc(info.id).update({
                ...info,
                comments: [...info.comments, _comment]
            })
        }
        writeData()
        setComment('')
    }

    useEffect(() => {
        const changeLike = () => {
            if (info.id) {
                const liked = info.liked.filter(i => i !== currentUser.uid)
                db.collection('Posts').doc(info.id).update({
                    liked: isLike ? [...liked, currentUser.uid] : liked.filter(u => u !== currentUser.uid)
                })
            }
        }
        return changeLike();
    }, [isLike, info, currentUser.uid])

    return (
        <>
            { !loadingData && (
                <PostContainer>
                    <div>
                        <div>
                            <p>Author: {info.author}</p>
                        </div>
                        <div>
                            <p>{info.content}</p>
                        </div>
                        <IconContainer>
                            <Icon onClick={_ => onChangeLike()} isLike={isLike}>
                                <div className="d-flex">
                                    <div>
                                    <i className="far fa-heart" />
                                    </div>
                                    {info.liked.length > 0 && <div>{info.liked.length}</div>}
                                </div> 
                            </Icon>
                        </IconContainer>
                        <Form onSubmitCapture={addComments}>
                            <Input placeholder="comments" onChange={e => setComment(e.currentTarget.value)} required value={comment}/>
                            <Button htmlType="submit">Add Comment</Button>
                        </Form>
                    </div>  
                    <CommentContainer className="d-flex flex-column">
                        {info.comments.map(i => (
                            <div key={Object.values(i)[0]} className="comment">
                                <h6 className="user">{Object.keys(i)[0]}</h6>
                                <p>{Object.values(i)[0]}</p>
                            </div>
                        ))}
                    </CommentContainer>
                </PostContainer>
            )}
        </>
    )
}

const PostContainer = styled.div`
    width: 75%;
    height: 100px;
    padding-top: 20px;
    padding-left: 20px;
    border: 1px solid grey;
    border-radius: 15px;
`
const IconContainer = styled.div`
    width: 100%;
`
const Icon = styled.div`
    width: 30px;
    border: 1px solid grey;
    border-radius: 5px;
    margin: 2px;
    cursor: pointer;
    background-color: ${props => props.isLike ? '#34a832' : 'white'};
`
const CommentContainer = styled.div`
    .comment {
        border: 1px solid grey;
        border-radius: 5px;
        margin: 10px;
        .user{
            border: 1px solid grey;
            color: #eb3446;
        }
    }
`