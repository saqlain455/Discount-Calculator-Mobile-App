import React ,{useState,useEffect} from 'react';
import { DataTable,IconButton } from 'react-native-paper';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
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
  Keyboard,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import Constants from 'expo-constants';
const Stack=createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
      name="First"
      component={First}
      options={{
        title:'Welcome',
        headerStyle:{
            backgroundColor:'blue'
        },
        headerTintColor:'white',
        headerRight:()=>{}
    //    headerShown:false
      }} />
      <Stack.Screen name="History" component={History} options={{
        title:'History',
        headerStyle:{
            backgroundColor:'blue'
        },
        headerTintColor:'white',
        headerRight:()=>{}
    //    headerShown:false
      }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


class First extends React.Component {
  constructor({navigation,route}) {
    super();
    this.state = {
      totalPrice: '',
      discountPrice: '',
      uSave: '',
      finalPrice: '',
      calculate: '',
      list: [],
      chk: false,
      error:''
     };
 //   this.update;



  navigation.setOptions({
    headerRight: () => (
      <Button style={{paddingTop:10}}
      title="History"
      onPress={() => navigation.navigate('History',{list:this.state.list, onGoBack: (data)=>    {this.setState({list:data})}})}></Button>
    )
  });

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
    if(Number(val)<=100 && Number(val)>0){
      console.log("Setting DP: " + val)
    // setState is asynchronous. Therefore, calculating final price after updating the state
    this.setState({discountPrice: val}, function() { 
      console.log(this.state.discountPrice);
      this.calculateFinalPrice();
    });
      this.setState({
        error:''
      })
    }
    else{
      this.setState({
        error:"Percentage should b less than or equal to 100"
      })
    }
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
    // console.log("Total Price: " + totalPrice);
    // console.log("Discount Percentage:" + discountPercentage);
    // console.log("Final Price:" + finalPrice);
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
          <Text style={{color:'red'}}> {this.state.error.length>0?this.state.error:''}</Text>
          <Text> FinalPrice</Text>
          <Text style={styles.textInput} >
            {this.state.finalPrice}
          </Text>
          <Text> uSave</Text>
          <Text style={styles.textInput}>
            {this.state.totalPrice - this.state.finalPrice}
          </Text>
          <Ionicons name="save" style={{alignSelf:'center',paddingTop:10,color:'blue'}} size={32}  onPress={() => this.state.totalPrice.length==0? '':this.save()}>save</Ionicons>

        </View>
    </View>
    );
  }
}

// class History extends React.Component{
//   constructor({navigation,route}) {
//     super();
//     this.state=({
//       list:route.params
//     })
//   }

//   render(){
//     return(
//       <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
//       <View style={{ margin: 50, backgroundColor: '#ffffff', flex: 1 }}>
//         <ScrollView style={styles.scrollview}>
//             {this.state.list.map((item, index) =>
//               <TouchableOpacity key={item.key} activeOpacity={0.7} >
//                 <View style={styles.scrollviewItem}>
//                   <Text style={styles.scrollviewText}>{index + 1}# total prize iS {item.data.totalPrice}</Text>
//                   <Text style={styles.scrollviewText}>discountPercentage is{item.data.discountPrice}</Text>
//                   <Text style={styles.scrollviewText}>finalPrice is {item.data.finalPrice}</Text>
//                   <Text style={styles.scrollviewText}>uSave: {item.data.uSave}</Text>
//                 </View>
//               </TouchableOpacity>
//         )}
//         </ScrollView>
//       </View>


//     </View>  
//     );
  
//   } 
// }

const History=({navigation,route})=>{
  //console.log(route.params)
  const [getList,setList]=useState(route.params.list);
     // Tomorow inshallha solve this error
  navigation.setOptions({
    headerRight: () => (
      <Button style={{paddingTop:10}}
      title="clear"
      onPress={clear}></Button>
    )
  });
 
      navigation.setOptions({
            headerLeft: () => (
                <View style={{ paddingLeft: 10 }}>
                  <Ionicons
                    name="arrow-back"
                    size={32}
                    color="white"
                    onPress={() => {route.params.onGoBack(getList);navigation.goBack('First')}} 
                  />
                </View>
            )
    });
     

  const clear=()=>{  
          setList( getList.filter(item=>item.key != item.key))
  }
  useEffect(() => {
    console.log(getList)
  });

  const removeItem=(itemKey)=>{
    var list= getList.filter(item=>item.key != itemKey)
     setList(list)
  }  
    return(
      <DataTable>
      <DataTable.Header  >
       <DataTable.Title>Total price</DataTable.Title>
       <DataTable.Title >Discount%</DataTable.Title>
       <DataTable.Title >Final price</DataTable.Title>
       <DataTable.Title >Del Item</DataTable.Title>
     </DataTable.Header>
    {getList.map((item,index)=>{
         return  <DataTable>
     <DataTable.Row key= {item.key} >
       <DataTable.Cell><Text style={styles.scrollviewText}>{item.data.totalPrice}</Text></DataTable.Cell>
       <DataTable.Cell ><Text style={styles.scrollviewText}>{item.data.discountPrice}</Text> </DataTable.Cell>
       <DataTable.Cell > <Text style={styles.scrollviewText}>{item.data.finalPrice}</Text></DataTable.Cell>
  <Ionicons name='close-circle' size={35} onPress={()=>{removeItem(item.key)}}><DataTable.Cell ></DataTable.Cell></Ionicons> 
      </DataTable.Row>
   </DataTable>

         })}
</DataTable>     
    ); 
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
