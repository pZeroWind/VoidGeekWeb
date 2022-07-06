import { getIP } from "./apiConf.js"
import { GetDate } from './publicUse.js'
export function GetHost(obj){
	obj.t.axios.get(getIP()+'/UserApi/getHistory',{
				headers: {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + obj.token
				}
			})
	.then(res=>{
		console.log(res)
		res.data.data.forEach(i=>{
			if(i.pageData==null){
				i.pageData = {
					pid : 0,
					title:"该文章已被删除",
					content:"暂无",
					time : new Date().getTime(),
					readNum : 0,
					likeNum : 0,
					imgUrl : ""
				}
			}
			i.pageData.content=i.pageData.content.replace(/<(?:.|\s)*?>/g, "")
			i.pageData.time=GetDate(i.pageData.time)
			i.time=GetDate(i.time)
		})
		obj.t.Hostility=res.data.data
		console.log(obj.t.Hostility)
	})
	
}