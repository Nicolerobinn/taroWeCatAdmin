<template>
  <div class="userManagement-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <div style="color: #fff">123</div>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item prop="type">
            <el-select v-model="queryForm.type" placeholder="点赞或转发">
              <el-option label="转发" value="1"></el-option>
              <el-option label="点赞" value="0"></el-option>
            </el-select>
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
        prop="title"
        label="标题"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="channelName"
        label="所属模块"
      ></el-table-column>
      <el-table-column show-overflow-tooltip prop="createTime" label="创建时间">
        <template #default="{ row }">
          {{ $dayJS(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
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
  </div>
</template>

<script>
  import { getTagNews } from '@/api/userList'

  export default {
    name: 'LikeList',
    data() {
      return {
        list: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNum: 1,
          type: '1',
          pageSize: 10,
          userId: '',
        },
      }
    },
    created() {
      const { id } = this.$route.params || {}
      if (!id) {
        this.$baseMessage('未获取到数据ID，请携带ID', 'error')
        return
        // TODO 做错误处理
      }
      this.queryForm.userId = id
    },
    mounted() {
      this.fetchData()
    },
    methods: {
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
        const { data } = await getTagNews(this.queryForm)
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
