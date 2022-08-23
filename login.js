import React, { useState, useRef } from 'react';
import { View, Text, ToastAndroid, Image, ScrollView, StyleSheet, Alert} from 'react-native';
import { Button, buttonTypes } from './components/Button';
import { LabeledInput } from './components/LabeledInput';
import * as auth from './controllers/Auth';

const styles = StyleSheet.create({
    input:{
      fontSize:20,
      margin:5,
      borderBottomWidth:1,
      color:"#000",
    },
    titleText:{
      fontSize:20,
      textAlign:'center',
      fontWeight:'bold'
    },
    buttons:{
      flexDirection:'row',
      width:'100%',
      justifyContent:'center'
    }, 
    container:{
        flex:1,
        backgroundColor:'#000',
        //alignItems:'center',
        justifyContent:'center',
    },
    text:{
        color:'#fff',
        fontSize:33,
        padding:10,
        
    }
})
 


  
     

export default class Login extends React.Component{
    

    logar(){
        email = this.state.email
        senha = this.state.senha

        console.log(email)
        auth.logar({email:email, senha:senha}).then(resp => {
       
            if (resp.error == 0){
                global.token = resp.accessToken
                Alert.alert(
                 "Bem vindo, " + this.state.email,
                 "Aproveite sua visão do espaço",
                 [
                  
                   { text: "OK", onPress: () => console.log("OK Pressed") }
                 ]
               );
     
            } else {
                Alert.alert(
                    "Usuário ou senha incorreto",
                    "Verifique os dados e tente novamente!",
                    [
                      
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                  );
                ToastAndroid.showWithGravity(
                    "Usuário ou senha inválida",
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                );
            }
        })
     
    }

    constructor(props){
        super(props)
        this.state= {
            email:'',
            senha:''
        }
    }   

    render(){
        return <View style={styles.container}>

            <Text style={styles.text}>Login</Text>
            <LabeledInput label="Usuário" value={this.state.email} 
                          onChangeText={text => this.setState({email:text})} />

            <LabeledInput label="Senha" value={this.state.senha} type="password"
                          onChangeText={text => this.setState({senha:text})} />

            <Button type={buttonTypes.normal} 
                    onPress={ this.logar.bind(this)}>Entrar</Button>

        </View>
    }
}

