import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/firebase';

export default function Post({info}) {
    const { currentUser } = useAuth();

    const [isLike, setIsLike] = useState(
        info.liked.find(i => i === currentUser.uid) ? true : false
    );
    
    
    const onChangeLike = () => {
        setIsLike(p => !p)
    }

    useEffect(() => {
        const changeLike = () => {
            const liked = info.liked.filter(i => i !== currentUser.uid)
            db.collection('Posts').doc(info.id).update({
                liked: isLike ? [...liked, currentUser.uid] : liked.filter(u => u !== currentUser.uid)
            })
        }
        changeLike();
    }, [isLike, currentUser.uid, info.id, info.liked])
    
    return (
        <PostContainer className="mb-5">
            <Author className="title">{info.author}</Author>
            <Content className="content">{info.content}</Content>
            <Icon onClick={_ => onChangeLike()} isLike={isLike}>
                <i className="far fa-heart"></i>
                {info.liked.length > 0 && <>{info.liked.length}</>}
            </Icon>
        </PostContainer>
    )
}

const PostContainer = styled.div`
    width: 75%;
    border: 1px solid black;
    border-radius: 5px;
`

const Author = styled.div`
    background-color: aqua;
`
const Content = styled.div`
    font-family: Roboto;
`
const Icon = styled.button`
    background-color: ${props => props.isLike ? "red" : "white"};
    font-size: 20px;
    outline: none;
    border: none;
`

