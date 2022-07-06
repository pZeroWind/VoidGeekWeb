<template>
	<div id="nav" v-show="$route.meta.show">
		<el-dialog @closed="dialogClose" v-model="dialog" title="反馈" width="30%" draggable>
			<span style="position: relative;left: -115px;">请输入您的意见：</span>
			<textarea v-model="feedback.content" style="width: 80%;height: 100px;resize: none;"></textarea>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogClose">取消</el-button>
					<el-button type="primary" @click="sendRetrunDef">提交</el-button>
				</span>
			</template>
		</el-dialog>
		<el-dialog @closed="QrClose()" v-model="Qrdialog" title="下载移动端" width="30%" draggable>
			<qrcode-vue :value="CodeUrl" :size="250" level="H" />
		</el-dialog>
		<div id="Dao">
			<div class="Dao_box">
				<div class="D_logo">
					<img align="center" src="@/assets/void_logo.png" class="D_l_img">
					程序员的避风港
				</div>
				<ul class="D_title">
					<router-link to="/">
						<li>主页</li>
					</router-link>
					<router-link to="/Area">
						<li>专区</li>
					</router-link>
				</ul>
			</div>
			<ul class="D_seach">
				<li>
					<input type="text" v-model="searchZ" autocomplete="off" @blur="unInp" @input="inp"
						placeholder="输入关键词搜索" class="D_s_inp" />
				</li>
				<li><input type="button" @click="searchDef(searchZ)" class="D_s_btn" value="搜索" /></li>
				<li v-show="cl">
					<ul class="D_seach_alike" @mousemove="clRe=true" @mouseleave="clRe=false">
						<li v-for="(it,i) in SearchList" @click="searchDef(it.replace(/<(?:.|\s)*?>/g,''))" :key="i"
							v-html="it"></li>
					</ul>
				</li>
			</ul>
			<ul class="D_login1">
				<li style="cursor: pointer;" @click="cd">
					<img :src="fileImg" class="D_l_avi" />
				</li>
				<a class="D_news">
					<li  @click="toUrl('/News')" style="position: relative;">
						消息
						<div v-if="newsShow"
							style="background-color: red; width: 8px;height: 8px; border-radius: 50%;position: absolute; top: 17px; right: 0px;">

						</div>
					</li>
				</a >
				<a  class="D_news">
					<li @click="toUrl('/User/Myself?select=2')">足迹</li>
				</a >
				<a   class="D_news">
					<li @click="toUrl('/User/Myself?select=1')">收藏</li>
				</a >
				<a  class="D_news">
					<li @click="toUrl('/Editor')">发布</li>
				</a >
			</ul>
			<el-drawer v-model="show" direction="ltr" size="200px">
				<ul style="margin: 0px;" v-if="cheackLogin()">
					<li v-for="(item,index) in mu" :key="index" class="mu_li">
						<a style="cursor: pointer;display: block;width: 100%;height: 100%;"
							v-if="item.url=='User/Cancel'" @click="cancel()">{{item.name}}</a>
						<router-link style="display: block;width: 100%;height: 100%;"
							v-else-if="item.url=='/User/Modify'" :to="item.url">{{item.name}}</router-link>
						<a style="display: block;width: 100%;height: 100%;" v-else target="_blank"
							:href="item.url">{{item.name}}</a>
					</li>
				</ul>
			</el-drawer>
		</div>
	</div>
	
	<div style="display: flex;flex-direction: column;align-items: center;justify-content: center;border-radius: 50%; width: 50px; position: fixed;z-index: 1000;bottom: 25px;cursor: pointer;-moz-user-select: none;right: 30px;">
		<div @click="openQr()" class="A_hover"  v-show="$route.meta.show">
			<!-- <qrcode-vue style="position: fixed; right: 40px;bottom: 140px;" :value="'http://localhost:8080/'" :size="30" level="H" /> -->
			<img style="width: 40px;height: 40px;" src="./assets/Svg/qr-code-line.svg">
		</div>
		<div v-show="$route.meta.show" class="A_hover" @click="selectDialog">
			<img style="width: 40px;height: 40px;" src="./assets/Svg/feedback-fill.svg">
		</div>
		<div v-show="$route.meta.show" @click="Gohome()" class="A_hover">
			<img style="width: 40px;height: 40px;" src="./assets/Svg/home-3-fill.svg">
		</div>
	</div>
	<router-view />
</template>

