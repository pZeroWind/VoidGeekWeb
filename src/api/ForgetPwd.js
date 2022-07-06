import{getIP,toForm}from "./apiConf.js"
import{ChenkCode}from "./publicUse.js"
// 获取用户信息
export function GetUser({t,vid,out}){
	t.axios.get(getIP()+'/UserApi/find?vid='+vid)
	.then(res=>{
		ChenkCode(res.data)
		out(res.data.data)
	})
}
// 修改密码接口
export function UpdatePwd({t,data,out}){
	t.axios.put(getIP()+'/UserApi/forget?'+toForm(data),"")
	.then(res=>{
		ChenkCode(res.data)
		out(res.data.data)
	})
}