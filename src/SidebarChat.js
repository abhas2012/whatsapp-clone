import { useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import React from 'react';
import './SidebarChat.css';
import db from './firebase';
import { addDoc, collection } from "firebase/firestore";
import { Link } from 'react-router-dom';

function SidebarChat({ addNewChat,id,name }) {
    const [seed, setSeed] = useState("");

    useEffect(() => {
            setSeed(Math.floor(Math.random() * 5000));
    }, [])

    const createChat = () => {
        const roomName = prompt('Please enter name for chat');


        if (roomName)
        {
            // DB related
            var ref = collection(db,"rooms");
            const docRef = addDoc(ref,{
                name:roomName
            })
        }
    };
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className='sidebarChat'>
             <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
             <div className="sidebarChat__info">
                 <h2>{name}</h2>
                 <p>Last Message</p>
             </div>
        </div>
        </Link>
    )
    :(
        <div onClick={createChat} className='sidebarChat'>
            <h2>
                Add New Chat
            </h2>
        </div>
    )
}

export default SidebarChat;
