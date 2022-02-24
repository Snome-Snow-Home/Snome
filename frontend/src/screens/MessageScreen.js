import React, { useState, useEffect, useContext } from "react";
import {View, Text, TextInput, StyleSheet, SafeAreaView, SectionList, ScrollView, ListView, FlatList, TouchableOpacity, Keyboard} from 'react-native';
import UserContext from '../Context/UserContext';


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



const MessageScreen = () => {

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