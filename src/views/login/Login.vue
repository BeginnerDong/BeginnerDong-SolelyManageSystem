<template>
  <div class="login" >
        <div style="width: 100%;height: 35%;background: #1F2D3D;"></div>
        <div style="width: 100%;height: 65%;background: #1F2D3D;">
          <el-form
            label-position="left"
            label-width="0px"
            class="demo-ruleForm card-box loginform"
            v-loading="isLoading"
            :element-loading-text="'正在'+(register===true ? '注册' : '登录')+'...'"
            :style="formStyle"
          >
            <h3 class="title">
              <span
                class="active"
                @click="toggleStatus(false)"
              >
                {{register?'注册账号':'系统登录'}}
              </span>

            </h3>
            <el-form-item prop='login_name'>
              <el-input type="text" auto-complete="off" placeholder="账号" v-model='data.login_name'></el-input>
            </el-form-item>
            <el-form-item prop='password'>
              <el-input
                type="password"
                auto-complete="off"
                placeholder="密码"
                v-model='data.password'
                @keyup.native.enter="onLogin('data',true)"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              v-if="register"
              prop='repassword'
            >
              <el-input
                type="password"
                auto-complete="off"
                placeholder="确认密码"
                v-model='data.repassword'
                @keyup.native.enter="onRegister('data')"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox
                v-if="!register"
                :checked='isRemeber'
                v-model='isRemeber'
              >
                记住密码
              </el-checkbox>
              <span
                style="font-size:12px;color:#409EFF"
                @click="toggleStatus()">
                  {{register?'系统登录':'注册账号'}}
              </span>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="medium"
                v-if="!register"
                @click='onLogin()'
              >
                登录
              </el-button>
              <el-button
                type="primary"
                size="medium"
                v-if="register"
                @click='onRegister()'
              >
                  注册
              </el-button>
              <el-button
                size="medium"
                @click='resetForm()'
              >重置</el-button>
            </el-form-item>
          </el-form>
        </div>
  </div>
</template>

<script>
  import LoginJs from './Login.js'

  export default LoginJs
</script>

<style>

  .login {
    
    width: 100%;
    height: 100%;
  }

  .card-box {
    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    border: 2px solid #8492A6;
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
    font-weight: normal;
    font-size: 16px;
  }

  .title span {
    cursor: pointer;
  }

	.title .active {
    font-weight: bold;
    font-size: 18px;
  }

  .loginform {
    width: 20%;
    padding: 35px 35px 15px 35px;
    margin:0 auto;
  }

</style>
