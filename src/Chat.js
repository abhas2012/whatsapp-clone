import {Avatar, IconButton} from '@material-ui/core'
import React from 'react'
import { useState, useEffect } from 'react';
import { AttachFile, SearchOutlined,MoreVert, InsertEmoticon,Mic} from '@material-ui/icons';
import './Chat.css'
import { useParams } from 'react-router';
import db from './firebase';
import { getDoc, getDocs, doc,collection,serverTimestamp,addDoc,orderBy,onSnapshot,query } from "firebase/firestore";
import {useStateValue} from './StateProvider';


function Chat() {
    const [seed, setSeed] = useState("");
    const [input,setInput] = useState("");
    const { roomId } = useParams();
    const [roomName,setRoomName] = useState("");
    const [messages,setMessages] = useState([]);
    const [{ user },dispatch] =useStateValue();
    let lastSeen = null;
 
    useEffect(() => {
        if(roomId)
        {
            const getRoom = async () => {

                  const docRef = doc(db, "rooms", roomId);
            // const docSnap = await getDoc(docRef);
            //         if (docSnap.exists()) {
            // setRoomName( docSnap.data().name);

            const room1 = onSnapshot(doc(db, "rooms", roomId), (doc) => {
                setRoomName(doc.data().name);
            });

//             const q = query(collection(doc(db,"rooms",roomId),'messages'), orderBy("timestamp",'asc'));

// const querySnapshot = await getDocs(q);
//   // doc.data() is never undefined for query doc snapshots
//   setMessages(querySnapshot.docs.map((doc) =>(doc.data())));
            const unsubscribe = onSnapshot(query(collection(doc(db,"rooms",roomId),'messages'), orderBy("timestamp",'asc')), (snapshot) =>
   setMessages(snapshot.docs.map((doc) =>(doc.data()))));
  return () => {
    room1();
    unsubscribe();
    
  }; 
        }      
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
        addDoc(collection(doc(db,"rooms",roomId),'messages'),{
            message:input,
            name:user.displayName,
            timestamp:serverTimestamp()
        })

    }

    return (
        <div className='chat'>
            <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="chat__headerInfo">
                
                <h3>{roomName}</h3>
                <p>Last seen at {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
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
                {messages.map(message =>(
                    <p className={`chat__message ${message.name==user.displayName && "chat__receiver"}`}>
                    <span className="chat__name">
                        {message.name}
                    </span>
                        {message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                    </p>
                )
                )}
                

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
