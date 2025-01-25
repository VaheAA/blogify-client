const POSTS_PER_PAGE = 9

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

enum ROUTES {
  SIGN_UP = 'sign-up',
  SIGN_IN = 'sign-in',
  SIGN_OUT = 'sign-out'
}

export { POSTS_PER_PAGE, BASE_API_URL, ROUTES }
