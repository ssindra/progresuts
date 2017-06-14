
import React, { Component } from 'react';
import { TouchableOpacity, ListView, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Header, Title, Content, List, Thumbnail, ListItem, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';

import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const userIcon = require ('./images/pengguna.png')
var URL="http://mhs.rey1024.com/1415051094/index_user.php";

class Home extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }
constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
       dataSource: ds,
    };
  }
  AmbilDataUser() {
    fetch(URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows
        (responseData),
      });
    }) .done();
  }

  renderRow(record) {

    return (
      <View>
        
      <ListItem>
        {/*<Thumbnail square size={80} source={require('./img/one.png')} />*/}
        <Left>
            <Thumbnail source={require('./images/pengguna.png')} />
        <Body>
          <View style = {styles.info}>
          <Text>{record.nama_user}</Text>
          <Text>{record.alamat}</Text>
          </View>
        </Body>
        </Left>
      </ListItem>
      </View>
      
    );
  }
  render() {
    this.AmbilDataUser();
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.login({ type: ActionConst.RESET })}>
              <Icon active name="power" />
            </Button>
          </Left>

          <Body>
            <Title>{(this.props.name) ? this.props.name : 'Home'}</Title>
          </Body>

          <Right>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon active name="menu" />
            </Button>
          </Right>
        </Header>

        <Content>
          <List>
                    <ListView 
                    dataSource={this.state.dataSource}
                      renderRow={this.renderRow}
                    />
                    </List>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
});

export default connect(mapStateToProps, bindAction)(Home);
