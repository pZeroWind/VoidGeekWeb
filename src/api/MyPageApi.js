import {
	getIP,
	toForm
} from "./apiConf.js"

export function GetMyList(obj) {
	obj.t.axios.get(getIP() + '/PageApi/getList?' + toForm(obj.data))
		.then(res => {
			obj.out(res)
		})
}
export function getLoginData({t,data,out,token}){
	t.axios.get(getIP()+'/AdminApi/getLoginData?'+toForm(data),{
		headers: {
			'Authorization': 'Bearer ' + token
	}}).then(res=>{
		out(res)
	})
}
