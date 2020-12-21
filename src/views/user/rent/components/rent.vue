<template>
  <div class="rent-chooser">
    <el-dialog title="租借录像"
               :visible="rentDialogVisible"
               :append-to-body="true"
               :show-close="false"
               width="600px">
      <el-form
        :model="rent"
        :rules="rentRules"
        ref="rent"
        label-width="150px">
        <el-form-item label="录像名">
          <el-input v-model="itemChosen.videoName"  style="width: 300px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="录像id">
          <el-input v-model="itemChosen.videoId"  style="width: 300px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="租金">
          <el-input v-model="itemChosen.rent"  style="width: 300px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="违约金">
          <el-input v-model="itemChosen.penalty"  style="width: 300px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="拷贝id" prop="copyId">
          <el-select v-model="rent.copyId" no-data-text="无可借拷贝" style="width: 300px" placeholder="请选择拷贝id">
            <el-option
              v-for="item in copyOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="租借时间">
          <el-date-picker
            :disabled="true"
            style="width: 300px"
            v-model="rent.dateRent"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预计归还时间" prop="dateReturn">
          <el-date-picker
            style="width: 300px"
            v-model="rent.dateReturn"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptionsStart">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-on:click="$emit('rent-change'), resetForm('rent')">取 消</el-button>
        <el-button type="primary" @click="handleRent('rent')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userRent } from '@/api/center'

export default {
  name: 'RentDialog',
  data () {
    return {
      rent: {
        rentId: 0,
        videoId: '',
        copyId: '',
        memberId: '',
        dateRent: new Date(),
        dateReturn: '',
        dateReturned: null
      },
      rentRules: {
        copyId: [
          { required: true, message: '请输入拷贝id', trigger: 'blur' }
        ],
        dateReturn: [
          { required: true, message: '请选择预计归还时间', trigger: 'blur' }
        ]
      },
      pickerOptionsStart: {
        disabledDate (time) {
          return time < new Date()
        }
      }
    }
  },
  props: ['rent-dialog-visible', 'item-chosen', 'copy-options', 'member'],
  methods: {
    handleRent (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userRent({ rentId: 0, videoId: this.itemChosen.videoId, copyId: this.rent.copyId, memberId: this.member.memberId, dateRent: new Date().toISOString().split('T')[0], dateReturn: this.rent.dateReturn })
            .then(res => {
              if (res.data.code === '00000') {
                this.$alert('<div>您成功租借电影 <span style="color: darkblue; font-weight: 600;">《' + this.itemChosen.videoName + '》</span></div>' +
                  '<div>所租借的拷贝信息为 <span style="color: darkblue; font-weight: 600;">' + this.itemChosen.videoId + ' ' + this.rent.copyId + '</span></div>' +
                  '<div>该电影租金为 <span style="color: darkblue; font-weight: 600;">' + this.itemChosen.rent + '</span> 元/天</div>' +
                  '<div>请于 <span style="color: darkblue; font-weight: 600;">' + this.rent.dateReturn + '</span> 前归还</div>' +
                  '<div>否则超时租金将成为违约金 <span style="color: red; font-weight: 600;">' + this.itemChosen.penalty + '</span> 元/天</div>', '租借成功', {
                  confirmButtonText: '确定',
                  callback: () => {
                    this.$message.success(res.data.message)
                    this.resetForm('rent')
                    this.$emit('rent-change')
                  },
                  showClose: false,
                  dangerouslyUseHTMLString: true
                })
              } else {
                this.$message.error(res.data.message)
                this.$emit('rent-change')
              }
            }).catch(error => {
              this.$message.error(error.message)
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

<style lang="less">
span.el-dialog__title{
  font-size: 25px;
}
button.el-button{
  font-size: 20px;
}
label.el-form-item__label{
  font-size: 20px;
}
div.el-input{
  font-size: 20px;
}
li.el-select-dropdown__item{
  font-size: 20px;
}
p.el-select-dropdown__empty{
  font-size: 20px;
}
div.el-message-box__message p div{
  font-size: 25px;
  line-height: 35px;
}
div.el-message-box__title{
  font-size: 25px;
}

</style>
