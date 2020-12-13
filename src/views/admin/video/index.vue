<template>
  <div class="video-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div>
          <span>录像列表</span>
          <el-button
            size="mini"
            type="primary"
            style="font-size:20px; margin-left:20px"
            @click="addDialogVisible=true, isVideo=true">添加新录像</el-button>
        </div>
        <el-input
          v-model="searchVideo"
          size="large"
          style="width: 300px; font-size:20px"
          placeholder="输入录像id或录像名搜索"/>
      </div>
      <el-table
          :data="videos.filter(data => !searchVideo ||
                                data.videoName.toLowerCase().includes(searchVideo.toLowerCase()) ||
                                data.videoId.toLowerCase().includes(searchVideo.toLowerCase()))"
          height="500"
          border
          style="font-size:20px; box-shadow:0 0 5px 1px rgba(0, 0, 0, 0.3);">
          <el-table-column
            prop="videoId"
            label="录像ID"
            width="200">
          </el-table-column>
          <el-table-column
            prop="videoName"
            label="录像名"
            width="200">
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
            width="250px"
            >
            <template slot-scope="scope">
              <el-button
                size="mini"
                style="font-size:20px"
                @click="itemChosen=scope.row,
                        itemIndex=scope.$index,
                        editDialogVisible=true,
                        isVideo=true">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                style="font-size:20px; margin-left:10px"
                @click="itemChosen=scope.row,
                        itemIndex=scope.$index,
                        deleteDialogVisible=true,
                        isVideo=true">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div>
          <span>拷贝列表</span>
          <el-button
            size="mini"
            type="primary"
            style="font-size:20px; margin-left:20px"
            @click="addDialogVisible=true, isVideo=false">添加新拷贝</el-button>
        </div>
        <el-input
          v-model="searchCopy"
          size="large"
          style="width: 300px; font-size:20px"
          placeholder="输入录像id或拷贝id搜索"/>
      </div>
      <el-table
          :data="copies.filter(data => !searchCopy ||
                                data.videoId.toLowerCase().includes(searchCopy.toLowerCase()) ||
                                data.copyId===parseInt(searchCopy))"
          height="500"
          border
          style="font-size:20px; box-shadow:0 0 5px 1px rgba(0, 0, 0, 0.3);">
          <el-table-column
            prop="videoId"
            label="录像ID"
            width="200">
          </el-table-column>
          <el-table-column
            prop="copyId"
            label="拷贝ID"
            width="200">
          </el-table-column>
          <el-table-column
            prop="status"
            label="租借状态"
            :filters="[{ text: '可被租借', value: '可被租借' }, { text: '已被租借', value: '已被租借' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag
                  style="font-size:20px"
                  :type="scope.row.status === '可被租借' ? 'success' : 'danger'"
                  disable-transitions>{{scope.row.status}}</el-tag>
              </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="250px"
            >
            <template slot-scope="scope">
              <el-button
                size="mini"
                style="font-size:20px"
                @click="itemChosen=scope.row,
                        itemIndex=scope.$index,
                        editDialogVisible=true,
                        isVideo=false">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                style="font-size:20px; margin-left:10px"
                @click="itemChosen=scope.row,
                        itemIndex=scope.$index,
                        deleteDialogVisible=true,
                        isVideo=false">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-card>
    <delete-dialog
      :item-chosen="itemChosen"
      :delete-dialog-visible="deleteDialogVisible"
      :is-video="isVideo"
      v-on:delete-change="() => {this.loadVideos(), this.loadCopies(), this.deleteDialogVisible=false}"/>
    <add-dialog
      :add-dialog-visible="addDialogVisible"
      :is-video="isVideo"
      v-on:add-change="() => {this.loadVideos(), this.loadCopies(), this.addDialogVisible=false}"/>
    <edit-dialog
      :item-chosen="itemChosen"
      :edit-dialog-visible="editDialogVisible"
      :is-video="isVideo"
      v-on:edit-change="() => {this.loadCopies(), this.loadVideos(), editDialogVisible = false}"/>
  </div>
</template>

<script>
import { getVideos, getCopies } from '@/api/video.js'
import AddDialog from '@/views/admin/video/components/add.vue'
import DeleteDialog from '@/views/admin/video/components/delete.vue'
import EditDialog from '@/views/admin/video/components/edit.vue'

export default {
  name: 'VideoIndex',
  data () {
    return {
      copies: [],
      videos: [],
      searchVideo: '',
      searchCopy: '',
      addDialogVisible: false,
      deleteDialogVisible: false,
      editDialogVisible: false,
      itemChosen: {},
      itemIndex: '',
      isVideo: false
    }
  },
  components: {
    AddDialog,
    DeleteDialog,
    EditDialog
  },
  created () {
    this.loadVideos()
    this.loadCopies()
  },
  methods: {
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
    filterTag (value, row) {
      return row.status === value
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

.el-table__column-filter-trigger{
  margin-left: 10px;
}

</style>
