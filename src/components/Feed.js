import React, {Component} from 'react';
import { FlatList, StyleSheet, Platform} from 'react-native';

import Post from './Post'; 
import Notificacao from '../api/Notificacao';

export default class Feed extends Component {
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

    like(idFoto) {
        const listaOriginal = this.state.fotos;
        const foto = this.buscaPorId(idFoto);
      
        AsyncStorage.getItem('usuario')
          .then(usuarioLogado => {
      
            let novaLista = []
            if(!foto.likeada) {
              novaLista = [
                ...foto.likers,
                {login: usuarioLogado}
              ]
            } else {
              novaLista = foto.likers.filter(liker => {
                return liker.login !== usuarioLogado
              })
            }
            return novaLista;
          })
          .then(novaLista => {
            const fotoAtualizada = {
              ...foto,
              likeada: !foto.likeada,
              likers: novaLista
            }
      
            this.atualizaFotos(fotoAtualizada);
          })
        InstaluraFetchService.post(`/fotos/${idFoto}/like`)
        .catch(e => {
            this.setState({fotos: listaOriginal})
            Notificacao.exibe('Ops..', 'Algo deu errado!')
          });
      }

    adicionaComentario(idFoto, valorComentario, inputComentario) {
        if(valorComentario === '')
            return;

        const foto = this.state.fotos
            .find(foto => foto.id === idFoto);

            const comentario = {
                texto: valorComentario
              };
            
              InstaluraFetchService.post(`/fotos/${idFoto}/comment`, comentario)
                .then(comentario => [...foto.comentarios, comentario])
                .then(novaLista => {
                  const fotoAtualizada = {
                    ...foto,
                    comentarios: novaLista
                  }
            
                  this.atualizaFotos(fotoAtualizada);
                  inputComentario.clear();
                });
    }

    render() {
        return (
            <FlatList style={styles.container}
                keyExtractor={item => String(item.id)}
                data={this.state.fotos}
                renderItem={ ({item}) => 
                    <Post foto={item}
                        likeCallback={this.like.bind(this)}
                        comentarioCallback={this.adicionaComentario.bind(this)} />
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
