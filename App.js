/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { FlatList, StyleSheet, Platform} from 'react-native';

import Post from './src/components/Post'; 

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            fotos: []
        };
    }

    componentDidMount() {
        fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
            .then(resposta => resposta.json())
            .then(json => this.setState({fotos: json}));
    }

    like() {
        const foto = this.state.fotos.find(foto => foto.id === idFoto);

        let novaLista = [];
        if(!foto.likeada) {
            novaLista = [
                ...foto.likers,
                {login: 'meuUsuario'}
            ];
        } else {
            novaLista = foto.likers.filter(liker => {
                return liker.login !== 'meuUsuario'
            });
        }

        const fotoAtualizada = {
            ...foto,
            likeada: !foto.likeada,
            likers: novaLista
        }

        const fotos = this.state.fotos
            .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto);

        this.setState({fotos});
    }

    render() {
        return (
            <FlatList style={styles.container}
                keyExtractor={item => String(item.id)}
                data={this.state.fotos}
                renderItem={ ({item}) => 
                    <Post foto={item}
                        likeCallback={this.like.bind(this)} />
                }
            />    
        );
    }
}

const margem = Platform.OS == 'ios' ? 20 : 0;
const styles = StyleSheet.create({
    container: {
        marginTop: margem,
    },
});