<script>
	import {
		ElMessageBox
	} from 'element-plus'
	import {
		getMeData
	} from "./api/userApi.js"
	import {
		FindList
	} from './api/SearchApi.js'
	import { getIP } from './api/apiConf.js'
	import {
		sendRetrun,
		GetMsgData
	} from './api/NewsApi.js'
	import {
		ElMessage
	} from "element-plus"
	import { GetScanKey } from './api/ScanCode.js'
	import QrcodeVue from "qrcode.vue"
	export default {
		components:{
			QrcodeVue
		},
		data() {
			return {
				show: false,
				mu: [{
						name: "个人中心",
						url: "User/Myself?select=0"
					},
					{
						name: "修改密码",
						url: "/User/Modify"
					},
					{
						name: "我的收藏",
						url: "User/Myself?select=1"
					},
					{
						name: "我的足迹",
						url: "User/Myself?select=2"
					},
					{
						name: "退出登录",
						url: "User/Cancel"
					}
				],
				cl: false,
				state: 1,
				fileImg: 'http://120.76.177.46:5000/api/PublicApi/getImg?imgUrl=imgs/819d4ea9ce1f40f5a9bc0c9755c3584d.png',
				searchZ: "",
				SearchList: [],
				clRe: false,
				pathName: "",
				feedback: {
					vid: "",
					title: "",
					content: "",
					time: 0
				},
				dialog: false,
				newsShow: false,
				Qrdialog:false,
				CodeUrl:""
			}
		},
		created() {
			getMeData(this)
			this.pathName = window.location.pathname
			if (JSON.parse(localStorage.getItem("voidUser")) != undefined && JSON.parse(localStorage.getItem(
					"voidUser")) != "") {
				GetMsgData({
					t: this,
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					out: res => {
						if (res.data.data.allConut > 0) {
							this.newsShow = true
						}
					}
				})
				this.axios.post(getIP() + '/PublicApi/inner', "", {
					headers: {
						'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("voidUser")).token
					}
				}).then(() => {}).catch(() => {
					localStorage.removeItem("voidUser")
				})
			}
		},
		mounted() {
			this.linkSocket()
		},
		methods: {
			toUrl(url){
				if (JSON.parse(localStorage.getItem("voidUser")) != undefined && JSON.parse(localStorage.getItem("voidUser")) != ""){
					window.open(url)
				}else{
					ElMessage({
						message:'请先登录才能进行此操作'
					})
				}
			},
			GetCodeUrl(){
				GetScanKey({
					t:this,
					out:res=>{
						console.log(res)
						this.CodeUrl=res.data
					}
				})
			},
			openQr(){
				this.GetCodeUrl()
				this.Qrdialog=true
			},
			QrClose(){
				this.Qrdialog=false
			},
			inp() {
				this.cl = true
				//console.log(this.searchZ)
				FindList({
					t: this,
					text: this.searchZ,
					out: re => {
						re.data.data.forEach((it, i) => {
							re.data.data[i] = it.replace(this.searchZ, "<font color='red'>" + this
								.searchZ + "</font>")
						})
						this.SearchList = re.data.data
					}
				})
			},
			unInp() {
				if (this.clRe) {
					return
				}
				this.cl = false
			},
			linkSocket() {
				// if(this.pathName=="/News"){
				// 	return
				// }
				var soket = "ws://120.76.177.46:5000/api/UserApi/connect"
				//socket在线监测
				var a = new WebSocket(soket)
				a.onopen = () => {
					a.send("1")
				};
				a.onmessage = () => {
					a.send("1")
				};
			},
			cancel() {
				ElMessageBox.confirm('是否确定退出', '提醒', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
					localStorage.removeItem("voidUser")
					location.href = '/'
				})
			},
			cd() {
				if (JSON.parse(localStorage.getItem("voidUser")) != undefined && JSON.parse(localStorage.getItem(
						"voidUser")) != "") {
					this.show = !this.show;
				} else {
					location.href = "/Login";
				}
			},
			cheackLogin() {
				if (this.state == 1) {
					return true;
				} else {
					return false;
				}
			},
			searchDef(text) {
				console.log(btoa(encodeURI(text)))
				location.href = "/search?src=" + btoa(encodeURI(text)) + "&tag=" + btoa(encodeURI("[]"))
			},
			sendRetrunDef() {
				this.feedback.vid = JSON.parse(localStorage.getItem('voidUser')).userVid,
					this.feedback.time = new Date().getTime()
				console.log(this.feedback)
				sendRetrun({
					t: this,
					data: this.feedback,
					out: res => {
						if (res.data.data) {
							ElMessage({
								message: '感谢您的反馈',
								type: 'success'
							})
							this.feedback = {
								vid: "",
								title: "",
								content: "",
								time: ""
							}
							this.dialog = false
						}
					}
				})
			},
			dialogClose() {
				this.feedback = {
					vid: "",
					title: "",
					content: "",
					time: ""
				}
				this.dialog = false
			},
			selectDialog() {
				if (JSON.parse(localStorage.getItem("voidUser")) != undefined && JSON.parse(localStorage.getItem(
						"voidUser")) != "") {
					this.dialog = true
				}else{
					ElMessage({
						message:'请先登录才能进行此操作'
					})
				}
			},
			Gohome() {
					location.href = "/"
			}
		}
	}
</script>


<style>
	@import url("VCss/All.css");
	@import url("VCss/AppCss.css");

	* {
		--el-color-primary: black;
	}

	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	.D_title {
		margin-left: 25px;
	}

	.D_title li {
		width: 75px;
		margin-left: 0px;
		text-align: center;
	}

	.D_title a,
	.D_news {
		transition: all 200ms;
	}

	.D_title a:hover,
	.D_news:hover {
		transform: scale(1.15);
	}
</style>
