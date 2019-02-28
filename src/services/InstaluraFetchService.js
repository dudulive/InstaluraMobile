import {
    AsyncStorage,
  } from 'react-native';
  
  const enderecoInstalura =  'https://instalura-api.herokuapp.com/api';
  
  export default class InstaluraFetchService {
  
    static get(recurso) {
      const uri = enderecoInstalura + recurso;
  
      return AsyncStorage.getItem('token')
        .then(token => {
  
          return {
            headers: new Headers({
              "X-AUTH-TOKEN": token
            })
          }
        })
        .then(requestInfo => fetch(uri, requestInfo))
        .then(resposta => resposta.json());
    }
  
    static post(recurso, dados) {
      const uri = enderecoInstalura + recurso;
  
      return AsyncStorage.getItem('token')
        .then(token => {
          return {
            method: 'POST',
            body: JSON.stringify(dados),
            headers: new Headers({
              "Content-type": "application/json",
              "X-AUTH-TOKEN": token
            })
          };
        })
        .then(requestInfo => fetch(uri, requestInfo))
        .then(resposta => {
          if(resposta.ok)
            return resposta.json();
  
          throw new Error('Não foi possível completar a operação');
        });
    }
  }