import {
	getIP,
	toForm
} from "./apiConf.js"
import {
	ElMessage
} from "element-plus"
export function HeList({obj,out}){
	obj.t.axios.get(getIP()+"/UserApi/find?vid="+obj.vid)
	.then(res=>{
		out(res.data.data)
	})
}
export function GetListArticle({t,data,out}){
	t.axios.get(getIP()+"/PageApi/getList?"+toForm(data))
	.then(res=>{
		if(res.data.code!=200){
			ElMessage({
				message:res.data.msg,
				type:'error'
			})
			return
		}
		out(res)
	})
}
export function GetLikeUser({t,data,out}){
	t.axios.get(getIP()+"/LinkApi/getLikeUsersFind?"+toForm(data))
	.then(res=>{
		if(res.data.code!=200){
			ElMessage({
				message:res.data.msg,
				type:'error'
			})
			return
		}
		out(res)
	})
}
export function GetFolder({t,vid,out}){
	t.axios.get(getIP()+"/UserApi/getFolderFind?vid="+vid)
	.then(res=>{
		if(res.data.code!=200){
			ElMessage({
				message:res.data.msg,
				type:'error'
			})
			return
		}
		out(res.data.data)
	})
}