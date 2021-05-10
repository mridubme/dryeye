import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet,StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

export default function Features({route}) {
    const [body, setBody] = useState({});
    useEffect(()=>{
        setBody(JSON.parse(route.params.result));
    }, [route.params])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{fontSize:30,fontWeight:'bold', color:'white'}}>
                RESULT
                </Text>
            </View>
            <View style={styles.result}>
                <Text style={styles.boldText}>The extracted parameters are:</Text>
                <Text style={styles.boldText}> Energy : {body.energy}</Text>
                <Text style={styles.boldText}> Correlation : {body.correlation}</Text>
                <Text style={styles.boldText}> Homogeneity : {body.homogeneity}</Text>
                <Text style={styles.boldText}> Contrast : {body.contrast}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
                <Text style={styles.boldText}> 
                <Text style={{fontSize:25,color:'#000080',textAlign: "center"}}>                  Prediction{'\n'}</Text>
                <Text style={{fontSize:18,color:'#000080'}}>   {body.predictionResult} </Text> 
                </Text> 
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize:30,
        backgroundColor:'#16ADEE'
    },
    boldText:{
        fontWeight:'bold',
        fontSize:15,
    },
    header: {
        flex: 15,
        width:'100%',
        alignItems:'center',
        justifyContent: 'center',
        fontWeight:'bold',
        backgroundColor:'blue',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
    },
    result :{
        flex:85,
        alignItems:'center',
        backgroundColor: '#16ADEE',
        width:'100%',
        justifyContent: 'center',
        fontWeight :'bold'
    }
});
