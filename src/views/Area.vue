<template>
	<div style=" height: 100vh;">
		<div id="A_classification">
			<ul class="A_classification_ul">
				<li @click="areaSelect(item.aid)" :class="{selected:areaIndex==item.aid}" :key="index" v-for="(item,index) in areaList.data">
					{{item.areaName}}
				</li>
			</ul>
		</div>
		<div id="A_Posts">
			<div class="A_Posts_left">
				<el-tabs @tab-click="typeSelect">
					<el-tab-pane label="推荐"></el-tab-pane>
					<el-tab-pane label="热门"></el-tab-pane>
					<el-tab-pane label="最新"></el-tab-pane>
					<el-tab-pane label="点赞最多"></el-tab-pane>
				</el-tabs>
				<ul v-infinite-scroll="load">
					<li class="A_classification_li" :key="i" v-for="(it,i) in pageList">
						<div class="A_title">
							<router-link target="_blank" :to="'/Pageview?pid='+it.pid">{{it.title}}</router-link>
						</div>
						
						<div class="A_content" style="text-align: left; margin: 10px;">
							<div v-if="it.post!=null" style="width: auto; height: auto;">
								<img class="A_content_img" :src="it.post">
							</div>
							<div class="A_content_content" style="position: relative;">
								<div style="position: absolute;right: 250px; bottom: 6px; color: darkgray;">
									{{it.time}}
								</div>
								<div class="A_cont_show">
									{{it.content}}
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
			<div class="A_Posts_right">
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
									<a :href="'/Heself?vid='+it.vid"><img :src="it.imgUrl"
										style="width: 40px; height: 40px; border-radius: 50%; margin-left: 15px;"></a>
									
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
										{{it.likeUser==false?"关注":"取消关注"}}
									</div>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

</template>
<script>
	import {toForm,getIP} from "../api/apiConf.js"
	import {GetDate} from "../api/publicUse.js"
	import {
		AddHost
	} from '../api/apiConf.js'
	import {
		GetTagList
	} from '../api/EditorApi.js'
	import {
		CheckLikeUser,
		LikeUser
	} from '@/api/pageApi.js'
	import {
		GetHotActive
	} from '../api/HomeApi.js'
	export default {
		data() {
			return {
				areaList: [],
				pageList: [],
				areaIndex:"",
				page:1,
				limt:1,
				type:0,
				TagList: [],
				activeList: []
			}
		},
		methods: {
			ClickTagDef(tag) {
				window.open('./search?src=&tag='+btoa(encodeURI('["' + tag + '"]')))
			},
			areaSelect(i){
				this.pageList = []
				this.areaIndex = i;
				this.findArea({
					page:this.page,
					aid:this.areaIndex,
					mode:this.type
				})
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
			typeSelect(i){
				let index = i.index
				if(i.index == 2){
					index = 3
				}else if(i.index == 3){
					index = 2
				}
				this.pageList = []
				this.type = index
				this.findArea({
					page:this.page,
					aid:this.areaIndex,
					mode:this.type
				})
			},
			findArea(data){
				this.axios.get(getIP()+'/PageApi/getList?size=10&'+toForm(data))
				.then(res =>{
					res.data.data.forEach(i=>{
						i.time = GetDate(i.time)
						i.content = i.content.replace(/<[^>]+>/g,"")
						this.pageList.push(i)
					})
					this.limt = res.data.limt
				})
			},
			load(e){
				console.log(e)
				if(this.page>=this.limt){
					return
				}
				this.page++
				this.findArea({
					page:this.page,
					aid:this.areaIndex,
					mode:this.type
				})
			},
			UploadHost(upid) {
				if (localStorage.getItem("voidUser") != undefined && localStorage.getItem("voidUser") != "") {
					AddHost({
						t: this,
						token: JSON.parse(localStorage.getItem("voidUser")).token,
						pid:upid
					})
				}
			}
		},
		created() {
			this.axios.get('http://120.76.177.46:5000/api/AreaApi/list')
				.then(res => {
					this.areaList = res.data
					this.areaIndex = res.data.data[0].aid
					this.areaSelect(this.areaIndex)
			})
			GetTagList({
				t: this,
				fdata: {
					page: 1,
					size: 50
				},
				out:res=>{
					this.TagList = res
				}
			})
			GetHotActive({
				t: this,
				data: {
					mode: 3
				},
				out: res => {
					res.forEach(i => {
							i.imgUrl = "http://120.76.177.46:5000/api/PublicApi/getImg?imgUrl=" + i.imgUrl
							i.likeUser=false
							if (localStorage.getItem("voidUser") != undefined && localStorage.getItem("voidUser") != "") {
							CheckLikeUser({
								t: this,
								vid: i.vid,
								token: JSON.parse(localStorage.getItem("voidUser")).token,
								out: res => {
									i.likeUser = res
									this.activeList.push(i)
								}
							})
						}
					})
					this.$forceUpdate()
					console.log(this.activeList)
				}
			})
			
		},
		mounted() {
		}
	}
</script>

<style>
	@import url("../VCss/All.css");
	@import url("../VCss/AreaCss.css");
</style>
