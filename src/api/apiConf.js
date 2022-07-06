
//转换Form格式
export function toForm(obj){
	let arr = []
	for(let key in obj){
		arr.push(key+"="+obj[key])
	}
	return arr.join("&")
}
//获取url全局变量
export function getIP(){
	const url = "http://120.76.177.46:5000/api"
	return url
}
export function AddHost(obj){
	obj.t.axios.post(getIP()+'/UserApi/AddHistory?pid='+obj.pid,"",{
		headers: {
			'Authorization': 'Bearer ' + obj.token
		}
	})
	.then(res=>{
		console.log(res)
	})
	
}