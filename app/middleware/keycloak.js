import Keycloak from 'keycloak-connect';
import axios from 'axios';

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
    _keycloak = new Keycloak({ store: sessions }, keycloakConfig);
    console.log('Initializing Keycloak...');
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
  // const requestBody = `client_id=${KEYCLOAK_CLIENT}&password=${password}&username=${username}&grant_type=password`;
  // console.log(requestBody);
  // let tokenObject = await axios.post(
  //   `http://localhost:8080/auth/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`,
  //   requestBody
  // );
  // if (tokenObject.status === 200) {
  //   return tokenObject.data.access_token;
  // }
  // // console.log(tokenObject.status);
  // return null;

  return await _keycloak.grantManager
    .obtainDirectly(username, password)
    .then(grant => {
      return grant;
    })
    .catch(error => {
      console.log(error);
      throw new Error(error);
    });
}

export const authenticate = async (name, password) => {
  try {
    let grant = await loginUser(name, password); // 'employee1', 'password'
    return JSON.parse(grant);
  } catch (e) {
    return e;
  }
};
