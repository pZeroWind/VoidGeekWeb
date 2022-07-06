<template>
	<div id="Mo_main">

		<div class="Mo_box" style="border-radius: 10px; text-align: left;">
			<div style="margin-bottom: 30px;">
				<img src="@/assets/void_logo.png" style="user-select: none;" class="L_logo" />
			</div>
			<input type="text" v-model="userData.vid" placeholder="请输入vid" @blur="GetUserDef()" class="L_vid" />
			<input type="password" v-model="userPwd" placeholder="请输入新密码" @blur="CheckpwdType()" class="L_vid" />
			<input type="password" v-model="DuserPwd" placeholder="请确认新密码" @blur="Checkpwd()" class="L_vid" />
			<div class="L_t_true">
				<input type="text" v-model="textEmail" placeholder="请输入验证码" class="L_t_tnum" />
				<input type="button" id="L_t_btnflag" @click="checkNum()" class="L_t_tbtn" value="获取验证码" />
			</div>
			<div class="Mo_btnbox" style="display: flex;">
				<input type="button" class="L_login" style="width: 240px; margin-right: 20px;" @click="PutPwdDef()" value="确定" />
				<input type="button" @click="cancelLoc()" class="L_login" style="width: 240px; " value="取消" />
			</div>
		</div>
	</div>
</template>

<script>
	import {
		ElMessage
	} from "element-plus"
	import {
		GetUser,
		UpdatePwd
	} from "../api/ForgetPwd.js"
	export default {
		data() {
			return {
				userPwd: "",
				DuserPwd: "",
				PutPwd: [],
				userData: {
					vid: "",
					email:""
				},
				trueemail: "",
				textEmail:"",
			}
		},
		methods: {
			cancelLoc(){
				location.href='/Login'
			},
			//密码格式判断
			Checkpwd() {
				let t = this;
				if (t.userPwd.trim() != t.DuserPwd.trim()) {
					//使用elementplus的message提示框
					ElMessage({
						//提示语
						message: '两次密码输入不一致',
						//提示框类型
						type: 'error',
					})
					return false
				}
				return true

			},
			//检测是否符合密码规范（最少8位，且必须字母、数字加英文符号）
			CheckpwdType() {
				let t = this;
				let rg = /(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*])[a-z\d#@!~%^&*]{8,12}/i;
				//检测是否符合含有字母数字英文符号规范
				if (!rg.test(t.userPwd)) {
					ElMessage({
						message: '密码为8~12位,且必须字母、数字加特殊符号',
						type: 'error'
					})
					return false
				}
				return true
			},
			//获取用户信息
			GetUserDef() {
				GetUser({
					t: this,
					vid: this.userData.vid,
					out: res => {
						this.userData = res
						console.log(this.userData.email)
					}
				})
			},
			// 修改密码
			PutPwdDef() {
				if(this.trueemail==this.textEmail){
					UpdatePwd({
						t: this,
						data: {
							vid: this.userData.vid,
							pwd: this.DuserPwd
						},
						out: res => {
							this.PutPwd = res
							console.log(res)
							if(res){
								location.href="/Login"
							}
						}
					})
					return
				}
				ElMessage({
					message: '验证码错误，请重新输入！',
					type: 'error'
				})
				return
			},
			// 获取验证码
			checkNum() {
				console.log(this.userData)
				if (this.userData.vid == "") {
					ElMessage({
						message: 'vid不能为空',
						type: 'error'
					})
					return
				}
				this.axios.get('http://120.76.177.46:5000/api/UserApi/getCodeForVid?vid='+this.userData.vid)
					.then(rest => {
						ElMessage({
							message: '验证码获取成功',
							type: 'success'
						})
						this.trueemail = rest.data.data
						let num = 180

						function clearemail() {
							if (num == 1) {
								this.trueemail = ""
								clearInterval(cle)
							}
							num -= 1
						}
						let cle = setInterval(clearemail, 1000)
					})
				let bytime = 60
				let btn = document.getElementById("L_t_btnflag")
				btn.value = bytime + "秒后获取"
				btn.classList.remove("L_t_tbtn")
				btn.classList.add("L_t_tbtnsecond")
				btn.disabled = true

				function timedef() {
					if (bytime == 1) {
						clearInterval(reckon)
						btn.classList.remove("L_t_tbtnsecond")
						btn.classList.add("L_t_tbtn")
						btn.value = "获取验证码"
						btn.disabled = false
						return
					}
					bytime -= 1
					btn.value = bytime + "秒后获取"
				}
				let reckon = setInterval(timedef, 1000)

			},
		},
		created() {

		}
	}
</script>

<style>
	@import url("../VCss/All.css");
	@import url("../VCss/LoginCss.css");
	@import url("../VCss/MenuCss/ModifyCSS.css");
</style>
