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
      calculate: 0,
      list: [],
      chk: false,
    };
  }
  calDis = (test) => {
    
    if (test == '') {
      this.setState({
        discountPrice: '',
      });
    }
    if (Number(test) > 0 && Number(test) <= 1000) {
      this.setState({
        discountPrice: '20',
      });
    } if (Number(test) > 1000 && Number(test) <= 2000) {
      this.setState({
        discountPrice: '40',
      });
    } if (Number(test) > 2000) {
      this.setState({
        discountPrice: '50',
      });
    }
  };

  total = (test) => {
    this.setState({
      totalPrice: test,
    });
  };

  finalpriceCal = (test) => {
    test = Number(test);
    var f = (test - (this.state.discountPrice * test)/100);
    this.setState({
      finalPrice: f,
    });
   
    console.log(test)
    console.log(this.state.discountPrice)
    console.log(f)
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
            onChangeText={(text) => {
              // if(this.state.calculate===true){
              this.total(text);
              this.calDis(text);
              this.finalpriceCal(text);
              
            }}></TextInput>

          <Text>Discount Persentage%</Text>
          <TextInput style={styles.textInput}>
            {this.state.discountPrice}
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
