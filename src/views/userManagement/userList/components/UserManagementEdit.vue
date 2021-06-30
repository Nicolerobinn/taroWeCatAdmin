<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model.trim="form.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model.trim="form.password"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="昵称" prop="nickname">
        <el-input v-model.trim="form.nickname" autocomplete="off"></el-input>
      </el-form-item> -->
      <el-form-item label="权限" prop="roleId">
        <el-radio-group v-model="form.roleId">
          <template v-for="(a, i) in permissions">
            <el-radio :key="i" :label="a.id">
              {{ a.roleName }}
            </el-radio>
          </template>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getAllRole, addUser, editUser } from '@/api/webUserList'
  import { MD } from '@/utils/md5'
  export default {
    name: 'UserManagementEdit',
    data() {
      return {
        form: {
          userName: '',
          password: '',
          nickname: '',
          roleId: '',
        },
        permissions: [],
        rules: {
          userName: [
            { required: true, trigger: 'blur', message: '请输入用户名' },
          ],
          password: [
            { required: true, trigger: 'blur', message: '请输入密码' },
          ],
          // nickname: [
          //   { required: true, trigger: 'blur', message: '请输入昵称' },
          // ],
          roleId: [{ required: true, trigger: 'blur', message: '请选择权限' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    async created() {
      const res = await getAllRole()
      this.permissions = res.data
    },
    methods: {
      showEdit(row) {
        console.log(row)
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const obj = { ...this.form }
            obj.password = await MD(obj.password)
            let data
            if (this.title === '添加') {
              data = await addUser(obj)
            } else {
              data = await editUser(obj)
            }
            const { msg } = data
            this.$baseMessage(msg, 'success')
            this.$emit('fetch-data')
            this.close()
          } else {
            return false
          }
        })
      },
    },
  }
</script>
