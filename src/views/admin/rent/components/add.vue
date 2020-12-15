<template>
  <el-dialog title="增加新租借记录"
             :visible.sync="addDialogVisible"
             :append-to-body="true"
             :show-close="false"
              width="400px">
    <el-form
      :model="rent"
      :rules="rules"
      ref="rent"
      label-width="120px">
      <el-form-item label="录像id" prop="videoId">
        <el-select v-model="rent.videoId" placeholder="请选择录像id" @change="getCopyId">
          <el-option
            v-for="item in videoOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="拷贝id" prop="copyId">
        <el-select v-model="rent.copyId" placeholder="请选择拷贝id">
          <el-option
            v-for="item in copyOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" prop="memberId">
        <el-select v-model="rent.memberId" placeholder="请选择会员手机号">
          <el-option
            v-for="item in memberOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="租借时间" prop="dateRent">
        <el-date-picker
          v-model="rent.dateRent"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptionsStart"
          @change="changeEnd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="预计归还时间" prop="dateReturn">
        <el-date-picker
          v-model="rent.dateReturn"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptionsEnd"
          @change="changeStart">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="实际归还时间" prop="dateReturned">
        <el-date-picker
          v-model="rent.dateReturned"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptionsEnd"
          @change="changeStart">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button v-on:click="$emit('add-change'), resetForm('rent')">取 消</el-button>
      <el-button type="primary" @click="handleAddRent('rent')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addRent } from '@/api/rent.js'
import { getVideoId, getMemberId, getCopyId } from '@/api/id.js'

export default {
  name: 'AddDialog',
  data () {
    return {
      rent: {
        rentId: 0,
        videoId: '',
        copyId: '',
        memberId: '',
        dateRent: '',
        dateReturn: '',
        dateReturned: null
      },
      rules: {
        videoId: [
          { required: true, message: '请选择录像id', trigger: 'blur' }
        ],
        copyId: [
          { required: true, message: '请选择拷贝id', trigger: 'blur' }
        ],
        memberId: [
          { required: true, message: '请选择会员手机号', trigger: 'blur' }
        ],
        dateRent: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        dateReturn: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ]
      },
      videoOptions: [],
      copyOptions: [],
      memberOptions: [],
      pickerOptionsStart: {},
      pickerOptionsEnd: {}
    }
  },
  props: ['add-dialog-visible'],
  created () {
    this.getId(getVideoId, this.videoOptions)
    this.getId(getMemberId, this.memberOptions)
  },
  methods: {
    handleAddRent (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var rent = {}
          if (this.rent.dateReturned === null) {
            rent = { rentId: 0, videoId: this.rent.videoId, copyId: this.rent.copyId, memberId: this.rent.memberId, dateRent: this.rent.dateRent, dateReturn: this.rent.dateReturn }
          } else {
            rent = this.rent
          }
          addRent(rent).then(res => {
            if (res.data.code === '00000') {
              this.$message.success(res.data.message)
              this.$emit('add-change')
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
    },
    getId (getItemId, options) {
      getItemId().then(res => {
        for (const item of res.data.data) {
          options.push(item)
        }
      }).catch(error => {
        console.log(error.message)
      })
    },
    getCopyId (videoId) {
      getCopyId({ id: videoId }).then(res => {
        this.copyOptions = res.data.data
      }).catch(error => {
        console.log(error.message)
      })
    },
    changeStart () {
      this.pickerOptionsStart = Object.assign({}, this.pickerOptionsStart, {
        disabledDate: (time) => {
          return time.getTime() > new Date(this.rent.dateReturn)
        }
      })
    },
    changeEnd () {
      this.pickerOptionsEnd = Object.assign({}, this.pickerOptionsEnd, {
        disabledDate: (time) => {
          return time.getTime() <= new Date(this.rent.dateRent)
        }
      })
    }
  }
}
</script>

<style>
.dialog-footer{
  text-align: center;
}
</style>
