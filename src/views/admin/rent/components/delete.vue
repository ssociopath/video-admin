<template>
  <el-dialog
    title="提示"
    :visible.sync="deleteDialogVisible"
    :append-to-body="true"
    :show-close="false"
    width="200px">
    <span>确定要删除吗？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('delete-change')">取 消</el-button>
      <el-button type="primary" @click="handleDelete">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { deleteRent } from '@/api/rent.js'
export default {
  name: 'DeleteDialog',
  data () {
    return {}
  },
  props: ['delete-dialog-visible', 'item-chosen'],
  methods: {
    handleDelete () {
      deleteRent({ id: this.itemChosen.rentId }).then(res => {
        if (res.data.code === '00000') {
          this.$message.success(res.data.message)
          this.$emit('delete-change')
        } else if (res.data.code === '99999') {
          this.$message.error('有关联，不可被删除！')
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
