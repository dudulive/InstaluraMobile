import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native';

import { Navigation } from 'react-native-navigation';

const width = Dimensions.get('screen').width;

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            usuario: '',
            senha: '',
            mensagem: ''
        } 
    }  

    efetuaLogin() {
        const uri = "https://instalura-api.herokuapp.com/api/public/login";

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.usuario,
                senha: this.state.senha
            }),
            headers: new Headers({
                'Content-type': 'application/json'
            }) 
        };

        fetch(uri, requestInfo)
            .then(response => {
                if (response.ok)
                    return response.text();

                throw new Error('Não foi possível efetuar login');
            })
            .then(token => {
                AsyncStorage.setItem('token', token);
                AsyncStorage.setItem('usuario', this.state.usuario);
                //navegue para o feed, redifinindo estado inicial
                Navigation.setRoot({
                    root: {
                      stack: {
                        //id: 'App',
                       
                        children: [
                          {
                            component: {
                              name: 'navigation.playground.Feed', 
                              options: {
                                topBar: {
                                  title: {
                                    text:  'INSTALURA'
                                  }
                              }
                            },
                            }
                          }
                        ],
                      }
                    }
                  })
            })
            .catch(error => this.setState({mensagem: error.message}));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Instalura</Text>
                <View style={styles.form}>
                    <TextInput style={styles.input}
                        autoCapitalize="none"
                        placeholder="Usuário..."
                        onChangeText={texto => this.setState({usuario: texto})}/>

                    <TextInput style={styles.input}
                        secureTextEntry={true}
                        placeholder="Senha..."
                        onChangeText={texto => this.setState({senha: texto})}/>

                    <Button title="Login" onPress={this.efetuaLogin.bind(this)}/>
                </View>

                <Text style={styles.mensagem}>
                    {this.state.mensagem}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 26,
    },
    form: {
        width: width * 0.8
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    mensagem: {
        marginTop: 15,
        color: '#e74c3c'
    }
})