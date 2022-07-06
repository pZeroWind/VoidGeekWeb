import {
	getIP
} from "./apiConf.js"
import {
	ElMessage
} from "element-plus"
import {
	toForm
} from './apiConf.js'

export function UplodTag(obj) {
		if(obj.t.selectList.length==5){
			ElMessage({
				message:'最多只能选择五个标签',
				type:'error'
			})
		}else{
			obj.t.selectList.push(obj.data.title)
			obj.t.selectList = DeleteNon(obj.t.selectList)
		}
		GetTagList({
			t: obj.t,
			fdata: {
				page: 1,
				size: 50
			}
		})
		obj.t.AddTagData.title = ""
}

export function GetTagList(obj) {
	obj.t.axios.get(getIP() + "/PageApi/getTag?" + toForm(obj.fdata))
		.then(res => {
			obj.out(res.data.data)
		})
}

export function GetUseTagList(obj) {
	obj.t.axios.get(getIP() + "/PageApi/getUseTag?" + toForm(obj.fdata))
		.then(res => {
			let resList = []
			res.data.data.forEach(i=>{
				let data = {
					title:i,
					seled:false
				}
				resList.push(data)
			})
			obj.out(resList)
		})
}

export function DeleteNon(arr) {
	for (var i = 0; i < arr.length; i++) {
		for (var j = i + 1; j < arr.length; j++) {
			if (arr[i] == arr[j]) {
				arr.splice(j, 1);
				j--;
			}
		}
	}
	return arr
}

export function GetAreaList(obj){
	obj.t.axios.get(getIP()+"/AreaApi/list").then(res=>{
		obj.t.AreaList=res.data.data
	})
}

export function Upload(obj){
	obj.t.axios.post(getIP()+'/UserApi/addPage',obj.data,
	{
		headers:{
		'content-type': 'application/json',
		'Authorization':'Bearer '+obj.token
		}})
		.then(()=>{
		obj.out()
		ElMessage({
			message:'发布成功',
			type:'success',
		})
		location.href="/"
		this.SetValue.updialogmessage = !this.SetValue.updialogmessage
		obj.t.SetValue.buttonclick=false
	})
}