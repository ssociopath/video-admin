<template>
  <el-menu
    class="nav-menu"
    default-active="/adminHome"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
  >
    <el-menu-item index="/adminHome">
      <i class="iconfont iconmain"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/adminHome/video">
      <i class="iconfont iconicon-test"></i>
      <span slot="title">录像管理</span>
    </el-menu-item>
    <el-menu-item index="/adminHome/user">
      <i class="iconfont iconuser-group"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="/adminHome/rent">
      <i class="iconfont iconwendang"></i>
      <span slot="title">租借管理</span>
    </el-menu-item>
    <el-menu-item index="/adminHome/bill">
      <i class="iconfont iconbill"></i>
      <span slot="title">结算管理</span>
    </el-menu-item>
    <el-menu-item index="/adminHome/settings">
      <i class="iconfont iconshezhi"></i>
      <span slot="title">个人中心</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  data () {
    return {}
  },
  props: ['is-collapse'],
  methods: {
  }
}
</script>

<style>
.nav-menu .iconfont{
  margin-right: 10px;
  padding-left: 5px;
  font-size: 20px;
}
</style>
