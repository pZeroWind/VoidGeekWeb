import { getIP,toForm } from "./apiConf.js"

export function FindLunName(obj){
	obj.t.axios.get(getIP()+'/PageApi/get?pid='+obj.pid)
	.then(res=>{
		obj.out(res)
	})
}

export function GetTop(obj){
	obj.t.axios.get(getIP()+'/PageApi/getTop').then(res=>{
		obj.out(res)
	})
}

export function GetHotActive({t,data,out}){
	t.axios.get(getIP()+'/UserApi/getUserList?'+toForm(data))
	.then(res=>{
		out(res.data.data)
	})
}