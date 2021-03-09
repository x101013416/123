//独立COOKIE文件     ck在``里面填写，多账号换行
let userheaderVal= `oA0Gbjkvm8Vv4czrjo_iTRa0LBxY&_appName=ios&_dev=iPhone11,2&_devId=11d1c6840ff5bae0b89090e6570ce2f9f1562cf0&_appver=8.8.1&_ifChId=&_isChId=1&_osVer=14.4&openid=oA0Gbjkvm8Vv4czrjo_iTRa0LBxY&fskey=v0aaf8a8221603629a2dfe1ef70aa746&appid=wxcbc3ab3807acb685&access_token=42_XI118MSoau7_SPC7ls8AeZfYCCrGzruQaG-XKy8ScYNnIcYXFEQ8NaXNNA0uxs2R084ZC5-GgCDiNayCvQGszlnd041mpXx0ElMNLfLQt3c&buildType=store&check=11&_idfa=55C4549E-C93C-4CC9-9C22-4D28508723D4&lang=zh_CN`

let userkeyVal= `pgv_pvid=4313766563; ts_last=/activity/page/welwareCenter/; ts_sid=6533010221; ts_uid=6277987099`

let cashheaderVal= ``

let signheaderVal= `_request_from=web&version_code=13.3.1&js_sdk_version=1.77.0.2&tma_jssdk_version=1.77.0.2&app_name=douyin_lite&app_version=13.3.1&vid=246E6F98-F010-4F7F-9FEC-0A61D1CFCFC5&device_id=49486478617&channel=App%20Store&mcc_mnc=46001&aid=2329&screen_width=1125&openudid=8da6217cde637a3561f1d099f4de19f395f02f13&cdid=03D0524F-8E0A-4757-A69E-2BB3B05EB78B&os_api=18&ac=WIFI&os_version=14.4&client_niu_ready=0&device_platform=iphone&build_number=133105&iid=3466086907392759&device_type=iPhone11,2&idfa=55C4549E-C93C-4CC9-9C22-4D28508723D4&in_sp_time=0`

let signkeyVal= `pgv_pvid=4313766563`

let taskheaderVal= `&_dev=iPhone11,2&_devId=11d1c6840ff5bae0b89090e6570ce2f9f1562cf0&_appver=8.8.1&_ifChId=&_isChId=1&_osVer=14.4&openid=oA0Gbjkvm8Vv4czrjo_iTRa0LBxY&fskey=v0aaf8a8221603629a2dfe1ef70aa746&appid=wxcbc3ab3807acb685&access_token=42_XI118MSoau7_SPC7ls8AeZfYCCrGzruQaG-XKy8ScYNnIcYXFEQ8NaXNNA0uxs2R084ZC5-GgCDiNayCvQGszlnd041mpXx0ElMNLfLQt3c&buildType=store&check=11&_idfa=55C4549E-C93C-4CC9-9C22-4D28508723D4&lang=zh_CN`

let taskkeyVal= `pgv_info=ssid=s1963267584; pgv_pvid=4313766563; ts_last=/activity/page/welwareCenter/; ts_sid=6533010221; ts_uid=6277987099`

let wxtaskkeyVal= `wzq_channel=fm_wzq_wx_v1_unknow_01..; qlappid=wx9cf8c670ebd68ce4; qlskey=v6474a41e1160362be6b62d6bbbec4e4; qluin=085e9858e566c227176dc7bda@wx.tenpay.com; qq_logtype=16; wx_session_time=1614162918000; wzq_qlappid=wx9cf8c670ebd68ce4; wzq_qlskey=v6474a41e1160362be6b62d6bbbec4e4; wzq_qluin=os-ppuMGqZtzCdef_5D8Q4U04VCA`


let cookieArr = {
  userheaderVal: userheaderVal,
  userkeyVal: userkeyVal,
  cashheaderVal: cashheaderVal,
  signheaderVal: signheaderVal,
  signkeyVal: signkeyVal,
  taskheaderVal: taskheaderVal, 
  taskkeyVal: taskkeyVal,
  wxtaskkeyVal: wxtaskkeyVal, 
}

module.exports =  cookieArr
