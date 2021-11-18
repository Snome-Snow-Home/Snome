import React from 'react'
import { View, Text , Image , Header } from 'react-native'

// for testing purposes
const DATA = [
  {
    title: "Main dishes",
    data: ["Pizza", "Burger", "Risotto"]
  },
  {
    title: "Sides",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"]
  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"]
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"]
  }
];


const LikesScreen = () => {
    return (
        <View>
        <Image
source={require('../pics/Snome.png')}
  style={{ width: 60, height: 60 }}
/>   <Text> Snome Likes </Text>  
<SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item title={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
        </View>
    )
}

export default LikesScreen
