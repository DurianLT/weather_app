// const existWapPage = routeName => {
//     const routerNames = []
//     const getAllRouterNames = array => {
//       array.forEach(element => {
//         routerNames.push(element.name)
//         if (element.children?.length) {
//           getAllRouterNames(element.children)
//         }
//       })
//     }
//     getAllRouterNames(routers)
  
//     return routerNames.includes(routeName + '-wap')
//   }
  
//   const needJumpToWap = routeName => {
//     if (isWap() && routeName.indexOf('-wap') < 0 && existWapPage(routeName)) {
//       return true
//     } else {
//       return false
//     }
//   }
  
//   const needJumpToPC = routeName => {
//     if (!isWap() && routeName.indexOf('-wap') >= 0) {
//       return true
//     } else {
//       return false
//     }
//   }

//   router.beforeEach(async (to, from, next) => {
//     await init(to)
  
//     /** 处理wap跳转PC，PC跳转wap逻辑 */
//     if (!isWap() && ['approval-dap', 'approval-dap-wap'].includes(to.name)) {
//       const { applyType, approvalId } = to.params
//       if (window.location.origin === UCENTER_DOMAIN) {
//         next(
//           //替换为自己的url
//         )
//       } else {
//         window.location.replace(
//                 //替换为自己的url
//         )
//         next()
//       }
//     } else if (isWap() && to.query.appId === '2' && to.query.applyType === '21') {
//       window.location.replace(
//                //替换为自己的url
//       )
//     } else if (needJumpToWap(to.name)) {
//       window.location.replace(        //替换为自己的url)
//     } else if (needJumpToPC(to.name)) {
//       window.location.replace(        //替换为自己的url)
//     } else {
//       handleDashboardToBRAuthApply(to)
//       next()
//     }
//   })