<template>
  <div class='login-container'>
    <el-form class="login-form" ref="form" :model="user" label-width="80px">
        <el-form-item class="login-label" label="手机">
            <el-input v-model="user.userId" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item class="login-label" label="密码">
            <el-input v-model="user.pwd" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="btn-parent">
            <el-button type="primary" class="login-btn" @onclick="onSubmit">登录</el-button>
        </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        userId: '',
        pwd: ''
      }
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
    justify-content: center;
    align-items: center;
    background: url("./login.jpg") no-repeat;
    background-size: cover;
    backdrop-filter: blur(4px);
}

.login-form{
    padding: 50px;
    min-width: 400px;
    margin: auto;
    border-radius: 5%;
    box-shadow: 0 0 30px 15px rgba(0, 0, 0, 0.7);
    background-color: rgba(200, 200, 200, 0.7);
    border: 3px solid rgba(0, 0, 0, 0.7);
    font-size: 200px;
    .login-btn{
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
    .login-btn:hover{
        box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, 0.7);
        background-color: rgba(200, 200, 200, 0.7);
        border: 3px solid rgba(0, 0, 0, 0.7);
        color: rgba(100, 100, 100, 0.5);
    }
    .login-btn:focus{
        box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, 0.7);
        background-color: rgba(200, 200, 200, 0.7);
        border: 3px solid rgba(0, 0, 0, 0.7);
        color: rgba(100, 100, 100, 0.5);
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
}
</style>
