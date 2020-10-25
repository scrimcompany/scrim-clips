import cookies from 'js-cookie'

export const getUserFromCookie = () => {
  const cookie = cookies.get('auth')
  if (!cookie) {
    return
  }
  return JSON.parse(cookie)
}

export const setUserCookie = (user) => {
  cookies.set('auth', user, {
    // firebase id tokens expire in one hour
    // set cookie expiry to match
    expires: 24 * 365,
  })
}

export const removeUserCookie = () => cookies.remove('auth')
