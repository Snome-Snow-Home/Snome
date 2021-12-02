import React from 'react';
import {
  View,
  Button,
  Text,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
  SectionList,
  StatusBar,
  ScrollView,
  Row,
  ImageBackground,
  Card,
} from 'react-native';

// for testing purposes
import messages from '../localtestdata/Projects.json';

const styles = {
  cards: {
    width: 450,
    height: 100,
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: 5,
    flexDirection: 'row',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  pic: {
    width: 400,
    height: 200,
  },
  input: {
    width: 350,
    height: 70,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
};





const MessageScreen = () => {

    const [text, onChangeText] = React.useState("User Messages ");
    const [number, onChangeNumber] = React.useState(null);


  return (
    <ScrollView>
      {messages.map((messages) => (
        <View
          className="container"
          id="mesages"
          key={messages.id}
          style={styles.cards}
        >
            <Text>
             profile pic
              <Image style={styles.tinyLogo} source={require('../pics/Snome.png')} />
            </Text>
            <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />



        </View>
      ))}
    </ScrollView>
  );
};

export default MessageScreen;