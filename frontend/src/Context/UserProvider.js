import UserContext from './UserContext';
import React, { useState, useEffect, useContext } from "react";
const axios = require('axios');

function UserProvider(props) {

  const [location, setLocation] = useState()
  const [messages, setMessages] = useState(null);
  let user_messages;


  const appDataFetch = async () => {
    try {
      setLocation(location_json)
    } catch (error) {
      console.error(error);
    }
  }

  const [userData, setUserData] = useState(
    {
      is_logged_in: false,
      username: "",
      user_id: 4,
      match: {
        user_id: 6,
        snome_id: [5, 4]
      },
      snome_likes: {
        snome_id: 3
      },
      messages: messages
    }
  );

  useEffect(() => {
    console.log(Date.now())
    appDataFetch()
  }, []);

  return (
    <UserContext.Provider
      value={{ messages: messages,setMessages: setMessages, user_data: userData, setUserData: setUserData, location_data: location }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider