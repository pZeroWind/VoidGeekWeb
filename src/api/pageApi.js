import {
	toForm,
	getIP
} from "./apiConf.js"
import {
	ElMessage
} from "element-plus"
// import {
// 	GetLv,
// 	GetPre
// } from "../VoidJS/exc.js"
import {
	GetLv,
	GetPre
} from '../VoidJS/exc.js'
import {
	GetDate
} from "./publicUse.js"

const imgheader = 'http://120.76.177.46:5000/api/PublicApi/getImg?imgUrl='
//获取文章列表
export function getPageList(t, obj) {
	t.axios.get(getIP() + '/PageApi/getList?' + toForm(obj))
		.then(res => {
			res.data.data.forEach(i => {
				i.time = GetDate(i.time)
				i.content = i.content.replace(/<[^>]+>/g, "")
				t.reList.push(i)
			})
			t.limt = res.data.limt
		})
}

export function getPage(obj) {
	obj.t.axios.put(getIP() + '/PageApi/to?pid=' + obj.pid)
		.then(res => {
			res.data.data.time = GetDate(res.data.data.time)
			obj.out(res.data)
		})
}

export function getSay(obj) {
	obj.t.axios.get(getIP() + '/PageApi/getSayList?' + toForm(obj.data))
		.then(res => {
			obj.setLimt(res.data.limt)
			res.data.data.forEach(i => {
				i.time = GetDate(i.time)
				obj.t.axios.get(getIP() + "/UserApi/find?vid=" + i.vid)
					.then(rest => {
						i.imgUrl = imgheader + rest.data.data.imgUrl
						i.username = rest.data.data.userName
						obj.t.$forceUpdate()
				})
			})
			obj.out(res.data.data)
		})
}

export function getReSay(obj) {
	obj.t.axios.get(getIP() + '/PageApi/getReSayList?' + toForm(obj.data))
		.then(res => {
			obj.setLimt(res.data.limt)
			res.data.data.forEach(i => {
				i.time = GetDate(i.time)
				obj.t.axios.get(getIP() + "/UserApi/find?vid=" + i.vid)
					.then(rest => {
						i.imgUrl = imgheader + rest.data.data.imgUrl
						i.username = rest.data.data.userName
						obj.t.axios.get(getIP() + "/UserApi/find?vid=" + i.toid)
							.then(rest2 => {
								i.touserName = rest2.data.data.userName
								obj.t.$forceUpdate()
							})
					})
			})
			obj.out(res.data.data)
		})
}

export function getUser(obj) {
	obj.t.axios.get(getIP() + "/UserApi/find?vid=" + obj.vid)
		.then(res => {
			obj.t.activeData = res.data.data
			obj.t.activeData.imgUrl = imgheader + res.data.data.imgUrl
			obj.t.activeData.Lv = GetLv(res.data.data.exc)
			obj.object.style.width = GetPre(res.data.data.exc)
			obj.object.style.transition = "all 1s"
		})
}

export function UploadPl(obj) {
	obj.t.axios.post(getIP() + obj.url, JSON.stringify(obj.data), {
		headers: {
			'content-type': 'application/json',
			'Authorization': 'Bearer ' + obj.token
		}
	}).then((res) => {
		Successful({
			t: obj.t,
			sayId:res.data.data
		})
	}).catch(() => {
		ElMessage({
			message: '评论上传失败',
			type: 'error'
		})
	})
}



function Successful(obj) {
	//obj.t.sayList.unshift(data)
	var num= obj.t.plData.type
	ElMessage({
		message: '评论上传成功',
		type: 'success'
	})
	FindUser({
		t:obj.t,
		vid:JSON.parse(localStorage.getItem("voidUser")).userVid,
		out:res=>{
			console.log(obj.t.plData.type)
			if(num==0){
				let data1 = {
					content:obj.t.resPlData.content,
					imgUrl:imgheader+ res.data.data.imgUrl,
					pid:obj.t.resPlData.pid,
					sonLimt:0,
					resSayList:[],
					usersData:res.data.data,
					time:GetDate(new Date().getTime()),
					username:res.data.data.userName,
					vid:res.data.data.vid,
					sayid:obj.sayId
				}
				obj.t.sayList.unshift(data1)
			}else{
				let data={
					content: obj.t.resPlData.content,
					imgUrl:imgheader+ res.data.data.imgUrl,
					sid: obj.t.resayUserData.sayid,
					time: GetDate(new Date().getTime()),
					toUserData:  obj.t.resayUserData.usersData,
					toid: obj.t.resayUserData.usersData.vid,
					touserName: obj.t.resayUserData.usersData.userName,
					userData: res.data.data,
					username: res.data.data.userName,
					vid: res.data.data.vid,
					sayid:obj.sayId
				}
				obj.t.resayUserData.reSayList.unshift(data)
			}
		}
	})
	obj.t.plData.content = ""
	obj.t.plData.type = 0
	obj.t.plData.placeholder = "请输入评论内容"
}
function FindUser({t,vid,out}){
	t.axios.get(getIP()+'/UserApi/find?vid='+vid).then(res=>{
		out(res)
	})
}
export function SavePage({t,token,data,out}){
	t.axios.post(getIP()+'/UserApi/AddSave?'+toForm(data),"",{
		headers: {
			'Authorization': 'Bearer ' + token
		}
	}).then((res)=>{
		if(res.data.code!=200){
			ElMessage({
				message:'收藏失败',
				type:'error'
			})
			return
		}
		ElMessage({
			message:'收藏成功',
			type:'success'
		})
		out(res)
	})
}

export function AddLike({t,pid,out,token}){
	t.axios.put(getIP()+'/PageApi/like?pid='+pid,"",{
		headers: {
			'Authorization': 'Bearer ' + token
		}
	})
	.then(res=>{
		if(res.data.code!=200){
			ElMessage({
				message:res.data.msg,
				type:'error'
			})
			return
		}
		out()
	})
}

export function RemoveLike({t,pid,out,token}){
	t.axios.put(getIP()+'/PageApi/unlike?pid='+pid,"",{
		headers: {
			'Authorization': 'Bearer ' + token
		}
	})
	.then(res=>{
		if(res.data.code!=200){
			ElMessage({
				message:res.data.msg,
				type:'error'
			})
			return
		}
		out()
	})
}

export function CheckLike({t,pid,out,token}){
	t.axios.get(getIP()+'/UserApi/checkLike?pid='+pid,{
		headers: {
			'Authorization': 'Bearer ' + token
		}
	})
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

export function LikeUser({t,vid,out,token}){
	t.axios.put(getIP()+'/UserApi/likeUser?vid='+vid,"",{
		headers: {
			'Authorization': 'Bearer ' + token
		}
	})
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

export function CheckLikeUser({t,vid,out,token}){
	t.axios.get(getIP()+'/UserApi/checkLikeUser?vid='+vid,{
		headers: {
			'Authorization': 'Bearer ' + token
		}
	})
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

export function Recommended_Articles({t,data,tag,out}){
	let url = getIP()+'/PageApi/getList?'+toForm(data)
	t.axios.post(url,"tag="+tag,{
		headers: {
			"Content-Type":"application/x-www-form-urlencoded"
		}
	})
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

export function SendReport({t,data,token,out}){
	t.axios.post(getIP()+'/PageApi/falsePage',data,{
		headers: {
			'content-type': 'application/json',
			'Authorization': 'Bearer ' + token
		}
	}).then(res=>{
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
export function ChenckSave({t,pid,out,token}){
	t.axios.get(getIP()+'/UserApi/checkSave?pid='+pid,{
		headers: {
			'Authorization': 'Bearer ' + token
		}
	}).then(res=>{
		out(res)
	})
}
