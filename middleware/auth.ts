import { Middleware } from '@nuxt/types'

const authMiddleWare: Middleware = (context) => {
  const { store, redirect, route } = context
  // console.log(process.server)
  // Any route except /app... is not protected
  if (!route.fullPath.includes('/app/')) { return }
  if (!store.getters['user/isLoggedIn']) {
    redirect('/')
  }
}

export default authMiddleWare
