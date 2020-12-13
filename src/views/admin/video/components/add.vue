<template>
<div class="add-chooser">
  <el-dialog title="增加新录像"
    :visible="addDialogVisible && isVideo"
    :append-to-body="true"
    :show-close="false"
    width="500px" >
    <el-form
      :model="video"
      :rules="videoRules"
      ref="video"
      >
      <el-form-item label="录像ID" prop="videoId">
        <el-input v-model="video.videoId"></el-input>
      </el-form-item>
      <el-form-item label="录像名" prop="videoName">
        <el-input v-model="video.videoName"></el-input>
      </el-form-item>
      <el-form-item label="库存量" prop="stock">
        <el-input v-model="video.stock" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租金" prop="rent">
        <el-input v-model="video.rent"></el-input>
      </el-form-item>
        <el-form-item label="违约金" prop="penalty">
        <el-input v-model="video.penalty"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button v-on:click="$emit('add-change'), resetForm('video')">取 消</el-button>
      <el-button type="primary" @click="handleAdd('video')">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog title="增加新拷贝"
    :visible="addDialogVisible && !isVideo"
    :append-to-body="true"
    :show-close="false"
    width="500px" >
    <el-form
      :model="copyVO"
      :rules="copyRules"
      ref="copyVO"
      >
      <el-form-item label="录像ID" prop="videoId">
        <el-input v-model="copyVO.videoId"></el-input>
      </el-form-item>
      <el-form-item label="拷贝Id" prop="copyId">
        <el-input v-model="copyVO.copyId"></el-input>
      </el-form-item>
      <el-form-item label="租借状态" prop="status">
        <el-input v-model="copyVO.status" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button v-on:click="$emit('add-change'), resetForm('copyVO')">取 消</el-button>
      <el-button type="primary" @click="handleAdd('copyVO')">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { addVideo, addCopy } from '@/api/video.js'
export default {
  name: 'AddDialog',
  data () {
    return {
      video: {
        videoId: '',
        videoName: '',
        stock: '0',
        rent: '',
        penalty: ''
      },
      copyVO: {
        videoId: '',
        copyId: '',
        status: '可被租借'
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
  props: ['add-dialog-visible', 'is-video'],
  methods: {
    handleAdd (formName) {
      if (this.isVideo) {
        this.addItem(formName, addVideo, this.video)
      } else {
        this.addItem(formName, addCopy, this.copyVO)
      }
    },
    addItem (formName, addPost, datas) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addPost(datas).then(res => {
            if (res.data.code === '00000') {
              this.$message.success(res.data.message)
              this.$emit('add-change')
            } else if (res.data.code === '99999') {
              this.$message.error('有关联，不可被添加！')
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
