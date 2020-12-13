<template>
<div class="edit-chooser">
  <el-dialog title="修改录像"
    :visible="editDialogVisible && isVideo"
    :append-to-body="true"
    :show-close="false"
    width="500px" >
    <el-form
      :model="video"
      :rules="videoRules"
      ref="video"
      >
      <el-form-item label="录像id" prop="videoId">
        <el-input v-model="video.videoId" :placeholder="itemChosen.videoId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="录像名" prop="videoName">
        <el-input v-model="video.videoName" :placeholder="itemChosen.videoName"></el-input>
      </el-form-item>
      <el-form-item label="库存量" prop="stock">
        <el-input v-model="video.stock" :placeholder="itemChosen.stock" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租金" prop="rent">
        <el-input v-model="video.rent" :placeholder="itemChosen.rent"></el-input>
      </el-form-item>
        <el-form-item label="违约金" prop="penalty">
        <el-input v-model="video.penalty" :placeholder="itemChosen.penalty"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button v-on:click="$emit('edit-change'), resetForm('video')">取 消</el-button>
      <el-button type="primary" @click="handleEdit('video')">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog title="修改拷贝"
    :visible="editDialogVisible && !isVideo"
    :append-to-body="true"
    :show-close="false"
    width="500px" >
    <el-form
      :model="copyVO"
      :rules="copyRules"
      ref="copyVO"
      >
      <el-form-item label="录像id" prop="videoId">
        <el-input v-model="copyVO.videoId" :placeholder="itemChosen.videoId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="拷贝id" prop="copyId">
        <el-input v-model="copyVO.copyId" :placeholder="itemChosen.copyId"></el-input>
      </el-form-item>
      <el-form-item label="租借状态" prop="status">
        <el-input v-model="copyVO.status" :placeholder="itemChosen.status" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button v-on:click="$emit('edit-change'), resetForm('copyVO')">取 消</el-button>
      <el-button type="primary" @click="handleEdit('copyVO')">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { editVideo, editCopy } from '@/api/video.js'

export default {
  name: 'EditDialog',
  data () {
    return {
      video: {
        videoId: '',
        videoName: '',
        stock: '',
        rent: '',
        penalty: ''
      },
      copyVO: {
        videoId: '',
        copyId: '',
        status: ''
      },
      videoRules: {
        videoId: [
          { required: true, message: '请输入录像Id', trigger: 'blur' },
          { min: 5, max: 5, message: '录像Id长度为5位', trigger: 'blur' }
        ],
        videoName: [
          { required: true, message: '请输入录像名', trigger: 'blur' },
          { max: 20, message: '录像名长度不超过20位', trigger: 'blur' }
        ],
        rent: [
          { required: true, message: '请输入租金', trigger: 'blur' },
          { pattern: /^(0|[1-9]\d{0,2})$/, message: '请输入0~999元的整数金额', trigger: 'blur' }
        ],
        penalty: [
          { required: true, message: '请输入违约金', trigger: 'blur' },
          { pattern: /^(0|[1-9]\d{0,2})$/, message: '请输入0~999元的整数金额', trigger: 'blur' }
        ]
      },
      copyRules: {
        videoId: [
          { required: true, message: '请输入录像Id', trigger: 'blur' },
          { min: 5, max: 5, message: '录像Id长度为5位', trigger: 'blur' }
        ],
        copyId: [
          { required: true, message: '请输入拷贝Id', trigger: 'blur' },
          { pattern: /^[1-9]\d{0,2}$/, message: '拷贝Id范围为[1,999]', trigger: 'blur' }
        ]
      }
    }
  },
  props: ['edit-dialog-visible', 'is-video', 'item-chosen'],
  methods: {
    handleEdit (formName) {
      if (this.isVideo) {
        this.video.videoId = this.itemChosen.videoId
        this.video.stock = this.itemChosen.stock
        this.editItem(formName, editVideo, this.video)
      } else {
        this.copyVO.videoId = this.itemChosen.videoId
        this.copyVO.status = this.itemChosen.status
        this.editItem(formName, editCopy, { id: this.itemChosen.copyId, videoId: this.copyVO.videoId, copyId: this.copyVO.copyId, status: this.copyVO.status })
      }
    },
    editItem (formName, editPost, datas) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editPost(datas).then(res => {
            if (res.data.code === '00000') {
              this.$message.success(res.data.message)
              this.$emit('edit-change')
            } else if (res.data.code === '99999') {
              this.$message.error('有关联，不可被修改！')
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
    }
  }
}
</script>

<style>

</style>
