<template>
	<el-dialog @closed="dialogClose" v-model="dialog" title="举报" width="30%" draggable>
		<span style="position: relative;left: -100px;">请输入您的举报原因：</span>
		<textarea v-model="report.content" style="width: 80%;height: 100px;resize: none;"></textarea>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogClose">取消</el-button>
				<el-button type="primary" @click="sendRetrunDef">提交</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog @closed="closeDialog()" v-model="setValue.dialogvisable" title="选择文件夹" width="40%" draggable>
		<ul style="height: 200px; overflow: scroll; overflow-x: hidden;">
			<li style="padding: 10px; border: 1px solid gainsboro; margin-bottom: 5px; cursor: pointer;"
				@click="selectSfID(i.fsId)" :key="i" :class="{selectColor:savePageData.sfId==i.fsId}"
				v-for="i in folderList">
				<span>{{i.folderName}}</span>
			</li>
			<li
				style="border: 1px solid gainsboro; margin-bottom: 5px; height: 40px;display:flex ; align-items: center;justify-content: center;">
				<img src="../assets/Svg/folder-add-line.svg" style="width: 18px; height: 18px; cursor: pointer;"
					v-if="!add" @click="AddForders()">
				<div v-else style="display: flex; height: 100%; width: 100%;">
					<input type="text" v-model="saveFolderData.folderName"
						style=" border: none; width: 80%; padding: 2px;" />
					<button v-if="saveFolderData.folderName==undefined||saveFolderData.folderName==''" type="button"
						style="border: none; width: 20%; height: 100%; background-color: aliceblue;"
						@click="AddForders()">取消</button>
					<button v-else type="button"
						style="border: none; width: 20%; height: 100%; background-color: aliceblue;"
						@click="AddFolder()">确定</button>
				</div>
				<!-- <input type="button" @click="AddFolder()" value="新建收藏夹" /> -->
			</li>
		</ul>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisble()">取消</el-button>
				<el-button type="primary" @click="uploadSavePage()">确定</el-button>
			</span>
		</template>
	</el-dialog>
	<div class="Pg_all">
		<!-- 个人信息 -->
		<div id="Pg_Mleft" style="position: sticky;top: 10px;height: max-content;">
			<!-- 作者个人信息 -->
			<div class="Pg_left">
				<div class="Pg_A_top">
					<router-link :to="'/Heself?vid='+activeData.vid"><img :src="activeData.imgUrl"
							class="Pg_l_avatar" /></router-link>
					<div class="Pg_workMessage">
						<div class="Pg_workMessage_one">
							<div class="Pg_workMessage_one1">
								<h5 class="Pg_l_userName">{{activeData.userName}}</h5>
							</div>
						</div>
						<div class="Pg_A_jin">
							LV:{{activeData.Lv}}
							<div class="Pg_A_c_ciJ">
								<div class="Pg_A_c_mainJ"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="Pg_A_center">
					<div class="Pg_A_c_wo">
						<div class="Pg_A_c_wo_text">粉丝</div>
						<div>{{activeData.fanNum}}</div>
					</div>
					<div class="Pg_A_c_wo">
						<div class="Pg_A_c_wo_text">获赞</div>
						<div>{{pageData.likeNum}}</div>
					</div>
					<div class="Pg_A_c_wo">
						<div class="Pg_A_c_wo_text">评论</div>
						<div>{{pageData.sayNum}}</div>
					</div>
					<div class="Pg_A_c_wo">
						<div class="Pg_A_c_wo_text">收藏</div>
						<div>{{pageData.saveNum}}</div>
					</div>
				</div>
				<div class="Pg_workMessage_one2">
					<div>
						<div class="Pg_A_D_private" @click="toNews">
							私信
						</div>
						<!-- <input class="Pg_A_D_private" type="button" value="私信"> -->
					</div>
					<div>
						<div @click="LikeUserDef()" class="Pg_A_D_focus">
							{{clickMore.checkfollow==false?"关注":"取消关注"}}
						</div>
						<!-- <input class="Pg_A_D_focus" type="button" value="关注"> -->
					</div>
				</div>
			</div>
			<!-- 点赞等功能 -->
			<div class="Pg_funcation">
				<img v-if="!clickMore.checkforder" @click="dialogVisble()" src="../assets/Svg/star-line.svg">
				<img v-else @click="dialogVisble()" src="../assets/Svg/star-fill.svg">
				<img v-if="!clickMore.checkLike" @click="AddLikeDef()" src="../assets/Svg/thumb-up-line.svg">
				<img v-else @click="AddLikeDef()" src="../assets/Svg/thumb-up-fill.svg">
				<img src="../assets/Svg/money-dollar-circle-line.svg">
			</div>
			<!-- 文章评论 -->
			<div>
				<div class="Pg_r_plinp">
					<textarea @dblclick="ReNo()" id="inp" ref="input" :placeholder="plData.placeholder"
						class="Pg_r_pltxt" v-model="plData.content"></textarea>
					<input @click="UploadPage()" type="button" :value="plData.buttonTxt" class="Pg_r_plbtn" />
				</div>
			</div>
			<div class="Pg_right">
				<div class="Pg_right_one">评论</div>
				<el-empty description="此文章暂无评论" v-if="sayList.length==0"></el-empty>
				<div style="padding-bottom: 20px;" v-if="sayList.length>0">
					<div v-for="(it,i) in sayList" :key="i" style="border-bottom: 1px solid #eee;margin: 15px;">
						<div class="Pg_p_main">
							<!-- 头像 -->
							<img :src="it.imgUrl" style=" margin: 5px; width: 35px;height: 35px;border-radius: 50%;" />
							<div class="Pg_p_main_data">
								<!-- 用户名 -->
								<div style="font-size: 12px; font-weight: bold; text-align: left;">{{it.username}}</div>
								<!-- 时间 -->
								<div style="font-size: 12px; text-align: left;">{{it.time}}</div>
							</div>
							<div class="Pg_p_content">
								{{it.content}}
							</div>
							<div class="Pg_p_return" style="margin-bottom: 5px;" @click="GetPlData(it)">回复</div>
							<div v-for="(reit,rei) in it.reSayList" :key="rei"
								style="border-top: 1px solid #eee;margin-left: 20px;">
								<div class="Pg_p_main">
									<!-- 头像 -->
									<img :src="reit.imgUrl"
										style=" margin: 5px; width: 30px;height: 30px;border-radius: 50%;" />
									<div class="Pg_p_main_data" style="top: 10px;">
										<!-- 用户名 -->
										<div v-if="reit.toid==it.vid"
											style="font-size: 12px; font-weight: bold; text-align: left;">
											{{reit.username}}
										</div>
										<div v-else style="font-size: 12px; font-weight: bold; text-align: left;">
											{{reit.username}}<span
												style="color: #f00;margin-left: 10px;">@</span>{{reit.touserName}}
										</div>
										<!-- 时间 -->
										<div style="font-size: 12px; text-align: left;">{{reit.time}}</div>
									</div>
									<div class="Pg_p_content">
										{{reit.content}}
									</div>
									<div class="Pg_p_return" @click="GetPlDataSon(it,reit)">回复</div>
								</div>
							</div>
							<div v-if="it.sonPage<it.sonLimt" class="Pg_p_more" @click="SonUp(it,i)">查看更多</div>
						</div>
					</div>
					<el-pagination small :page-count="limt" layout="prev, pager, next" background
						@current-change="selPage" />
				</div>
			</div>
		</div>
		<div>
			<!-- 文章内容区 -->
			<div id="Pg_center">
				<!-- 文章标题 -->
				<div id="Pg_Top" style=" background-color: white;">
					<div class="Pg_C_title">
						{{pageData.title}}
					</div>

					<div class="Pg_C_data" style="display: flex; align-items: center; flex-flow: row nowrap;">
						<!-- 文章发布时间 -->
						<div class="Pg_C_time"
							style="margin-right: 20px; display: flex; align-items: center; color: darkgray;">
							<img src="../assets/Svg/time-line.svg" class="Svg">
							{{pageData.time}}
						</div>
						<!-- 文章点赞数 -->
						<div class="Pg_C_like" style="margin-right: 20px;  display: flex; align-items: center;">
							<img src="../assets/Svg/thumb-up-line.svg" class="Svg">
							<span style="font-size: 14px;">{{pageData.likeNum}}</span>
						</div>
						<!-- 文章收藏数 -->
						<div class="Pg_C_collect" style="margin-right: 20px; display: flex; align-items: center;">
							<img src="../assets/Svg/star-line.svg" class="Svg">
							<span style="font-size: 14px;">{{pageData.saveNum}}</span>
						</div>
						<div class="Pg_C_collect" style="margin-right: 20px;  display: flex; align-items: center;">
							<img src="../assets/Svg/eye-line.svg" class="Svg">
							<span style="font-size: 14px;">{{pageData.readNum}}</span>
						</div>
						<!-- 文章专区 -->
						<span style="font-size: 14px; color: darkgray;">文章专区：</span>

						<div class="A_tag">
							{{pageData.areaName}}
						</div>
						<img @click="openreportDialog" style="cursor: pointer;" src="../assets/Svg/alert-line.svg" />
					</div>
					<!-- 文章标签 -->
					<div
						style="height: 50px; line-height: 50px; cursor: pointer; font-size: 14px; display: flex; margin-left: 25px; margin-right: 25px; color: darkgray; background-color: ghostwhite;">

						<!-- 文章标签 -->
						<span style="margin-left: 10px;">文章标签：</span>
						<div @click="ClickTagDef(i)" class="A_tag" v-for="i in pageData.tag" :key="i">
							{{i}}
						</div>

					</div>

					<!-- 文章内容 -->
					<div class="Pg_C_list" style="height: auto;min-height: 400px;"
						v-html="pageData.content">
					</div>

				</div>

			</div>
			<div id="Pg_Bottom" style="background-color: #fff; width: 850px; height: 600px; margin-left: 10px;">
				<ul style="width: 100%;">
					<li style="margin: 0px 10px; width: 830px;height: 100px; background-color: white; border-bottom: 1px solid gainsboro;"
						v-for="it in Recommended" :key="it">
						<div style="text-align: left; margin-top: 5px;">
							<a class="a_underlilne" :href="'/Pageview?pid='+it.pid"><span
									style="font-weight: bold; ">{{it.title}}</span></a>
						</div>
						<div style="margin-left: 10px; height: 70%; position: relative;">
							<div
								style="position: absolute;right: 230px; font-size: 14px; bottom: 6px; color: darkgray;">
								{{it.time}}
							</div>
							<div class="A_cont_show" v-html="it.content">

							</div>
							<div class="A_content_content_operation">
								<div>
									<img src="../assets/Svg/eye-line.svg" class="Svg">
								</div>
								<div style="margin-right: 40px;">
									{{it.readNum}}
								</div>
							</div>
							<div class="A_content_content_operation1">
								<div>
									<img src="../assets/Svg/thumb-up-line.svg" class="Svg">
								</div>
								<div>
									{{it.likeNum}}
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>

