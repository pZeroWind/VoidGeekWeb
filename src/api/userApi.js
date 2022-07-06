import {
	getIP
} from "./apiConf.js"

//获取个人数据
export function getMeData(t) {
	if (JSON.parse(localStorage.getItem("voidUser")) != undefined && JSON.parse(localStorage.getItem(
			"voidUser")) != "") {
		t.axios.get(getIP()+'/UserApi/user', {
				headers: {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("voidUser")).token
				}
			})
			.then(res => {
					t.fileImg = getIP()+'/PublicApi/getImg?imgUrl=' + res.data.data.imgUrl
					console.log(t.fileImg)
			}).catch(()=>{
				localStorage.removeItem("voidUser")
			})
	}
}
