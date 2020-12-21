<template>
  <div>
    <div class="search_container">
      <div class="search-title">租借记录搜索</div>
      <el-input v-model="searchRent" placeholder="请输入要归还的录像id或拷贝id"></el-input>
    </div>
    <div class="search_result">
      <el-card class="box-card">
        <el-table
          :data="rents.filter(data => !searchRent ||
                                data.videoId.toLowerCase().includes(searchRent.toLowerCase()) ||
                                data.copyId.toLowerCase().includes(searchRent.toLowerCase()))"
          height="500"
          border
          style="font-size:25px; box-shadow:0 0 5px 1px rgba(0, 0, 0, 0.3);">
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
                style="font-size:25px"
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
                :type="scope.row.dateReturned !== null ? 'info' : 'danger'"
                style="font-size:25px; width: 150px"
                :disabled="scope.row.dateReturned !== null"
                @click="itemChosen=scope.row;
                        itemIndex=scope.$index;
                        returnDialogVisible=true;
                        getVideo()">{{scope.row.dateReturned === null? '归还' : '已经归还' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <return-dialog
      :return-dialog-visible="returnDialogVisible"
      :item-chosen="itemChosen"
      :video="video"
      :member="member"
      v-on:return-change="returnDialogVisible = false; getRent()"/>
  </div>
</template>

<script>
import { getVideoById } from '@/api/video.js'
import { getRentByMember } from '@/api/rent.js'
import { memberLoginInfo } from '@/api/member.js'
import ReturnDialog from '@/views/user/return/components/return.vue'

export default {
  name: 'ReturnCenterIndex',
  data () {
    return {
      searchRent: '',
      rents: [],
      itemChosen: {},
      itemIndex: '',
      video: {},
      member: {},
      returnDialogVisible: false
    }
  },
  created () {
    this.loadUserProfile()
  },
  components: {
    ReturnDialog
  },
  methods: {
    loadUserProfile () {
      memberLoginInfo().then(res => {
        if (res.data.code === '00000') {
          this.member = res.data.data
          this.getRent()
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    getRent () {
      getRentByMember({ memberId: this.member.memberId }).then(res => {
        if (res.data.code === '00000') {
          this.rents = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    getVideo () {
      console.log(this.itemChosen.videoId)
      getVideoById({ id: this.itemChosen.videoId }).then(res => {
        if (res.data.code === '00000') {
          this.video = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
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

<style lang="less">

span.el-checkbox__label{
  font-size: 25px;
}

span.el-table__column-filter-trigger i{
  font-size: 25px;
}

div.el-table-filter{
  width: 200px;
  .el-table-filter__content{
    line-height: 40px;
    height: 100px;
  }
  .el-checkbox-group{
    text-align: center;
  }
  .el-checkbox__inner{
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 25px;
  }
  .el-table-filter__bottom{
    text-align: center;
    button{
      font-size: 25px;
    }
  }
}

</style>
