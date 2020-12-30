import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/firebase'

export default function PostDetail() {
    const { postId } = useParams()
    const {currentUser} = useAuth()
    const [loadingData, setLoadingData] = useState(true)
    const [isLike, setIsLike] = useState(false)
    const [info, setInfo] = useState({});

    const onChangeLike = _ => setIsLike(p => !p)

    useEffect(() => {
        const fetchContent = async _ => {
            const snap = await db.doc('Posts/'+postId).get()
            setInfo(snap.data())
            setIsLike(snap.data().liked.some(i => i === currentUser.uid))
            setLoadingData(false)
        }
        
        return fetchContent();
    }, []);

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
                    </div>  
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