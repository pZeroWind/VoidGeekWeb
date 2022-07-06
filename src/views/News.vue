<template>
	<div id="N_Max">
		<el-tabs @tab-click="selectPg" type="card" v-model="activeName" class="demo-tabs">
			<!-- 系统消息 -->
			<el-tab-pane label="系统消息" name="first">
				<div id="N_left">
					<ul>
						<li @click="selectSendUser(it)" :key="i" v-for="(it,i) in systemList" class="N_left_top"
							:class="{N_left_top_sel:it.vid==sendData.fid}">
							<div class="div_img">
								<!-- 聊天对象头像 -->
								<img class="N_left_top_img_content" :src="it.imgUrl">
							</div>
							<div class="div_name">
								<!-- 聊天对象昵称 -->
								<div class="N_left_top_name_content">{{it.userName}}</div>
								<!-- 时间 -->
								<div class="N_time">

								</div>
								<el-badge v-if="it.letterNum>0" style="transform: translateX(80px);"
									:value="it.letterNum" :max="10" class="item">
								</el-badge>
								<!-- 聊天内容 -->
								<div class="N_usercontent">

								</div>
							</div>
						</li>
					</ul>
				</div>
			</el-tab-pane>
			<!-- 关注列表 -->
			<el-tab-pane label="关注列表" name="secod">
				<div id="N_left" style="position: relative;">
					<ul>
						<li @click="selectSendUser(it)" :key="i" v-for="(it,i) in activeList.list" class="N_left_top"
							:class="{N_left_top_sel:it.vid==sendData.fid}">
							<div class="div_img">
								<!-- 聊天对象头像 -->
								<img class="N_left_top_img_content" :src="it.imgUrl">
							</div>
							
							<div class="div_name" style="">
								<!-- 聊天对象昵称 -->
								<div style="
	width: 200px;
	text-align: left;
	display: flex;
	flex-flow: row wrap;">
									<div class="N_left_top_name_content">{{it.userName}}</div>
									<!-- 时间 -->
									<div class="N_time">
										{{it.lastletter.time}}
									</div>
									<el-badge v-if="it.letterNum>0" style="transform: translateX(80px);"
										:value="it.letterNum" :max="10" class="item">
									</el-badge>
								</div>
								<!-- 聊天内容 -->
								<div class="N_usercontent">
									{{it.lastletter.content}}
								</div>
							</div>
							
						</li>
					</ul>
					<el-pagination style="position:absolute;bottom: 0px;right: 60px;" @current-change="pageChange" :current-page="index==1?activeList.page:CallMeList.page"
						v-if="pageCount!=1&&index!=0" background layout="prev, pager, next" :page-count="pageCount" />
				</div>
			</el-tab-pane>
			<!-- 私信列表 -->
			<el-tab-pane @click="selectPg('-3')" label="私信列表" name="second">
				<div id="N_left">
					<ul>
						<li @click="selectSendUser(it)" :key="i" v-for="(it,i) in CallMeList.list" class="N_left_top"
							:class="{N_left_top_sel:it.vid==sendData.fid}">
							<div class="div_img">
								<!-- 聊天对象头像 -->
								<img class="N_left_top_img_content" :src="it.imgUrl">
							</div>
							<div class="div_name">
								<div style="width: 200px;
	text-align: left;
	display: flex;
	flex-flow: row wrap;">
									<!-- 聊天对象昵称 -->
									<div class="N_left_top_name_content">{{it.userName}}</div>
									<!-- 时间 -->
									<div class="N_time">
										{{it.lastletter.time}}
									</div>
									<el-badge v-if="it.letterNum>0" style="transform: translateX(80px);"
										:value="it.letterNum" :max="10" class="item">
									</el-badge>
								</div>
								
								<!-- 聊天内容 -->
								<div class="N_usercontent">
									{{it.lastletter.content}}
								</div>
							</div>
						</li>
					</ul>
				</div>
			</el-tab-pane>
			
		</el-tabs>
		<!-- 聊天内容区 -->
		<div id="N_right">
			<div id="N_right_div_top">
				<!-- 聊天对象昵称 -->
				<div class="N_right_top_name">
					{{sendUserName}}
				</div>
			</div>
			<div id="N_right_div_center" ref="box">
				<!-- 聊天对象的聊天内容 -->
				<span @click="LoadLetter()" v-if="letterList.limt>1&&letterList.page!=letterList.limt"
					style="cursor: pointer;-ms-user-select: none">查看历史记录</span>
				<div v-for="(it,i) in letterList.list" :key="i">
					<div v-if="letterList.list[i-1]==undefined||it.time==letterList.list[i-1].time" class="char_time">
						{{it.time}}
					</div>
					<div v-if="it.vid==sendData.fid" class="N_char">
						<!-- 时间 -->
						<div class="char_content">
							<!-- 头像 -->
							<div class="char_object_head">
								<img class="char_object_img" :src="sendUserImg">
							</div>
							<!-- 聊天内容 -->
							<div class="char_object_div_content" v-html="it.content">
							</div>
						</div>
					</div>
					<div v-else class="N_char_user">
						<!-- 时间 -->

						<div class="char_content_user">
							<!-- 聊天内容 -->
							<div class="char_object_div_content_user" v-html="it.content">
							</div>
							<!-- 头像 -->
							<div class="char_object_head_user">
								<img class="char_object_img_user" :src="userData.imgUrl">
							</div>
						</div>
					</div>
				</div>
				<!-- 用户的聊天内容 -->
			</div>
			<!-- 用户聊天输入框 -->
			<div style=" background-color: white; display: flex;flex-flow: column;align-items: flex-end; border-top: 1px solid gainsboro;border-bottom: 1px solid gainsboro;"
				v-show="sendData.fid!='-1'&&sendData.fid!='-2'&&sendData.fid!='-3'" id="N_right_div_bottom">
				<textarea
					style="padding: 5px; width: 712.5px;outline: none;border: none;resize: none;height: 180px; font-size: 16px; background-color: white;"
					placeholder="请输入聊天内容" maxlength="300" v-model="sendData.content"></textarea>
				<div style="display: flex;align-items: center; font-size: 14px; padding: 10px;">
					<!-- 获取文本框的数量 -->
					<span>{{sendData.content.length}}</span>
					<span>/</span>
					<span style="margin-right: 5px;">300</span>
					<input style="background-color: snow; border: none; padding: 5px; width: 70px; border: 1px solid gainsboro; border-radius: 5px;"
						@click="uploadMsg()" type="button" value="发送" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		GetLikeUserList,
		GetMsgData,
		ToSendMsg,
		GetLetter,
		GetUser,
		GetForMe,
		GetSystem,
		UpdateState,
		GetPlSeeList,
		GetReMeList,
		GetLetterNum,
		GetLastLetter
	} from '../api/NewsApi.js'
	import {
		ElMessage
	} from "element-plus"
	import {
		GetDate,
		CeilDate
	} from '../api/publicUse.js'
	import {
		ref
	} from 'vue'
	export default {
		data() {
			return {
				activeList: {
					list: [],
					limt: 1,
					page: 1
				},
				sendData: {
					fid: '-1',
					content: ""
				},
				sendUserImg: require('../assets/void_logo.png'),
				sendUserName: "系统消息",
				userData: {
					imgUrl: "",
					userName: ""
				},
				letterList: {
					list: [],
					limt: 1,
					page: 0
				},
				activeName: ref('first'),
				CallMeList: {
					list: [],
					limt: 1,
					page: 1
				},
				systemList: [{
						userName: '系统消息',
						imgUrl: require('../assets/void_logo.png'),
						vid: '-1'
					},
					{
						userName: '全部回复',
						imgUrl: require('../assets/void_logo.png'),
						vid: '-2'
					},
					{
						userName: '全部评论',
						imgUrl: require('../assets/void_logo.png'),
						vid: '-3'
					}
				],
				pageCount: 0,
				index: 0
			}
		},
		created() {
			let data = location.search.replace("?sel=", "")
			if (data != "") {
				data = JSON.parse(decodeURI(atob(data)))
				this.activeName = "secod"
				this.activeList.list
				this.selectSendUser(data)
			}
			if (localStorage.getItem("voidUser") != "" && localStorage.getItem("voidUser") != undefined) {
				//获取关注列表
				this.GetLike()
				GetMsgData({
					t: this,
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					out: res => {
						this.systemList[0].letterNum = res.data.data.newPost
						this.systemList[1].letterNum = res.data.data.newReSay
						this.systemList[2].letterNum = res.data.data.newSay
					}
				})
				this.Linksoket()
				GetUser({
					t: this,
					vid: JSON.parse(localStorage.getItem("voidUser")).userVid,
					out: res => {
						this.userData.imgUrl = "http://120.76.177.46:5000/api/PublicApi/getImg?imgUrl=" + res
							.imgUrl
						this.userData.userName = res.userName
					}
				})
				this.GetForMeDef()
				this.getSysList("-1")
			}
		},
		mounted() {
			this.SetFirst()
		},
		methods: {
			GetLike() {
				GetLikeUserList({
					t: this,
					data: {
						page: this.activeList.page,
						size: 5
					},
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					out: res => {
						this.activeList.list = res.data.data
						this.activeList.limt = res.data.limt
						this.activeList.list.forEach(i => {
							i.imgUrl = "http://120.76.177.46:5000/api/PublicApi/getImg?imgUrl=" + i
								.imgUrl
							i.lastletter = {
								time: "",
								content: ""
							}
							GetLastLetter({
								t: this,
								vid: i.vid,
								token: JSON.parse(localStorage.getItem("voidUser")).token,
								out: res => {
									if (res.data.data == null) {
										return
									}
									i.lastletter.content = res.data.data.content
									i.lastletter.time = GetDate(res.data.data.time)
								}
							})
							GetLetterNum({
								t: this,
								vid: i.vid,
								token: JSON.parse(localStorage.getItem("voidUser")).token,
								out: res => {
									i.letterNum = res.data.data
								}
							})
						})
					}
				})
			},
			pageChange(e) {
				if (this.index == 1) {
					this.activeList.page = e
					this.activeList.list = []
					this.GetLike()
				} else if (this.index == 2) {
					this.CallMeList.page = e
					this.CallMeList.list = []
					this.GetForMeDef()
				}
			},
			selectPg(num) {
				if (num.index == 1) {
					console.log(num)
					this.pageCount = this.activeList.limt
				} else if (num.index == 2) {
					this.pageCount = this.CallMeList.limt
				}
				this.index = num.index
			},
			Linksoket() {
				if (localStorage.getItem("voidUser") == "" && localStorage.getItem("voidUser") == undefined) {
					return
				}
				var soket = new WebSocket('ws://120.76.177.46:5000/api/LinkApi/connect?vid=' + JSON.parse(localStorage
					.getItem("voidUser")).userVid)
				soket.onopen = () => {
					soket.send(1)
				}
				soket.onmessage = (res) => {
					if (res.data == "1") {
						soket.send(1)
					} else {
						let data = JSON.parse(res.data)
						data.time = GetDate(data.time)
						this.letterList.list.push(data)
						this.UpdeteStateDef(data.vid)
						this.$forceUpdate()
						this.SetFirst()
					}
				}
			},
			uploadMsg() {
				if (this.sendData.content == "") {
					ElMessage({
						message: '请输入发送内容',
						type: 'error'
					})
					return
				}
				// if(this.sendData.fid==JSON.parse(localStorage.getItem("voidUser")).userVid){
				// 	ElMessage({
				// 		message:'不能向自己发送信息',
				// 		type:'warning'
				// 	})
				// 	this.sendData.content=""
				// 	return
				// }
				console.log(this.sendData.vid)
				console.log(JSON.parse(localStorage.getItem("voidUser")).userVid)
				ToSendMsg({
					t: this,
					data: this.sendData,
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					out: res => {
						console.log(res)
						if (res.data.data.code == 200) {
							ElMessage({
								message: res.data.data.msg,
								type: "error"
							})
						}
						ElMessage({
							message: '发送成功',
							type: 'success'
						})
						let data = JSON.parse(JSON.stringify(this.sendData))
						data.time = GetDate(new Date().getTime())
						var send = JSON.parse(JSON.stringify(this.sendData))
						this.letterList.list.push(send)
						this.sendData.content = ""
						this.SetFirst()
					}
				})
			},
			selectSendUser(obj) {
				this.sendData.fid = obj.vid
				this.sendUserName = obj.userName
				this.sendUserImg = obj.imgUrl
				this.letterList.list = []
				this.letterList.limt = 1
				this.letterList.page = 0
				obj.letterNum = 0
				this.GetletterList(obj.vid)
				this.UpdeteStateDef(obj.vid)
			},
			GetletterList(tovid) {
				if (tovid == '-1' || tovid == '-2' || tovid == '-3') {
					this.getSysList(tovid)
					return
				}
				if (this.letterList.page >= this.letterList.limt) {
					return
				}
				this.letterList.page++
				GetLetter({
					t: this,
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					data: {
						page: this.letterList.page,
						vid: tovid,
						size: 10
					},
					out: res => {
						res.data.data.forEach(i => {
							i.time = CeilDate(i.time)
						})
						this.letterList.list.unshift(...res.data.data)
						this.letterList.limt = res.data.limt
						if (this.letterList.page == 1) {
							this.SetFirst()
						}
					}
				})
			},
			SetFirst() {
				setTimeout(() => {
					this.$refs.box.scrollTop = this.$refs.box.scrollHeight
				}, 100)
			},
			LoadLetter() {
				this.GetletterList(this.sendData.fid)
			},
			GetForMeDef() {
				GetForMe({
					t: this,
					data: {
						page: this.CallMeList.page,
						size: 10
					},
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					out: res => {
						this.CallMeList.limt = res.data.limt
						this.CallMeList.list.unshift(...res.data.data)
						this.CallMeList.list.forEach(i => {
							i.imgUrl = "http://120.76.177.46:5000/api/PublicApi/getImg?imgUrl=" + i
								.imgUrl
							i.lastletter = {
								time: "",
								content: ""
							}
							GetLastLetter({
								t: this,
								vid: i.vid,
								token: JSON.parse(localStorage.getItem("voidUser")).token,
								out: res => {
									if (res.data.data == null) {
										return
									}
									i.lastletter = res.data.data
									i.lastletter.time = GetDate(i.lastletter.time)
								}
							})
							GetLetterNum({
								t: this,
								vid: i.vid,
								token: JSON.parse(localStorage.getItem("voidUser")).token,
								out: res => {
									i.letterNum = res.data.data
								}
							})
						})
					}
				})
			},
			getSysList(uvid) {
				if (this.letterList.page >= this.letterList.limt) {
					return
				}
				this.letterList.page++
				if (uvid == "-1") {
					GetSystem({
						t: this,
						data: {
							page: 1,
							size: 5
						},
						token: JSON.parse(localStorage.getItem("voidUser")).token,
						out: res => {
							res.data.data.forEach(i => {
								i.vid = "-1"
								i.time = GetDate(i.time)
							})
							this.letterList.limt = res.data.limt
							this.sendUserImg = require('../assets/void_logo.png')
							this.letterList.list.unshift(...res.data.data)
							if (this.letterList.page == 1) {
								this.SetFirst()
							}
						}
					})
				} else if (uvid == "-3") {
					this.getPlSeeListDef()
				} else if (uvid == "-2") {
					this.GetReMeDef()
				}
			},
			UpdeteStateDef(uvid) {
				UpdateState({
					t: this,
					vid: uvid,
					token: JSON.parse(localStorage.getItem("voidUser")).token
				})
			},
			// 全部评论
			getPlSeeListDef() {
				GetPlSeeList({
					t: this,
					data: {
						page: this.letterList.page,
						size: 5
					},
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					out: res => {
						console.log(res)
						res.data.data.forEach(i => {
							i.time = GetDate(i.time)
							i.vid = "-3"
							i.content = `<p style="font-size:14px;"><strong>`+i.userName + "</strong>：" + i.content + `</p>
							<div style="transform:translateY(10px);text-align:right;font-weight:bold;font-size:12px;text-decoration: underline;">
								<div style="margin-right:3px;text-decoration: none;">`+i.time+`</div>
								<a href='/Pageview?pid=` + i.pid + `' target="_blank"'>`+i.pageData.title+`</a>
							</div>
							`
						})
						this.letterList.limt = res.data.limt
						this.sendUserImg = require('../assets/void_logo.png')
						this.letterList.list.unshift(...res.data.data)
						if (this.letterList.page == 1) {
							this.SetFirst()
						}
					}
				})
			},
			//全部回复
			GetReMeDef() {
				GetReMeList({
					t: this,
					data: {
						page: 1,
						size: 5
					},
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					out: res => {
						console.log(res)
						res.data.data.forEach(i => {
							i.time = GetDate(i.time)
							i.vid = "-2"
							i.content = `<div style="margin-right:3px;text-decoration: none;margin-bottom:5px;font-size:14px;">对<strong>"`+i.sayData.content+`"</strong>的回复</div>
							<p style="font-size:14px;"><strong>`+i.userName + "</strong>：" + i.content + `</p>
							<div style="transform:translateY(10px);text-align:right;font-weight:bold;font-size:12px;text-decoration: underline;">
								<div style="margin-right:3px;text-decoration: none;">`+i.time+`</div>
								<a href='/Pageview?pid=` + i.pageData.pid + `' target="_blank"'>`+i.pageData.title+`</a>
							</div>
							`
						})
						this.letterList.limt = res.data.limt
						this.sendUserImg = require('../assets/void_logo.png')
						this.letterList.list.unshift(...res.data.data)
						if (this.letterList.page == 1) {
							this.SetFirst()
						}
					}
				})
			}
		}
	}
</script>
<style>
	@import url("../VCss/All.css");
	@import url("../VCss/News.css");
</style>
