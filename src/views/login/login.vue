<template>
  <div class='login-container'>
    <el-form class="login-form" ref="form" :model="user">
        <el-form-item class="login-head">
            <span>录像出租管理系统<br>Video rental system</span>
        </el-form-item>
        <el-form-item class="login-label" label="手机"  label-width="80px">
            <el-input
                v-model="user.id"
                placeholder="请输入手机号"
                prefix-icon="el-icon-mobile"
                >
            </el-input>
        </el-form-item>
        <el-form-item class="login-label" label="密码"  label-width="80px">
            <el-input
                v-model="user.pwd"
                type="password"
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                >
            </el-input>
        </el-form-item>
        <el-form-item class="login-btn">
            <el-button type="primary" @click="onLogin" :loading="loginLoding">登录</el-button>
        </el-form-item>
        <el-form-item class="login-foot">
            <span>WHUT - 计算机1803 - 李彦佳 2020-2021</span>
        </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { login } from '@/api/user.js'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        id: '',
        pwd: ''
      },
      loginLoding: false
    }
  },
  methods: {
    onLogin () {
      this.loginLoding = true
      login(this.user).then(res => {
        console.log(res)
        if (res.data.code === '00000') {
          this.$message.success(res.data.message)
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
      this.loginLoding = false
    }
  }
}
</script>

<style lang="less">
.login-container{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url("./login2.jpg") no-repeat;
    background-size: cover;
    backdrop-filter: blur(4px);
}

.login-head{
    .el-form-item__content{
        line-height: 30px;
        text-align: center;
        padding-bottom: 20px;
        color:rgb(80, 80, 80);
        font-size: 30px;
    }
}

.login-foot{
    .el-form-item__content{
        line-height: 20px;
        text-align: center;
        color:rgb(80, 80, 80);
        font-size: 16px;
        margin-top: 20px;
    }
}

.login-form{
    padding: 50px;
    padding-bottom: 0;
    min-width: 400px;
    margin: auto;
    border-radius: 5%;
    box-shadow: 0 0 30px 15px rgba(0, 0, 0, 0.7);
    background-color: rgba(200, 200, 200, 0.7);
    border: 3px solid rgba(0, 0, 0, 0.7);
    font-size: 200px;
    .login-btn{
        text-align: center;
        .el-button{
            min-width: 200px;
            font-size: 20px;
            font-weight: 600;
            margin-left: 20px;
            color: rgba(255, 255, 255, 0.7);
            background-color: rgba(100, 100, 100, 0.5);
            border: 3px solid rgba(0, 0, 0, 0.7);
            border-color: rgb(100, 100, 100);
            box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.7);
        }
        .el-button:hover{
            box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, 0.7);
            background-color: rgba(200, 200, 200, 0.7);
            border: 3px solid rgba(0, 0, 0, 0.7);
            color: rgba(100, 100, 100, 0.5);
        }
        .el-button:focus{
            box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, 0.7);
            background-color: rgba(200, 200, 200, 0.7);
            border: 3px solid rgba(0, 0, 0, 0.7);
            color: rgba(100, 100, 100, 0.5);
        }
    }
}

.login-label {
    .el-form-item__label{
        color: rgb(100, 100, 100);
        font-size:20px;
        font-family: "微软雅黑";
        font-weight: 600;
        text-align: left;
    }
    .el-input__inner{
        box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, 0.7);
        background-color: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(0, 0, 0, 0.3);
        font-size:20px;
        font-family: "微软雅黑";
    }
    .el-input__inner::placeholder{
        padding-left: 10px;
        color: rgb(100, 100, 100);
    }
    .el-input__icon{
        height: 0;
        padding: 0px;
        font-size: 20px;
        color: rgb(100, 100, 100);
    }
}
</style>
