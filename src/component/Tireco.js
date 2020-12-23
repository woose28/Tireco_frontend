import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
//import * as RNFS from 'react-native-fs';


const Tireco = (props) => {
    const { isLoading, uri, base64, isSuccess, titles, isWorking } = props;
    
    const showPicker = () => {
        const options = {
          mediaType: 'photo',
          includeBase64: true,
        };
    
        ImagePicker.launchImageLibrary(options, (response)=>{
            if(response.didCancel){
                console.log("사용자가 취소했습니다.");
            }
            else if(response.errorCode){
                console.log("에러 : ", response.errorMessage);
                props.handleLoadFailure();
            }
            else{
                //const imgPath = `${RNFS.DocumentDirectoryPath}/${new Date().toISOString()}.jpg`.replace(/:/g, '-');
                props.handleLoadSuccess(response.uri, response.base64);
            }
            });
        }
    
    const renderItem = ({item}) => {
        return(
            <View style={ styles.container_item }>
                <Text style={ styles.txt_title }>{item.title}</Text>
            </View>
        );
    };

    return(
        <>
            <View style={ styles.container_tireco }>
                <View style={ styles.container_img }>
                    { isLoading? 
                        <Image style={ styles.img_preview } source={{ uri: uri }}/>: 
                        <Text style={ styles.txt_noImg }>{"<미리보기가 없습니다.>"}</Text>
                    }        
                </View>
                <Button style={ styles.btn } title="갤러리 열기" onPress={ showPicker }/>
                <Button style={ styles.btn } title="분석 시작" disabled={ (!isLoading || isWorking) } onPress={ () => { props.handleRequestAnalyzing(uri, base64) } }/>
                <View style={ styles.container_data }>
                    { isSuccess?
                        <FlatList
                            data={titles}
                            renderItem={ renderItem }
                            keyExtractor={ item => item.id }
                            style={ styles.list_data }
                        />:
                        <Text style={ styles.txt_noData }>{"<데이터가 없습니다.>"}</Text>
                    }
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container_tireco: {
        width: "100%",
        flex: 1,
        flexDirection: "column",
    },
    container_img: {
        width: "100%",
        height: undefined,
        flex: 1,
    },
    img_preview: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: "contain",
    },
    txt_noImg: {
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "auto",
        marginRight: "auto",
    },
    btn: {
        width: "100%",
    },
    container_data: {
        width: "100%",
        height: undefined,
        flex: 1,
    },
    txt_noData: { 
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "auto",
        marginRight: "auto",
    },
    list_data: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    container_item: {
        width: "100%",
        height: 50,
        borderBottomColor: "#b0b0b0",
        borderBottomWidth: 1
    },
    txt_title: {
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 10,
    }
});

export default Tireco;

