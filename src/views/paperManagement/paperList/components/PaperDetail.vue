<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="close">
    <h1 style="text-align: center">{{ paper.title }}</h1>
    <div v-html="paper.content"></div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="close">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getDetail } from '@/api/paperList'
  export default {
    name: 'PaperDetail',
    data() {
      return {
        paper: {},
        title: '',
        dialogFormVisible: false,
      }
    },
    methods: {
      async show(row) {
        const res = await getDetail(row.id)
        this.paper = res.data
        this.dialogFormVisible = true
      },
      save() {},
      close() {
        this.dialogFormVisible = false
      },
    },
  }
</script>
