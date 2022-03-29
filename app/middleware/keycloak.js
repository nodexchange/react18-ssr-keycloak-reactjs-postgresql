import Keycloak from 'keycloak-connect';

let _keycloak;

const { KEYCLOAK_SECRET, KEYCLOAK_URL, KEYCLOAK_CLIENT, KEYCLOAK_REALM } =
  process.env;
const keycloakConfig = {
  clientId: KEYCLOAK_CLIENT,
  bearerOnly: true,
  serverUrl: KEYCLOAK_URL,
  realm: KEYCLOAK_REALM,
  credentials: {
    secret: KEYCLOAK_SECRET
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

async function loginUser(username, password) {
  return await _keycloak.grantManager
    .obtainDirectly(username, password)
    .then(grant => {
      return grant;
    });
}

export const authenticate = async (name, password) => {
  let grant = await loginUser(name, password); // 'employee1', 'password'
  console.log(grant);
};
