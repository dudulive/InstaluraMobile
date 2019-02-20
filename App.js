/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { Text, View, FlatList, Dimensions, Image} from 'react-native';

const width = Dimensions.get('screen').width;

export default class App extends Component {
    render() {
        const fotos = [
            {id: 1, usuario: 'rafael'},
            {id: 2, usuario: 'alberto'},
            {id: 3, usuario: 'vitor'}
        ];

        return (
            <FlatList style={{marginTop: 20}}
                keyExtractor={item => String(item.id)}
                data={fotos}
                renderItem={ ({item}) =>
                    <View>
                        <Text>{item.usuario}</Text>
                        <Image source={require('./resources/img/alura.jpg')}
                            style={{width: width, height: width}} />        
                    </View>
                }
            />
        );
    }
}
