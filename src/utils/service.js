const axios = require('axios');
const extend = require('extend');
const { ready } = require('redux-ready-wrapper');
const { apiBaseUrl, apiVersion } = require('@config/index.json');
const {
  errorCreator,
  infoCreator,
  successCreator
} = require('@redux/middlewares/service-alert');

const payload = data => data;
const initial = {};
const methods = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
};

// create default axios instance
const instance = axiosFactory();

// axios request/response interceptors for default instance
// interceptors ref: https://github.com/axios/axios#interceptors
instance.interceptors.request.use(
  config => {
    // we may do something here before request is sent
    return config;
  },
  err => Promise.reject(err)
);

instance.interceptors.response.use(
  res => {
    // we may do something here before returning response data
    return res;
  },
  err => Promise.reject(err)
);

// create axios instance with provided config, if any
function axiosFactory(userConfig = initial) {
  return axios.create(
    extend(
      { baseURL: `${apiBaseUrl}/${apiVersion}`, timeout: 3000 },
      userConfig
    )
  );
}

// make request for action creator based on the provided arguments
// callback could be, say, a provided normalizer function which returns normalized data
// request config ref: https://github.com/axios/axios#request-config
function makeRequest(method, url, config, callback = payload) {
  const {
    type,
    dispatchReady = true,
    error = initial,
    info = initial,
    success = initial,
    ...restConfig
  } = config;

  const requestor = dispatch =>
    instance
      .request({ method, url, ...restConfig })
      .then(res => dispatch({ type, payload: callback(res.data) }))
      .then(action => {
        info.message && dispatch(infoCreator(info));
        success.message && dispatch(successCreator(success));

        return action;
      })
      .catch(err => {
        error.message && (err = error);
        dispatch(errorCreator(err));
      });

  if (dispatchReady) {
    return ready(dispatch => requestor(dispatch), {
      isGet: method === methods.GET
    });
  }

  return ({ dispatch }) => requestor(dispatch);
}

module.exports = {
  // abstract away respective service requests and dispatchers
  get(url, config, callback) {
    return makeRequest(methods.GET, url, config, callback);
  },
  post(url, config, callback) {
    return makeRequest(methods.POST, url, config, callback);
  },
  put(url, config, callback) {
    return makeRequest(methods.PUT, url, config, callback);
  },
  delete(url, config, callback) {
    return makeRequest(methods.DELETE, url, config, callback);
  },

  // also, export default axios instance and axios factory
  instance,
  axiosFactory
};
