<template>
	<div style="margin: 0px auto; width: 1200px;">
		<div id="My_r_up" style="background-color: white; margin-top: 20px;">
			<div id="My_r_u_left" style="position: relative;">
				<img :src="imgfile" class="My_userimg" @mouseenter="upImg()" />
				<div class="My_uploaddiv" v-if="uploadimg" @mouseleave="upImg()" @click="OpenMess()">
					<img src="../../../public/upload.png" class="My_imgupload" />
				</div>
				<div style="text-align: left; padding-left: 20px;">
					<div class="My_username" style="font-size: 18px;">
						{{UserData.userName}}
						<span style="margin-left: 10px;font-weight: bold;">LV{{userExc.userLV}}</span>
					</div>
					<div>
						<el-progress :percentage="userExc.userPre" :color="customColors" />
					</div>
					<div style="margin-top:10px ; width: 100%;">
						<span>粉丝:</span>
						<span
							style="font-size: 18px; margin-left: 10px; font-weight: bold; padding-right: 10px; border-right: 1px solid gainsboro;">{{UserData.fanNum}}</span>
						<span style="margin-left: 10px;">文章:</span>
						<span
							style="font-size: 18px; margin-left: 10px; font-weight: bold; padding-right: 10px; border-right: 1px solid gainsboro;">{{MyPageList.total}}</span>
						<span style="margin-left: 10px;">关注:</span>
						<span
							style="font-size: 18px; margin-left: 10px; font-weight: bold; padding-right: 10px;">{{GetLikeUserData.total}}</span>
					</div>
					<div style="margin-top:10px ;">
						<span>个性签名:</span>
						<span style="margin-left: 5px;">{{userresume}}</span>
					</div>
				</div>
				<div style="position: absolute; right: 200px; display: flex; align-items: center;">
					<img src="../../assets/Svg/money-dollar-circle-fill.svg">
					<div style="font-size: 13px; margin-left: 10px;">
						{{UserData.coin}}
					</div>
				</div>
				<div @click="developedDef()" style="-webkit-user-select: none;
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
					<span>充值</span>
				</div>
			</div>

		</div>
		<!-- 头像上传 -->
		<!-- 头像图片预览 -->
		<el-dialog v-model="OpenMessage" title="头像上传" width="50%" draggable>
			<div class="My_mess_box">
				<div class="My_mess_imgbox">
					<div class="My_mess_leftbox">
						<img :src="lookimg" class="My_mess_leftimg" />
					</div>
					<div class="My_mess_rightbox">
						<img :src="lookimg" class="My_mess_rightimg" />
					</div>
				</div>
				<div class="My_mess_btninp">
					<span>上传图片</span>
					<input type="file" accept="image/*" class="My_mess_fileinp" @change="imgLookNow()" />
				</div>
				<div class="My_mess_btn_box">
					<el-button class="My_mess_btncancel" @click="OpenMess()">取消</el-button>
					<el-button type="primary" class="My_mess_btnreturn" @click="UploadImg()">确定</el-button>
					<!-- <input type="button" value="取消" class="My_mess_btncancel" @click="OpenMess()" />
					<input type="button" value="提交" class="My_mess_btnreturn" @click="UploadImg()" /> -->
				</div>
			</div>
		</el-dialog>
		<div id="My_all">
			<div id="My_left">
				<ul class="My_left_ul">
					<li @click="Sec(0)" :class="{My_select:select==0}">个人资料</li>
					<li @click="Sec(1)" :class="{My_select:select==1}">我的收藏</li>
					<li @click="Sec(2)" :class="{My_select:select==2}">我的足迹</li>
					<li @click="Sec(3)" :class="{My_select:select==3}">文章管理</li>
					<li @click="Sec(4)" :class="{My_select:select==4}">账号设置</li>
					<li @click="Sec(5)" :class="{My_select:select==5}">关注列表</li>
					<li @click="Sec(6)" :class="{My_select:select==6}">登录记录</li>
				</ul>
			</div>
			<div id="My_right">
				<div id="My_r_middle">
					<!-- 账号设置 -->
					<div class="My_mycenter" v-if="select==0">
						<ul class="My_m_content_ul">
							<li class="My_m_content_li_top">
								账号设置
							</li>
							<li class="My_m_content_li" @mouseenter="nameIconChange()" @mouseleave="nameIconChange()">
								<span class="My_m_content_li_span">用户昵称</span>
								<div class="My_m_nameShow" v-show="!inputstate.nameState">
									<span class="My_m_nametxt">{{username}}</span>
									<div class="My_m_nameicon" v-show="inputicon.nameicon" @click="nameChange(0)">
										<img src="../../../public/bian.png" class="My_m_icon">
										<span>编辑</span>
									</div>
								</div>
								<div class="My_m_hide" v-show="inputstate.nameState">
									<input type="text" class="My_name_nameinput" v-model="username"
										v-show="inputstate.nameState" />
									<input type="button" class="My_name_enter" value="取消" @click="nameChange(1)" />
									<input type="button" class="My_name_enter" value="确定" @click="nameChange(2)" />
								</div>
							</li>
							<li class="My_m_content_li">
								<span class="My_m_content_li_span">VID</span>
								<div class="My_m_nameShow">
									<span>{{UserData.vid}}</span>
								</div>
							</li>
							<li class="My_m_content_li" @mouseenter="resumeIconChange()"
								@mouseleave="resumeIconChange()">
								<span class="My_m_content_li_span">个性签名</span>
								<div class="My_m_nameShow" v-show="!inputstate.resumeState">
									<span class="My_m_nametxt">{{userresume}}</span>
									<div class="My_m_nameicon" v-show="inputicon.resumeicon" @click="resumeChange(0)">
										<img src="../../../public/bian.png" class="My_m_icon">
										<span>编辑</span>
									</div>
								</div>
								<div class="My_m_hide" v-show="inputstate.resumeState">
									<input type="text" class="My_name_nameinput" v-model="UserData.resume"
										v-show="inputstate.resumeState" />
									<input type="button" class="My_name_enter" value="取消" @click="resumeChange(1)" />
									<input type="button" class="My_name_enter" value="确定" @click="resumeChange(2)" />
								</div>
							</li>
							<li class="My_m_content_li" @mouseenter="sexIconChange()" @mouseleave="sexIconChange()">

								<span style="margin-left: 30px;">性</span>
								<span style="margin-left: 30px;">别</span>
								<div class="My_m_nameShow" v-show="!inputstate.sexState">
									<span>{{usersex}}</span>
									<div class="My_m_nameicon" v-if="inputicon.sexicon" @click="sexChange()">
										<img src="../../../public/bian.png" class="My_m_icon">
										<span>编辑</span>
									</div>
								</div>
								<div class="My_m_hide" v-if="inputstate.sexState">
									<input type="radio" class="My_m_sexman" name="sex" :value="true"
										v-model="UserData.gender" /><span>男</span>
									<input type="radio" class="My_m_sexwomen" name="sex" :value="false"
										v-model="UserData.gender" /><span>女</span>
									<input type="button" class="My_name_enter" value="取消" @click="sexChange(1)" />
									<input type="button" class="My_name_enter" value="确定" @click="sexChange(2)" />
								</div>
							</li>
							<li class="My_m_content_li" @mouseenter="birIconChange()" @mouseleave="birIconChange()">
								<span class="My_m_content_li_span">出生日期</span>
								<div class="My_m_nameShow" v-if="!inputstate.birthdayState">
									<span>{{userbirthday}}</span>
									<div class="My_m_nameicon" v-if="inputicon.birthdayicon" @click="birCange(0)">
										<img src="../../../public/bian.png" class="My_m_icon">
										<span>编辑</span>
									</div>
								</div>
								<div class="My_m_hide" v-if="inputstate.birthdayState">
									<el-date-picker v-model="userbirinp" type="date" placeholder="输入日期">
									</el-date-picker>
									<input type="button" value="取消" class="My_name_enter" @click="birCange(1)" />
									<input type="button" value="确定" class="My_name_enter" @click="birCange(2)" />
								</div>
							</li>
						</ul>
					</div>
					<!-- 我的收藏 -->
					<el-dialog :closed="dialogClosed()" v-model="dialogVisable" title="新建收藏夹" width="30%" draggable>
						<input type="text" v-model="folderData.folderName" placeholder="请输入收藏夹名"
							style="width: 100%; border: 1px solid gainsboro; margin-bottom: 5px; height: 40px;display:flex ; align-items: center;justify-content: center;" />
						<template #footer>
							<span class="dialog-footer">
								<el-button @click="SetDialog()">取消</el-button>
								<el-button type="primary" @click="uploadfolder()">确定</el-button>
							</span>
						</template>
					</el-dialog>
					<!-- 提示删除收藏文件夹 -->
					<el-dialog v-model="deleteForder" title="提示" width="30%" draggable>
						<div style="height: 100px; width: 100%;">
							<div
								style="display: flex;flex-flow: row;align-items: center;justify-content: center; margin-bottom: 40px; font-size: 18px; text-align: center;">
								<div style="display: flex;margin-right: 10px;">
									<img src="../../assets/Svg/alarm-warning-fill.svg">
								</div>
								<div style="display: flex;">
									<span>确定删除收藏夹吗？</span>
								</div>
							</div>
							<el-button @click="DeleteForder()">取消</el-button>
							<el-button @click="Delete_FolderDef(DelFolder)" type="primary">确定</el-button>
						</div>
					</el-dialog>
					<!-- 提示删除收藏文件夹中的文章 -->
					<el-dialog v-model="delFsave" title="提示" width="30%" draggable>
						<div style="height: 100px; width: 100%;">
							<div
								style="display: flex;flex-flow: row;align-items: center;justify-content: center; margin-bottom: 40px; font-size: 18px; text-align: center;">
								<div style="display: flex;margin-right: 10px;">
									<img src="../../assets/Svg/alarm-warning-fill.svg">
								</div>
								<div style="display: flex;">
									<span>确定删除文章</span>
								</div>
							</div>
							<el-button @click="DeleteSave()">取消</el-button>
							<el-button @click="Delete_SaveDef(delFsave_j)" type="primary">确定</el-button>
						</div>
					</el-dialog>
					<div class="My_Collection" v-if="select==1">
						<ul class="My_Collection_ul1"
							style=" width: 20%;height: auto;  border-right:1px solid gainsboro ;overflow: scroll;overflow-x: hidden;">
							<li :class="{select:saveFileList.getFid==it.fsId}" @click="selectFile(it.fsId)"
								style="position: relative; width: 100%; height: 70px; border-bottom: 1px solid gainsboro; line-height: 70px;text-align: left;"
								v-for="(it,i) in folderList" :key="i">
								<a :title="it.folderName" style="margin-left: 30px; font-size: 13px;">{{it.folderName}}</a>
								<div style="position: absolute; top: 4px;right: 10px;">
									<img @click="DeleteForder(it)" class="Svg"
										src="../../assets/Svg/delete-bin-6-line.svg">
								</div>
							</li>
							<li @click="SetDialog()"
								style="width: 100%; height: 70px; background-color: white; border-bottom: 1px solid gainsboro; line-height: 70px;text-align: left;">
								<span style="margin-left: 30px; font-size: 13px;">新增收藏夹</span>
							</li>
						</ul>
						<div style="margin-left:1%; width: 78%;">
							<ul style="height: 655px;">
								<el-empty description="当前收藏夹为空" v-if="saveFileList.list.length==0" />
								<li class="My_Collection_li" v-for="(it,i) in saveFileList.list" :key="i">
									<div class="A_title">
										<router-link v-if="it.pid != 0" target="_blank" :to="'/Pageview?pid='+it.pid">
											{{it.title}}
										</router-link>
										<view v-else>
											{{it.title}}
										</view>
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
													<img class="Svg" src="../../assets/Svg/eye-line.svg">
													<span class="Svg_num">{{it.readNum}}</span>
												</div>
											</div>
											<div class="Svg_all_F1">
												<div style="display: flex;align-items: center;">
													<img class="Svg" src="../../assets/Svg/thumb-up-line.svg">
													<span class="Svg_num">{{it.likeNum}}</span>
												</div>
											</div>
											<div class="Svg_all_F2">
												<div style="display: flex;align-items: center;">
													<img class="Svg" src="../../assets/Svg/time-line.svg">
													<span class="Svg_num">{{it.time}}</span>
												</div>
											</div>
											<div class="Svg_all_F3">
												<img @click="DeleteSave(it)" class="Svg"
													src="../../assets/Svg/delete-bin-6-line.svg">
											</div>
										</div>
									</div>
								</li>
							</ul>
							<el-pagination v-if="saveFileList.limt>1" @current-change="SaveFileChange"
								:current-page="saveFileList.page" background layout="prev, pager, next"
								:page-count="saveFileList.limt" />
						</div>
					</div>
					<!-- 提示删除 -->
					<el-dialog v-model="dialogdeletePage" title="提示" width="30%" draggable>
						<div style="height: 100px; width: 100%;">
							<div
								style="display: flex;flex-flow: row;align-items: center;justify-content: center; margin-bottom: 40px; font-size: 18px; text-align: center;">
								<div style="display: flex;margin-right: 10px;">
									<img src="../../assets/Svg/alarm-warning-fill.svg">
								</div>
								<div style="display: flex;">
									<span>确定删除吗</span>
								</div>
							</div>
							<el-button @click="DeletePageDialog()">取消</el-button>
							<el-button type="primary" @click="Delete_articleDef(Delarticle)">确定</el-button>
						</div>
					</el-dialog>
					<!-- 我的足迹 -->
					<div class="My_footprint" v-if="select==2">
						<ul style="width: 100%;height: 655px;">
							<el-empty description="暂无历史记录" v-if="Hostility.length==0" />
							<li class="My_Collection_li" v-show="i>=(histroyPage-1)*5&&i<(histroyPage-1)*5+5"
								v-for="(it,i) in Hostility" :key="i">
								<div class="A_title">
									<router-link v-if="it.pageData.pid!=0" target="_blank"
										:to="'/Pageview?pid='+it.pageData.pid">
										{{it.pageData.title}}
									</router-link>
									<view v-else>
										{{it.pageData.title}}
									</view>
								</div>
								<div class="A_content" style="text-align: left; margin: 10px;">
									<div v-if="it.pageData.post!=null" style="width: auto; height: auto;">
										<img class="A_content_img" :src="it.pageData.post">
									</div>
									<div class="A_content_content">
										<div class="A_cont_show">
											{{it.pageData.content}}
										</div>
										<div style="color: gray; position: absolute;right: 50px;top: 0px;">
											{{it.time}}
										</div>
										<div class="Svg_all">
											<div style="display: flex;align-items: center;">
												<img class="Svg" src="../../assets/Svg/eye-line.svg">
												<span class="Svg_num">{{it.pageData.readNum}}</span>
											</div>
										</div>
										<div class="Svg_all1">
											<div style="display: flex;align-items: center;">
												<img class="Svg" src="../../assets/Svg/thumb-up-line.svg">
												<span class="Svg_num">{{it.pageData.likeNum}}</span>
											</div>
										</div>
										<div class="Svg_all2">
											<div style="display: flex;align-items: center;">
												<img class="Svg" src="../../assets/Svg/time-line.svg">
												<span class="Svg_num">{{it.pageData.time}}</span>
											</div>
										</div>
									</div>
								</div>
							</li>
						</ul>
						<el-pagination small :page-size="5" :total="Hostility.length" layout="prev, pager, next"
							background @current-change="hisSel" />
					</div>
					<!-- 文章管理 -->
					<div class="My_security" v-if="select==3">
						<ul style="width: 100%;height: 655px;">
							<el-empty description="暂无发布记录" v-if=" MyPageList.list==0" />
							<li class="My_Collection_li" v-for="(it,i) in MyPageList.list" :key="i">
								<div class="A_title">
									<router-link target="_blank" :to="'/Pageview?pid='+it.pid">{{it.title}}
									</router-link>
								</div>
								<div class="A_content" style="text-align: left; margin: 10px;">
									<div v-if="it.post!=null&&it.post!=''" style="width: auto; height: auto;">
										<img class="A_content_img" :src="it.post">
									</div>
									<div class="A_content_content">
										<div class="A_cont_show">
											{{it.content}}
										</div>
										<div v-if="it.pass" class="Ispasst" style="">已过审</div>
										<div v-else class="Ispassf">未过审</div>
										<div class="Svg_all">
											<div style="display: flex;align-items: center;">
												<img class="Svg" src="../../assets/Svg/eye-line.svg">
												<span class="Svg_num">{{it.readNum}}</span>
											</div>
										</div>
										<div class="Svg_all1">
											<div style="display: flex;align-items: center;">
												<img class="Svg" src="../../assets/Svg/thumb-up-line.svg">
												<span class="Svg_num">{{it.likeNum}}</span>
											</div>
										</div>
										<div class="Svg_all2">
											<div style="display: flex;align-items: center;">
												<img class="Svg" src="../../assets/Svg/time-line.svg">
												<span class="Svg_num">{{it.time}}</span>
											</div>
										</div>
										<div class="Svg_all3">
											<img @click="DeletePageDialog(it)" class="Svg"
												src="../../assets/Svg/delete-bin-6-line.svg">
										</div>
									</div>
								</div>
							</li>
						</ul>
						<el-pagination @current-change="myPageChange" :current-page="MyPageList.page" background
							layout="prev, pager, next" :page-count="MyPageList.limt" />
					</div>
					<!-- 账号设置 -->
					<div class="My_useraccount" v-if="select==4">
						<ul class="My_useraccount_ul">
							<li class="My_useraccount_li_top">
								账号设置
							</li>
							<li class="My_useraccount_li">
								<div class="My_useraccount_li_div_left">
									<span class="My_useraccount_li_span">密</span>
									<span class="My_useraccount_li_span">码</span>
								</div>
								<div class="My_useraccount_li_div_right">
									<a href="/User/Modify" style="color: deepskyblue;" target="_blank">修改密码</a>
								</div>
							</li>
							<li class="My_useraccount_li">
								<div class="My_useraccount_li_div_left">
									<span class="My_useraccount_li_span">手</span>
									<span class="My_useraccount_li_span">机</span>
									<span style="margin-left: 50px;"
										v-if="!inputstate.phoneState">{{UserData.phoneNum}}</span>
									<div style="display: inline-block;" v-if="inputstate.phoneState">
										<input class="My_name_nameinput" type="text" v-model="UserData.phoneNum" />
										<input class="My_name_enter" type="button" @click="cancelPh()" value="取消" />
										<input class="My_name_enter" type="button" @click="updatePhDef()" value="确定" />
									</div>
								</div>
								<div @click="updatePh()" v-show="inputicon.phonicon"
									class="My_useraccount_li_div_right">
									修改手机
								</div>
							</li>
							<li class="My_useraccount_li">
								<div class="My_useraccount_li_div_left">
									<span class="My_useraccount_li_span">邮</span>
									<span class="My_useraccount_li_span">箱</span>
									<span style="margin-left: 50px;"
										v-if="!inputstate.emailState">{{UserData.email}}</span>
									<div style="display: inline-block;" v-if="inputstate.emailState">
										<input class="My_name_nameinput" type="text" v-model="UserData.email" />
										<input class="My_name_enter" @click="cancelEm()" type="button" value="取消" />
										<input class="My_name_enter" type="button" @click="updateEmDef()" value="确定" />
									</div>
								</div>
								<div @click="updateEm()" v-show="inputicon.emailicon"
									class="My_useraccount_li_div_right">
									修改邮箱
								</div>
							</li>
							<li class="My_useraccount_li" style="border: none;">

								<div class="My_useraccount_li_div_left">
									<span class="My_useraccount_li_span">注销账号</span>
								</div>
								<div @click="cancelPwd" class="My_useraccount_li_div_right">
									退出登录
								</div>
							</li>
						</ul>
					</div>
					<!-- 关注列表 -->
					<div class="My_security" style="" v-if="select==5">
						<ul style="width: 100%;height:655px ">
							<el-empty description="暂无关注" v-if="GetLikeUserData.list==0" />
							<li style="position: relative; margin-left: 10px;margin-right: 10px; border-bottom:1px solid gainsboro; height: 120px; display: flex;flex-flow: row; align-items: center;"
								v-for="i in GetLikeUserData.list" :key="i">
								<img :src="i.imgUrl" style="width: 60px; height: 60px; border-radius: 50%;">
								<div style="text-align: left; margin-left: 10px;">
									<div id="">
										{{i.userName}}
									</div>
									<div style="font-size: 14px;">
										{{i.resume}}
									</div>
								</div>
								<div @click="LikeUserDef(i)" style="-webkit-user-select: none;
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
						<el-pagination @current-change="LikePageChange" :current-page="GetLikeUserData.page" background
							layout="prev, pager, next" :page-count="GetLikeUserData.limt" />
					</div>
					<div class="My_footprint" style="height:480px;" v-if="select==6">
						<div style="height: 450px;">
							<el-table :data="tableData.list" stripe style="width: 100%;">
								<el-table-column prop="loginIP" label="登录IP" width="400px" />
								<el-table-column prop="address" label="登录地址" width="400px" />
								<el-table-column prop="loginTime" label="登陆时间" width="150px" />
							</el-table>
						</div>
						<el-pagination v-if="tableData.limt>1" @current-change="tableChange" :current-page="tableData.page" background
							layout="prev, pager, next" :page-count="tableData.limt" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//import { ElMessageBox } from 'element-plus'
	// ElMessageBox.alert(
	// 	'<input type="File">',
	// 	'HTML String',
	// 	{
	// 		dangerouslyUseHTMLString: true,
	// 	}
	// )
	import {
		GetSaveList,
		GetsaveFile,
		AddSaveFolder,
		Delete_article,
		Delete_Folder,
		Delete_Folder_article
	} from '../../api/MyselfApi.js'
	import {
		ElMessage
	} from 'element-plus'
	import {
		ElLoading
	} from 'element-plus'
	import {
		GetHost
	} from '../../api/HostilityAPI.js'
	import {
		GetMyList,
		getLoginData
	} from '../../api/MyPageApi.js'
	import {
		ElMessageBox
	} from 'element-plus'
	import {
		GetLv,
		GetPre
	} from '../../VoidJS/exc.js'
	import {
		GetLikeUserList
	} from '../../api/NewsApi.js'
	import {
		getIP
	} from '../../api/apiConf.js'
	import {
		CheckLikeUser,
		LikeUser
	} from '../../api/pageApi.js'
	import {
		GetDate
	} from '../../api/publicUse.js'
	export default {
		data() {
			return {
				//页面flag
				select: 0,
				uploadimg: false,
				//用户数据
				UserData: {
					vid: "",
					userName: "",
					gender: true,
					birthday: 0,
					email: "",
					phoneNum: "",
					imgUrl: "",
					resume: ""
				},
				// 打开删除文件夹提示模态框
				deleteForder: false,
				//初始图片
				imgfile: "http://localhost:8080/img/avatar.30aa1efc.png",
				//图片上传框的显示
				OpenMessage: false,
				//上传图片文件
				file: "",
				//图片请求URL
				imgheader: 'http://120.76.177.46:5000/api/PublicApi/getImg?imgUrl=',
				//预览
				lookimg: '',
				//编辑框显示
				inputstate: {
					nameState: false,
					sexState: false,
					birthdayState: false,
					pwdState: false,
					phoneState: false,
					emailState: false,
					resumeState: false
				},
				Delarticle: {

				},
				DelFolder: {

				},
				//图标显示
				inputicon: {
					nameicon: false,
					sexicon: false,
					birthdayicon: false,
					emailicon: true,
					phonicon: true,
					resumeicon: false
				},
				//显示数据
				username: "",
				usersex: "",
				userbirthday: "",
				userbirinp: "",
				useremailinp: "",
				userphoneinp: "",
				userresume: "",
				userExc: {
					userLV: "",
					userPre: 0
				},
				Hostility: [],
				histroyPage: 1,
				MyPageList: {
					list: [],
					limt: 1,
					page: 1
				},
				folderList: [],
				saveFileList: {
					list: [],
					limt: 1,
					page: 1,
					getFid: 0
				},
				dialogVisable: false,
				dialogdeletePage: false,
				folderData: {
					vid: 0,
					folderName: ""
				},
				LikeList: [],
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
				],
				GetLikeUserData: {
					list: [],
					limt: 1,
					page: 1,
					total: 0
				},
				deletePage: [],
				delFsave: false,
				delFsave_j: {
				},
				tableData:{
					list:[],
					limt:1,
					page:1
				}
			}
		},
		methods: {
			tableChange(e){
				this.tableData.page=e
				this.GetTableDef()
			},
			GetTableDef(){
				getLoginData({
					t:this,
					data:{
						mode:3,
						page:this.tableData.page,
						vid:JSON.parse(localStorage.getItem("voidUser")).userVid,
						size:10
					},
					token:JSON.parse(localStorage.getItem("voidUser")).token,
					out:res=>{
						console.log(res)
						res.data.data.forEach(i=>{
							i.loginTime=GetDate(i.loginTime)
						})
						this.tableData.list=res.data.data
						this.tableData.limt=res.data.limt
					}
				})
			},
			SaveFileChange(e) {
				this.saveFileList.page = e
				this.selectFile(this.saveFileList.getFid)
			},
			hisSel(i) {
				this.histroyPage = i
			},
			//页面切换
			Sec(int) {
				if (int == this.select) {
					return
				}
				this.select = int
			},
			//头像上传图片按钮显示与否
			upImg() {
				this.uploadimg = !this.uploadimg;
			},
			OpenMess() {
				//初始化头像
				if (this.OpenMessage) {
					if (this.UserData.imgUrl == "") {
						this.imgfile = "http://localhost:8080/img/avatar.30aa1efc.png"
					} else {
						this.lookimg = this.imgheader + this.UserData.imgUrl
					}
					this.file = ""
				}
				this.OpenMessage = !this.OpenMessage
			},
			imgLookNow() {
				//获取文件
				let event = document.getElementsByClassName("My_mess_fileinp")[0];
				let files = event.files;
				if (files && files.length > 0) {
					this.file = files[0];
					if (this.file.size > 1024 * 1024 * 5) {
						ElMessage({
							message: '图片大小不能超过5M',
							type: 'error'
						})
						return
					}
					//通过file对象生成一个可用的图像URL
					//获取windows对象的URL工具
					let URL = window.URL || window.webkitURL;
					//通过URL生成目标URL
					let ImgURL = URL.createObjectURL(this.file)
					this.lookimg = ImgURL
					//释放imgurl（一旦释放则imgurl不可使用）
				}
			},
			UploadImg() {
				if (this.file == undefined || this.file == "") {
					ElMessage({
						message: '请选择文件',
						type: 'error'
					})
					return
				}
				//判断图片格式
				let fileLength = this.file.name.split('.')
				let filetype = fileLength[fileLength.length - 1].toUpperCase()
				console.log(filetype)
				if (filetype != "JPG" && filetype != "PNG") {
					ElMessage({
						message: '图片格式不支持',
						type: 'error'
					})
					return
				}
				//创建一个formdata
				var formdata = new FormData();
				Object.defineProperty(this.file, 'name', {
					writable: true
				})
				this.file.name = new Date().getTime();
				formdata.append("data", this.file)
				//设置请求头与token
				var config = {
					headers: {
						'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("voidUser")).token
					}
				}
				//创建加载框
				var loading = ElLoading.service({
					lock: true,
					text: '上传中···',
					background: 'rgba(180, 180, 180, 0.7)'
				})
				//与图片上传接口交互
				this.axios.post('http://120.76.177.46:5000/api/UserApi/updateFile', formdata, config)
					.then(res => {
						//数据绑定
						this.UserData.imgUrl = res.data.data[0]
						this.imgfile = this.imgheader + res.data.data[0]
						//与用户修改接口交互
						this.axios.put('http://120.76.177.46:5000/api/UserApi/updateData', JSON.stringify(this
								.UserData), {
								headers: {
									'content-type': 'application/json',
									'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("voidUser")).token
								}
							})
							.then(resf => {
								//判断是否修改成功
								if (!resf.data.data) {
									loading.close()
									ElMessage({
										message: '上传失败',
										type: 'error'
									})
									return
								}
								//关闭加载框
								loading.close()
								ElMessage({
									message: '上传成功',
									type: 'success'
								})
								this.OpenMessage = false
								this.file = ""
							})
					})
			},
			//用户数据修改
			updataUser() {
				//与后端交互
				this.axios.put('http://120.76.177.46:5000/api/UserApi/updateData', JSON.stringify(this.UserData), {
					headers: {
						'content-type': 'application/json',
						'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("voidUser")).token
					},
				}).then(res => {
					if (res.data.data) {
						ElMessage({
							message: '修改成功',
							type: 'success'
						})
					} else {
						ElMessage({
							message: '修改失败',
							type: 'error'
						})
					}
				})
			},
			//修改用户名
			nameChange(obj) {
				//取消按钮
				if (obj == 1) {
					this.inputstate.nameState = !this.inputstate.nameState
					this.username = this.UserData.userName
				} else if (obj == 2) { //确定按钮
					this.inputstate.nameState = !this.inputstate.nameState
					this.UserData.userName = this.username
					this.updataUser()
				} else { //用户名编辑按钮
					this.inputstate.nameState = !this.inputstate.nameState
				}
			},
			//用户名编辑按钮显示与否
			nameIconChange() {
				this.inputicon.nameicon = !this.inputicon.nameicon
			},
			//修改个性签名
			resumeChange(obj) {
				//取消按钮
				if (obj == 1) {
					this.inputstate.resumeState = !this.inputstate.resumeState
					this.UserData.resume = this.userresume
				} else if (obj == 2) { //确定按钮
					this.inputstate.resumeState = !this.inputstate.resumeState
					this.userresume = this.UserData.resume
					this.updataUser()
				} else { //用户名编辑按钮
					this.inputstate.resumeState = !this.inputstate.resumeState
				}
			},
			//个性签名编辑按钮显示与否
			resumeIconChange() {
				this.inputicon.resumeicon = !this.inputicon.resumeicon
			},
			//修改性别
			sexChange(obj) {
				//取消按钮
				if (obj == 1) {
					this.inputstate.sexState = !this.inputstate.sexState
					if (this.usersex == "男") {
						this.UserData.gender = true
					} else {
						this.UserData.gender = false
					}
				} else if (obj == 2) { //确定按钮
					this.inputstate.sexState = !this.inputstate.sexState
					this.updataUser()
					if (this.UserData.gender) {
						this.usersex = "男"
					} else {
						this.usersex = "女"
					}
				} else { //点击编辑按钮
					this.inputstate.sexState = !this.inputstate.sexState
				}
				this.inputicon.sexicon = false
			},
			//性别编辑按钮出现与否
			sexIconChange() {
				this.inputicon.sexicon = !this.inputicon.sexicon
				// console.log(this.inputicon.sexicon)
			},
			//修改时间格式
			timechick(date) {
				if (date < 10) {
					return "0" + date
				} else {
					return date
				}
			},
			//把获取到的时间戳转换为时间
			timeChange() {
				let date = new Date(this.UserData.birthday);
				let year = this.timechick(date.getFullYear())
				let month = this.timechick(date.getMonth() + 1)
				let day = this.timechick(date.getDate())
				this.userbirthday = year + "/" + month + "/" + day
			},
			//出生日期的修改
			birCange(obj) {
				if (obj == 1) { //取消按钮
					this.inputstate.birthdayState = !this.inputstate.birthdayState
				} else if (obj == 2) { //确定按钮
					this.inputstate.birthdayState = !this.inputstate.birthdayState
					this.UserData.birthday = new Date(this.userbirinp).getTime()
					this.timeChange()
					this.updataUser()
				} else { //出生日期编辑按钮
					this.inputstate.birthdayState = !this.inputstate.birthdayState
				}
			},
			//出生日期编辑按钮的显示与否
			birIconChange() {
				this.inputicon.birthdayicon = !this.inputicon.birthdayicon
			},
			GetUSerData() {
				//与后台交互获取用户数据
				this.axios.get('http://120.76.177.46:5000/api/UserApi/user', {
						headers: {
							'content-type': 'application/json',
							'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("voidUser")).token
						}
					})
					.then(res => {
						//绑定数据
						this.UserData = res.data.data
						//绑定用户名
						this.username = this.UserData.userName
						this.userresume = this.UserData.resume
						this.userExc.userLV = GetLv(this.UserData.exc)
						this.userExc.userPre = parseInt(GetPre(this.UserData.exc).replace("%", ""))
						//绑定用户头像
						if (this.UserData.imgUrl != "") {
							this.imgfile = this.imgheader + this.UserData.imgUrl
							this.lookimg = this.imgfile
						} else {
							this.imgfile = 'http://localhost:8080/img/avatar.30aa1efc.png'
						}
						//绑定用户性别
						if (this.UserData.gender) {
							this.usersex = "男"
						} else {
							this.usersex = "女"
						}
						//绑定用户出生日期
						this.timeChange()
						this.userbirinp = this.userbirthday
					})
			},
			selectFile(fid) {
				this.saveFileList.getFid = fid
				this.saveFileList.list = []
				GetsaveFile({
					t: this,
					data: {
						sfid: this.saveFileList.getFid,
						page: this.saveFileList.page
					},
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					out: res => {
						this.saveFileList.limt = res.data.limt
						this.saveFileList.list = res.data.data
						this.saveFileList.list.forEach(i => {
							if (i == null) {
								i.title = "该文章已被删除"
								i.content = "暂无",
									i.time = new Date().getTime(),
									i.readNum = 0,
									i.likeNum = 0,
									i.imgUrl = ""
							}
							i.time = GetDate(i.time)
							i.content = i.content.replace(/<(?:.|\s)*?>/g, "")
						})
					}
				})
			},
			SetDialog() {
				this.dialogVisable = !this.dialogVisable
				this.folderData = {}
			},
			DeletePageDialog(obj) {
				this.dialogdeletePage = !this.dialogdeletePage
				this.Delarticle = obj
			},
			DeleteForder(obj) {
				this.deleteForder = !this.deleteForder
				this.DelFolder = obj
			},
			DeleteSave(obj) {
				this.delFsave = !this.delFsave
				this.delFsave_j = obj
			},
			dialogClosed() {
				this.folderData = {}
			},
			uploadfolder() {
				if (this.folderData.folderName == "" || this.folderData.folderName == undefined) {
					ElMessage({
						message: '收藏夹名不能为空',
						type: 'error'
					})
					return
				}
				this.folderData.vid = JSON.parse(localStorage.getItem("voidUser")).userVid
				AddSaveFolder({
					t: this,
					data: this.folderData,
					token: JSON.parse(localStorage.getItem("voidUser")).token
				})
			},
			updateEm() {
				this.inputstate.emailState = !this.inputstate.emailState
				this.inputicon.emailicon = !this.inputicon.emailicon
				this.useremailinp = this.UserData.email
			},
			updatePh() {
				this.inputstate.phoneState = !this.inputstate.phoneState
				this.inputicon.phonicon = !this.inputicon.phonicon
				this.userphoneinp = this.UserData.phoneNum
			},
			cancelEm() {
				this.inputstate.emailState = !this.inputstate.emailState
				this.inputicon.emailicon = !this.inputicon.emailicon
				this.UserData.email = this.useremailinp
			},
			cancelPh() {
				this.inputstate.phoneState = !this.inputstate.phoneState
				this.inputicon.phonicon = !this.inputicon.phonicon
				this.UserData.phoneNum = this.userphoneinp
			},
			updateEmDef() {
				var telReg = !!this.UserData.email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/)
				if (telReg == false) {
					ElMessage({
						message: '请输入正确的邮箱',
						type: 'error'
					})
					return
				}
				this.updataUser()
				this.inputstate.emailState = !this.inputstate.emailState
				this.inputicon.emailicon = !this.inputicon.emailicon
			},
			updatePhDef() {
				var telReg = !!this.UserData.phoneNum.match(
					/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
				if (telReg == false) {
					ElMessage({
						message: '请输入正确的电话号码',
						type: 'error'
					})
					return
				}
				this.updataUser()
				this.inputstate.phoneState = !this.inputstate.phoneState
				this.inputicon.phonicon = !this.inputicon.phonicon
			},
			cancelPwd() {
				ElMessageBox.confirm('是否确定退出', '提醒', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
					localStorage.removeItem("voidUser")
					location.href = '/'
				})
			},
			//获取关注列表
			GetLikeUsersDef() {
				GetLikeUserList({
					t: this,
					data: {
						page: this.GetLikeUserData.page,
						size: 5
					},
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					out: res => {
						res.data.data.forEach(i => {
							i.imgUrl = getIP() + "/PublicApi/getImg?imgUrl=" + i.imgUrl
							CheckLikeUser({
								t: this,
								vid: i.vid,
								token: JSON.parse(localStorage.getItem("voidUser")).token,
								out: rest => {
									i.LikeUser = rest
								}
							})
						})
						this.GetLikeUserData.limt = res.data.limt
						this.GetLikeUserData.list = res.data.data
						this.GetLikeUserData.total = res.data.total
						console.log(this.GetLikeUserData)
					}
				})
			},
			LikeUserDef(it) {
				LikeUser({
					t: this,
					vid: it.vid,
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					out: res => {
						console.log(res)
						it.LikeUser = !it.LikeUser
					}
				})
			},
			LikePageChange(e) {
				this.GetLikeUserData.page = e
				this.GetLikeUsersDef()
			},
			GetMyPageDef() {
				GetMyList({
					t: this,
					data: {
						vid: JSON.parse(localStorage.getItem("voidUser")).userVid,
						page: this.MyPageList.page,
						size: 5,
						passMode: 2,
						mode: 3
					},
					out: res => {
						this.MyPageList.limt = res.data.limt
						this.MyPageList.list = res.data.data
						this.MyPageList.list.forEach(i => {
							i.content = i.content.replace(/<(?:.|\s)*?>/g, "")
							i.time = GetDate(i.time)
						})
						this.MyPageList.total = res.data.total
					}
				})
			},
			myPageChange(e) {
				this.MyPageList.page = e
				this.GetMyPageDef()
			},
			Delete_articleDef(obj) {
				Delete_article({
					t: this,
					pid: obj.pid,
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					out: res => {
						this.deletePage = res.data.data
					}
				})
				this.dialogdeletePage = !this.dialogdeletePage
				ElMessage({
					message: '删除成功',
					type: 'success'
				})
				this.MyPageList.list = this.MyPageList.list.filter(i => {
					if (i.pid != obj.pid) {
						return i
					}
				})
				return
			},
			Delete_FolderDef(obj) {
				console.log(obj)
				Delete_Folder({
					t: this,
					fsid: obj.fsId,
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					out: res => {
						if (res.data.data) {
							ElMessage({
								message: '删除成功',
								type: 'success'
							})
							this.folderList = this.folderList.filter(i => {
								return i.fsId != obj.fsId
							})
						}
					}
				})

				this.deleteForder = !this.deleteForder


				return
			},
			Delete_SaveDef(obj) {
				console.log(obj)
				Delete_Folder_article({
					t: this,
					fsid: this.saveFileList.getFid,
					pid: obj.pid,
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					out: res => {
						if (res.data.data) {
							ElMessage({
								message: '删除成功',
								type: 'success'
							})
							this.saveFileList.list = this.saveFileList.list.filter(i => {
								return i.pid != obj.pid
							})
						}
					}
				})
				this.delFsave = !this.delFsave
				return
			},
			developedDef(){
				ElMessage({
					message: '该功能暂未开放',
					type: 'error'
				})
			}
		},
		updated() {

		},
		//数据绑定
		created() {
			let select = location.search.replace("?select=", "")
			if (select != "") {
				this.select = select
			}
			this.GetUSerData()
			if (localStorage.getItem("voidUser") != undefined && localStorage.getItem("voidUser") != "") {
				GetSaveList({
					t: this,
					token: JSON.parse(localStorage.getItem("voidUser")).token,
					out: res => {
						console.log(res)
						this.folderList = res.data.data
						this.saveFileList.getFid = this.folderList[0].fsId
						this.selectFile(this.saveFileList.getFid)
					}
				})
				GetHost({
					t: this,
					token: JSON.parse(localStorage.getItem("voidUser")).token
				})
				this.GetMyPageDef()
				this.GetLikeUsersDef()
				this.GetTableDef()
			} else {
				location.href = '/Login'
			}
		},
		mounted() {

		}
	}
</script>

<style>
	@import url("../../VCss/Maincss/center.css");
	@import url("../../VCss/MenuCss/Myself.css");
	@import url("../../VCss/AreaCss.css");

	.select {
		background-color: snow;
	}
</style>
