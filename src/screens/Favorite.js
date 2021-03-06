import React, { Component } from 'react';
import { View,
    TouchableOpacity,
    Alert
} from 'react-native';
import {Block,Text} from '../component/index';
import FavoriteItem from '../component/FavoriteItem';
import Header from '../component/Hearder';
import styles from '../style/styles';
import { SwipeListView } from 'react-native-swipe-list-view';
import {connect}  from 'react-redux';
import {deleteFavorite} from '../redux/actionCreators';
class Favorite extends Component {

    renderItem(item,index){
        return(
            <FavoriteItem key={`${index}`}   navigation={this.props.navigation} item={item} />
        )
    }
    renderHiddenItem = (item) => (
        <View style={styles.rowSwipeFavorite}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => {
                    Alert.alert(
                        "Thông báo!",
                        `Bạn có chắc chắn muốn xóa ${item.name} khỏi món ưa thích của bạn không?`,
                        [
                          { 
                            text: "OK",
                            onPress: () =>  this.props.deleteFavorite(item._id),
                            style:'destructive'
                        },
                        {
                            text: "Cancel",
                            style: 'cancel'
                          }
                        ],
                        { cancelable: false }
                      )
                    
                }}
            >
                <Text white>Xóa</Text>
            </TouchableOpacity>
        </View>
    );



    render() {
        
        return (
            <Block flex={1}>
                <Header  nameTab={"Yêu thích"} />
            <Block   padding={[10,10,0, 10]}  >
                <SwipeListView
                    data={this.props.favorites}
                    renderItem={({item,index})=>this.renderItem(item,index)}
                    renderHiddenItem={({item}) =>this.renderHiddenItem(item)}
                    rightOpenValue={-75}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    keyExtractor={item=>item._id}
                    showsVerticalScrollIndicator={false}
                />   
               
            </Block>
           </Block>
            
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        favorites:state.favorites,
    }
}

export default  connect(mapStateToProps,{deleteFavorite})(Favorite);

 