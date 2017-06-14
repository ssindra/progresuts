
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body } from 'native-base';
import  { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from  'react-native'; 
import { openDrawer } from '../../actions/drawer';
import styles from './styles';

var url = 'http://mhs.rey1024.com/1415051094/adduser.php'; 

class BlankPage extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      nama: "",
      alamat: "",
      notlpn: "",
      idalbum: "",
    };
  }

  onSave() {
    fetch(url + '?nama=' + this.state.nama + '&alamat=' + this.state.alamat + '&no_tlpn=' + this.state.notlpn  + '&id_album=' + this.state.idalbum)
      .then((response) => response.json())
      .then((responseData) => {
        var id = responseData.id;
        if (id === -1) {
          Alert.alert("Fail to Input");
         }
         else 
       {
          Alert.alert("Berhasil Input");
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
          onChangeText={(e) => this.setState({ nama: e })} 
          text = {this.state.nama}
          placeholder="Nama User" 
        />  
        <TextInput  
          style={styles.input}  
          onChangeText={(e) => this.setState({ alamat: e })} 
          text = {this.state.alamat}
          placeholder="Alamat"  
        />  
        <TextInput  
          style={styles.input}  
          onChangeText={(e) => this.setState({ notlpn: e })} 
          text = {this.state.notlpn}
          placeholder="No Tlpn" 
        />  
        <TextInput  
          style={styles.input}  
          onChangeText={(e) => this.setState({ idalbum: e })} 
          text = {this.state.idalbum}
          placeholder="Id Album"  
        />  
        <TouchableOpacity onPress={() => this.onSave()} style={styles.btn}> 
        <Text>Save!</Text>  
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
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(BlankPage);
