import React, { useState, useEffect, useContext } from "react";
import {View, Text, TextInput, StyleSheet, SafeAreaView, SectionList, ScrollView, ListView, FlatList, TouchableOpacity, Keyboard} from 'react-native';
import UserContext from '../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


//Plan:

// -Order messages by date
// -When select a message, highlights 'thread' between user and interlocutor
// --text input pops up to send message which pops to top of stack
// -special message for match? (like a confirm match thing?)
// -clicking message expands it in-place


// Next Steps:
// - Expand message to display more text
// - select message thread -> input text -> appear message
// - Incorporate context to identify user and then insert user_id into messages/create message

// const messages = [
//   {
//     id:1,
//     recipient:6,
//     sender:4,
//     time:'1999-01-08 4:05:06',
//     message_text:"your place is so cool!",
//     has_been_read: true
//   },
//   {id:2,recipient:6,sender:1,time:'1999-01-08 4:06:06',message_text:"you're gonna love it",has_been_read:true},
//   {id:3,recipient:1,sender:6,time:'1999-01-08 4:07:06',message_text:"when do you want to come?",has_been_read:true},
//   {id:4,recipient:6,sender:7,time:'1999-01-08 4:08:06',message_text:"i'll recommend some bars",has_been_read:true},
//   {id:5,recipient:7,sender:6,time:'1999-01-08 4:09:06',message_text:"can you recommend some restaurants?",has_been_read:true},
//   {id:6,recipient:6,sender:1,time:'1999-01-08 4:10:06',message_text:"are you really close to the mountain?",has_been_read:true},
//   {id:7,recipient:5,sender:6,time:'1999-01-08 4:11:06',message_text:"let's connect soon",has_been_read:true},
//   {id:8,recipient:6,sender:5,time:'1999-01-08 4:12:06',message_text:"can I extend my stay?",has_been_read:false},
//   {id:9,recipient:5,sender:6,time:'1999-01-08 4:13:06',message_text:"have you been in town before?",has_been_read:false},
//   {id:10,recipient:1,sender:6,time:'1999-01-08 4:14:06',message_text:"see you soon!",has_been_read:false}
// ]


const MessageCard = ({message, setShowThread}) => {


  return (



    <>
    {/* {!showThread && */}

    <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={()=> setShowThread(message.sender === 6 ? message.recipient : message.sender)}>
      <View style={[styles.card, message.sender === 6 && styles.selectedConvo]}
      >
        <View >
          <Text style= {[message.sender === 6 && styles.selectedConvoText]}>message_sender: {message.sender}</Text>
          <Text style= {[message.sender === 6 && styles.selectedConvoText]}>messgae_recipient: {message.recipient}</Text>
          <Text style= {[message.sender === 6 && styles.selectedConvoText]}>{message.time}</Text>
          <Text style= {[message.sender === 6 && styles.selectedConvoText]}>{message.message_text}</Text>
        </View>
      </View>
    </TouchableOpacity>
    {/* } */}

    </>


  )
}


const styles = {
  this_user: {
    borderColor: '#1e90ff',
    textAlign: 'right',
    flex:1

  },
  card: {
    margin:4,
    borderWidth: 2,
    flex: 1
  },
  selectedUser: {
    backgroundColor: '#ffbaa1'
  },
  selectedConvo: {
    borderColor: '#96cbff',
    borderWidth: 2
  },
  selectedConvoText: {
    textAlign: 'right',
  },
  input: {
    height: 60,
    lineHeight:20,
    borderWidth: 2,
    borderColor: '#e1861b',
    padding: 10,
    backgroundColor: "white",
  },
  headerButton: {
    backgroundColor: "white",
    padding: 6,
    height: 50,
    width: '100%',
    // color: 'red',
    textAlign: 'center'
  }
};

const MessageScreen = () => {

  useEffect(async ()=>{

    const token = await AsyncStorage.getItem('token')
    // token.then(v => {console.log(v)})
    console.log(`Bearer ${token.slice(1, token.length-1)}`)

    // try {
      axios({
        method: 'get',
        url: 'http://localhost:3000/protected_has_token',
        headers: {
          'Authorization': `Bearer ${token.slice(1, token.length-1)}`
        }
      })
      .then(response => {
        console.log('MESSAGE JWT TEST: ', response)
      })
      .catch(error => {
        console.error(error);
        console.log('MESSAGE JWT TEST FAILED: ', error)
      })
  })

  const context = useContext(UserContext)
  // console.log(context.user_data.messages)

  const [messages, setMessages] = useState(context.user_data.messages)
  const [messageQueue, setMessageQueue] = useState([])
  const [showThread, setShowThread] = useState(false)

  const sortMessagesByOtherUser = (messages) => {
    const recentByOtherUser = {}
    const message_queue = []
    messages.reverse()
    messages.forEach(msg => {
      let other = msg.recipient === 6 ? msg.sender : msg.recipient
      if (!recentByOtherUser.hasOwnProperty(other)){
        recentByOtherUser[other] = msg
        message_queue.push(msg)
      }
    })
    // return message_queue
    setMessageQueue(message_queue)
  }

  useEffect(()=>{
    sortMessagesByOtherUser(messages)
  }, [])

  const renderItem = ({item}) => {
    return <MessageCard style={{flex: 1, flexDirection: 'row-reverse',}} message={item} setShowThread = {setShowThread}

    />
  }

  return (

    <UserContext.Consumer>
    {context => (

      <>

      {!showThread &&
      <>
        <Text style={styles.headerButton}>Your Conversations</Text>
        <FlatList
          data={messageQueue}
          renderItem={renderItem}
          keyExtractor={item => item.message_text}
        />
        </>
      }

      {showThread &&
      <>
        <TouchableOpacity  >
          <Text style={styles.headerButton} onPress={()=>setShowThread(false)}>Back to Messages</Text>
        </TouchableOpacity>
        <FlatList
          data={messages.filter(msg => msg.sender === showThread || msg.recipient === showThread)}
          renderItem={renderItem}
          keyExtractor={item => item.message_text}
        />
      </>
      }

      </>

    )}
    </UserContext.Consumer>

  );
};


export default MessageScreen;