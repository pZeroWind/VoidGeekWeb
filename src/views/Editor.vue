<template>
	<div>
		<!-- 标签添加弹出框 -->
		<el-dialog @closed="clearAddtagcontent()" v-model="SetValue.dialogVisible" title="添加标签" width="30%" draggable>
			<input type="text" placeholder="请设置标签" v-model="AddTagData.title" />
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="OpenDiage()">取消</el-button>
					<el-button type="primary" @click="MUploadTag()">确定</el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 文章发布弹出框 -->
		<el-dialog @closed="closeUploadDialog()" v-model="SetValue.updialogmessage" title="文章发布" width="50%" draggable>
			<div >
				请选择专区：<select style="width: 150px; margin-bottom: 20px;" v-model="UploadPageData.aid">
					<option :value="i.aid" v-for="i in AreaList" :key="i">{{i.areaName}}</option>
				</select>
			</div>
			<el-upload class="upload-demo" drag action="http://120.76.177.46:5000/api/PublicApi/update" :on-success="saveImgURL">
				<img style="width: 100%;height: 100%;" v-show="UploadPageData.post!=''" :src="UploadPageData.post"  />
				<el-icon class="el-icon--upload">
					<upload-filled />
				</el-icon>
				<div class="el-upload__text">
					请上传封面
				</div>
				<template #tip>
					<div class="el-upload__tip">
						请上传jpg与png格式，最大不能超过5MB
					</div>
				</template>
			</el-upload>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeUploadDialog()">取消</el-button>
					<el-button type="primary" @click="UploadFinshPage()">确定</el-button>
				</span>
			</template>
		</el-dialog>
		<div id="Ed_Top" style="width: 100%;height: auto;position: relative; ">
			<div
				style="position: absolute; top: 0;right:10px; z-index: 100; width: 0px;height: 0px;border:20px solid gray;border-bottom-color: transparent;border-left-color: transparent;">
			</div>
			<div
				style="width: 100%; height: 50px; background-color: whitesmoke; display: flex; flex-direction: row; align-items: center; text-align: left;">
				<span style="margin-left: 20px; font-weight: bold; font-size: 20px;">文章标题</span>
				<input v-model="UploadPageData.title" type="text" style="
					width: 1150px;
					height: 30px;
					outline: none;
					border: 1px solid lightgray;
					font-weight: bold;
					background-color: white;
					text-indent: 1em;
					border-radius: 30px;
					margin-left: 20px;" />
				<input @click="this.SetValue.updialogmessage=!this.SetValue.updialogmessage" type="button" name="" id="" value="发布文章"
					style="cursor: pointer; margin-left: 10px; font-size: 16px; height: 30px; width: 150px; border-radius: 30px; border: 1px solid lightgray;" />
			</div>
			<div style="margin: 0 20px;height: 1px;background-color: #e0e0e0;"></div>
			<!-- <div style="margin: 0px auto; width:98%; height: 1px; background-color: gainsboro;">
				
			</div> -->
			<div style="width: 100%; height: auto;">
				<ul
					style="position: relative; width: 100%;height: 50px; background-color: whitesmoke; display: flex; flex-direction: row; align-items: center;">
					<li class="E_ul_li" style="position: relative;" v-for="i in selectList" :key="i" v-show="label">
						{{i}}<span
							style="font-weight: normal; position: absolute; right: 5px; font-size: 14px; cursor: pointer; "
							@click="removeTag(i)">×</span>
					</li>
					<li class="E_ul_li" @click="OpenDiage()">添加标签</li>
					<li style="margin-right: 0px; font-size: 12px; position: absolute; cursor: pointer; right: 20px;"
						@click="E_content()">
						点击下拉
					</li>
				</ul>
				<div style="margin: 0 20px;height: 1px;background-color: #e0e0e0;" v-show="listSelect"></div>
				<ul style="width: 100%; height: auto; background-color: whitesmoke; padding-top: 5px; display: flex; flex-direction: row;flex-wrap: wrap;"
					class="E_content" v-show="listSelect">
					<li v-for="i in TagList" @click="selectTag(i.title)" :key="i" class="E_ul_li list"
						style="position: relative;cursor: pointer;" v-show="label">
						{{i.title}}
					</li>
				</ul>
			</div>
		</div>
		<div style="width:100%; height: 450px;">
			<div style="text-align: left;" ref="box"></div>
		</div>
	</div>
</template>
<style>
	@import url("../VCss/EditorCss.css");
