export const isWap = () => {
    var userAgentInfo = navigator.userAgent
    var Agents = [
      'Android',
      'iPhone',
      'SymbianOS',
      'Windows Phone',
      'iPad',
      'iPod'
    ]
    var flag = true
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false
        break
      }
    }
  
    if (flag) {
      let width =
        document.documentElement.clientWidth || document.body.clientWidth
      if (width < 840) {
        //小于840px的屏幕，判定为手机
        flag = false
      }
    }
    return !flag
  }
  
  /** 当前url是否对应的wap页面 */
  export const isWapPage = () => {
    const routerNames = []
    const getAllRouterNames = array => {
      array.forEach(element => {
        routerNames.push(element.name)
        if (element.children?.length) {
          getAllRouterNames(element.children)
        }
      })
    }
    getAllRouterNames(routers)
  
    const path = window.location.href.split('#')[1]
    const curRoute = router.resolve(path)
  
    if (
      isWap() &&
      ((curRoute.name.indexOf('-wap') < 0 &&
        routerNames.includes(curRoute.name + '-wap')) ||
        curRoute.name.indexOf('-wap') >= 0)
    ) {
      return true
    } else {
      return false
    }
  }
  /** 判断客户端：Android，IOS，PC */
export const judgeClient = () => {
  let u = navigator.userAgent
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //判断是否是 android终端
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //判断是否是 iOS终端
  if (isAndroid) {
    return 'Android'
  } else if (isIOS) {
    return 'IOS'
  } else {
    return 'PC'
  }
}

/** 是否是刘海屏 */
export const isiPhoneX = () => {
  return (
    (judgeClient() === 'IOS' &&
      ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
        (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
    (D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
    (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT) ||
    (D_HEIGHT === p12_HEIGHT && D_WIDTH === p12_WIDTH) ||
    (D_HEIGHT === p12_WIDTH && D_WIDTH === p12_HEIGHT) ||
    (D_HEIGHT === p12_MAX_HEIGHT && D_WIDTH === p12_MAX_WIDTH) ||
    (D_HEIGHT === p12_MAX_WIDTH && D_WIDTH === p12_MAX_HEIGHT)
  )
}

export const safeBottomHeight = () => {
  return isiPhoneX() ? 44 : 0
}

export const safeTopHeight = () => {
  return isiPhoneX() ? 22 : 0
}

export const statusBarHeight = () => {
  return judgeClient() === 'IOS' ? (isiPhoneX() ? 44 : 20) : 0
}
