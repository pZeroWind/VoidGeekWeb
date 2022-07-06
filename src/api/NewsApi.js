import {
	getIP,toForm
} from "./apiConf.js"
import {ChenkCode} from './publicUse.js'
//获取关注列表
export function GetLikeUserList({
	t,
	token,
	out,
	data
}) {
	t.axios.get(getIP() + '/LinkApi/getLikeUsers?'+toForm(data), {
		headers: {
			'Authorization': 'Bearer ' + token
		}
	}).then(res => {
		if(!ChenkCode(res.data)){
			return
		}
		out(res)
	})
}
//获取未读消息数
export function GetMsgData({
	t,
	token,
	out
}) {
	t.axios.get(getIP() + '/LinkApi/getMsgData', {
		headers: {
			'Authorization': 'Bearer ' + token
		}
	}).then(res => {
		if(!ChenkCode(res.data)){
			return
		}
		out(res)
	})
}
//发送消息
export function ToSendMsg({
	t,
	data,
	token,
	out
}) {
	t.axios.post(getIP() + '/LinkApi/toSend', JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'Authorization': 'Bearer ' + token
		}
	}).then(res=>{
		if(!ChenkCode(res.data)){
			return
		}
		out(res)
	})
}
//获取历史消息
export function GetLetter({t,token,data,out}){
	t.axios.get(getIP()+'/LinkApi/getLetter?'+toForm(data),{
		headers: {
			'Authorization': 'Bearer ' + token
		}
	}).then(res=>{
		if(!ChenkCode(res.data)){
			return
		}
		out(res)
	})
}
//获取用户数据
export function GetUser({t,vid,out}){
	t.axios.get(getIP()+'/UserApi/find?vid='+vid)
	.then(res=>{
		if(!ChenkCode(res.data)){
			return
		}
		out(res.data.data)
	})
}
//获取私信列表
export function GetForMe({t,data,token,out}){
	t.axios.get(getIP()+'/LinkApi/getLetterMe?'+toForm(data),
	{
		headers: {
			'Authorization': 'Bearer ' + token
		}
	}).then(res=>{
		if(!ChenkCode(res.data)){
			return
		}
		out(res)
	})
}
//获取系统消息
export function GetSystem({t,data,token,out}){
	t.axios.get(getIP()+'/LinkApi/getPostMe?'+toForm(data),
	{
		headers: {
			'Authorization': 'Bearer ' + token
		}
	}).then(res=>{
		if(!ChenkCode(res.data)){
			return
		}
		out(res)
	})
}
//阅读状态修改
export function UpdateState({t,vid,token}){
	t.axios.put(getIP()+'/LinkApi/readedLetter?vid='+vid,"",
	{
		headers: {
			'Authorization': 'Bearer ' + token
		}
	}).then(res=>{
		if(!ChenkCode(res.data)){
			return
		}
	})
}
//获取评论回复提醒列表
export function GetPlSeeList({t,data,token,out}){
	t.axios.get(getIP()+'/LinkApi/getSayMe?'+toForm(data),{
		headers: {
			'Authorization': 'Bearer ' + token
		}
	}).then(res=>{
		if(!ChenkCode(res.data)){
			return
		}
		out(res)
	})
}

export function GetReMeList({t,data,token,out}){
	t.axios.get(getIP()+'/LinkApi/getReMe?'+toForm(data),{
		headers: {
			'Authorization': 'Bearer ' + token
		}
	}).then(res=>{
		if(!ChenkCode(res.data)){
			return
		}
		out(res)
	})
}
export function GetLetterNum({t,vid,token,out}){
	t.axios.get(getIP()+'/LinkApi/getLetterNum?vid='+vid,{
		headers: {
			'Authorization': 'Bearer ' + token
		}}
		).then(res=>{
			if(!ChenkCode(res.data)){
				return
			}
			out(res)
		})
}

export function GetLastLetter({t,vid,token,out}){
	t.axios.get(getIP()+'/LinkApi/getLastLetter?vid='+vid,{
		headers: {
			'Authorization': 'Bearer ' + token
		}}).then(res=>{
			if(!ChenkCode(res.data)){
				return
			}
			out(res)
		})
}
export function sendRetrun({t,data,out}){
	t.axios.post(getIP()+'/PublicApi/sendReturn',data,{
		headers: {
			'content-type': 'application/json'
		}
	}).then(res=>{
		if(!ChenkCode(res.data)){
			return
		}
		out(res)
	})
}