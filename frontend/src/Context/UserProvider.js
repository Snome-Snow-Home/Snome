import UserContext from './UserContext';
import React, { useState, useEffect, useContext } from "react";
const axios = require('axios');

function UserProvider(props) {

  const [location, setLocation] = useState()
<<<<<<< HEAD
  let user_messages;
  const [messages, setMessages] = useState(null);
=======
  const [messages, setMessages] = useState(null);
  let user_messages;

>>>>>>> messages2

  const appDataFetch = async () => {
    try {
      const location = await fetch('http://localhost:3000/location')
      user_messages = await fetch('http://localhost:3000/messages/6')
      let messages_json = await user_messages.json()
      setMessages(messages_json)
      const location_json = await location.json();
      setLocation(location_json)
    } catch (error) {
      console.error(error);
    }
  }

  const [userData, setUserData] = useState(
    {
      is_logged_in: false,
      username: "",
      user_id: null,
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
<>{messages &&

    <UserContext.Provider
<<<<<<< HEAD
      value={{ messages: messages, user_data: userData, setUserData: setUserData, location_data: location }}
=======
      value={{ messages: messages,setMessages: setMessages, user_data: userData, setUserData: setUserData, location_data: location }}
>>>>>>> messages2
    >
      {props.children}
    </UserContext.Provider>
 } </>
  );
}

export default UserProvider