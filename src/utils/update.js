
/**
 * 判断应用升级模块，从url地址下载升级描述文件到本地local路径
 * yanyilin@dcloud.io
 *
 * 升级文件为JSON格式数据，如下：
{
  "appid":"HelloH5",
  action: "all", // 整包更新 = all ，应用资源独立升级 = sth
  "iOS":{
    "version":"iOS新版本号，如：1.0.0",
    "note":"iOS新版本描述信息，多行使用\n分割",
    "url":"Appstore路径，如：itms-apps://itunes.apple.com/cn/app/hello-h5+/id682211190?l=zh&mt=8"
  },
  "Android":{
    "version":"Android新版本号，如：1.0.1",
    "note":"Android新版本描述信息，多行使用\n分割",
    "url":"apk文件下载地址，如：http://www.dcloud.io/helloh5p/HelloH5.apk"
  }
}
 */
export function checkUpdate (checkUrl, wgtUrl) {
  // 锁定屏幕方向
  plus.screen.lockOrientation('portrait-primary') // 锁定
  // 检测升级
  uni.request({
    url: checkUrl, // 检查更新的服务器地址
    data: {
      appid: plus.runtime.appid,
      version: plus.runtime.version,
      imei: plus.device.imei
    },
    success: res => {
      console.log('success', res)
      if (res.statusCode == 200 && res.data.isUpdate) {
        const openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android // 下载文件地址 ios以"itms-apps://"开头，后面跟appstore上应用地址。
        // 提醒用户更新
        uni.showModal({
          title: '更新提示',
          content: res.data.note ? res.data.note : '是否选择更新',
          success: showResult => {
            if (showResult.confirm) {
              if (res.action === 'all') {
                // 整包更新
                // plus.runtime.openURL(openUrl)
                updateAppAll(openUrl.url)
              } else {
                // 应用资源独立升级
                downWgt(wgtUrl) // 下载升级包
              }
            }
          }
        })
      }
    }
  })
}

/** 整包更新 */
function updateAppAll (openUrl) {
  if (plus.os.name === 'iOS') {
    plus.runtime.openURL(openUrl)
  } else {
    var dtask = plus.downloader.createDownload(openUrl, {}, function (d, status) {
      if (status === 200) {
      // 下载成功
        var path = d.filename
        console.log(d.filename)
        plus.runtime.install(path) // 安装下载的apk文件
      } else {
      // 下载失败
        alert('Download failed: ' + status)
      }
    })
    dtask.start()
  }
}

/** App资源在线升级更新 */
// 下载wgt文件
function downWgt (wgtUrl) {
  plus.nativeUI.showWaiting('下载更新文件...')
  plus.downloader.createDownload(wgtUrl, { filename: '_doc/update/' }, function (d, status) {
    if (status == 200) {
      console.log('下载更新文件成功：' + d.filename)
      installWgt(d.filename) // 安装wgt包
    } else {
      console.log('下载更新文件失败！')
      plus.nativeUI.alert('下载更新文件失败！')
    }
    plus.nativeUI.closeWaiting()
  }).start()
}
// 更新应用资源包（wgt文件）
function installWgt (path) {
  plus.nativeUI.showWaiting('安装更新文件...')
  plus.runtime.install(path, {}, function () {
    plus.nativeUI.closeWaiting()
    console.log('安装更新文件成功！')
    plus.nativeUI.alert('应用资源更新完成！', function () {
      plus.runtime.restart()
    })
  }, function (e) {
    plus.nativeUI.closeWaiting()
    console.log('安装更新文件失败[' + e.code + ']：' + e.message)
    plus.nativeUI.alert('安装更新文件失败[' + e.code + ']：' + e.message)
  })
}
