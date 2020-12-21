<template>
  <div>
    <div class="search_container">
      <div class="search-title">电影名称搜索</div>
      <el-input v-model="searchVideo" placeholder="请输入要租借的电影名称"></el-input>
    </div>
    <div class="search_result">
      <el-card class="box-card">
        <el-table
          :data="videos.filter(data => !searchVideo ||
                                data.videoName.toLowerCase().includes(searchVideo.toLowerCase()) ||
                                data.videoId.toLowerCase().includes(searchVideo.toLowerCase()))"
          height="500px"
          border
          style="font-size:25px; box-shadow:0 0 5px 1px rgba(0, 0, 0, 0.3);">
          <el-table-column
            prop="videoId"
            label="录像ID"
            width="200">
          </el-table-column>
          <el-table-column
            prop="videoName"
            label="录像名"
            width="600">
          </el-table-column>
          <el-table-column
            prop="stock"
            label="库存量"
            width="200">
          </el-table-column>
          <el-table-column
            prop="rent"
            label="租金"
            width="200">
          </el-table-column>
          <el-table-column
            prop="penalty"
            label="违约金">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="250px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                style="font-size:25px; margin-left:10px"
                @click="itemChosen=scope.row
                        itemIndex=scope.$index
                        getCopyId(itemChosen.videoId)
                        rentDialogVisible=true">租借</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <rent-dialog
      :rent-dialog-visible="rentDialogVisible"
      :item-chosen="itemChosen"
      :copy-options="copyOptions"
      :member= "member"
      v-on:rent-change="loadVideos(); rentDialogVisible = false"/>
  </div>
</template>

<script>
import { getCopies, getVideos } from '@/api/video'
import RentDialog from './components/rent'
import { getAvailableCopyId } from '@/api/id'
import { memberLoginInfo } from '@/api/member'

export default {
  name: 'RentCenterIndex',
  data () {
    return {
      member: {},
      videos: [],
      searchVideo: '',
      rentDialogVisible: false,
      itemChosen: {},
      itemIndex: '',
      copyOptions: []
    }
  },
  components: {
    RentDialog
  },
  created () {
    this.loadUserProfile()
    this.loadVideos()
    this.loadCopies()
  },
  methods: {
    loadUserProfile () {
      memberLoginInfo().then(res => {
        if (res.data.code === '00000') {
          this.member = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    loadVideos () {
      getVideos().then(res => {
        this.videos = res.data.data
      })
    },
    loadCopies () {
      getCopies().then(res => {
        this.copies = res.data.data
      })
    },
    getCopyId (videoId) {
      getAvailableCopyId({ id: videoId }).then(res => {
        this.copyOptions = res.data.data
      }).catch(error => {
        console.log(error.message)
      })
    }
  }
}
</script>

<style lang="less">
.search_container{
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("./login2.jpg") no-repeat;
  background-size: cover;
  backdrop-filter: blur(4px);
  .search-title{
    font-size: 40px;
    margin: 20px;
    line-height: 40px;
    text-align: center;
    padding-bottom: 20px;
    color:rgb(80, 80, 80);
    font-weight: 600;
  }
  .el-input{
    width: 70%;
    .el-input__inner{
      height: 80px;
      box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, 0.7);
      background-color: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(0, 0, 0, 0.3);
      font-size:30px;
      font-weight: 600;
      color: rgb(80, 80, 80);
    }
    .el-input__inner::placeholder{
      padding-left: 10px;
      color: rgb(100, 100, 100);
    }
  }
}

tr.el-table__row{
  height: 80px;
}

div .el-table .cell{
  height: 40px;
  line-height: 40px;
}

span .el-tag{
  font-size: 25px;
}
</style>
