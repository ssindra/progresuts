
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body } from 'native-base';
import  { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from  'react-native'; 
import { openDrawer } from '../../actions/drawer';
import styles from './styles';

var url = 'http://mhs.rey1024.com/1415051094/signup.php'; 

class Daftar extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  onSave() {
    fetch(url + '?username=' + this.state.username + '&password=' + this.state.password)
      .then((response) => response.json())
      .then((responseData) => {
        var id = responseData.id;
        if (id === -1) {
          Alert.alert("Gagal Daftar");
         }
         else 
       {
          Alert.alert("Berhasil Daftar");
        }  
        
      })
      .done();
  }

  render() {
    return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.toolbar}>Add a new User </Text>
         <TextInput  
          style={styles.input}  
          onChangeText={(e) => this.setState({ username: e })} 
          text = {this.state.username}
          placeholder="Username" 
        />  
        <TextInput  
          style={styles.input}  
          onChangeText={(e) => this.setState({ password: e })} 
          secureTextEntry
          text = {this.state.password}
          placeholder="Password"  
        />  
        <TouchableOpacity onPress={() => this.onSave()} style={styles.btn}> 
        <Text>Daftar</Text>  
        </TouchableOpacity> 
        </ScrollView> 
      </View> 
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  username: state.user.username,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(Daftar);
