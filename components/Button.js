import React, { useState, useCallback } from 'react';
import { Text, TouchableOpacity, StyleSheet} from 'react-native';

export const buttonTypes = {
    success:'#38c23c',
    warning:'#e69834',
    normal:'#7159c1'
}

const styles = StyleSheet.create({
    button:{
        height:50,
        margin:15,
    },
    buttonText:{
        fontSize:20,
        paddingTop:10,
        textAlign:'center',
        color:'#ffffff',
      },
});

export function Button(props){
    
    return (
        <TouchableOpacity
                style={[styles.button,{backgroundColor:props.type},props.style]}
                onPress={() => props.onPress()}
            >
            <Text style={styles.buttonText}>
                {props.children}
            </Text>
        </TouchableOpacity>
    );
};