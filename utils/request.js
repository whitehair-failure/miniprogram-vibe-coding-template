const BASE_URL = 'http://<your-domain>:<your-port>';
const DEFAULT_TIMEOUT = 15000;

function request(options = {}) {
  let {
    url = '',
    method = 'GET',
    data = {},
    header = {},
    timeout = DEFAULT_TIMEOUT,
    baseURL = BASE_URL,
    responseType = 'json',
    withCredentials = false,
  } = options;

  return new Promise((resolve, reject) => {

    // 自动注入 token（如果有）
    try {
      const token = wx.getStorageSync('token');
      if (token) {
        header = Object.assign({ Authorization: token }, header);
      }
    } catch (e) {}

    wx.request({
      url: baseURL
        ? baseURL.replace(/\/$/, '') + '/' + url.replace(/^\//, '')
        : url,
      method,
      data,
      header,
      timeout,
      responseType,
      withCredentials,
      success(res) {
        const { statusCode, data: resData } = res;
        // treat 2xx as success
        if (statusCode >= 200 && statusCode < 300) {
          resolve(resData);
        } else {
          const err = {
            message: (resData && resData.message) || `HTTP ${statusCode}`,
            statusCode,
            data: resData,
          };
          reject(err);
        }
      },
      fail(err) {
        reject({
          message: err && err.errMsg ? err.errMsg : 'network error',
          raw: err,
        });
      },
      complete() {
      },
    });
  });
}

// 简便方法
function get(url, data, options = {}) {
  return request(Object.assign({ url, method: 'GET', data }, options));
}

function post(url, data, options = {}) {
  const header = Object.assign(
    { 'content-type': 'application/json' },
    options.header || {}
  );
  return request(Object.assign({ url, method: 'POST', data, header }, options));
}

function put(url, data, options = {}) {
  const header = Object.assign(
    { 'content-type': 'application/json' },
    options.header || {}
  );
  return request(Object.assign({ url, method: 'PUT', data, header }, options));
}

function del(url, data, options = {}) {
  return request(Object.assign({ url, method: 'DELETE', data }, options));
}

export { request, get, post, put, del };
