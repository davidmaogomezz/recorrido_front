export default function ({ app, redirect }) {
  const auth = app.$cookies.get('auth')
  if (auth) return redirect('/auth')
}