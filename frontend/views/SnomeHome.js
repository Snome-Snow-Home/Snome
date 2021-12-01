import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, SafeAreaView, ScrollView, Dimensions } from "react-native";
import MapView, { Marker } from 'react-native-maps';


const Item = ({ title, setQuery, showDropdown, setShowDropdown }) => (
  <View style={styles.item}>
    <Text
     onPress = {()=>(
       showDropdown ==='hide' ? setShowDropdown('show') : setShowDropdown('hide'),
       setQuery(title))}
     style={styles.title}
     >{title}</Text>
  </View>
);

const NewSearch = ({locationData}) => {

  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState("show")

  const renderItem = ({ item }) => {
    let search = query.toLowerCase().replace(/ /g,"_");
    if(query === '') {
      return null
    }
    if(item.toLowerCase().startsWith(search)){
       return (<Item title={item} setQuery={setQuery} showDropdown={showDropdown} setShowDropdown = {setShowDropdown}/>)
    }
  };


  return (
    <>
    {/* <TouchableOpacity
    // key={}
    onPress={() => (showDropdown ==='hide' ? setShowDropdown('show') : setShowDropdown('hide'))}
    style={[
      styles.toggle,
    ]}
  ><Text>show/hide</Text>
  </TouchableOpacity> */}

    <View style={{width:'100%'}} >

      <TextInput
      clearButtonMode='while-editing'
      // returnKeyType='search'
        style={styles.input}
        onChangeText={setQuery}
        value={query}
      />
      <Text>{showDropdown}</Text>

{showDropdown === 'show' &&

      <FlatList
      style={{position:'absolute',top:40, width:'100%'}}
        data={locationData.map(location => location.name)}
        renderItem={renderItem}
        keyExtractor={item => item}
        scrollEnabled = 'false'
      />
}

    </View>
    </>
  );
}

const TownsScreen = () => {
  const [flexDirection, setflexDirection] = useState("column");
  const [toggleView, settoggleView] = useState("ShowList");

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);




  const getLocations = async () => {
    try {
     const response = await fetch('http://10.0.0.54:3000/location?featured=true');
     const json = await response.json();
     setData(json);
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
 }

 useEffect(() => {
   getLocations();
 }, []);

 console.log(data)




const filterNames = (location) => {
  let search = query.toLowerCase().replace(/ /g,"_");
  if(location.name.toLowerCase().startsWith(search)){
      // return location.name;
      return <Text style={{height: 40}}>{location.name}</Text>
  }else{
      return null;
  }
}

  return (
    <>

    <Grid
    // updateQuery = {updateQuery}
    // query = {query}

      label="flexDirection"
      // values={["parkcity", "aspen", "crestedbutte", "alta"]}
      values = {data.map(location => location.name)}
      selectedValue={flexDirection}
      setSelectedValue={setflexDirection}
      toggleOptions = {["ShowList", "ShowMap"]}

      view = {toggleView}
      setView = {settoggleView}
      filterNames = {filterNames}
      locationData = {data}
    >
    </Grid>
  </>
  );
};

const ShowList = ({
    label,
    values,
    selectedValue,
    setSelectedValue,
    toggleOptions}) => (
  <>
  <Text style={styles.label}>{label}</Text>
    <View style={[styles.row, styles.ListMapContainer]}>
      {values.map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => setSelectedValue(value)}
          style={[
            styles.location,
            selectedValue === value && styles.selected,
          ]}
        >
          <Text
            style={[
              styles.buttonLabel,
              selectedValue === value && styles.selectedLabel,
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    </>
)

const ShowMap = ({
  label,
  locationData
  // values,
  // selectedValue,
  // setSelectedValue,
  // toggleOptions
  }) => { console.log(locationData); return (
    <>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.ListMapContainer}>

    <View style={{
        backgroundColor: "oldlace",
        width: "100%",
        height: "100%",
        padding: 16}}>
      <MapView style={styles.map}>
        {locationData.map((location, index) => (
        <Marker
          key={index}
          coordinate={{latitude: location.longitude, longitude: location.latitude
          }}
          // title='title'
          // description='description'
        />
        ))}
      </MapView>

    </View>

      {/* <View style={{
        backgroundColor: "oldlace",
        width: "100%",
        height: "100%",
        padding: 16}}>
      </View> */}
    </View>
    </>
)}

const Grid = ({
  label,
  children,
  values,
  selectedValue,
  setSelectedValue,
  toggleOptions,

  view,
  setView,

  filterNames,
  locationData
}) => {
  // const [showDropdown, setShowDropdown] = useState("hide")

return (
<View style={{ padding: 10, flex: 1, position:'relative' }}>

  {/* Top Container */}
  <View style={[styles.topContainer, { [label]: selectedValue }]}>
  {children}
    <View>
      <Text style={styles.SnomeLogo}>Snome Logo</Text>
    </View>

    {/* Search Box Container */}
    <View
      // style={{maxWidth: '80%', alignItems: 'center'}}
      style={{padding: 12, width: "80%", backgroundColor: "", alignSelf: 'center', position:'relative', zIndex:99}}
    >
      <Text style={{marginLeft: 12, marginBottom: 4}}>Choose your destination</Text>

      <NewSearch
        // showDropdown = {showDropdown}
        locationData = {locationData}
      />


      {/* <Text style={{marginLeft: 12, marginTop: 4}}>Advanced search</Text> */}

    </View>

    <View styles={{position:'absolute', zIndex:-1}}>

    {/* Toggle For List Map View */}
    <View style={[styles.row, {}]}>
      {toggleOptions.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => setView(option)}
          style={[
            styles.toggle,
          ]}
        >
          <Text
            style={[
              styles.buttonLabel,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

        {/* For testing purposes */}
        {view === 'ShowMap' &&
        <Text> {view} </Text>
          }

        {view === 'ShowList' &&
        <Text> {view} </Text>
          }

  </View>



  {view === 'ShowList' &&
    <ShowList
      label = {label}
      values = {values}
      selectedValue = {selectedValue}
      setSelectedValue = {setSelectedValue}
    ></ShowList>}

{view === 'ShowMap' &&
    <ShowMap
      label = {label}
      values = {values}
      selectedValue = {selectedValue}
      setSelectedValue = {setSelectedValue}
      locationData = {locationData}
    ></ShowMap>}

</View>

    {/* Bottom Container */}
    <View style={[styles.container, { [label]: selectedValue }]}>
      {children}
      <Text>Bottom Container</Text>
    </View>
  </View>
)
}


const styles = StyleSheet.create({
  // mapcontainer: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  map: {
    width:'100%',
    height: '100%'
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },

  item: {
    backgroundColor: 'white',
    padding: 12,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  title: {
    // fontSize: 22,
    // alignSelf:'center'

  },

  ListMapContainer: {
    height: Dimensions.get('window').width * 0.8 + 32,
    // backgroundColor: "red"
  },
  toggle: {
    backgroundColor: "oldlace",
    padding:18,
    marginBottom: 20,

  },
  input: {
    height: 40,
    // marginHorizontal: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    // maxWidth: '80%'
  },
  SnomeLogo: {
    padding:18,
    backgroundColor: "powderblue",
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  topContainer: {
    // flex: 1,
    marginTop: 8,
    backgroundColor: "aliceblue",
  },
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "aliceblue",
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    // flex:1,
    zIndex:-1,
    elevation:-1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    // alignItems: 'center'
  },
  location: {
    borderRadius: 4,
    backgroundColor: "oldlace",
    marginBottom: 16,
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    textAlign: "center",
  },
  selected: {
    backgroundColor: "coral",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "coral",
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
});




export default TownsScreen