</style>
<script>
	import {
		getIP
	} from "../api/apiConf.js"
	import E from "wangeditor"
	import {
		UplodTag,
		GetTagList,
		DeleteNon,
		GetAreaList,
		Upload
	} from '../api/EditorApi.js'
	import {
		ElMessage
	} from "element-plus"
	import {
		UploadFilled
	} from '@element-plus/icons-vue'
	export default {
		components:{
			UploadFilled
		},
		data() {
			return {
				editor: "",
				listSelect: false,
				label: true,
				history: [],
				SetValue: {
					dialogVisible: false,
					updialogmessage: false,
					buttonclick:false
				},
				AddTagData: {
					title: ""
				},
				TagList: [],
				selectList: [],
				AreaList:[],
				UploadPageData: {
					vid: "",
					aid: "",
					tag: "",
					title: "",
					content: "",
					sayNum: 0,
					saveNum: 0,
					likeNum: 0,
					readNum: 0,
					time: 0,
					pass: false,
					post: ""
				},
				saveList:[]
			}
		},
		mounted() {
			this.initEdior()
		},
		methods: {
			saveImgURL(res){
				console.log(res)
				this.UploadPageData.post = res.data[0]
				this.$forceUpdate()
			},
			initEdior() {
				this.editor = new E(this.$refs.box)
				this.editor.config.showLinkImg = false
				this.editor.config.uploadImgServer = "http://120.76.177.46:5000/api/PublicApi/update"
				this.editor.config.height = 550
				this.editor.config.zIndex = 10
				this.editor.create()
			},
			showText() {
				console.log(this.editor.txt.html())

			},
			UploadPage() {
				this.axios(getIP + "/UserApi/addPage")
			},
			E_content() {
				this.listSelect = !this.listSelect
			},
			E_label() {
				this.label = !this.label
			},
			OpenDiage() {
				this.SetValue.dialogVisible = !this.SetValue.dialogVisible
			},
			clearAddtagcontent() {
				this.AddTagData.title = ""
			},
			MUploadTag() {
				if (this.AddTagData.title.trim() == "") {
					ElMessage({
						message: '标签名不能为空',
						type: 'error'
					})
					return
				}
				UplodTag({
					t: this,
					data: this.AddTagData
				})
				this.OpenDiage()
			},
			getTag() {
				GetTagList({
					t: this,
					fdata: {
						page: 1,
						size: 50
					},
					out:res =>{
						this.TagList = res
					}
				})
			},
			selectTag(item) {
				if (this.selectList.length >= 5) {
					ElMessage({
						message: '最多只能选取五个标签',
						type: 'error'
					})
					return
				}
				this.selectList.push(item)
				this.selectList = DeleteNon(this.selectList)
			},
			removeTag(item) {
				var index = this.selectList.indexOf(item)
				if (index != -1) {
					this.selectList.splice(index, 1)
				}
			},
			closeUploadDialog(){
				this.SetValue.updialogmessage=!this.SetValue.updialogmessage
				if(this.SetValue.buttonclick){
					return
				}
				this.UploadPageData.aid=""
				this.UploadPageData.post=""
			},
			clickTitle() {
				if (this.UploadPageData.title.trim() == "") {
					ElMessage({
						message: '文章标题不能为空',
						type: 'error'
					})
					return false
				}
				return true
			},
			clickContent() {
				if (this.editor.txt.html() == "") {
					ElMessage({
						message: '发布内容不能为空',
						type: 'error'
					})
					return false
				}
				return true
			},
			ClickTag(){
				if(this.selectList.length<1){
					ElMessage({
						message:'请添加标签',
						type:'error'
					})
					return false
				}
				return true
			},
			clickArea(){
				if(this.UploadPageData.aid==""){
					ElMessage({
						message:'请选择专区',
						type:'error'
					})
					return false
				}
				return true
			},
			UploadFinshPage() {
				this.SetValue.buttonclick=true
				if(localStorage.getItem("voidUser")==undefined||localStorage.getItem("voidUser")==""){
					window.location.href='/Login'
					ElMessage({
						message:'请登录你的账户',
						type:'error'
					})
					return
				}
				if(!this.clickContent()){
					return
				}
				if(!this.clickTitle()){
					return
				}
				if(!this.clickArea()){
					return
				}
				if(!this.ClickTag()){
					return
				}
				this.UploadPageData.content=this.editor.txt.html()
				this.UploadPageData.tag=this.selectList
				this.UploadPageData.time=new Date().getTime()
				this.UploadPageData.vid=JSON.parse(localStorage.getItem("voidUser")).userVid
				Upload({
					t:this,
					data:JSON.stringify(this.UploadPageData),
					token:JSON.parse(localStorage.getItem("voidUser")).token,
					out:()=>{
						this.UploadPageData={
							vid: "",
							aid: "",
							tag: "",
							title: "",
							content: "",
							sayNum: 0,
							saveNum: 0,
							likeNum: 0,
							readNum: 0,
							time: 0,
							pass: false,
							post: ""
						}
					}
				})
			},
			Savedraft(){
				if(localStorage.getItem("SaveDraft")!=undefined){
					if(this.saveList.length>20){
						this.saveList.pop()
					}
				}
				this.saveList.unshift(JSON.stringify(this.UploadPageData))
				this.saveList=DeleteNon(this.saveList)
				localStorage.setItem("SaveDraft",JSON.stringify(this.saveList))
				ElMessage({
					message:'保存成功',
					type:'success'
				})
				JSON.parse(localStorage.getItem("SaveDraft")).forEach(i=>{
					console.log(JSON.parse(i))
				})
			}
		},
		created() {
			this.getTag()
			GetAreaList({
				t:this
			})
			// if(JSON.parse(localStorage.getItem("SaveDraft"))!=undefined){
			// 	this.saveList=JSON.parse(localStorage.getItem("SaveDraft"))
			// }
			// JSON.parse(localStorage.getItem("SaveDraft")).forEach(i=>{
			// 	console.log(JSON.parse(i))
			// })
		},
		updated() {

		}
	}
</script>