import React, { useEffect, useState } from 'react'
import { db } from '../../services/firebase';
import Post from './Post';

export default function PostList() {
    const [postList, setPostList] = useState([]);
    useEffect(() => {
        const unsubscribe = db.collection('Posts').onSnapshot(
            snap => setPostList(snap.docs.map(i => ({...i.data(), createdAt: i.data().createdAt.seconds})))
        )
        return unsubscribe;
    }, [])

    return (
        <div className="d-flex flex-column justify-content-center align-items-center mb-1">
            {postList.map(i => <Post key={i.id} info={i}/>)}
        </div>
    )
}
