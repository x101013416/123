/*
软件名称:番茄看看 微信扫描二维码打开
更新时间：2021-02-21 @肥皂
脚本说明：番茄看看自动阅读
脚本为自动完成番茄看看的阅读任务
每日收益一元左右，可多号撸。提现秒到


微信打开地址进入  http://m.cyth88.cn/r?upuid=3965534

可以去boxjs修改自动提现金额和循环次数
最低提现额度为0.3元，默认提现1元
最多任务次数为100次，默认为25次运行一回

本脚本以学习为主！
首次运行脚本，会提示获取数据
去番茄看看，点击阅读A任务，开始阅读，
完成一次阅读即可获取数据。

TG电报群: https://t.me/hahaha8028


注意:脚本默认循环次数为25次，运行时间大概5分钟,每天共运行四次超过一百次容易被微信阅读限制，切记。。。。。。
别几天就把羊薅死了，账号多的大佬觉得运行一次太久的话也可以去boxjs自行修改循环次数，比如修改循环次数为20，则每天运行五次脚本，循环次数为50则每天要运行两次脚本。。默认为循环次数为100一天运行一次，反正不管怎么修改，尽量每天循环次数别超过100

boxjs地址 :

https://raw.githubusercontent.com/age174/-/main/feizao.box.json


番茄看看
圈X配置如下，其他软件自行测试
[task_local]
#番茄看看
15 12,14,16,20 * * * https://raw.githubusercontent.com/age174/-/main/fqkk.js, tag=番茄看看, img-url=https://ftp.bmp.ovh/imgs/2021/02/f8306006536eb49c.jpeg, enabled=true


[rewrite_local]
#番茄看看
^http://m.*.top/reada/getTask url script-request-header https://raw.githubusercontent.com/age174/-/main/fqkk.js



#loon
^http://m.*.top/reada/getTask script-path=https://raw.githubusercontent.com/age174/-/main/fqkk.js, requires-header=true, timeout=10, tag=番茄看看



#surge

番茄看看 = type=http-request,pattern=^http://m.*.top/reada/getTask,requires-header=1,max-size=0,script-path=https://raw.githubusercontent.com/age174/-/main/fqkk.js,script-update-interval=0




[MITM]
hostname = m.*.top


*/


