<template>
  <div class="userManagement-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
    >
      <el-table-column
        show-overflow-tooltip
        prop="subjectId"
        label="subjectId"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="subjectName"
        label="学科名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="score"
        label="成绩"
      ></el-table-column>
      <el-table-column show-overflow-tooltip prop="time" label="录入成绩时间">
        <template #default="{ row }">
          {{ $dayJS(row.time).format('YYYY-MM-DD HH:mm:ss') }}
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
  import { getScore } from '@/api/userList'

  export default {
    name: 'ScoreList',
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
        console.log(this.queryForm)
        const { data } = await getScore(this.queryForm)
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
