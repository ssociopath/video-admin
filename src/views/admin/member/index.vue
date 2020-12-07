<template>
  <div class="user-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户概况</span>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div>
          <span>用户列表</span>
          <el-button
            size="mini"
            type="primary"
            style="font-size:20px; margin-left:20px"
            @click="addDialogVisible=true">添加新会员</el-button>
          <add-dialog
            :add-dialog-visible="addDialogVisible"
            v-on:change-add-visible="addDialogVisible = false"
            v-on:add-members-change=" member => {
                members.push({
                name: member.memberName,
                phone: member.memberId,
                dateRegister: member.dateRegister
              })}"/>
        </div>
        <el-input
          v-model="search"
          size="large"
          style="width: 300px; font-size:20px"
          placeholder="输入姓名或手机号搜索"/>
      </div>
      <el-table
          :data="members.filter(data => !search ||
                                data.name.toLowerCase().includes(search.toLowerCase()) ||
                                data.phone.toLowerCase().includes(search.toLowerCase()))"
          height="500"
          border
          style="font-size:20px; box-shadow:0 0 5px 1px rgba(0, 0, 0, 0.3);">
          <el-table-column
            prop="name"
            label="姓名"
            width="200">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="200">
          </el-table-column>
          <el-table-column
            prop="dateRegister"
            label="注册时间"
            >
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="250px"
            >
            <template slot-scope="scope">
              <el-button
                size="mini"
                style="font-size:20px"
                @click="itemChosen=scope.row,
                        itemIndex=scope.$index,
                        editDialogVisible=true">编辑</el-button>
                <edit-dialog
                  :item-chosen="itemChosen"
                  :edit-dialog-visible="editDialogVisible"
                  v-on:change-edit-visible="editDialogVisible = false"
                  v-on:edit-members-change="member => {
                    members.splice(itemIndex, 1, {
                      name: member.memberName,
                      phone: member.memberId,
                      dateRegister: member.dateRegister
                    })}"/>
              <el-button
                size="mini"
                type="danger"
                style="font-size:20px; margin-left:10px"
                @click="itemChosen=scope.row,
                        itemIndex=scope.$index,
                        deleteDialogVisible=true">删除</el-button>
                <delete-dialog
                  :item-chosen="itemChosen"
                  :delete-dialog-visible="deleteDialogVisible"
                  v-on:change-delete-visible="deleteDialogVisible = false"
                  v-on:delete-members-change="members.splice(itemIndex, 1)"/>
            </template>
          </el-table-column>
        </el-table>

    </el-card>
  </div>
</template>

<script>
import { getMembers } from '@/api/member.js'
import AddDialog from '@/views/admin/member/components/add.vue'
import DeleteDialog from '@/views/admin/member/components/delete.vue'
import EditDialog from '@/views/admin/member/components/edit.vue'

export default {
  name: 'MemberIndex',
  data () {
    return {
      members: [],
      search: '',
      addDialogVisible: false,
      deleteDialogVisible: false,
      editDialogVisible: false,
      itemChosen: {},
      itemIndex: ''
    }
  },
  components: {
    AddDialog,
    DeleteDialog,
    EditDialog
  },
  created () {
    this.loadMembers()
  },
  methods: {
    loadMembers () {
      getMembers().then(res => {
        console.log(res.data.data)
        this.members = res.data.data
      })
    }
  }
}
</script>

<style>

  .clearfix{
    font-size: 25px;
    display: flex;
    justify-content: space-between;
  }

  .box-card {
    width: 100%;
    margin-bottom: 20px;
  }

</style>
