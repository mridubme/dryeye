import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { Camera } from 'expo-camera';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';



export default function CamHandler({ navigation: { navigate } }) {

    const [hasPermission, setHasPermission] = useState(null);
    const [imageEvidence, setImageEvidence] = useState([]);
    const [cameraOn, setCameraOn] = useState(false);
    const [cameraRatio, setCameraRatio] = useState('4:3');
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            this.camera.getSupportedRatiosAsync().then(() => {
                console.log(ratio);
                setCameraRatio(ratio);
                setHasPermission(status === 'granted');
            });
        })();
    }, []);


    return (
        <View style={styles.container}>
            <View>
                {imageEvidence.length > 0 && imageEvidence.map((imageuri) => (
                    <TouchableOpacity key={imageuri}
                        onLongPress={() => {
                            Alert.alert(
                                "Delete Image",
                                "Do you wanna Delete this Image Permanantely",
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                    },
                                    {
                                        text: "Delete", onPress: () => {
                                            let updatelist = imageEvidence.filter(allimage => allimage !== imageuri);
                                            setImageEvidence(updatelist);
                                        }
                                    }
                                ],
                                { cancelable: false }
                            );
                        }}
                    >
                        <Image
                            style={styles.imagelistview}
                            source={{ uri: imageuri }}
                        />
                    </TouchableOpacity>
                ))}
                {imageEvidence.length > 0 && <View style={{ margin: 8, flexDirection: 'row' }}>
                    <View style={{ margin: 10 }}>
                        <Button color="#00008B" mode="contained" onPress={() => {
                            let formdata = new FormData();
                            formdata.append("image", {
                                uri: `file://${imageEvidence[0]}`,
                                type: 'image/jpeg',
                                name: "imagename.jpg",
                            });

                            var requestOptions = {
                                method: 'POST',
                                body: formdata,
                                redirect: 'follow'
                            };
                            fetch("http://192.168.1.50:5000/get_image", requestOptions)
                                .then(response => response.text())
                                .then(result=>{
                                    navigate("Features",{result})
                                })
                                .catch(error => console.log('error', error));
                        }}
                        >Submit</Button>
                    </View>
                    <View style={{ margin: 10 }}>
                        <Button color="#00008B" mode="contained" onPress={() => { setCameraOn(true) }}>Retake</Button>
                    </View>
                </View>}
                {imageEvidence.length < 1 && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { setCameraOn(true) }}>
                        <View style={styles.addproductImage}>
                            <Ionicons name="md-add-circle" size={40} color="lightgray" />
                        </View>
                    </TouchableOpacity>
                    <Text>Click "+" to open Camera and Snap Photo</Text>
                </View>
                }
            </View>
            <Modal visible={cameraOn}>
                <View style={{ flex: 1 }}>
                    <Camera
                        style={{ flex: 1 }}
                        type={type}
                        ref={ref => { setCameraRef(ref) }}
                    >

                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                            }}>

                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    margin: 10,
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-end',
                                }}
                                onPress={() => {
                                    setCameraOn(false);
                                }}>
                                <Ionicons name="ios-close-circle" size={30} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    marginBottom: 30,
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    const options = {
                                        quality: 0.5,
                                        base64: true,
                                        fixOrientation: true,
                                        exif: true,
                                    };
                                    cameraRef && cameraRef.takePictureAsync(options).then((photo) => {
                                        setCameraOn(false);
                                        setImageEvidence([photo.uri]);
                                        this.camera.resumePreview();
                                    });
                                }}>
                                <MaterialIcons name="camera" size={80} color="white" />
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#16ADEE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        flexDirection: 'row',
    },
    imagelistview: {
        borderRadius: 5,
        height: 250,
        width: 250,
    },
    addproductImage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        marginBottom: 30,
        backgroundColor: '#121212',
        borderRadius: 5,
        overflow: 'hidden'
    },
});