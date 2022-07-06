<template>
	<div class="home">
		<HelloWorld />
		<div id="main_all">
			<div class="center">
				<!-- 广告区 -->
				<div class="top_advertisement">
					<img src="@/assets/800x600.jpg" />
				</div>
				<div class="center_all">
					<!-- 轮播图区 -->
					<div class="center_top">
						<div class="rotation">
							<!-- <img src="../../public/3.jpg" class="rota-img" /> -->
							<el-carousel>
								<el-carousel-item v-for="item in Lunimg" :key="item" class="rota-img">
									<a target="_blank" :href="'/Pageview?pid='+item.pid"><img
											style="width: 100%;height: 100%;" :src="item.post" /></a>
								</el-carousel-item>
							</el-carousel>
						</div>
					</div>
					<div class="hot">
						<ul class="hot-ul">
							<li class="hot-things-1 top-radius" v-for="i in leftData" :key="i">
								<router-link @click="UploadHost(i.pid)" :to="'/Pageview?pid='+i.pid">{{i.title}}
								</router-link>
								<div
									style="margin-top: 5px;width: 90%;display: flex;flex-flow: row nowrap;font-size: 12px;justify-content: space-between; position: relative;">
									<div
										style="width: 50%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
										{{i.content}}
									</div>
									<!-- 阅读量 -->
									<div class="hot-likeAndRead"
										style="display: flex;position: absolute; right: 80px; bottom: -10px; align-items: center; width: 60px;">
										<div>
											<img src="../assets/Svg/eye-line.svg" class="Svg">
										</div>
										<div>{{i.readNum}}</div>
									</div>
									<!-- 点赞量 -->
									<div class="hot-likeAndRead"
										style="display: flex;position: absolute; right: -10px; bottom: -10px; align-items: center; width: 60px;">
										<div>
											<img src="../assets/Svg/thumb-up-line.svg" class="Svg">
										</div>
										<div>{{i.likeNum}}</div>
									</div>
								</div>
							</li>
						</ul>

					</div>
					<!-- 热门推荐区 -->
					<!-- <div class="hot-title">
																热<br>门<br>推<br>荐
															</div> -->
					<div class="hot">
						<ul class="hot-ul">
							<li class="hot-things-1 top-radius" v-for="i in rightData" :key="i">
								<router-link @click="UploadHost(i.pid)" :to="'/Pageview?pid='+i.pid">{{i.title}}
								</router-link>
								<div
									style="width: 90%;display: flex;flex-flow: row nowrap;font-size: 12px;justify-content: space-between; position: relative;">
									<div
										style="margin-top: 5px;width: 50%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
										{{i.content}}
									</div>
									<!-- 阅读量 -->
									<div class="hot-likeAndRead"
										style="display: flex;position: absolute; right: 80px; bottom: -10px; align-items: center; width: 60px;">
										<div>
											<img src="../assets/Svg/eye-line.svg" class="Svg">
										</div>
										<div>{{i.readNum}}</div>
									</div>
									<!-- 点赞量 -->
									<div class="hot-likeAndRead"
										style="display: flex;position: absolute; right: -10px; bottom: -10px; align-items: center; width: 60px;">
										<div>
											<img src="../assets/Svg/thumb-up-line.svg" class="Svg">
										</div>
										<div>{{i.likeNum}}</div>
									</div>
								</div>
							</li>
							<li class="hot-things-1 top-radius" :key="i" v-for="i in EndData">
								<router-link @click="UploadHost(i.pid)" :to="'/Pageview?pid='+i.pid">{{i.title}}
								</router-link>
								<div
									style="width: 90%;display: flex;flex-flow: row nowrap;font-size: 12px;justify-content: space-between; position: relative;">
									<div
										style="margin-top: 5px;width: 50%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
										{{i.content}}
									</div>
									<!-- 阅读量 -->
									<div class="hot-likeAndRead"
										style="display: flex;position: absolute; right: 80px; bottom: -10px; align-items: center; width: 60px;">
										<div>
											<img src="../assets/Svg/eye-line.svg" class="Svg">
										</div>
										<div>{{i.readNum}}</div>
									</div>
									<!-- 点赞量 -->
									<div class="hot-likeAndRead"
										style="display: flex;position: absolute; right: -10px; bottom: -10px; align-items: center; width: 60px;">
										<div>
											<img src="../assets/Svg/thumb-up-line.svg" class="Svg">
										</div>
										<div>{{i.likeNum}}</div>
									</div>
								</div>
								<router-link :to="'/Pageview?pid='+i.pid"
									style="width: 100%; height: 130px;margin-top: 25px;">
									<img :src="i.post" style="width: 100%; height: 100px;">
								</router-link>
							</li>
						</ul>

					</div>
				</div>
			</div>
			<div class="top_bottom">
				<div id="A_Posts">
					<div class="A_Posts_left">
						<el-tabs @tab-click="typeSelect">
							<el-tab-pane label="推荐"></el-tab-pane>
							<el-tab-pane label="热门"></el-tab-pane>
							<el-tab-pane label="最新"></el-tab-pane>
							<el-tab-pane label="点赞最多"></el-tab-pane>
						</el-tabs>
						<ul v-infinite-scroll="load">
							<li class="A_classification_li" :key="i" v-for="(it,i) in reList">
								<div class="A_title">
									<router-link @click="UploadHost(it.pid)" target="_blank"
										:to="'/Pageview?pid='+it.pid">{{it.title}}
									</router-link>
								</div>
								<div class="A_content" style="text-align: left; margin: 10px;">
									<div v-if="it.post!=null&&it.post!=''&&it.post!='null'"
										style="width: auto; height: auto;">
										<img class="A_content_img" :src="it.post">
									</div>
									<div class="A_content_content" style="position: relative;">
										<div style="position: absolute;right: 250px; bottom: 6px; color: darkgray;">
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
								</div>
							</li>
						</ul>
					</div>
					<div class="A_Posts_right" style="margin-top: 15px;">
						<div class="A_Posts_right_top">
							<ul style="display: flex; flex-flow: column; align-items: center;">
								<li
									style="user-select: none; width: 100%; height: 40px; border-bottom:1px solid gainsboro ; line-height: 40px; color: gray;">
									标签</li>
								<li>
									<ul style="display: flex; flex-flow: row wrap; padding: 5px;">
										<li @click="ClickTagDef(it.title)" class="A_tag" v-for="(it,i) in TagList" :key="i">
											{{it.title}}
										</li>
									</ul>
								</li>
							</ul>
						</div>
						<div class="A_Posts_right_bottom">
							<ul>
								<li
									style="font-weight: bold;user-select: none;width: 100%; height: 49px; border-bottom: 1px solid gainsboro; color: gray; line-height: 49px; ">
									推荐作者
								</li>
								<li>
									<ul style="margin: 0 5px;">

										<li :key="i" v-for="(it,i) in activeList"
											:class="{A_user_tui_last:i==activeList.length-1}" class="A_user_tui">
											<a :href="'/Heself?vid='+it.vid">
												<img :src="it.imgUrl"
													style="width: 40px; height: 40px; border-radius: 50%; margin-left: 15px;">
											</a>
											<div
												style="display: flex; flex-flow: column; align-items: flex-start; margin-left: 5px;">
												<div style="font-size: 13px;">{{it.userName}}</div>
												<div style="font-size: 13px; color: darkgray;">
													{{it.resume}}
												</div>
											</div>
											<div @click="LikeUserDef(it.vid,i)" class="guanzhu" style="
													position: absolute;
													right: 20px;
													-webkit-user-select: none;
													line-height: 25px;
													width: 60px;
													height: 25px;
													font-size: 12px;
													border-radius: 15px;
													background-color: whitesmoke;
													border: 1.5px solid lightgray;
													cursor: pointer;
													color: #555;
													transition: all 0.5s;">
												{{it.likeUser==true?"取消关注":"关注"}}
											</div>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import HelloWorld from '@/components/HelloWorld.vue'
	import {
		getPageList,
		CheckLikeUser,
		LikeUser
	} from '@/api/pageApi.js'
	import {
		FindLunName,
		GetTop,
		GetHotActive
	} from '../api/HomeApi.js'
	import {
		AddHost
	} from '../api/apiConf.js'
	import {
		GetUseTagList
	} from '../api/EditorApi.js'
	export default {
		name: 'Home',
		components: {
			HelloWorld
		},
		data() {
			return {
				Lunimg: [],
				reList: [],
				worknum: 5,
				workPage: 1,
				limt: 0,
				leftData: [],
				rightData: [],
				TagList: [],
				activeList: [],
				EndData: []
			}
		},
		created() {
			this.axios.get('http://120.76.177.46:5000/api/PublicApi/getBanner')
				.then(rest => {
					this.Lunimg = rest.data.data
					this.Lunimg.forEach(item => {
						FindLunName({
							t: this,
							pid: item.pid,
							out: resf => {
								item.title = resf.data.data.title
							}
						})
						item.imgUrl = "http://120.76.177.46:5000/api/PublicApi/getImg?imgUrl=" + item.imgUrl
					})
				})
			getPageList(this, {
				page: this.workPage,
				size: 10
			})
			GetTop({
				t: this,
				out: res => {
					console.log(res.data.data)
					var list = res.data.data
					for (let i = 0; i < list.length; i++) {
						list[i].content = list[i].content.replace(/<(?:.|\s)*?>/g, "")
						if (i < 5) {
							this.leftData.push(list[i])
						} else if (i >= 5 && i < 7) {
							this.rightData.push(list[i])
						} else {
							this.EndData.push(list[i])
						}
					}
				}
			})
			GetUseTagList({
				t: this,
				fdata: {
					page: 1,
					size: 50
				},
				out:res =>{
					this.TagList =res
				}
			})
			GetHotActive({
				t: this,
				data: {
					mode: 3
				},
				out: res => {
					console.log(res)
					this.activeList = res
					this.activeList.forEach(i => {
						i.imgUrl = "http://120.76.177.46:5000/api/PublicApi/getImg?imgUrl=" + i.imgUrl
						if (localStorage.getItem("voidUser") != undefined && localStorage.getItem(
								"voidUser") != "") {
							CheckLikeUser({
								t: this,
								vid: i.vid,
								token: JSON.parse(localStorage.getItem("voidUser")).token,
								out: res => {
									i.likeUser = res
								}
							})
						}
					})
				}
			})
		},
		methods: {
			typeSelect(i) {
				let index = i.index
				if (i.index == 2) {
					index = 3
				} else if (i.index == 3) {
					index = 2
				}
				this.workPage = 1
				this.reList = []
				this.type = index
				getPageList(this, {
					page: this.workPage,
					size: 10,
					mode: index
				})
			},
			load() {
				if (this.workPage >= this.limt) {
					return
				}
				this.workPage++
				getPageList(this, {
					page: this.workPage,
					size: 10,
					mode: this.type
				})
			},
			UploadHost(upid) {
				console.log(upid)
				if (localStorage.getItem("voidUser") != undefined || localStorage.getItem("voidUser") != "") {
					AddHost({
						t: this,
						token: JSON.parse(localStorage.getItem("voidUser")).token,
						pid: upid
					})
				}
			},
			LikeUserDef(uvid, index) {
				if (localStorage.getItem("voidUser") == "" || localStorage.getItem("voidUser") == undefined) {
					return
				}
				LikeUser({
					t: this,
					vid: uvid,
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					out: () => {
						this.activeList[index].likeUser = !this.activeList[index].likeUser
						console.log(this.activeList.likeUser)
					}
				})
			},
			ClickTagDef(tag) {
				window.open('./search?src=&tag='+btoa(encodeURI('["' + tag + '"]')))
			},
		}
	}
</script>
<style>
	@import url("../VCss/All.css");
	@import url("../VCss/Maincss/center.css");
	@import url("../VCss/AreaCss.css");
</style>
