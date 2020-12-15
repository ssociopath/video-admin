<template>
  <el-dialog title="编辑会员"
    :visible.sync="editDialogVisible"
    :append-to-body="true"
    :show-close="false"
    width="400px" >
    <el-form
      :model="member"
      :rules="rules"
      ref="member"
      label-width="120px">
      <el-form-item label="会员手机号" prop="memberId">
        <el-input v-model="member.memberId" :placeholder="itemChosen.memberId"></el-input>
      </el-form-item>
      <el-form-item label="会员密码" prop="memberPwd">
        <el-input v-model="member.memberPwd"></el-input>
      </el-form-item>
      <el-form-item label="会员姓名" prop="memberName">
        <el-input v-model="member.memberName" :placeholder="itemChosen.memberName"></el-input>
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
      <el-button v-on:click="$emit('edit-change'), resetForm('member')">取 消</el-button>
      <el-button type="primary" @click="handleEditMember('member')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editMember } from '@/api/member.js'
export default {
  name: 'EditDialog',
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
  props: ['edit-dialog-visible', 'item-chosen'],
  methods: {
    handleEditMember (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editMember({ id: this.itemChosen.memberId, memberId: this.member.memberId, memberName: this.member.memberName, memberPwd: this.member.memberPwd, dateRegister: this.member.dateRegister }).then(res => {
            if (res.data.code === '00000') {
              this.$message.success(res.data.message)
              this.$emit('edit-change', this.member)
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
