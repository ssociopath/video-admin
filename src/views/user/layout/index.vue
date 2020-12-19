<template>
  <el-container class="layout-container">
    <el-header class="header" height="auto">
      <span class="header-span">录像出租管理系统</span>
      <el-menu
        class="header-menu"
        :default-active='$router.currentRoute.path'
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router>
        <el-menu-item index="/rent">租借中心</el-menu-item>
        <el-menu-item index="/return">归还中心</el-menu-item>
        <el-menu-item index="/personal">个人中心</el-menu-item>
      </el-menu>
      <el-dropdown class="el-dropdown-link">
          <span>{{user !== null ? '会员：'+user.memberName : '未登录'}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>{{user !== null ? '个人中心' : '注册'}}</el-dropdown-item>
          <el-dropdown-item @click.native="turnToLogin()">{{user !== null ? '退出登录' : '登录'}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-main class="main">
      <router-view :user="user"/>
    </el-main>
  </el-container>
</template>

<script>
import { memberLoginInfo } from '@/api/member.js'

export default {
  name: 'HomeIndex',
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    loadUserProfile () {
      memberLoginInfo().then(res => {
        console.log(res)
        this.user = res.data.data
        this.$emit('member-login', this.user)
        console.log(this.user)
      })
    },
    turnToLogin () {
      if (this.user === null) {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container .el-header{
  display: flex;
  padding: 0;
}
.header {
  display: flex;
  justify-content: space-between;
  font-size: 35px;
  .header-span{
    background-color: #545c64;
    color:#ffd04b;
    font-weight: 500;
    width: 500px;
    height: 70px;
    line-height: 70px;
    padding-left: 50px;
  }
  .header-menu{
    height: 70px;
    width: 100%;
    padding-left: 30px;
    .el-menu-item{
      height: 70px;
      line-height: 70px;
      font-size: 30px;
    }
  }
  .el-dropdown.el-dropdown-link{
    background-color: #545c64;
    color: white;
    height: 70px;
    width: 300px;
    line-height: 70px;
    font-size: 25px;
    max-width: 300px;
  }
}

ul.el-dropdown-menu{
  margin-right: 100px;
}

.el-dropdown-menu__item {
  height: 60px;
  line-height: 60px;
  font-size: 25px;
}

</style>
