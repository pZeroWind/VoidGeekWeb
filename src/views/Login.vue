<template>
	<div id="L_box">
		<div id="L_content">
			<div class="L_change">
				<div class="L_log">
					<div class="L_l_txt">
						<div class="L_l_login" @click="cSel(-1)" :class="{L_l_select:select<=0}"><span>登录</span></div>
						<div class="L_l_register" @click="cSel(1)" :class="{L_l_select:select>0}"><span>注册</span></div>
					</div>
					<img src="@/assets/void_logo.png" style="user-select: none;" class="L_logo" />
				</div>
			</div>
			<!-- 扫码登录 -->
			<div id="L_kuang" style="position: relative;" v-show="select==-1">
				<a title="切换为VID与密码登录">
					<div
						class="upHover"
						@click="select=0"
						style="position: absolute; top: -5px;right:10px; z-index: 100; width: 0px;height: 0px;border:20px solid gray;border-bottom-color: transparent;border-left-color: transparent;">
					</div>
				</a>
				<qrcode-vue style="" :value="key" :size="250" level="H" />
				<span style="margin-top: 10px;">扫码进行登录</span>
			</div>
			<!-- 登录页 -->
			<div id="L_kuang" style="position: relative;" v-show="select==0">
				<a title="切换为扫码登录">
					<div
						class="upHover"
						@click="select=-1"
						style="position: absolute; top: -5px;right:10px; z-index: 100; width: 0px;height: 0px;border:20px solid gray;border-bottom-color: transparent;border-left-color: transparent;">
					</div>
				</a>
				
				<input type="text" placeholder="请输入VID" v-model="Login.vid" class="L_vid" />
				<input type="password" placeholder="请输入密码" v-model="Login.password" class="L_pwd" />
				<div class="L_checkbox">
					<el-checkbox v-model="UserData.savePwd" style="--el-color-primary:red;font-weight: bold;"
						label="记住密码" size="small" class="L_remeber"></el-checkbox>
					<el-checkbox v-model="UserData.autoLogin" style="--el-color-primary:red;font-weight: bold;"
						label="自动登录" size="small" class="L_autologin"></el-checkbox>
					<el-link target="_blank" href="/ForgetPwd" class="L_forget">忘记密码?</el-link>
				</div>
				<input type="button" @click="LoginDef()" class="L_login" value="登录" />
			</div>
			<!-- 注册页首页 -->
			<div id="L_res" v-show="select==1">
				<div class="L_username">
					<input type="text" @input="txtchange()" v-model="data.userName" @blur="Checkuser()"
						placeholder="请输入用户名" class="L_u_inp" />
				</div>
				<div class="L_userpwd">
					<input type="password" v-model="data.password" @input="txtchange()" @blur="CheckpwdType()"
						placeholder="请输入密码" class="L_u_pwd" />
				</div>
				<div class="L_truepwd">
					<input type="password" v-model="password" @blur="Checkpwd()" @input="txtchange()"
						placeholder="请再次输入密码" class="L_u_true" />
				</div>
				<div class="L_re_btn" v-if="fulls">
					<span class="L_re_next" @click="next()">下一步>></span>
				</div>
			</div>
			<!-- 注册页次页 -->
			<div id="L_res_next" v-show="select==2">
					<el-date-picker class="L_n_phone" v-model="birthday" @blur="getTime()" @input="nextFull()" type="date"
						placeholder="请选择您的出生日期" :default-value="new Date(2010, 9, 1)" />
				
				<!-- <input type="text" class="L_n_birthday" @blur="getTime()" @focus="changeTypef(this)" v-model="birthday" @input="nextFull()" placeholder="请输入出生日期"/> -->
				<div class="L_n_sex">
					<div class="L_n_sex_man">
						<input type="radio" :value="true" v-model="data.gender" checked="checked"
							name="n_sex" /><span>男</span>
					</div>
					<div class="L_n_sex_women">
						<input type="radio" :value="false" v-model="data.gender" name="n_sex" /><span>女</span>
					</div>
				</div>
				<input class="L_n_phone" @blur="checkPhone()" @input="nextFull()" type="text" v-model="data.phoneNum"
					placeholder="请输入电话号码" />
				<div @click="Nprve()" class="L_n_prvebox">
					<span class="L_n_prvetxt">
						&lt;&lt;上一步
					</span>
				</div>
				<div class="L_n_btn" v-show="nextfull">
					<span class="L_n_next" @click="Nnext()">下一步>></span>
				</div>
			</div>
			<!-- 注册第三页 -->
			<div id="L_n_three" v-show="select==3">
				<input type="email" v-model="data.email" placeholder="请输入电子邮箱" @blur="checkEmail()" class="L_t_email" />
				<div class="L_t_true">
					<input type="text" v-model="checkemail" placeholder="请输入验证码" class="L_t_tnum" />
					<input type="button" id="L_t_btnflag" class="L_t_tbtn" @click="checkNum()" value="获取验证码" />
				</div>
				<input type="button" value="注册" @click="checkTrueCode" class="L_t_resgter" />
				<div @click="Nprve()" class="L_n_prvebox">
					<span class="L_n_prvetxt">
						&lt;&lt;上一步
					</span>
				</div>
			</div>
			<div id="L_n_four" v-show="select==4">
				<div class="L_f_title">
					<span class="L_f_text">请记住您的账户信息！</span>
				</div>
				<div class="L_f_resmessage">
					<span>VID&nbsp;:{{resData.vid}}</span><br />
					<span>密码:{{resData.password}}</span>
				</div>
				<input type="button" value="确定" @click="retrunLo()" class="L_f_tbtn" />
			</div>
		</div>
	</div>
