<template>
  <div class="rent-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div>
          <span>账单列表</span>
          <el-button
            size="mini"
            type="primary"
            style="font-size:20px; margin-left:20px"
            @click="addDialogVisible=true">添加新账单</el-button>
        </div>
        <el-input
          v-model="search"
          size="large"
          style="width: 300px; font-size:20px"
          placeholder="输入录像id或手机号搜索"/>
      </div>
      <el-table
        :data="rents.filter(data => !search ||
                                data.videoId.toLowerCase().includes(search.toLowerCase()) ||
                                data.memberId.toLowerCase().includes(search.toLowerCase()))"
        height="500"
        border
        style="font-size:20px; box-shadow:0 0 5px 1px rgba(0, 0, 0, 0.3);">
        <el-table-column
          prop="rentId"
          label="租借id"
          width="200">
        </el-table-column>
        <el-table-column
          prop="memberId"
          label="手机号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="amtPay"
          label="应付款"
          width="200">
        </el-table-column>
        <el-table-column
          prop="amtPaid"
          label="实付款"
          width="200">
        </el-table-column>
        <el-table-column
          prop="datePay"
          label="应付日期">
        </el-table-column>
        <el-table-column
          prop="datePaid"
          label="实付日期">
        </el-table-column>
      </el-table>
    </el-card>
    <add-dialog
      :add-dialog-visible="addDialogVisible"
      v-on:add-change=" () => {this.loadRents(), addDialogVisible = false}"/>
    <delete-dialog
      :item-chosen="itemChosen"
      :delete-dialog-visible="deleteDialogVisible"
      v-on:delete-change="() => {this.loadRents(), deleteDialogVisible = false}"/>
  </div>
</template>

<script>
import { getBills } from '@/api/bill.js'
import AddDialog from '@/views/admin/rent/components/add.vue'
import DeleteDialog from '@/views/admin/rent/components/delete.vue'

export default {
  name: 'RentIndex',
  data () {
    return {
      rents: [],
      search: '',
      addDialogVisible: false,
      deleteDialogVisible: false,
      itemChosen: {},
      itemIndex: ''
    }
  },
  components: {
    AddDialog,
    DeleteDialog
  },
  created () {
    this.loadBills()
  },
  methods: {
    loadBills () {
      getBills().then(res => {
        console.log(res.data.data)
        this.rents = res.data.data
      })
    },
    filterTag (value, row) {
      if (value === null) {
        return row.dateReturned === value
      } else {
        return row.dateReturned != null
      }
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
