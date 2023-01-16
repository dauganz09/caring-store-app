import { StyleSheet, Text, View,RefreshControl, TouchableOpacity,FlatList,SafeAreaView,ActivityIndicator,TextInput, ScrollView, Pressable } from 'react-native'

import React,{useEffect,useState,userRef} from 'react'
import {axios1,axios2} from '../utils/axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { useToast } from "react-native-toast-notifications";

const COLORS = [
  {
    color : "primary",
    hex : "#450b5a"
  },
  {
    color : "success",
    hex : "#209f84"
  },
  {
    color : "info",
    hex : "#2781d5"
  },
  {
    color : "warning",
    hex : "#ff5c00"
  },
  {
    color : "danger",
    hex : "#f72b50"
  }


]

const Question = ({handleComment,index,item}) =>{
  const [value,setValue] = useState(item.comment)

  useEffect(()=>{
    console.log(item)
  },[])

 const handleChange =(e)=>{
  
  setValue(e.target.value)

  handleComment(index,e.target.value)
  
 }
  return (
  <View style={[getcolor(item.question_color),styles.question_box]}>
      <Text style={[styles.qtext]}>{index+1}. {item.question_text}</Text>
      <TextInput 
        editable
        multiline
        numberOfLines={4}
        maxLength={255}
        style={styles.textarea}
        value={value}
        onChange={handleChange}
      />
  </View>
  )
  
}


const Questions = ({route, navigation}) => {
  const [questions, setQuestions] = useState([]);
  const [isloading,setIsloading] = useState(false);
  const [refreshing, setRefreshing] = useState(false)
  const [userid,setUserid] =  useState(0)
  const toast = useToast();
  const { code } = route.params;

  useEffect(() => {
    getQuestions();
    AsyncStorage.getItem('user_id').then(value => {
      if(value !== null || value !== undefined){
        setUserid(parseInt(value))
        console.log(value)
      }
    }).catch(err => {});
    
   
  }, [])
  
  const getQuestions = ()=>{
    // const res = axios1.get(`getq/${code}`);
    // const result = await res;
    // const {data} = result
    // setQuestions(data);
   
    setIsloading(true)
    fetch(`https://caringstore.xyz/api/getq/${code}`).then((res)=> res.json())
    .then(data=>{
      const newData = data.map(item => {
        return {...item,comment: ''}
      })
      console.log(newData)
      setQuestions(newData)
    })
    setIsloading(false)
  }

  const predict = async () =>{
    const emptyfields = questions.filter(item=> item.comment == '')
    if(emptyfields.length >0) {
      toast.show("Please fill up empty fields!!", {
        type: "danger",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "slide-in",
      });
      return;
    }



    setIsloading(true)
    const res = axios2.post('analyze',{
      user_id : userid,
      questions : questions
    });
  const result = await res;
  console.log(result);
  setIsloading(false)
  navigation.navigate('Results',{name:'Results',results : result.data});

  }

  const handleSubmit = ()=>{
    console.log(questions)
  }

  const _onRefresh = () => {
    console.log('_onRefresh')
    setRefreshing(true);
    getQuestions();
};

const handleComment = (index,comment)=>{
  const newArray = questions.map((item, i) => {
    if (index === i) {
      return { ...item,comment : comment };
    } else {
      return item;
    }
  });
  setQuestions(newArray);
}

 
  
  return (
    <SafeAreaView style={styles.container}>
      <Spinner
          visible={isloading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          indicatorStyle={{color : '#4649FF'}}
          size="large"
          overlayColor='rgba(0, 0, 0, 0.50)'
        />
      <FlatList 
        data={questions}
        renderItem={({item,index})=> <Question handleComment={handleComment}  index={index} item={item} />}
        keyExtractor={item => item.question_id}
        ItemSeparatorComponent={ItemDivider}
        refreshControl={
          <RefreshControl 
              refreshing={refreshing} 
              onRefresh={_onRefresh}
              tintColor="#F8852D"/>
      }
      
      />
      <TouchableOpacity style={styles.submit} onPress={predict}>
        <Text style={{textAlign:'center',color : 'white'}}>Submit</Text>
      </TouchableOpacity>
     
      
    </SafeAreaView>
    
  )
}

const ItemDivider = () =>{
  return (
    <View style={styles.seperator}></View>
  )
}


const getcolor = (qcolor)=>{
     let qucolor =  COLORS.filter(c => c.color == qcolor );
     
     return {backgroundColor : qucolor[0].hex}

}

export default Questions

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor: '#fff',
    paddingTop : '1em'
  },
  scrollBox : {
    padding: '.5em'
  },
  spinnerTextStyle: {
    color: '#4649FF'
  },
 
  question_box : {
    height: '200px',
    paddingHorizontal : '1em',
    marginHorizontal : '1em',
    display : 'flex',
    flexDirection : 'column',
    justifyContent : 'space-evenly',
    alignItems : 'center'

  },
  qtext : {
    color : 'white',
  textAlign : 'left',
  fontSize : 20

  },
  seperator : {
    height: '1em',
    width: '100%'
  },
  textarea: {
    backgroundColor : 'white',
    width: '100%',
    
  },
  submit : {
    display :'flex',
            justifyContent : 'center',
            alignItems : 'center',
            height : 50,
            width : '100%',
            borderColor : 'white',
            borderWidth : 1,
            borderRadius : 5,
           
            paddingHorizontal : 10,
            color : 'white',
            fontSize : 20,
            fontWeight : 'bold',
            textTransform : 'uppercase',
            backgroundColor : '#4649FF',
  }
 
  
})