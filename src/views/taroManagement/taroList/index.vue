<template>
  <div class="userManagement-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <div style="color: #fff">123</div>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.searchInput"
              placeholder="请输入用户名"
              clearable
            />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="queryForm.gender" placeholder="请选择性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
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
        prop="nickName"
        label="昵称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="phone"
        label="电话"
      ></el-table-column>
      <el-table-column show-overflow-tooltip prop="gender" label="性别">
        <template #default="{ row }">
          {{ row.gender === 1 ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="avatarUrl" label="头像">
        <template #default="{ row }">
          <el-avatar :src="row.avatarUrl"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="country"
        label="国家"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="province"
        label="省"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="city"
        label="市"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="openId"
        label="openId"
      ></el-table-column>
      <el-table-column show-overflow-tooltip prop="createTime" label="创建时间">
        <template #default="{ row }">
          {{ $dayJS(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="查看记录" width="200">
        <template #default="{ row }">
          <el-button
            v-permission="'020101'"
            type="text"
            @click="goTo(`LikeList/${row.id}`)"
          >
            点赞/转发
          </el-button>
          <el-button
            v-permission="'020102'"
            type="text"
            @click="goTo(`ScoreList/${row.id}`)"
          >
            成绩
          </el-button>
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
  import { getUserList } from '@/api/userList'

  export default {
    name: 'TaroList',
    data() {
      return {
        list: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          gender: '1',
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
      goTo(str) {
        this.$router.push(str)
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
        const { data } = await getUserList(this.queryForm)
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
