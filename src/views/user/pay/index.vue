<template>
  <div>
    <div class="search_container">
      <div class="search-title">账单记录搜索</div>
      <el-input v-model="searchBill" placeholder="请输入租借id查询账单"></el-input>
    </div>
    <div class="search_result">
      <el-card class="box-card">
        <el-table
          :data="bills.filter(data => !searchBill ||
                                String(data.rentId).includes(searchBill))"
          height="500"
          border
          style="font-size:25px; box-shadow:0 0 5px 1px rgba(0, 0, 0, 0.3);">
          <el-table-column
            prop="rentId"
            label="租借id"
            width="300">
          </el-table-column>
          <el-table-column
            prop="amtPay"
            label="应付款"
            width="300">
          </el-table-column>
          <el-table-column
            prop="amtPaid"
            label="实付款"
            width="300">
          </el-table-column>
          <el-table-column
            prop="datePay"
            label="应付时间">
          </el-table-column>
          <el-table-column
            prop="datePaid"
            label="实付时间"
            :filters="[{ text: '已经付款', value: '已经付款' }, { text: '尚未付款', value: null }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                style="font-size:25px"
                :type="scope.row.datePaid === null ? 'danger' : 'success'"
                disable-transitions>{{scope.row.datePaid === null? '尚未付款' : scope.row.datePaid }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="250px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                :type="scope.row.datePaid !== null ? 'info' : 'danger'"
                style="font-size:25px; width: 150px"
                :disabled="scope.row.datePaid !== null"
                @click="itemChosen=scope.row;
                        payDialogVisible=true;
                        getBill()">{{scope.row.datePaid === null? '付款' : '已经结算' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <pay-dialog
      :pay-dialog-visible="payDialogVisible"
      :item-chosen="itemChosen"
      :bill="bill"
      v-on:pay-change="payDialogVisible = false; getBills()"/>
  </div>
</template>

<script>
import { memberLoginInfo } from '@/api/member.js'
import { getBillByMember, getBillById } from '@/api/bill.js'
import PayDialog from './components/pay.vue'

export default {
  name: 'PayIndex',
  data () {
    return {
      searchBill: '',
      bills: [],
      bill: {},
      member: {},
      itemChosen: {},
      payDialogVisible: false
    }
  },
  components: {
    PayDialog
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    loadUserProfile () {
      memberLoginInfo().then(res => {
        if (res.data.code === '00000') {
          this.member = res.data.data
          this.getBills()
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    getBills () {
      getBillByMember({ memberId: this.member.memberId }).then(res => {
        if (res.data.code === '00000') {
          this.bills = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    getBill () {
      getBillById({ id: this.itemChosen.rentId }).then(res => {
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
    filterTag (value, row) {
      if (value === null) {
        return row.datePaid === value
      } else {
        return row.datePaid != null
      }
    }
  }
}
</script>

<style scoped>

</style>
