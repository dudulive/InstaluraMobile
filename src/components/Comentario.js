import React, {Component} from 'react';
import { View, Text} from 'react-native';

export default class Comentario extends Component {

    render() {
      const { usuario, texto } = this.props;
      return (
        <View style={styles.comentario}>
          <Text style={styles.tituloComentario}>{usuario}</Text>
          <Text>{texto}</Text>
        </View>
      );
    }
  }