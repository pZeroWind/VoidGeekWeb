import { getIP,toForm } from "./apiConf.js"
import {
		ElMessage
	} from 'element-plus'
export function GetSaveList(obj){
	obj.t.axios(getIP()+'/UserApi/getFolder',{
		headers: {
		'Authorization': 'Bearer ' + obj.token
	}}
	).then(res=>{
		obj.out(res)
	})
}

export function GetsaveFile(obj){
	obj.t.axios(getIP()+'/UserApi/getSavePage?'+toForm(obj.data),{
		headers: {
		'Authorization': 'Bearer ' + obj.token
	}}
	).then(res=>{
		obj.out(res)
	})
}

export function AddSaveFolder(obj){
	let data = JSON.parse(JSON.stringify(obj.data))
	obj.t.axios.post(getIP()+'/UserApi/addFolder',JSON.stringify(obj.data),{
		headers: {
			'content-type': 'application/json',
			'Authorization': 'Bearer ' + obj.token
	}}
	).then((res)=>{
		ElMessage({
			message:'添加成功',
			type:'success'
		})
		console.log(res)
		data.fsId=res.data.data
		obj.t.folderList.push(data)
		obj.t.folderData.folderName="";
		obj.t.dialogVisable=false
	})
}

export function AddSaveFolders({t,token,data,out}){
	t.axios.post(getIP()+'/UserApi/addFolder?',JSON.stringify(data),{
		headers: {
			'content-type': 'application/json',
			'Authorization': 'Bearer ' +token
	}}
	).then((res)=>{
		out(res)
	})
}
export function Delete_article({t,token,pid,out}){
	t.axios.delete(getIP()+'/AdminApi/deletePage?pid='+pid,{
		headers: {
				'content-type': 'application/json',
				'Authorization': 'Bearer ' + token
		}
	})
	.then(res=>{
		out(res)
	})
}
export function Delete_Folder({t,token,fsid,out}){
	t.axios.delete(getIP()+'/UserApi/deleteFolder?sfid='+fsid,{
		headers: {
				'content-type': 'application/json',
				'Authorization': 'Bearer ' + token
		}
	})
	.then(res=>{
		out(res)
	})
}
export function Delete_Folder_article({t,token,fsid,pid,out}){
	t.axios.delete(getIP()+'/UserApi/deleteSave?sfid='+fsid+'&pid='+pid,{
		headers: {
				'content-type': 'application/json',
				'Authorization': 'Bearer ' + token
		}
	})
	.then(res=>{
		out(res)
	})
}