</template>
<script>
	// import {
	// 	getIP
	// } from "../api/apiConf.js"
	import {
		GetDate
	} from "../api/publicUse.js"
	import {
		ElMessage
	} from "element-plus"
	import {
		getPage,
		getSay,
		getReSay,
		getUser,
		UploadPl,
		SavePage,
		AddLike,
		RemoveLike,
		CheckLike,
		LikeUser,
		CheckLikeUser,
		Recommended_Articles,
		SendReport,
		ChenckSave
	} from "../api/pageApi.js"
	import {
		GetSaveList,
		AddSaveFolders
	} from '../api/MyselfApi.js'

	var pid
	export default {
		data() {
			return {
				pid: 0,
				pageData: {},
				user: {},
				page: 1,
				limt: 4,
				sayList: [],
				plData: {
					content: "",
					placeholder: "请输入评论内容",
					buttonTxt: "评论",
					type: 0
				},
				activeData: {
					activeimgUrl: 'http://120.76.177.46:5000/api/PublicApi/getImg?imgUrl=imgs/819d4ea9ce1f40f5a9bc0c9755c3584d.png'
				},
				resPlData: {},
				setValue: {
					dialogvisable: false,
					addFolderAble: false
				},
				folderList: [],
				saveFolderData: {
					vid: 0,
					folderName: ""
				},
				savePageData: {
					sfId: 1,
					pid: 0
				},
				clickMore: {
					checkLike: false,
					checkfollow: false,
					checkforder: false
				},
				Recommended: [],
				add: false,
				dialog:false,
				report:{
					content:"",
					pid:0
				},
				resayUserData:{}
			}
		},
		methods: {
			ClickTagDef(tag) {
				window.open('./search?src=&tag='+btoa(encodeURI('["' + tag + '"]')))
			},
			dialogClose(){
				this.report={}
				this.dialog=false
			},
			sendRetrunDef(){
				this.report.pid=this.pageData.pid
				SendReport({
					t:this,
					data:JSON.stringify(this.report),
					token:JSON.parse(localStorage.getItem("voidUser")).token,
					out:res=>{
						console.log(res)
						ElMessage({
							message:'感谢您的举报，我们会及时处理',
							type:'success'
						})
						this.dialogClose()
					}
				})
			},
			openreportDialog(){
				this.dialog=true
			},
			selPage(i) {
				this.page = i
				this.getSayList()
			},
			getRe(index) {
				if (this.sayList[index].sonPage > this.sayList[index].sonLimt) {
					return
				}
				this.sayList[index].sonPage++
				getReSay({
					t: this,
					data: {
						sayid: this.sayList[index].sayid,
						page: this.sayList[index].sonPage,
						size: 3
					},
					out: data2 => {
						this.sayList[index].reSayList.push(...data2)
					},
					setLimt: limt => {
						this.sayList[index].sonLimt = limt
					}
				})
			},
			UploadPage() {
				let user = localStorage.getItem("voidUser")
				if (user == undefined) {
					ElMessage({
						message: '暂未登录，无法进行评论',
						type: 'error'
					})
					return
				}
				if (!this.ClickCon()) {
					return
				}
				if (this.plData.type == 0) {
					this.resPlData = {
						vid: JSON.parse(user).userVid,
						pid: pid,
						content: this.plData.content,
						time: new Date().getTime()
					}
				} else {
					this.resPlData.content = this.plData.content
				}
				UploadPl({
					t: this,
					token: JSON.parse(user).token,
					url: this.plData.type == 0 ? '/PageApi/AddSay' : '/PageApi/AddReSay',
					data: this.resPlData
				})
				this.pageData.sayNum++
			},
			SonUp(it) {
				it.sonLoad()
			},
			GetPlData(it) {
				this.resayUserData=it
				let user = localStorage.getItem("voidUser")
				if (user == undefined) {
					ElMessage({
						message: '暂未登录，无法进行评论',
						type: 'error'
					})
					return
				}
				this.plData.type = 1
				this.plData.placeholder = "回复：" + it.username + "（双击取消回复）"
				this.resPlData = {
					vid: JSON.parse(user).userVid,
					toid: it.vid,
					sid: it.sid == undefined ? it.sayid : it.sid,
					content: this.plData.content,
					reContent:it.content,
					time: new Date().getTime()
				}
				this.$refs.input.focus()
				location.href += "#inp"
			},
			GetPlDataSon(it,i) {
				this.resayUserData=it
				let user = localStorage.getItem("voidUser")
				if (user == undefined) {
					ElMessage({
						message: '暂未登录，无法进行评论',
						type: 'error'
					})
					return
				}
				this.plData.type = 1
				this.plData.placeholder = "回复：" + it.username + "（双击取消回复）"
				this.resPlData = {
					vid: JSON.parse(user).userVid,
					toid: it.vid,
					sid: it.sid == undefined ? it.sayid : it.sid,
					content: this.plData.content,
					reContent:i.content,
					time: new Date().getTime()
				}
				this.$refs.input.focus()
				location.href += "#inp"
			},
			ReNo() {
				this.plData.type = 0
				this.plData.placeholder = "请输入评论内容"
			},
			ClickCon() {
				if (this.plData.content == "") {
					ElMessage({
						message: '评论内容不能为空',
						type: 'error'
					})
					return false
				}
				return true
			},
			cancelPl() {
				this.plData.type = 0
				this.plData.placeholder = "请输入评论内容"
			},
			getSayList() {
				if (this.page > this.limt) {
					return
				}
				getSay({
					t: this,
					data: {
						pid: pid,
						page: this.page,
						size: 2
					},
					out: data => {
						this.sayList = data
						data.forEach((i, index) => {
							i.reSayList = []
							i.sonPage = 0
							i.sonLimt = 1
							i.sonLoad = () => {
								this.getRe(index)
							}
							i.sonLoad()
						})
						console.log(this.sayList)
					},
					setLimt: limt => {
						this.limt = limt
					}
				})
			},
			AddFolder() {
				if (localStorage.getItem("voidUser") == "" || localStorage.getItem("voidUser") == undefined) {
					return
				}
				AddSaveFolders({
					t: this,
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					data: this.saveFolderData,
					out:res=>{
						ElMessage({
							message:'添加成功',
							type:'success'
						})
						this.folderList.push({
							folderName:this.saveFolderData.folderName,
							fsId:res.data.data
						})
						this.saveFolderData={}
					}
				})
				this.clickMore.checkforder = true
				this.add = !this.add
			},
			dialogVisble() {
				this.setValue.dialogvisable = !this.setValue.dialogvisable
				this.saveFolderData = {}
				this.add = false
			},
			closeDialog() {
				this.saveFolderData = {}
			},
			selectSfID(fsnum) {
				this.savePageData.sfId = fsnum
			},
			uploadSavePage() {
				if (localStorage.getItem("voidUser") == "" || localStorage.getItem("voidUser") == undefined) {
					return
				}
				if (this.savePageData.sfId == "" || this.savePageData.sfId == null || this.savePageData.sfId ==
					undefined) {
					ElMessage({
						message: '请选择收藏夹',
						type: 'error'
					})
					return
				}
				this.savePageData.pid = location.search.replace("?pid=", "")
				SavePage({
					t: this,
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					data: this.savePageData,
					out: () => {
						this.pageData.saveNum++
						this.setValue.dialogvisable = !this.setValue.dialogvisable
					}
				})
			},
			AddLikeDef() {
				if (localStorage.getItem("voidUser") == "" || localStorage.getItem("voidUser") == undefined) {
					return
				}
				if (!this.clickMore.checkLike) {
					AddLike({
						t: this,
						pid: location.search.replace("?pid=", ""),
						token: JSON.parse(localStorage.getItem("voidUser")).token,
						out: () => {
							this.clickMore.checkLike = true
							this.pageData.likeNum++
						}
					})
				} else {
					RemoveLike({
						t: this,
						pid: location.search.replace("?pid=", ""),
						token: JSON.parse(localStorage.getItem("voidUser")).token,
						out: () => {
							this.clickMore.checkLike = false
							this.pageData.likeNum--
						}
					})
				}
			},
			LikeUserDef() {
				if (localStorage.getItem("voidUser") == "" || localStorage.getItem("voidUser") == undefined) {
					return
				}
				LikeUser({
					t: this,
					vid: this.pageData.vid,
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					out: () => {
						if(this.clickMore.checkfollow){
							this.activeData.fanNum--
						}else{
							this.activeData.fanNum++
						}
						this.clickMore.checkfollow = !this.clickMore.checkfollow
					}
				})
			},
			Recommended_ArticlesDef() {
				console.log(JSON.stringify(this.pageData.tag))
				Recommended_Articles({
					t: this,
					data: {
						page: 1,
						size: 5,
						invId: this.pageData.pid
					},
					tag: this.pageData.tag.join("%"),
					out: res => {
						this.Recommended = res
						this.Recommended.forEach(i => {
							i.time = GetDate(i.time)
							i.content = i.content.replace(/<(?:.|\s)*?>/g, "")
						})
					}
				})
			},
			toNews() {
				if (!this.clickMore.checkfollow) {
					ElMessage({
						message: '请先关注作者',
						type: 'warning'
					})
					return
				}
				let data = JSON.stringify({
					vid: this.pageData.vid,
					imgUrl: this.pageData.imgUrl,
					userName: this.pageData.userName
				})
				location.href = "./News?sel=" + btoa(encodeURI(data))
			},
			AddForders() {
				this.add = !this.add
			}
		},
		created() {
			pid = location.search.replace("?pid=", "")
			this.pid = pid
			getPage({
				t: this,
				pid: pid,
				out: data => {
					this.pageData = data.data
					this.Recommended_ArticlesDef()
					if (localStorage.getItem("voidUser") != "" && localStorage.getItem("voidUser") !=
						undefined) {
						CheckLikeUser({
							t: this,
							vid: this.pageData.vid,
							token: JSON.parse(localStorage.getItem("voidUser")).token,
							out: res => {
								this.clickMore.checkfollow = res
							}
						})
					}
					getUser({
						t: this,
						vid: this.pageData.vid,
						object: document.getElementsByClassName("Pg_A_c_mainJ")[0]
					})
				}
			})
			this.getSayList()
			if (localStorage.getItem("voidUser") != "" && localStorage.getItem("voidUser") != undefined) {
				GetSaveList({
					t: this,
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					out: res => {
						this.folderList = res.data.data
					}
				})
				CheckLike({
					t: this,
					pid: location.search.replace("?pid=", ""),
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					out: res => {
						this.clickMore.checkLike = res
					}
				})
				ChenckSave({
					t:this,
					pid:location.search.replace("?pid=", ""),
					token:JSON.parse(localStorage.getItem("voidUser")).token,
					out:res=>{
						this.clickMore.checkforder=res.data.data
					}
				})
			}
		},
		mounted() {

		}
	}
</script>

<style>
	@import url("../VCss/Pageview.css");

	/* @import url("../VCss/EditorCss.css"); */
	pre {
		overflow-x: auto;
		background-color: whitesmoke;
		padding: 10px;
		margin: 10px 0;
		border-radius: 5px;
	}
</style>
