var Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {
  clientId: 'ssr-nodejs',
  bearerOnly: true,
  serverUrl: 'http://localhost:8080/auth',
  realm: 'Demo-Realm',
  credentials: {
    // secret: '7z9Kzv1VwCMWjobPkO7iNI1L6pvXgpiO'
    secret: 'cQA6mjqbMG5gW40v5Yyl3DmRE1EzCISm'
  }
};

function initKeycloak(memoryStore) {
  if (_keycloak) {
    console.warn('Trying to init Keycloak again!');
    return _keycloak;
  } else {
    console.log('Initializing Keycloak...');
    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
    return _keycloak;
  }
}

function getKeycloak() {
  if (!_keycloak) {
    console.error(
      'Keycloak has not been initialized. Please called init first.'
    );
  }
  return _keycloak;
}

async function loginUser(username, password) {
  return await _keycloak.grantManager
    .obtainDirectly(username, password)
    .then(grant => {
      return grant;
    });
}
const main = async () => {
  let grant = await loginUser('employee1', 'password');
  console.log(grant);
};

module.exports = {
  initKeycloak,
  getKeycloak,
  main
};
