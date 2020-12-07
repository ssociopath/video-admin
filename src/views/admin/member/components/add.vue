<template>
  <el-dialog title="增加新会员"
    :visible.sync="addDialogVisible"
    :append-to-body="true"
    :show-close="false"
    width="500px" >
    <el-form
      :model="member"
      :rules="rules"
      ref="member"
      >
      <el-form-item label="会员手机号" prop="memberId">
        <el-input v-model="member.memberId"></el-input>
      </el-form-item>
      <el-form-item label="会员密码" prop="memberPwd">
        <el-input v-model="member.memberPwd"></el-input>
      </el-form-item>
      <el-form-item label="会员姓名" prop="memberName">
        <el-input v-model="member.memberName"></el-input>
      </el-form-item>
      <el-form-item label="会员注册时间" prop="dateRegister">
        <el-date-picker type="datetime"
          placeholder="选择日期时间"
          v-model="member.dateRegister"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button v-on:click="$emit('change-add-visible'), resetForm('member')">取 消</el-button>
      <el-button type="primary" @click="handleAddMember('member')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addMember } from '@/api/member.js'
export default {
  name: 'AddDialog',
  data () {
    return {
      member: {
        memberId: '',
        memberPwd: '',
        memberName: '',
        dateRegister: ''
      },
      rules: {
        memberId: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号长度为11位', trigger: 'blur' }
        ],
        memberPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '密码长度为6-10位', trigger: 'blur' }
        ],
        memberName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { max: 8, message: '姓名长度不超过8位', trigger: 'blur' }
        ],
        dateRegister: [
          { required: true, message: '请选择日期时间', trigger: 'blur' }
        ]
      }
    }
  },
  props: ['add-dialog-visible'],
  methods: {
    handleAddMember (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addMember(this.member).then(res => {
            if (res.data.code === '00000') {
              this.$message.success(res.data.message)
              this.$emit('add-members-change', this.member)
              this.$emit('change-add-visible')
              this.resetForm(formName)
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          this.$message.error('请填写正确信息！')
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>

</style>
