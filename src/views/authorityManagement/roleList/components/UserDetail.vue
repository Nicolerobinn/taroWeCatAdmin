<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="1000px"
    @close="close"
  >
    <el-table :data="list" style="width: 100%">
      <el-table-column
        prop="menuName"
        label="权限名称"
        width="180"
      ></el-table-column>
      <el-table-column prop="url" label="url"></el-table-column>
      <el-table-column prop="isLabel" label="isLabel"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
  import { userDetail } from '@/api/roleList'
  export default {
    data() {
      return {
        dialogFormVisible: false,
        list: [],
        title: '',
      }
    },
    methods: {
      async show(id) {
        const res = await userDetail(id)
        this.title = res.data.roleName + '详情'
        this.list = res.data.menuList
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
        this.list = []
      },
    },
  }
</script>