const $ = new Env('番茄看看自动阅读');
let status;
status = (status = ($.getval("fqkkstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
const fqkkurlArr = [], fqkkhdArr = [],fqkkbodyArr = [],fqkkcount = ''
let fqkkurl = $.getdata('fqkkurl')
let fqkkhd = $.getdata('fqkkhd')
let fqkey = ''
let fqkkxh = ($.getval('fqkkxh') || '25');  // 此处修改循环次数，默认一百
let fqtx = ($.getval('fqtx') || '100');  // 此处修改提现金额，0.1元等于10，默认为提现一元，也就是100
var zz = ''




if ($.isNode()) {

  if (process.env.fqkkurl && process.env.fqkkurl.indexOf('#') > -1) {
  fqkkurl = process.env.fqkkurl.split('#');
  console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.fqkkurl && process.env.fqkkurl.indexOf('\n') > -1) {
   fqkkurl = process.env.fqkkurl.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   fqkkurl = process.env.fqkkurl.split()
  };
  Object.keys(fqkkurl).forEach((item) => {
        if (fqkkurl[item]) {
          fqkkurlArr.push(fqkkurl[item])
        }
    });

  if (process.env.fqkkhd && process.env.fqkkhd.indexOf('#') > -1) {
  fqkkhd = process.env.fqkkhd.split('#');
  console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.fqkkhd && process.env.fqkkhd.indexOf('\n') > -1) {
   fqkkhd = process.env.fqkkhd.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   fqkkhd = process.env.fqkkhd.split()
  };
  Object.keys(fqkkhd).forEach((item) => {
        if (fqkkhd[item]) {
          fqkkhdArr.push(fqkkhd[item])
        }
    });
}
else {
  fqkkurlArr.push($.getdata('fqkkurl'))
  fqkkhdArr.push($.getdata('fqkkhd'))
  let fqkkcount = ($.getval('fqkkcount') || '1');
  for (let i = 2; i <= fqkkcount; i++) {
   fqkkurlArr.push($.getdata(`fqkkurl${i}`))
   fqkkhdArr.push($.getdata(`fqkkhd${i}`))
  }
}

!(async () => {
    if (typeof $request !== "undefined") {
      await fqkkck()
    }
    console.log(`------------- 共${fqkkhdArr.length}个账号-------------\n`)
      for (let i = 0; i < fqkkhdArr.length; i++) {
        if (fqkkhdArr[i]) {

          fqkkurl = fqkkurlArr[i];
          fqkkhd = fqkkhdArr[i];
          $.index = i + 1;
          console.log(`\n开始【番茄看看${$.index}】`)
          for (let x = 0; x < fqkkxh; x++) {
          $.index = x + 1
          console.log(`\n番茄看看开始执行第${x+1}次阅读任务！💦\n`)
          await fqkk1();
          await $.wait(10000);
          if(zz==1){
          $.msg("","",'番茄看看任务异常，请查看脚本运行日志查看情况!')
          break;
          }
        }
        await fqkktx();
      }
    }
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())
//番茄看看数据获取
function fqkkck() {
   if ($request.url.indexOf("getTask") > -1) {
 const fqkkurl = $request.url
  if(fqkkurl)     $.setdata(fqkkurl,`fqkkurl${status}`)
    $.log(fqkkurl)
  const fqkkhd = JSON.stringify($request.headers)
        if(fqkkhd)    $.setdata(fqkkhd,`fqkkhd${status}`)
$.log(fqkkhd)
   $.msg($.name,"",'番茄看看'+`${status}` +'数据获取成功！')
  }
}



//番茄看看领取
function fqkk3(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : "http://m."+fqkkurl.match(/m.(.*?).top/)[1]+".top/reada/finishTask",
        headers : JSON.parse(fqkkhd),
        body : 'readLastKey='+fqkey,}
      $.post(url, async (err, resp, data) => {
        try {

    const result = JSON.parse(data)
        if(result.code == 0){
        console.log('\n番茄看看领取阅读奖励回执:成功🌝 '+result.msg)
}
if(result.code !== 0){

       console.log('\n番茄看看领取阅读奖励回执:失败🚫 '+result.msg)
zz = 1
}

        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//番茄看看提交
function fqkk2(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : "http://m."+fqkkurl.match(/m.(.*?).top/)[1]+".top/reada/jump?key="+fqkey,
        headers : JSON.parse(fqkkhd),

}
      $.post(url, async (err, resp, data) => {
        try {
        if (err) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {

    const result = JSON.parse(data)
       console.log('\n番茄看看key提交成功,即将开始领取阅读奖励')
       await $.wait(12000);
        await fqkk3();
        }} catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}



//番茄看看key
function fqkk1(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      if (typeof $.getdata('fqkkhd') === "undefined") {
        $.msg($.name,"",'请先获取番茄看看数据!😓',)
        $.done()
      }
let url = {
        url : "http://m."+fqkkurl.match(/m.(.*?).top/)[1]+".top/reada/getTask",
        headers : JSON.parse(fqkkhd),
        body : '',}
      $.post(url, async (err, resp, data) => {
        try {

    const result = JSON.parse(data)
        if(result.code == 0){
        console.log('\n番茄看看获取key回执:成功🌝 ')
        fqkey = result.data.jkey
        console.log(fqkey)
        await $.wait(6000);
        await fqkk2()
}
if(result.code !== 0){
console.log('番茄看看获取key回执:失败🚫 '+result.msg)

}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}


//提现
function fqkktx(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : "http://m."+fqkkurl.match(/m.(.*?).top/)[1]+".top/withdrawal/doWithdraw",
        headers : JSON.parse(fqkkhd),
        body : 'amount='+fqtx,}
      $.post(url, async (err, resp, data) => {
        try {

    const result = JSON.parse(data)
        if(result.code == 0){
        console.log('\n番茄看看提现回执:成功🌝 ')
}
if(result.code !== 0){

       console.log('\n番茄看看提现回执:失败🚫 '+result.msg)
}

        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
