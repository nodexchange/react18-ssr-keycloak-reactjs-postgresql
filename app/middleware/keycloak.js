import session from 'express-session';
import Keycloak from 'keycloak-connect';

let _keycloak;

// Small Note: If the client Access Type is bearer-only instead of credentials you need to provide realmPublicKey. Realm Public Key can be copied from Realm Settings > Keys > Public Key.
// var keycloakConfig = {
//     clientId: 'nodejs-microservice',
//     bearerOnly: true,
//     serverUrl: 'http://localhost:8080/auth',
//     realm: 'Demo-Realm',
//     realmPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAO...'
// };
const keycloakConfig = {
  clientId: 'nodejs-microservice',
  bearerOnly: true,
  serverUrl: 'http://localhost:8080/auth',
  realm: 'Demo-Realm',
  credentials: {
    secret: '62c99f7c-da55-48fb-ae4e-a27f132546b7'
  }
};

export function initKeycloak(sessions) {
  if (_keycloak) {
    console.warn('Trying to init Keycloak again!');
    return _keycloak;
  } else {
    console.log('Initializing Keycloak...');
    _keycloak = new Keycloak({ store: sessions }, keycloakConfig);
    return _keycloak;
  }
}

export function getKeycloak() {
  if (!_keycloak) {
    console.error(
      'Keycloak has not been initialized. Please called init first.'
    );
  }
  return _keycloak;
}
