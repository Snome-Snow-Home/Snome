import UserContext from './UserContext';
import React, { useState, useEffect, useContext } from "react";
const axios = require('axios');

function UserProvider(props) {

  const [location, setLocation] = useState()
  const [messages, setMessages] = useState(null);
  const [snome_likes, setSnomeLikes] = useState(null)
  const [test, setTest] = useState(false)
  //let user_messages;


  const appDataFetch = async () => {
    try {
      const location = await fetch('http://localhost:3000/location')
      const location_json = await location.json();
      setLocation(location_json)
    } catch (error) {
      console.error(error);
    }
  }

  const [userData, setUserData] = useState(
    {
      //is_logged_in: true,
      is_logged_in: false,
      username: "",
      user_id: null,
      //user_id: 1,
      match: {
        user_id: 6,
        snome_id: [5, 4]
      },
      snome_likes: snome_likes,
      messages: messages
    }
  );

  useEffect(() => {
    console.log(Date.now())
    appDataFetch()
  }, []);

  return (
    <UserContext.Provider
      value={{ test: test, setTest: setTest, snome_likes: snome_likes, messages: messages, setMessages: setMessages, user_data: userData, setUserData: setUserData, location_data: location }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider