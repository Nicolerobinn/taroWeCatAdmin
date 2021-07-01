<template>
  <div class="userManagement-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="add">
          新增新闻
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.searchInput"
              placeholder="搜索内容"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
    >
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="id"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="createTime"
        label="创建时间"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="tagNum"
        label="点赞数"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="author"
        label="作者"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="title"
        label="新闻标题"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="remark"
        label="摘要"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="channelName"
        label="频道名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="transponderNum"
        label="转发数"
      ></el-table-column>

      <el-table-column show-overflow-tooltip label="权限">
        <template #default="{ row }">
          <el-tag v-for="(item, index) in row.permissions" :key="index">
            {{ item }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="datatime"
        label="修改时间"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="200">
        <template #default="{ row }">
          <el-button type="text" @click="show(row)">查看</el-button>
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
    <PaperDetail ref="detail" />
  </div>
</template>

<script>
  import PaperDetail from './components/PaperDetail'
  import { getList, deletePaper } from '@/api/paperList'

  export default {
    name: 'PaperList',
    components: { PaperDetail },
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
          searchInput: '',
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      show(row){
          this.$refs['detail'].show(row)
      },
      add() {
        this.$router.push('AddPaper')
      },
      handleEdit(row) {
        this.$router.push(`EditorPaper/${row.id}`)
      },
      handleDelete(row) {
        this.$baseConfirm('你确定要删除当前项吗', null, async () => {
          const { msg } = await deletePaper(row.id)
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
