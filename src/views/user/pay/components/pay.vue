<template>
  <div class="pay-chooser">
    <el-dialog title="账单"
               :visible="payDialogVisible"
               :append-to-body="true"
               :show-close="false"
               width="600px">
      <el-form
        :model="bill"
        ref="bill"
        label-width="150px">
        <el-form-item label="租借id">
          <el-input v-model="bill.rentId"  style="width: 300px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="租金">
          <el-input v-model="bill.rent"  style="width: 300px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="违约金">
          <el-input v-model="bill.penalty"  style="width: 300px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="租借时间">
          <el-date-picker
            :disabled="true"
            style="width: 300px"
            v-model="bill.dateRent"
            type="date"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预计归还时间" prop="dateReturn">
          <el-date-picker
            :disabled="true"
            style="width: 300px"
            v-model="bill.dateReturn"
            type="date"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实际归还时间" prop="dateReturned">
          <el-date-picker
            :disabled="true"
            style="width: 300px"
            v-model="bill.dateReturned"
            type="date"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="应付款">
          <div style="width: 300px; font-size: 25px; color: red; font-weight: 600"
               :disabled="true">{{bill.amtPay}}元</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-on:click="$emit('pay-change'), resetForm('bill')">取 消</el-button>
        <el-button type="primary" @click="handlePay('bill')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userPay } from '@/api/center'

export default {
  name: 'PayDialog',
  data () {
    return {
    }
  },
  props: ['pay-dialog-visible', 'item-chosen', 'bill'],
  methods: {
    handlePay (formName) {
      this.$alert('<div> 确认付款  <span style="color: #ff0000; font-weight: 600;">' +
        this.bill.amtPay + '</span> 元</div> ', '确认付款', {
        confirmButtonText: '确定付款',
        cancelButtonText: '稍后再付',
        callback: (action) => {
          console.log(action)
          if (action === 'confirm') {
            this.itemChosen.datePaid = this.itemChosen.datePay
            this.itemChosen.amtPay = this.bill.amtPay
            this.itemChosen.amtPaid = this.itemChosen.amtPay
            userPay(this.itemChosen).then(res => {
              if (res.data.code === '00000') {
                this.$message.success('成功')
              } else {
                this.$message.error(res.data.message)
              }
              this.$emit('pay-change')
              this.$refs[formName].resetFields()
            }).catch(error => {
              this.$message.error(error.message)
            })
          }
          this.resetForm(formName)
          this.$emit('pay-change')
        },
        type: 'warning',
        center: true,
        showCancelButton: true,
        dangerouslyUseHTMLString: true
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$emit('pay-change')
    }
  }
}
</script>

<style scoped>
div.el-message-box__message p{
  font-size: 25px;
  line-height: 35px;
}
</style>
