<template>
  <div class="return-chooser">
    <el-dialog title="归还录像"
               :visible="returnDialogVisible"
               :append-to-body="true"
               :show-close="false"
               width="600px">
      <el-form
        :model="itemChosen"
        ref="itemChosen"
        label-width="150px">
        <el-form-item label="录像名">
          <el-input v-model="video.videoName"  style="width: 300px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="录像id">
          <el-input v-model="itemChosen.videoId"  style="width: 300px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="拷贝id" prop="copyId">
          <el-input v-model="itemChosen.copyId"  style="width: 300px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="租金">
          <el-input v-model="video.rent"  style="width: 300px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="违约金">
          <el-input v-model="video.penalty"  style="width: 300px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="租借时间">
          <el-date-picker
            :disabled="true"
            style="width: 300px"
            v-model="itemChosen.dateRent"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预计归还时间" prop="dateReturn">
          <el-date-picker
            :disabled="true"
            style="width: 300px"
            v-model="itemChosen.dateReturn"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实际归还时间" prop="dateReturned">
          <el-date-picker
            :disabled="true"
            style="width: 300px"
            v-model="nowDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-on:click="$emit('return-change'), resetForm('itemChosen')">取 消</el-button>
        <el-button type="primary" @click="handleReturn('itemChosen');">确 定</el-button>
      </div>
    </el-dialog>
    <pay-dialog
      :pay-dialog-visible="payDialogVisible"
      :item-chosen="billRecord"
      :bill="bill"
      v-on:pay-change="payDialogVisible = false;"/>
  </div>
</template>

<script>
import { userReturn } from '@/api/center'
import PayDialog from '@/views/user/pay/components/pay'
import { getBillById, getBillRecordById } from '@/api/bill'

export default {
  name: 'ReturnDialog',
  data () {
    return {
      nowDate: new Date(),
      bill: {},
      billRecord: {},
      payDialogVisible: false,
      itemIndex: ''
    }
  },
  components: {
    PayDialog
  },
  props: ['return-dialog-visible', 'item-chosen', 'member', 'video'],
  methods: {
    handleReturn (formName) {
      this.itemChosen.dateReturned = this.nowDate.toISOString().split('T')[0]
      this.itemChosen.memberId = this.member.memberId
      userReturn(this.itemChosen).then(res => {
        if (res.data.code === '00000') {
          this.getBill(this.itemChosen.rentId)
          this.getBillRecord(this.itemChosen.rentId)
          this.payDialogVisible = true
        } else {
          this.$message.success(res.data.message)
        }
        this.$emit('return-change')
        this.$refs[formName].resetFields()
      })
    },
    getBill (id) {
      getBillById({ id: id }).then(res => {
        console.log(res)
        if (res.data.code === '00000') {
          this.bill = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    getBillRecord (id) {
      getBillRecordById({ id: id }).then(res => {
        console.log(res)
        if (res.data.code === '00000') {
          this.billRecord = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$emit('return-change')
    }
  }
}
</script>

<style scoped>

</style>
