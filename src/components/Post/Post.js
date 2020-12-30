import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/firebase';

export default function Post({info}) {
    const { currentUser } = useAuth();
    const createdAt = new Date(info.createdAt*1000);

    const [isLike, setIsLike] = useState(
        info.liked.some(i => i === currentUser.uid)
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
        <PostWrapper className="mb-5">
            <Link to={"/post/" + info.id}> 
                <PostContainer>
                    <Author className="title">{info.author} || created: {createdAt.toLocaleString('en-US', {timeZone: 'UTC'})}</Author>
                    <Content className="content">{info.content}</Content>
                </PostContainer>
            </Link>
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
        </PostWrapper>
    )
}

const PostWrapper = styled.div`
    width: 75%;
    border: 1px solid grey;
    border-radius: 10px;
`
const PostContainer = styled.div`
    cursor: pointer;
`

const Author = styled.div`
    background-color: aqua;
`
const Content = styled.div`
    font-family: Roboto;
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

