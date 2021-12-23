import React from 'react'
import { useState, useEffect } from 'react';
import './Sidebar.css'
import { Avatar, IconButton } from '@material-ui/core';
import { DonutLarge, SearchOutlined} from '@material-ui/icons';
import { Chat } from '@material-ui/icons';
import { MoreVert } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { onSnapshot, collection } from "firebase/firestore";

function Sidebar() {
    const [rooms,setRooms] = useState([]);

    useEffect(() => { 
  const unsubscribe = onSnapshot(collection(db,"rooms"), (snapshot) =>
   setRooms(snapshot.docs.map((doc) =>({id:doc.id,data:doc.data()})))
  );
  return () => {
    unsubscribe();
  };
 }, []);


    
    return (
        <div className='sidebar'>
        <div className="sidebar__header">
            <IconButton><Avatar /></IconButton>
            <div className="sidebar__headerRight">
                <IconButton>
                <DonutLarge />
                </IconButton>
                <IconButton>
                <Chat />
                </IconButton>
               <IconButton>
                <MoreVert />
                </IconButton>

            </div>
        </div>
        <div className="sidebar__search">
            <div className="sidebar__searchContainer">
            <SearchOutlined />
            <input placeholder='Search or start new chat' type='text'/>
            </div>
        </div>
        <div className="sidebar__chats">
            <SidebarChat addNewChat />
            {rooms.map(room=>(
                <SidebarChat key={room.id} id={room.id} name ={room.data.name} />
            ))}



        </div>
        </div>
    )
}

export default Sidebar;
