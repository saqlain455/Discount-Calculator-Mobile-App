import * as React from 'react';
import { Text, View, StyleSheet,TextInput,Button,bind } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component  {
    constructor(){
      super();
      this.state={
        totalPrice:"",
        discountPrice:0,
        uSave:"",
        finalPrice:"",
        calculate:0

        };
    }
calDis=(test)=>{
  if(test==""){
    this.setState({
    discountPrice:0
    })
  }
  if(eval(test)>0 && eval(test)<1000){
    this.setState({
    discountPrice:2
    })
  }
  else if(eval(test)>1000 && eval(test)<=2000){
        this.setState({
      discountPrice:5
    })
  }
  else if(eval(test)>=2000){
      this.setState({
      discountPrice:10
    })
  }
}

total=(test)=>{
      this.setState({
        totalPrice:test
      })
}

finalpriceCal=(test)=>{
    test=eval(test) 
    var finalp=  eval(test - (this.state.discountPrice/100)*test)
        this.setState({
         finalPrice: finalp
      })

}

c=()=>{
  this.setState({
    calculate:1
  })
}


render(){
  return (
    <View style={styles.container}>
      <View>
          <Text style={styles.paragraph}>Discount APP</Text>
          <Text>Total Price</Text>  
          <TextInput placeholder="" style={styles.textInput} onChangeText={
            (text)=> {
             // if(this.state.calculate===true){
                  this.calDis(text)
                  this.total(text)
                  this.finalpriceCal(text)  

            //  }

            } 

          }> </TextInput>

          <Text>Discount Persentage</Text> 
          <TextInput style={styles.textInput}>{this.state.discountPrice}% </TextInput>
          <Text> finalPrice</Text>
          <TextInput style={styles.textInput}>{this.state.finalPrice}</TextInput>
          <Text> uSave</Text>
          <TextInput style={styles.textInput}> {this.state.totalPrice-this.state.finalPrice}</TextInput>
          <Button title="Save" onPress={()=>this.click}></Button>
          <Text> </Text>
          <Button title="History" onPress={()=>this.click}></Button>
    
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
  //  borderWidth:2,
    width:'40%',
    textAlign: 'center',
    borderBottomWidth:2

  }
});


