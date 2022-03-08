import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, StatusBar, Platform} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as FaceDetector from 'expo-face-detector';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasCameraPermission: null, face: []};
    }
    componentDidMount() {
        Permissions.askAsync(Permissions.CAMERA).
        then(this.onCameraPermission)
    }
    onCameraPermission=(status)=>{
        this.setState({hasCameraPermission: status.status === 'granted'})
    }
    onFaceDetected = (faces) =>{
        this.setState({faces: faces})
    }
    onFaceDetectionError = (error) =>{
        console.log(error);
    } 

    render(){
        const {hasCameraPermissions} = this.state;
        if(hasCameraPermissions === null){
            return(
                <View>
                    
                </View>
            )
        }
        if(hasCameraPermissions === false){
            return (
                <View style = {styles.container}>
                    <Text>
                        No Access To The Camera. Please set Permissions to true...
                    </Text>
                </View>
            )
        }
        console.log(this.state.faces);
        return(
            <View style = {styles.container}>
                <SafeAreaView style = {styles.droidSafeArea}/>
                <View style = {styles.headingContainer}>
                    <Text style = {styles.titleText}>
                        FRAPP
                    </Text>
                </View>
                <View style = {styles.cameraStyle}>
                    <Camera style = {{flex : 1}} 
                        type = {Camera.Constants.Type.front}
                        faceDetectorSettings = {{mode: FaceDetector.Constants.Mode.fast, detectLandmarks: FaceDetector.Constants.Landmarks.all, runClassifications: FaceDetector.Constants.Classifications.all}}
                        onFacesDetected = {this.onFaceDetected}
                        onFacesDetectionError = {this.onFaceDetectionError}
                    />

                </View>
                <View style={styles.filterContainer}>

                </View>
                <View style={styles.actionContainer}>

                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({ 
    container: { flex: 1 }, 
    droidSafeArea: { marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }, 
    headingContainer: { flex: 0.1, alignItems: 'center', justifyContent: 'center' }, 
    titleText: { fontSize: 30 }, cameraStyle: { flex: 0.65 }, 
    filterContainer: {}, 
    actionContainer: {} });