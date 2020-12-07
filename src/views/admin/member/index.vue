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
        <span>用户列表</span>
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
            width="200"
            >
            <template slot-scope="scope">
              <el-button
                size="mini"
                style="font-size:20px"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                style="font-size:20px"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-button">
          <el-button
            size="mini"
            type="danger"
            style="font-size:20px; width: 100px"
            @click="dialogFormVisible=true">添加</el-button>
          <el-dialog title="增加新会员"
            :visible.sync="dialogFormVisible"
            :append-to-body=true
            width="500px" >
            <el-form
              :model="member"
              :rules="rules"
              ref="member"
              >
              <el-form-item label="会员手机号" prop="memberId">
                <el-input v-model="member.memberId" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="会员密码" prop="memberPwd">
                <el-input v-model="member.memberPwd" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="会员姓名" prop="memberName">
                <el-input v-model="member.memberName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="会员注册时间" prop="dateRegister">
                <el-date-picker type="datetime" placeholder="选择日期时间" v-model="member.dateRegister" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleAddMember('member')">确 定</el-button>
            </div>
          </el-dialog>
          <el-button
            size="mini"
            type="danger"
            style="font-size:20px; width: 100px"
            @click="handleDeleteAll">清空</el-button>
        </div>
    </el-card>
  </div>
</template>

<script>
import { getMembers, deleteMember, addMember } from '@/api/member.js'

export default {
  name: 'MemberIndex',
  data () {
    return {
      members: [],
      search: '',
      member: {
        memberId: '',
        memberPwd: '',
        memberName: '',
        dateRegister: ''
      },
      rules: {
        memberId: [
          { requied: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号长度为11位', trigger: 'blur' }
        ],
        memberPwd: [
          { requied: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '密码长度为6-10位', trigger: 'blur' }
        ],
        memberName: [
          { requied: true, message: '请输入姓名', trigger: 'blur' },
          { max: 8, message: '姓名长度不超过8位', trigger: 'blur' }
        ],
        dateRegister: [
          { type: 'date', requied: true, message: '请输入注册日期', trigger: 'change' }
        ]
      },
      dialogFormVisible: false,
      appendToBody: true
    }
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
    },
    handleEdit (index, row) {
    },
    handleDelete (index, row) {
      deleteMember({ id: row.phone }).then(res => {
        if (res.data.code === '00000') {
          this.$message.success(res.data.message)
          console.log(index)
          this.members.splice(index, 1)
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    handleDeleteAll () {

    },
    handleAddMember (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var a = this.member.dateRegister
          this.member.dateRegister = a.toISOString().slice(0, 19).replace('T', ' ')
          addMember(this.member).then(res => {
            if (res.data.code === '00000') {
              this.$message.success(res.data.message)
              this.members.push({
                name: this.member.memberName,
                phone: this.member.phone,
                dateRegister: this.member.dateRegister
              })
              this.dialogFormVisible = false
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          this.$message.error('请填写正确信息！')
        }
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

  .table-button{
    padding: 20px 100px;
    display: flex;
    justify-content: space-between;
  }
</style>
