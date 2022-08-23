import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, WebView, TouchableOpacity,  PermissionsAndroid, ScrollView, Alert } from 'react-native';
import api from './utilities/api.js'
import RNFetchBlob from 'rn-fetch-blob';

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#000',
      alignItems:'center',
      justifyContent:'center',
    },
    text:{
      color:'#fff',
      fontSize:15,
      padding:10
   },
   button: {
    width: '80%',
    padding: 10,
    backgroundColor: '#7159c1',
    margin: 10,
    alignItems:'center',
    
  },
  
  });   


  export default class App extends React.Component{
    
    static navigationOptions = { title: 'APOD' };
    
    
    constructor(props){
      super(props)
  
      this.state= {
        title:'',
        pic:'',
        explanation:'',
        date:'',
        media:''
      }     
    }   
    
    componentDidMount(){
      
      api.nasaPics().then((res)=>{
        this.setState({
          title:res.title,
          pic:res.url,
          explanation:res.explanation,
          date:res.date,
          media:res.media_type

          
        })
      
      console.log('oi')
      console.log(this.state.pic)
      })
      .catch((error)=>{
        console.error(error)
      })    
    }

    
  
    async checkPermission (){
     
       // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission
      if(this.state.email){
        if (Platform.OS === 'ios') {
        
          this.downloadImage();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission Required',
                message:
                  'App needs access to your storage to download Photos',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // Once user grant the permission start downloading
              console.log('Storage Permission Granted.');
              this.downloadImage();
            } else {
              // If permission denied then show alert
              alert('Storage Permission Not Granted');
            }
          } catch (err) {
            // To handle permission related exception
            console.warn(err);
          }
        }
      }else{
        Alert.alert('Necessário autenticar', 'Para fazer o download da imagem é necessário fazer login.')
      }
      
    }

    downloadImage(){
      
      const REMOTE_IMAGE_PATH = this.state.pic
      // Main function to download the image
    
    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = REMOTE_IMAGE_PATH;    
    // Getting the extention of the file
    let ext = this.getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        Alert.alert('Download concluído','Imagem baixada com sucesso!');
      });
    }

    getExtention(filename){
      // To get the file extension
      return /[.]/.exec(filename) ?
      /[^.]+$/.exec(filename) : undefined;
    }
  
  render(){
    
    return(
        <ScrollView >
          <View style={styles.container}>
          <Text style={styles.text}>{this.state.date}</Text>
          <Text style={styles.text}>{this.state.title}</Text>
            
          {this.state.media === 'video' ?
          <WebView
          javaScriptEnabled={true}
          source={{uri: this.state.pic}}
          style={{width: 370, height:200}}
          />:
          <Image

            source={{uri: this.state.pic}}
            style={{width: 370, height:200}}
            
              
          />}

          

          <TouchableOpacity
            style={styles.button}
            onPress={this.checkPermission.bind(this)}>
            <Text style={styles.text}>
              Baixar Imagem
            </Text>
        </TouchableOpacity>
          <Text style={styles.text}>{this.state.explanation}</Text>
          </View>
      </ScrollView>
    );
  }
  
  
  }