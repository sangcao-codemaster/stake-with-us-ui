import router from './router'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
// import { getToken } from 'utils/auth' // getToken from cookie

// NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

// const whiteList = ['/login', '/auth-redirect']// no redirect whitelist
const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (token) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
    //   NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
        next()
//     //   if (store.getters.roles.length === 0) { // 
//     //     store.dispatch('GetUserInfo').then(res => { // 
//     //       const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
//     //       store.dispatch('GenerateRoutes', { roles }).then(() => { // 
//     //         router.addRoutes(store.getters.addRouters) // 
//     //         next({ ...to, replace: true }) //set the replace: true so the navigation will not leave a history record
//     //       })
//     //     }).catch((err) => {
//     //       store.dispatch('FedLogOut').then(() => {
//     //         Message.error(err || 'Verification failed, please login again')
//     //         next({ path: '/' })
//     //       })
//     //     })
//     //   } else {
//         // 
//         // if (hasPermission(store.getters.roles, to.meta.roles)) {
//         //   next()
//         // } else {
//         //   next({ path: '/401', replace: true, query: { noGoBack: true }})
//         // }
//         // 
//     //   }
//     }
//   } else {
//     /* has no token*/
//     if (whiteList.indexOf(to.path) !== -1) { // 
//       next()
//     } else {
//       next(`/login?redirect=${to.path}`) // 
//       NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
    next()
})

router.afterEach(() => {
//   NProgress.done() // finish progress bar
})
