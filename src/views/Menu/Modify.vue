<template>
	<!-- 修改密码页 -->
	<div id="Mo_main">
		
		<div class="Mo_box" style="border-radius: 10px; text-align: left;">
			<div style="margin-bottom: 30px;">
				<img src="@/assets/void_logo.png" style="user-select: none;" class="L_logo" />
			</div>
			
			<input type="text" @blur="checkYpwd()" v-model="userpwd.oldPassword" placeholder="请输入原密码" class="L_vid"/>
			<input type="text" @blur="checkXpwd()" v-model="userpwd.newPassword" placeholder="请输入修改密码" class="L_vid"/>
			<input type="text" @blur="checktruePwd()" v-model="Xtrue" placeholder="请再次输入密码" class="L_vid"/>
			<span class="L_remeber" style="margin-top: 20px;margin-left: 400px;">忘记密码?</span>
			<div class="Mo_btnbox" style="display: flex;">
				<input type="button" class="L_login" style="width: 240px; margin-right: 20px;" @click="SureM()" value="确定" />
				<input type="button" class="L_login" style="width: 240px; "  @click="CancelM()" value="取消" />
			</div>
		</div>
	</div>
</template>

<script>
	import { ElMessageBox , ElMessage } from 'element-plus'
	import { Action } from 'element-plus'
	export default{
		data() {
			return{
				UserData:{
					token:"",
					autoLogin:false,
					savePwd:false,
					savaTime:"",
					userVid:"",
					userPwd:""
				},
				Xtrue:"",
				userpwd:{
					oldPassword:"",
					newPassword:""
				}
			}
		},
		methods:{
			//原密码非空验证
			checkYpwd(){
				if(this.userpwd.oldPassword.trim()==""){
					ElMessage({
						message:'原密码不能为空',
						type:'error'
					})
					return false
				}
				if(this.userpwd.oldPassword!=this.UserData.userPwd){
					ElMessage({
						message:'原密码错误',
						type:'error'
					})
					return false
				}
				return true
			},
			//密码框非空验证
			checkXpwd(){
				if(this.userpwd.newPassword.trim()==""){
					ElMessage({
						message:'密码不能为空',
						type:'error'
					})
					return false
				}
				let rg=/(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*])[a-z\d#@!~%^&*]{8,12}/i;
				//检测是否符合含有字母数字英文符号规范
				if(!rg.test(this.userpwd.newPassword)){
					ElMessage ({
						message:'密码为8~12位,且必须字母、数字加特殊符号',
						type:'error'
					})
					return false
				}
				return true
			},
			//确定密码框非空验证
			checktruePwd(){
				if(this.Xtrue==""){
					ElMessage({
						message:'确认密码不能为空',
						type:'error'
					})
					return false
				}
				if(this.Xtrue!=this.userpwd.newPassword){
					ElMessage({
						message:'两次密码输入不一致',
						type:'error'
					})
					return false
				}
				return true
			},
			SureM(){
				if(!this.checkYpwd()){
					return
				}
				if(!this.checkXpwd()){
					return
				}
				if(!this.checktruePwd()){
					return
				}
				ElMessageBox.alert('是否确定修改密码',{
					confirmButtonText:'确定',
					type:'info',
					callback:(ac=Action)=>{
						if(ac=="cancel"){
							return 
						}else if(ac=="confirm"){
							this.modifyT()
						}
					}
				})
			},
			CancelM(){
				ElMessageBox.alert('是否取消修改密码',{
					confirmButtonText:'确定',
					type:'info',
					callback:(ac=Action)=>{
						if(ac=="cancel"){
							return 
						}else if(ac=="confirm"){
							location.href="/"
						}
					}
				})
			},
			modifyT(){
				this.axios.put('http://120.76.177.46:5000/api/UserApi/password',JSON.stringify(this.userpwd),
				{
					headers:{'content-type': 'application/json',
					'Authorization':'Bearer '+JSON.parse(localStorage.getItem("voidUser")).token
					}
				}).then(rest=>{
					if(rest.data.data){
						ElMessage({
							message:'修改成功,请重新登录',
							type:'success'
						})
						localStorage.removeItem("voidUser")
						location.href='/Login'
					}
					else{
						ElMessage({
							message:'修改1失败',
							type:'error'
						})
					}
				})
			}
		},
		created() {
		this.UserData=JSON.parse(localStorage.getItem("voidUser"))
		}
	}
</script>

<style>
	@import url("../../VCss/LoginCss.css");
	@import url("../../VCss/MenuCss/ModifyCSS.css");
</style>
