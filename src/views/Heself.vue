<template>
	<div style="margin: 0px auto; width: 1200px;">
		<div id="My_r_up" style="background-color: white; margin-top: 20px;">
			<div id="My_r_u_left" style="position: relative;">
				<div style="margin-left: 50px;">
					<!-- 头像 -->
					<img :src="HelistimgUrls" style=" width: 120px; height: 120px; border-radius: 50%;" />
				</div>
				<div style="text-align: left; padding-left: 20px;">
					<!-- 用户名 -->
					<div class="My_username" style="font-size: 18px;">
						{{HelistData.userName}}
						<span style="margin-left: 10px;font-weight: bold;">LV{{userExc.userLV}}</span>
					</div>
					<div>
						<el-progress :percentage="userExc.userPre" :color="customColors" />
					</div>
					<div style="margin-top:10px ; width: 100%;">
						<span>粉丝:</span>
						<span
							style="font-size: 18px; margin-left: 10px; font-weight: bold; padding-right: 10px; border-right: 1px solid gainsboro;">{{HelistData.fanNum}}</span>
						<span style="margin-left: 10px;">文章:</span>
						<span
							style="font-size: 18px; margin-left: 10px; font-weight: bold; padding-right: 10px; border-right: 1px solid gainsboro;">{{GetListArticleData.total}}</span>
						<span style="margin-left: 10px;">关注:</span>
						<span
							style="font-size: 18px; margin-left: 10px; font-weight: bold; padding-right: 10px;">{{GetLikeUsersData.total}}</span>
					</div>
					<div style="margin-top:10px ;">
						<span>个人简历:</span>
						<span style="margin-left: 5px;">{{HelistData.resume}}</span>
					</div>
				</div>
				<div @click="LikeUserDef(HelistData.vid)" class="LikeUser" style="-webkit-user-select: none;
					line-height: 30px;
					width: 100px;
					height: 30px;
					font-size: 12px;
					border-radius: 20px;
					background-color: whitesmoke;
					border: 1.5px solid lightgray;
					cursor: pointer;
					color: #555;
					transition: all 0.5s;
					position: absolute;
					right: 40px;">
					{{clickMore.checkfollow==false?"关注":"取消关注"}}
				</div>
			</div>
		</div>
		<div id="My_all">
			<div id="My_left">
				<ul class="My_left_ul">
					<li @click="Sec(1)" :class="{My_select:select==1}">收藏</li>
					<li @click="Sec(2)" :class="{My_select:select==2}">文章</li>
					<li @click="Sec(3)" :class="{My_select:select==3}">关注</li>
				</ul>
			</div>
			<div id="My_right">
				<div id="My_r_middle">
					<!-- 我的收藏 -->
					<div class="My_Collection" v-if="select==1">
						<ul class="My_Collection_ul1"
							style=" width: 20%;height: auto;  border-right:1px solid gainsboro ;overflow: scroll;overflow-x: hidden;">
							<li :class="{select:getFid==it.fsId}"
								style="position: relative; width: 100%; height: 70px; border-bottom: 1px solid gainsboro; line-height: 70px;text-align: left;"
								v-for="it in GetFolderData" :key="it" @click="GetsaveFileDef(it.fsId)">
								<a :title="it.folderName"
									style="margin-left: 30px; font-size: 13px;">{{it.folderName}}</a>
								<!-- <span style="margin-left: 30px; font-size: 13px;">{{it.folderName}}</span> -->
							</li>
						</ul>
						<div style="margin-left:1%; width: 78%;">
							<ul style="height: 655px;">
								<el-empty description="当前收藏夹为空" v-if="saveFileList.list.length==0" />
								<li class="My_Collection_li" v-for="(it,i) in saveFileList.list" :key="i">
									<div class="A_title">
										<router-link target="_blank" :to="'/Pageview?pid='+it.pid">
											{{it.title}}
										</router-link>
									</div>
									<div class="A_content" style="text-align: left; margin: 10px;">
										<div v-if="it.post!=null" style="width: auto; height: auto;">
											<img class="A_content_img" :src="it.post">
										</div>
										<div class="A_content_content">
											<div class="A_cont_show">
												{{it.content}}
											</div>
											<div class="Svg_all_F">
												<div style="display: flex;align-items: center;">
													<img class="Svg" src="../assets/Svg/eye-line.svg">
													<span class="Svg_num">{{it.readNum}}</span>
												</div>
											</div>
											<div class="Svg_all_F1">
												<div style="display: flex;align-items: center;">
													<img class="Svg" src="../assets/Svg/thumb-up-line.svg">
													<span class="Svg_num">{{it.likeNum}}</span>
												</div>
											</div>
											<div class="Svg_all_F2">
												<div style="display: flex;align-items: center;">
													<img class="Svg" src="../assets/Svg/time-line.svg">
													<span class="Svg_num">{{it.time}}</span>
												</div>
											</div>
										</div>
									</div>
								</li>
							</ul>
							<div v-if="saveFileList.limt>1">
								<el-pagination @current-change="SavefilePageChange" :current-page="saveFileList.page"
									background layout="prev, pager, next" :page-count="saveFileList.limt" />
							</div>
						</div>
					</div>
					<!-- 文章 -->
					<div class="My_security" v-if="select==2">
						<ul style="width: 100%;height: 655px;">
							<el-empty description="作者暂未发布文章" v-if="GetListArticleData.list.length==0" />
							<li class="My_Collection_li" v-for="item in GetListArticleData.list" :key="item">
								<!-- 标题 -->
								<div class="A_title">
									{{item.title}}
								</div>
								<div class="A_content" style="text-align: left; margin: 10px;">
									<div style="width: auto; height: auto;">
										<!-- 封面 -->
										<img class="A_content_img" :src="item.post">
									</div>
									<div class="A_content_content">
										<div class="A_cont_show">
											{{item.content}}
										</div>
										<div class="Svg_all">
											<div style="display: flex;align-items: center;">
												<img class="Svg" src="../assets/Svg/eye-line.svg">
												<span class="Svg_num">{{item.readNum}}</span>
											</div>
										</div>
										<div class="Svg_all1">
											<div style="display: flex;align-items: center;">
												<img class="Svg" src="../assets/Svg/thumb-up-line.svg">
												<span class="Svg_num">{{item.likeNum}}</span>
											</div>
										</div>
										<div class="Svg_all2">
											<div style="display: flex;align-items: center;">
												<img class="Svg" src="../assets/Svg/time-line.svg">
												<span class="Svg_num">{{item.time}}</span>
											</div>
										</div>
									</div>
								</div>
							</li>

						</ul>
						<div v-if="GetListArticleData.limt>1">
							<el-pagination @current-change="AcMyPageChange" :current-page="GetListArticleData.page"
								background layout="prev, pager, next" :page-count="GetListArticleData.limt" />
						</div>
					</div>
					<!-- 关注列表 -->
					<div class="My_mycenter" v-if="select==3">
						<ul style="width: 100%;height:655px ">
							<el-empty description="暂无数据" v-if="GetLikeUsersData.length==0" />
							<li style="position: relative; margin-left: 10px;margin-right: 10px; border-bottom:1px solid gainsboro; height: 120px; display: flex;flex-flow: row; align-items: center;"
								v-for="i in GetLikeUsersData" :key="i">
								<a :href="'/Heself?vid='+i.vid"><img :src="i.imgUrl"
										style="width: 60px; height: 60px; border-radius: 50%;"></a>
								<div style="text-align: left; margin-left: 10px;">
									<div id="">
										{{i.userName}}
									</div>
									<div style="font-size: 14px;">
										{{i.resume}}
									</div>
								</div>
								<div @click="LikeUserT(i)" style="-webkit-user-select: none;
									line-height: 30px;
									width: 100px;
									height: 30px;
									font-size: 12px;
									border-radius: 20px;
									background-color: whitesmoke;
									border: 1.5px solid lightgray;
									cursor: pointer;
									color: #555;
									transition: all 0.5s;
									position: absolute;
									right: 30px;">
									{{i.LikeUser==false?"关注":"取消关注"}}
								</div>
							</li>

						</ul>
						<div>
							<el-pagination @current-change="LikePageChange" :current-page="GetLikeUsersData.page"
								background layout="prev, pager, next" :page-count="GetLikeUsersData.limt" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		HeList,
		GetListArticle,
		GetLikeUser,
		GetFolder
	} from '../api/Heself.js'
	import {
		getIP
	} from '../api/apiConf.js'
	import {
		GetsaveFile
	} from '../api/MyselfApi.js'
	import {
		LikeUser,
		CheckLikeUser,
	} from '../api/pageApi.js'
	import {
		GetDate
	} from '../api/publicUse.js'
	import {
		GetLv,
		GetPre
	} from '../VoidJS/exc.js'
	var hvid
	export default {
		data() {
			return {
				select: 1,
				HelistData: {},
				HelistimgUrls: "",
				GetListimgUrls: "",
				GetLikeUserimgUrls: "",
				GetListArticleData: {
					list: [],
					page: 1,
					limt: 1,
					total: 0
				},
				GetLikeUsersData: {
					list: [],
					page: 1,
					limt: 1,
					total: 0
				},
				GetFolderData: [],
				saveFileList: {
					list: [],
					page: 1,
					limt: 1
				},
				clickMore: {
					checkLike: false,
					checkfollow: false
				},
				getFid: 0,
				userExc: {
					userLV: "",
					userPre: 0
				},
				customColors: [{
						color: '#f56c6c',
						percentage: 20
					},
					{
						color: '#e6a23c',
						percentage: 40
					},
					{
						color: '#5cb87a',
						percentage: 60
					},
					{
						color: '#1989fa',
						percentage: 80
					},
					{
						color: '#6f7ad3',
						percentage: 100
					}
				]
			}
		},
		created() {
			hvid = location.search.replace("?vid=", "")
			this.HeListDef(hvid)
			this.GetListArticleDef(hvid)
			this.GetLikeUsersDef(hvid)
			this.GetFolderDef(hvid)
			this.CheckLikeUserDef(hvid)
		},
		methods: {
			SavefilePageChange(e) {
				this.saveFileList.page = e
				this.GetsaveFileDef(this.getFid)
			},
			AcMyPageChange(e) {
				this.GetListArticleData.page = e
				this.GetListArticleDef(hvid)
			},
			Sec(int) {
				if (int == this.select) {
					return
				}
				this.select = int
			},
			// 获取个人信息
			HeListDef(hvid) {
				HeList({
					obj: {
						t: this,
						vid: hvid
					},
					out: res => {
						this.HelistData = res
						this.userExc.userLV = GetLv(this.HelistData.exc)
						this.userExc.userPre = parseInt(GetPre(this.HelistData.exc).replace("%", ""))
						this.HelistimgUrls = "http://120.76.177.46:5000/api/PublicApi/getImg?imgUrl=" + res
							.imgUrl
					}
				})
			},
			// 获取文章列表
			GetListArticleDef(hvid) {
				GetListArticle({
					t: this,
					data: {
						vid: hvid,
						page: this.GetListArticleData.page,
						size: 5
					},
					out: res => {
						this.GetListArticleData.list = res.data.data
						this.GetListArticleData.limt = res.data.limt
						this.GetListArticleData.total = res.data.total
						this.GetListArticleData.list.forEach(i => {
							i.content = i.content.replace(/<(?:.|\s)*?>/g, "")
							i.time = GetDate(i.time)
						})
					}
				})
			},
			//获取关注列表
			GetLikeUsersDef(hvid) {
				GetLikeUser({
					t: this,
					data: {
						page: this.GetLikeUsersData.page,
						size: 5,
						vid: hvid
					},
					out: res => {
						res.data.data.forEach(i => {
							i.imgUrl = getIP() + "/PublicApi/getImg?imgUrl=" + i.imgUrl
							if (localStorage.getItem("voidUser") != undefined && localStorage.getItem(
									"voidUser") != null) {
								CheckLikeUser({
									t: this,
									vid: i.vid,
									out: res => {
										i.LikeUser = res
									},
									token: JSON.parse(localStorage.getItem("voidUser")).token
								})
							}
						})
						this.GetLikeUsersData = res.data.data
						this.GetLikeUsersData.limt = res.data.limt
						this.GetLikeUsersData.total = res.data.total
					}
				})
			},
			//获取收藏夹
			GetFolderDef(hvid) {
				GetFolder({
					t: this,
					vid: hvid,
					out: res => {
						this.GetFolderData = res
						this.getFid = this.GetFolderData[0].fsId
						this.GetsaveFileDef(this.getFid)
					}
				})
			},
			// 获取收藏夹中的文章
			GetsaveFileDef(fid) {
				this.getFid = fid
				GetsaveFile({
					t: this,
					data: {
						sfid: fid,
						page: this.saveFileList.page
					},
					out: res => {
						this.saveFileList.list = res.data.data
						this.saveFileList.limt = res.data.limt
						this.saveFileList.list.forEach(i => {
							i.time = GetDate(i.time)
							i.content = i.content.replace(/<(?:.|\s)*?>/g, "")
						})
						console.log(this.saveFileList)
					}
				})
			},
			// 关注某个人
			LikeUserDef(hvid) {
				if (localStorage.getItem("voidUser") == undefined || localStorage.getItem("voidUser") == null) {
					return
				}
				LikeUser({
					t: this,
					vid: hvid,
					out: () => {
						this.clickMore.checkfollow = !this.clickMore.checkfollow
						if(this.clickMore.checkfollow){
							this.HelistData.fanNum++
						}else{
							this.HelistData.fanNum--
						}
					},
					token: JSON.parse(localStorage.getItem("voidUser")).token
				})
			},
			LikeUserT(it) {
				LikeUser({
					t: this,
					vid: it.vid,
					out: () => {
						it.LikeUser = !it.LikeUser
					},
					token: JSON.parse(localStorage.getItem("voidUser")).token
				})
			},
			// 进来判断是否关注
			CheckLikeUserDef(hvid) {
				if (localStorage.getItem("voidUser") == undefined || localStorage.getItem("voidUser") == null) {
					return
				}
				CheckLikeUser({
					t: this,
					vid: hvid,
					out: res => {
						this.clickMore.checkfollow = res
						console.log(res)
					},
					token: JSON.parse(localStorage.getItem("voidUser")).token
				})
			},
			LikePageChange(e) {
				this.GetLikeUsersData.page = e
				this.GetLikeUsersDef(hvid)
			}
		}
	}
</script>

<style>
	@import url("../VCss/Maincss/center.css");
	@import url("../VCss/MenuCss/Myself.css");

	.select {
		background-color: whitesmoke;
	}
</style>
