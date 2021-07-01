<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { } from '@/api/paperList'
  export default {
    name: 'PaperDetail',
    data() {
      return {
        paper:{},
        title: '',
        dialogFormVisible: false,
      }
    },
    methods: {
      show(row) {
        this.paper = {...row}
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
      }
    },
  }
</script>
