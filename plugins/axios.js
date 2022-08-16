export default function ({ $axios, app }) {
  $axios.onRequest(config => {
    if (app.$cookies.get('auth')) {
      config.headers.common['access-token'] = app.$cookies.get('accessToken')
      config.headers.common['client'] = app.$cookies.get('client')
      config.headers.common['uid'] = app.$cookies.get('uid')
    }
  })
}
