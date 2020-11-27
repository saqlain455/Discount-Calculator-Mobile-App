import * as React from 'react';
import { Text, View, StyleSheet,TextInput,Button } from 'react-native';
import Constants from 'expo-constants';

export default class App extends React.Component  {
    constructor(){
      super();
      this.state=({
        TotalPrice:"",
        DiscountPrice:0

        });
    }

render(){
  return (
    <View style={styles.container}>
      <View>
          <Text style={styles.paragraph}>Discount APP</Text>
          <Text>Total Price</Text>  
          <TextInput style={styles.textInput}> </TextInput>
          <Text>Discount Persentage</Text> 
          <TextInput style={styles.textInput}> </TextInput>
      </View>
          </View>
  );
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput:{
    borderColor:'red',
    borderWidth:2,
    width:'40%',

  }
});


