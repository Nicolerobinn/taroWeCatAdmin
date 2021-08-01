<template>
  <div class="userManagement-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          新增用户
        </el-button>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
    >
      <el-table-column
        show-overflow-tooltip
        prop="nickname"
        label="用户名"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="权限">
        <template #default="{ row }">
          <el-tag v-for="(item, index) in row.permissions" :key="index">
            {{ item }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip prop="updateTime" label="修改时间">
        <template #default="{ row }">
          {{ $dayJS(row.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="200">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.pageNum"
      :page-size="queryForm.pageSize"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <edit ref="edit" @fetch-data="fetchData"></edit>
  </div>
</template>

<script>
  import { getList, deleteUser, addUser } from '@/api/webUserList'
  import Edit from './components/UserManagementEdit'

  export default {
    name: 'UserList',
    components: { Edit },
    data() {
      return {
        list: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNum: 1,
          pageSize: 10,
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      handleEdit(row) {
        if (row.id) {
          this.$refs['edit'].showEdit(row)
        } else {
          this.$refs['edit'].showEdit()
        }
      },
      handleDelete(row) {
        this.$baseConfirm('你确定要删除当前项吗', null, async () => {
          const { msg } = await deleteUser(row.id)
          this.$baseMessage(msg, 'success')
          this.fetchData()
        })
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNum = val
        this.fetchData()
      },
      queryData() {
        this.queryForm.pageNum = 1
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await getList(this.queryForm)
        const { total, list } = data ?? {}
        this.list = list
        this.total = total
        setTimeout(() => {
          this.listLoading = false
        }, 300)
      },
    },
  }
</script>
