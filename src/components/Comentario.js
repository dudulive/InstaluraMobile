import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';

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

  const styles = StyleSheet.create({
    comentario: {
        flexDirection: 'row',
    },
    tituloComentario: {
        fontWeight: 'bold',
        marginRight: 5,
    },
});