import React from 'react'
import { View, Text , Image , Header } from 'react-native'


const LikesScreen = () => {
    return (
        <View>
        <Image
source={require('../pics/Snome.png')}
  style={{ width: 60, height: 60 }}
/>   <Text> Snome Likes </Text>  
            
        </View>
    )
}

export default LikesScreen
