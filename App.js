import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  bind,
  Modal,
  ScrollView,
  TouchableOpacity,
  Keyboard
} from 'react-native';

import Constants from 'expo-constants';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      totalPrice: '',
      discountPrice: '',
      uSave: '',
      finalPrice: '',
      calculate: '',
      list: [],
      chk: false,
    };
  }

  updateTotalPrice = (test) => {
    this.setState({
      totalPrice: test,
    },
     function() { 
      console.log(this.state.discountPrice);
      this.calculateFinalPrice();
    }
    );
  };

  updateDiscountPercentage = (val) => {
    console.log("Setting DP: " + val)
    // setState is asynchronous. Therefore, calculating final price after updating the state
    this.setState({discountPrice: val}, function() { 
      console.log(this.state.discountPrice);
      this.calculateFinalPrice();
    });
  }

  calculateFinalPrice = () => {
    var totalPrice = Number(this.state.totalPrice);
    var discountPercentage = this.state.discountPrice.length > 0 ? 
                              Number(this.state.discountPrice) : 
                              0;
    var finalPrice = (totalPrice - (discountPercentage * totalPrice)/100);
    this.setState({
      finalPrice: finalPrice,
    });
    console.log("Total Price: " + totalPrice);
    console.log("Discount Percentage:" + discountPercentage);
    console.log("Final Price:" + finalPrice);
  }

  c = () => {
    this.setState({
      calculate: 1,
    });
  };

  save = () => {
    let list = [
      ...this.state.list,
      {
        key: Math.random().toString(),
        data: {
          totalPrice: this.state.totalPrice,
          discountPrice: this.state.discountPrice,
          finalPrice: this.state.finalPrice,
          uSave:this.state.totalPrice - this.state.finalPrice,
        },
      },
    ];
    this.setState({
      list: list,
    });
    console.log(this.state.list);
    Keyboard.dismiss()
  };
  
render() {
  return (
      <View style={styles.container}>
        <View>
          <Text style={styles.paragraph}>Discount APP</Text>
          <Text>Total Price</Text>
          <TextInput
            placeholder="plz input"
            keyboardType='numeric'
            style={styles.textInput}
            value={this.state.totalPrice}
            onChangeText={(text) => {
              this.updateTotalPrice(text);
              this.calculateFinalPrice();

            }}></TextInput>
          <Text>Discount Percentage%</Text>
          <TextInput 
            style={styles.textInput}
            keyboardType='numeric'
            // value={this.state.discountPrice}
            onChangeText={(text) => {
              this.updateDiscountPercentage(text);
              // this.calculateFinalPrice();
              }}
          >
          </TextInput>
          <Text> finalPrice</Text>
          <TextInput style={styles.textInput}>
            {this.state.finalPrice}
          </TextInput>
          <Text> uSave</Text>
          <TextInput style={styles.textInput}>
            {this.state.totalPrice - this.state.finalPrice}
          </TextInput>
          <Button title="Save"  onPress={() => this.save()}></Button>
          <TextInput> </TextInput>
          <Button style={{paddingTop:10}}
            title="History"
            onPress={() => this.setState({ chk: true })}></Button>
        </View>

      <Modal transparent={true} visible={this.state.chk}>
          <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
            <View style={{ margin: 50, backgroundColor: '#ffffff', flex: 1 }}>
              <ScrollView style={styles.scrollview}>
                  {this.state.list.map((item, index) =>
                    <TouchableOpacity key={item.key} activeOpacity={0.7} >
                      <View style={styles.scrollviewItem}>
                        <Text style={styles.scrollviewText}>{index + 1}# total prize iS {item.data.totalPrice}</Text>
                        <Text style={styles.scrollviewText}>discountPercentage is{item.data.discountPrice}</Text>
                        <Text style={styles.scrollviewText}>finalPrice is {item.data.finalPrice}</Text>
                        <Text style={styles.scrollviewText}>uSave: {item.data.uSave}</Text>
                      </View>
                    </TouchableOpacity>
              )}
              </ScrollView>
            </View>
          </View>
          <Button title="close" onPress={() => this.setState({ chk: false })}></Button>
      </Modal>
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
  textInput: {
    borderColor: 'red',
    //  borderWidth:2,
    width: '40%',
    textAlign: 'center',
    borderBottomWidth: 2,
  },
   scrollview: {
    backgroundColor:"lightyellow",
    paddingTop: 3,
    width: '100%',
    marginTop:20,
  
  },
});
