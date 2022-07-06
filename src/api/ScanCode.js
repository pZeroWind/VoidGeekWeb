import { getIP } from "./apiConf.js"

export function GetScanKey({t,out}){
	t.axios.get(getIP()+'/PublicApi/AndroidDownload').then(res=>{
		out(res)
	})
}
