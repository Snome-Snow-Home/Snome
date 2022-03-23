import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView, SectionList, ScrollView, ListView, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import UserContext from '../Context/UserContext';
import { Dimensions } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
const axios = require('axios');


const styles = {
  this_user: {
    borderColor: '#1e90ff',
    textAlign: 'right',
    flex: 1

  },
  card: {
    margin: 4,
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
    lineHeight: 20,
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
    textAlign: 'center'
  },
  status: {
    padding: 10,
    textAlign: "center"
  }
};

const MessageCard = ({ message, setShowThread, user_id }) => {

  return (

    <>
      {/* {!showThread && */}

      <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={() => setShowThread(message.sender_id === user_id ? message.recipient_id : message.sender_id)}>
        <View style={[styles.card, message.sender_id === user_id && styles.selectedConvo]}
        >
          <View >
            <Text style={[message.sender_id === user_id && styles.selectedConvoText]}>message_sender: {message.sender_id}</Text>
            <Text style={[message.sender_id === user_id && styles.selectedConvoText]}>message_recipient: {message.recipient_id}</Text>
            <Text style={[message.sender_id === user_id && styles.selectedConvoText]}>{message.time}</Text>
            <Text style={[message.sender_id === user_id && styles.selectedConvoText]}>{message.message_text}</Text>
            <Text style={[message.sender_id === user_id && styles.selectedConvoText]}>{message.id}</Text>


          </View>
        </View>
      </TouchableOpacity>
      {/* } */}

    </>
  )
}

const MessageScreen = () => {

  const context = useContext(UserContext)
  const user_id = context.user_data.user_id
  //console.log(user_id)

  let cm = context.mess

  // const [messages, setMessages] = useState(context.messages)

  const [messageQueue, setMessageQueue] = useState([])
  const [showThread, setShowThread] = useState(false)
  const [newMessage, setNewMessage] = useState()
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  // const [height, setHeight] = useState(0)

  const [window, setWindow] = useState([])
  const [windowHeight, setWindowHeight] = useState(0)
  const tabBarHeight = useBottomTabBarHeight();

  const sortMessagesByOtherUser = (messages) => {
    const recentByOtherUser = {}
    const message_queue = []
    messages.forEach(msg => {
      let other = msg.recipient_id === user_id ? msg.sender_id : msg.recipient_id
      if (!recentByOtherUser.hasOwnProperty(other)) {
        recentByOtherUser[other] = msg
        message_queue.push(msg)
      }
    })
    // return message_queue
    setMessageQueue(message_queue)
  }

  const sendMessage = async () => {

    axios.post(
      'http://localhost:3000/messages/',
      { sender_id: user_id, recipient_id: showThread, message_text: newMessage }
    )
      .then((new_message) => {
        // console.log('NEW MESSAGE DATA POST: ', new_message.data)
        context.setMessages([new_message.data, ...context.messages])
        sortMessagesByOtherUser([new_message.data, ...context.messages])
      }
      )
      .catch(error => {
        console.error(error);
        console.log('Snome not able to be added to snome_message ', error)
      })

  };

  var ws = React.useRef(new WebSocket('ws://localhost:8080')).current;
  const [serverMessages, setServerMessages] = useState('');

  const [temp, setTemp] = useState('empty')

  useEffect(() => {

    ws.onopen = () => {
      ws.send(JSON.stringify({ source: 'client', id: user_id }))

    };
    // ws.onclose = (e) => {
    //   setServerState('Disconnected. Check internet or server.')
    //   setDisableButton(true);
    // };
    // ws.onerror = (e) => {
    //   setServerState(e.message);
    // };
    ws.onmessage = async (e) => {
      // console.log(e)
      // console.log(e.data)
      // console.log('parsed data: ', JSON.parse(e.data))
      let new_message = JSON.parse(e.data)
      // console.log('NEW MESSAGE DATA WS: ', new_message)
      // sortMessagesByOtherUser([new_message, ...messages])
      //console.log('messages[length-1]: ', context.messages[context.messages.length - 1])
      context.setMessages([new_message, ...context.messages])
      sortMessagesByOtherUser([new_message, ...context.messages])
    };


    if (context.messages) {
      sortMessagesByOtherUser(context.messages)
    }

    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(() => {
        return (e.endCoordinates.height - tabBarHeight)
      })
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", (e) => {
      setKeyboardHeight(0)
    });

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    setWindow(`${windowWidth} ${windowHeight}`)
    setWindowHeight(windowHeight)

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };

  }, [context.messages])

  const renderItem = ({ item }) => {
    return <MessageCard key={item.id} style={{ flex: 1, flexDirection: 'row-reverse', }} message={item} setShowThread={setShowThread} user_id={user_id}
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
                keyExtractor={item => item.id}
              />
            </>
          }
          {showThread &&
            <>
              <View
                style={{
                  //the static numbers represent the text input height (with padding) and the headerButton height (padding)
                  height: windowHeight - keyboardHeight - tabBarHeight - 80 - 62
                }}
              >

                <TouchableOpacity  >
                  <Text style={styles.headerButton} onPress={() => setShowThread(false)}>Back to Messages</Text>
                </TouchableOpacity>
                <FlatList
                  data={context.messages.filter(msg => msg.sender_id === showThread || msg.recipient_id === showThread)}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                />
                {/* {console.log(Keyboard)} */}

              </View>

              <TextInput
                style={{
                  height: 60,
                  lineHeight: 20,
                  borderWidth: 2,
                  borderColor: '#e1861b',
                  padding: 10,
                  backgroundColor: "white",
                  position: 'absolute',
                  bottom: keyboardHeight,
                  width: '100%'
                }}
                onChangeText={setNewMessage}
                value={newMessage}
                onSubmitEditing={sendMessage}

              />

            </>

          }

        </>
      )}
    </UserContext.Consumer>

  );
};


export default MessageScreen;