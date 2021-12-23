import {Avatar, IconButton} from '@material-ui/core'
import React from 'react'
import { useState, useEffect } from 'react';
import { AttachFile, SearchOutlined,MoreVert, InsertEmoticon,Mic} from '@material-ui/icons';
import './Chat.css'
import { useParams } from 'react-router';
import db from './firebase';
import { collection, query, where, getDoc, doc } from "firebase/firestore";


function Chat() {
    const [seed, setSeed] = useState("");
    const [input,setInput] = useState("");
    const { roomId } = useParams();
    const [roomName,setRoomName] = useState("");
 
    useEffect(() => {
        if(roomId)
        {
            const getRoom = async () => {

                    const docRef = doc(db, "rooms", roomId);
            const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
            setRoomName( docSnap.data().name);
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }      
                        };
        
        getRoom();

        

      
}
}, [roomId]);

    useEffect(() => {
            setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('You typed -----',input);
        setInput('');
    }

    return (
        <div className='chat'>
            <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="chat__headerInfo">
                
                <h3>{roomName}</h3>
                <p>Last seen at...</p>
            </div>
            <div className="chat__headerRight">
            <IconButton>
                <SearchOutlined />
                </IconButton>
                <IconButton>
                <AttachFile />
                </IconButton>
               <IconButton>
                <MoreVert />
                </IconButton>
            </div>
                               </div>
            <div className="chat__body">
     
                <p className={`chat__message ${true && "chat__receiver"}`}>
                <span className="chat__name">
                    AB
                </span>
                    Hello
                <span className="chat__timestamp">
                    4:00 pm
                </span>
                </p>

            </div>
            <div className="chat__footer">
            <InsertEmoticon/>
            <form>
                <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Type a message' />
                <button onClick={sendMessage} type='submit'>
                    Send Message
                </button>
            </form>
            <Mic/>
        </div>
        </div>
    )
}

export default Chat
