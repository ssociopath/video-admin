<template>
  <div class="rent-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div>
          <span>租借列表</span>
          <el-button
            size="mini"
            type="primary"
            style="font-size:20px; margin-left:20px"
            @click="addDialogVisible=true">添加新租借记录</el-button>
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
          prop="videoId"
          label="录像id"
          width="200">
        </el-table-column>
        <el-table-column
          prop="copyId"
          label="拷贝id"
          width="200">
        </el-table-column>
        <el-table-column
          prop="memberId"
          label="手机号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="dateRent"
          label="租借时间">
        </el-table-column>
        <el-table-column
          prop="dateReturn"
          label="预计归还时间">
        </el-table-column>
        <el-table-column
          prop="dateReturned"
          label="实际归还时间"
          :filters="[{ text: '已经归还', value: '已经归还' }, { text: '尚未归还', value: null }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              style="font-size:20px"
              :type="scope.row.dateReturned === null ? 'danger' : 'success'"
              disable-transitions>{{scope.row.dateReturned === null? '尚未归还' : scope.row.dateReturned }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="250px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              style="font-size:20px; margin-left:10px"
              @click="itemChosen=scope.row,
                        itemIndex=scope.$index,
                        deleteDialogVisible=true">删除</el-button>

          </template>
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
import { getRent } from '@/api/rent.js'
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
    this.loadRents()
  },
  methods: {
    loadRents () {
      getRent().then(res => {
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
