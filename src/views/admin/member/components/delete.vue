<template>
  <el-dialog
    title="提示"
    :visible.sync="deleteDialogVisible"
    :append-to-body="true"
    :show-close="false"
    width="200px">
    <span>确定要删除吗？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('change-delete-visible')">取 消</el-button>
      <el-button type="primary" @click="handleDelete">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { deleteMember } from '@/api/member.js'
export default {
  name: 'DeleteDialog',
  data () {
    return {}
  },
  props: ['delete-dialog-visible', 'item-chosen'],
  methods: {
    handleDelete () {
      deleteMember({ id: this.itemChosen.memberId }).then(res => {
        if (res.data.code === '00000') {
          this.$message.success(res.data.message)
          this.$emit('delete-members-change')
          this.$emit('change-delete-visible')
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    }
  }
}
</script>

<style>

</style>
