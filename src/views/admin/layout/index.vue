<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <app-aside class="aside-menu" :is-collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i class="el-icon-s-fold"
            @click="isCollapse = !isCollapse"
          ></i>
          <span class="header-span">录像出租管理系统</span>
        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{user.adminName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item
              @click.native="onLogout"
            >退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
          <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside.vue'
import { adminLoginInfo } from '@/api/user.js'

export default {
  name: 'LayoutIndex',
  data () {
    return {
      user: {},
      isCollapse: false
    }
  },
  components: {
    AppAside
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    loadUserProfile () {
      adminLoginInfo().then(res => {
        console.log(res)
        this.user = res.data.data
      })
    },
    onLogout () {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
.layout-container{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

.aside{
    background-color: #d3dce6;
    .aside-menu{
      height: 100%;
      width: 100%;
      padding-right: 15px;
    }
    .el-menu-item{
      font-size: 20px;
    }
}
.header{
    height: 60px;
    display: flex;
    justify-content: space-between;
    font-size: 25px;
    color:  rgb(100, 100, 100);
    padding-left: 20px;
    border-bottom:1px solid rgb(180, 180, 180);
    .el-icon-s-fold{
      font-size: 25px;
      margin-right: 5px;
    }
    .header-span{
      height: 60px;
      line-height: 60px;
    }
    .el-dropdown-link{
      height: 60px;
      line-height: 60px;
      font-size: 20px;
    }
}
.main{
    background-color: #e9eef3;
}
</style>
