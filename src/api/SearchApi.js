import { getIP,toForm } from "./apiConf.js"

export function LikeSearch({data,t,out}){
	t.axios.get(getIP()+'/PageApi/getList?'+toForm(data))
	.then(res=>{
		out(res.data.data)
	})
}

export function FindList({t,text,out}){
	t.axios.get(getIP()+'/PageApi/getContains?text='+text)
	.then(res=>{
		out(res)
	})
}
export function DeleteNons(arr) {
	for (var i = 0; i < arr.length; i++) {
		for (var j = i + 1; j < arr.length; j++) {
			if (arr[i].title == arr[j].title) {
				arr.splice(j, 1);
				j--;
			}
		}
	}
	return arr
}