</template>

<script>
	//注册elementplus的message提示框
	import {
		ElMessage
	} from "element-plus"
	import QrcodeVue from "qrcode.vue"
	// ElMessage ({
	// 	message: 'This is a success message',
	// 	type: 'success',
	// })
	export default {
		components:{
			QrcodeVue
		},
		data() {
			return {
				//页面index
				select: -1,
				//是否填写完整判断
				fulls: false,
				nextfull: false,
				//注册数据
				data: {
					password: "",
					userName: "",
					gender: true,
					birthday: 0,
					email: "",
					phoneNum: ""
				},
				birthday: "",
				password: "",
				//登录数据
				Login: {
					vid: "",
					password: ""
				},
				//邮箱验证码
				checkemail: "",
				trueemail: "",
				UserData: {
					token: "",
					autoLogin: false,
					savePwd: false,
					savaTime: "",
					userVid: "",
					userPwd: ""
				},
				resData: {
					vid: "",
					password: "",
					pass: ""
				},
				key:''
			}
		},
		methods: {
			linkSocket() {
				var soket = "ws://120.76.177.46:5000/api/CodeApi/getCode"
				//socket在线监测
				var a = new WebSocket(soket)
				a.onopen = () => {
					a.send("1")
				};
				a.onmessage = (res) => {
					a.send("1")
					this.key= JSON.parse(res.data).CodeKey
					let data = JSON.parse(res.data)
					if(data.status){
						localStorage.setItem("voidUser",JSON.stringify({
							token:data.token,
							autoLogin: false,
							savePwd: false,
							savaTime: new Date().getTime(),
							userVid: data.userData.vid,
							userPwd: data.userData.password
						}))
						location.href='/'
					}
				};
			},
			//页面切换（0：登录 1：注册 2：注册的下一页）
			cSel(int) {
				if (int == 1) {
					if (this.select > 1) {
						return
					}
				}
				this.select = int
				//切换回登录时隐藏注册页的下一页
				if (int == 0||int ==-1) {
					this.fulls = false
					this.data = {
						password: "",
						userName: "",
						gender: true,
						birthday: 0,
						email: "",
						phoneNum: ""
					}
					this.checkEmail = ""
					this.password = ""
					this.birthday = ""
					this.checkemail=""
					if (JSON.parse(localStorage.getItem("voidUser")) != undefined || JSON.parse(localStorage.getItem(
							"voidUser")) != "") {
						if (JSON.parse(localStorage.getItem("voidUser")).savePwd) {
							this.Login.vid = JSON.parse(localStorage.getItem("voidUser")).userVid
							this.Login.password = JSON.parse(localStorage.getItem("voidUser")).userPwd
						}
					}
				} else {
					this.Login = {
						vid: "",
						password: ""
					}
				}
			},
			//检测input框是否填写完毕（若true则可点击下一页）
			txtchange() {
				let t = this;
				if (t.select == 1) {
					if (t.data.userName.trim() != "" && t.data.password.trim() != "" && t.password.trim() != "") {
						t.fulls = true;
					} else {
						t.fulls = false;
					}
				}
			},
			//检测确定密码是否与密码一致
			Checkpwd() {
				let t = this;
				if (t.select == 1) {
					if (t.data.password.trim() != t.password.trim()) {
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
				}
			},
			//检测是否符合密码规范（最少8位，且必须字母、数字加英文符号）
			CheckpwdType() {
				let t = this;
				if (t.select == 1) {
					let rg = /(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*])[a-z\d#@!~%^&*]{8,12}/i;
					//检测是否符合含有字母数字英文符号规范
					if (!rg.test(t.data.password)) {
						ElMessage({
							message: '密码为8~12位,且必须字母、数字加特殊符号',
							type: 'error'
						})
						return false
					}
					return true
				}
			},
			//检测用户名长度（长度需少于6位）
			Checkuser() {
				let t = this;
				if (t.data.userName.length > 20) {
					ElMessage({
						message: '用户名过长',
						type: 'error'
					})
					return false
				}
				return true
			},
			//注册账号下一步
			next() {
				if (!this.Checkuser()) {
					return
				}
				if (!this.CheckpwdType()) {
					return
				}
				if (!this.Checkpwd()) {
					return
				}
				this.select += 1
			},
			nextFull() {
				let t = this;
				if (t.data.birthday != "" && t.data.gender != "" && t.data.phoneNum != "") {
					t.nextfull = true;
				} else {
					t.nextfull = false;
				}
			},
			//改变出生日期框的输入类型
			changeTypef() {
				document.getElementsByClassName("L_n_birthday")[0].type = "date";
			},
			//转换为时间戳
			getTime() {
				if (this.birthday != "") {
					this.data.birthday = new Date(this.birthday).getTime();
				}
				this.checkTime();
			},
			//非空验证，验证出生日期不能大于当前时间
			checkTime() {
				if (this.birthday == "") {
					ElMessage({
						message: '出生日期不能为空',
						type: 'error'
					})
					return false
				}
				if (this.data.birthday >= new Date().getTime()) {
					ElMessage({
						message: '出生日期不能大于当前时间',
						type: 'error'
					})
					return false
				}
				return true;
			},
			//电话号码的非空验证
			checkPhone() {
				if (this.data.phoneNum == "") {
					ElMessage({
						message: '电话号码不能为空',
						type: 'error'
					})
					return false;
				}
				//验证电话号码是否正确
				let reg = new RegExp(
					/^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/
				)
				if (!reg.test(this.data.phoneNum)) {
					ElMessage({
						message: '请输入正确的电话号码',
						type: 'error'
					})
					return false;
				}
				return true;
			},
			//下一页验证
			Nnext() {
				if (!this.checkTime()) {
					return
				}
				if (!this.checkPhone()) {
					return
				}
				this.select += 1;
			},
			//上一页
			Nprve() {
				this.select -= 1;
			},
			//电子邮箱的非空验证
			checkEmail() {
				if (this.data.email == "") {
					ElMessage({
						message: '电子邮箱不能为空',
						type: 'error'
					})
					return false
				}
				//验证电子邮箱是否正确
				let rag = new RegExp(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
				if (!rag.test(this.data.email)) {
					ElMessage({
						message: '电子邮箱格式错误',
						type: 'error'
					})
					return false
				}
				return true
			},
			checkNum() {
				if (!this.checkEmail()) {
					return
				}
				let formdata = 'email=' + this.data.email
				this.axios.post('http://120.76.177.46:5000/api/PublicApi/getEmailCode', formdata, {
						headers: {
							'content-type': 'application/x-www-form-urlencoded'
						}
					})
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
			//注册验证
			checkTrueCode() {
				if (!this.checkEmail()) {
					return
				}
				if (this.checkemail.trim() != "" && this.checkemail == this.trueemail) {
					this.axios.post('http://120.76.177.46:5000/api/UserApi/register', JSON.stringify(this.data), {
							headers: {
								'content-type': 'application/json'
							}
						})
						.then(result => {
							console.log(result.data)
							if (result.data.code == 200) {
								result.data.data.password=this.data.password
								this.resData = result.data.data
								this.select = 4
								ElMessage({
									message: '注册成功',
									type: 'success'
								})
								this.data={
									password: "",
									userName: "",
									gender: true,
									birthday: 0,
									email: "",
									phoneNum: ""
								}
								this.checkEmail = ""
								this.password = ""
								this.birthday = ""
							} else {
								ElMessage({
									message: result.data.msg,
									type:'error'
								})
							}
						})
				}
			},
			retrunLo() {
				this.select = 0;
			},
			//vid的非空验证
			checkVid() {
				if (this.Login.vid.trim() == "") {
					ElMessage({
						message: 'VID不能为空',
						type: 'error'
					})
					return false
				}
				return true
			},
			//login密码非空验证
			checkLpwd() {
				if (this.Login.password.trim() == "") {
					ElMessage({
						message: '密码不能为空',
						type: 'error'
					})
					return false
				}
				return true
			},
			LoginDef() {
				let t = this;
				if (!t.checkVid()) {
					return
				}
				if (!t.checkLpwd()) {
					return
				}
				//访问接口
				t.axios.post('http://120.76.177.46:5000/api/UserApi/login',
						JSON.stringify(this.Login), //发送的数据（转为json格式）
						{
							headers: {
								'content-type': 'application/json'
							}
						}) //请求头
					.then(res => {
						if (res.data.msg == "操作成功") {
							//设置token
							t.UserData.token = res.data.data;
							//设置保存时间
							t.UserData.savaTime = new Date().getTime();
							t.UserData.userVid = t.Login.vid;
							t.UserData.userPwd = t.Login.password;
							//把数据保存到本地
							localStorage.setItem("voidUser", JSON.stringify(t.UserData));
							location.href = '/'
						} else {
							ElMessage({
								message: res.data.msg,
								type: 'error'
							})
						}
					})
			}
		},
		mounted() {
			this.linkSocket()
		},
		created() {
			if (JSON.parse(localStorage.getItem("voidUser")) != undefined && JSON.parse(localStorage.getItem(
					"voidUser")) != "") {
				let retime = ((new Date().getTime()) - JSON.parse(localStorage.getItem("voidUser")).savaTime) / 86400000;
				if (retime >= 7) {
					localStorage.removeItem("voidUser");
				}
				this.UserData.savePwd = JSON.parse(localStorage.getItem("voidUser")).savePwd;
				this.UserData.autoLogin = JSON.parse(localStorage.getItem("voidUser")).autoLogin;
				if (JSON.parse(localStorage.getItem("voidUser")).savePwd) {
					this.Login.vid = JSON.parse(localStorage.getItem("voidUser")).userVid
					this.Login.password = JSON.parse(localStorage.getItem("voidUser")).userPwd
				}
			}
		}
	}
</script>

<style>
	@import url("../VCss/All.css");
	@import url("../VCss/LoginCss.css");
	
	.upHover{
		transition: all 100ms;
		
	}
	.upHover:hover{
		transform: scale(1.05);
	}
	.upHover:active{
		transform: scale(0.995);
	}
</style>
