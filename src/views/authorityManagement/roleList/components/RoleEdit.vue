<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="角色名" prop="roleName">
        <el-input v-model.trim="form.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="权限列表" prop="menuList">
        <el-tree
          id="treeOption"
          ref="treeOption"
          :data="data"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          check-strictly
          @check="handleCheck"
        ></el-tree>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { editUser, getTree, userDetail, addUser } from '@/api/roleList'

  export default {
    name: 'RoleEdit',
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'childMenus',
          label: 'menuName',
        },
        form: {
          roleName: '',
          menuList: [],
        },
        rules: {
          roleName: [
            { required: true, trigger: 'blur', message: '请输入角色名' },
          ],
          menuList: [
            { required: true, trigger: 'blur', message: '请选择权限' },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    async created() {
      const res = await getTree()
      this.data = res.data
    },
    methods: {
      // 节点选中操作
      initTree(arr) {
        this.$refs.treeOption.setCheckedKeys(arr) // 设置默认选中
      },
      handleCheck(currentNode, treeStatus) {
        /**
         * @des 根据父元素的勾选或取消勾选，将所有子级处理为选择或非选中状态
         * @param { node: Object }  当前节点
         * @param { status: Boolean } （true ： 处理为勾选状态 ； false： 处理非选中）
         */
        const setChildStatus = (node, status) => {
          /* 这里的 id children 也可以是其它字段，根据实际的业务更改 */
          this.$refs.treeOption.setChecked(node.id, status)
          if (node?.childMenus?.length > 0) {
            /* 循环递归处理子节点 */
            for (let i = 0; i < node?.childMenus.length; i++) {
              setChildStatus(node.childMenus[i], status)
            }
          }
        }
        /* 设置父节点为选中状态 */
        const setParentStatus = (nodeObj) => {
          /* 拿到tree组件中的node,使用该方法的原因是第一次传入的 node 没有 parent */
          const node = this.$refs.treeOption.getNode(nodeObj)
          if (node.parent.key) {
            this.$refs.treeOption.setChecked(node.parent, true)
            setParentStatus(node.parent)
          }
        }
        /* 判断当前点击是选中还是取消选中操作 */
        if (treeStatus.checkedKeys.includes(currentNode.id)) {
          setParentStatus(currentNode)
          setChildStatus(currentNode, true)
        } else {
          /* 取消选中 */
          if (currentNode?.childMenus?.length > 0) {
            setChildStatus(currentNode, false)
          }
        }

        const arr = [...this.$refs.treeOption.getCheckedKeys()]
        this.form.menuList = arr
      },
      /* 清空选中样式 */
      clearSelected() {
        const allNode = document.querySelectorAll('#treeOption .el-tree-node')
        allNode.forEach((element) => element.classList.remove('is-current'))
      },
      // 清除选中
      clearHandle() {
        this.clearSelected()
        this.$refs.treeOption.setCheckedKeys([])
      },
      async showEdit(row) {
        if (!row) {
          this.title = '新增'
          this.dialogFormVisible = true
        } else {
          this.title = '编辑'
          this.dialogFormVisible = true
          const { id, roleName } = row
          const res = await userDetail(id)
          const { menuList } = res.data
          const arr = menuList.map((e) => e.id)
          this.form = { id, roleName, menuList: arr }
          setTimeout(() => {
            this.initTree(arr)
          }, 0)
        }
      },
      close() {
        this.clearHandle()
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const obj = { ...this.form }
            obj.menuList = obj.menuList.map((e) => {
              return { id: e }
            })
            let res
            if (this.title === '编辑') {
              res = await editUser(obj)
            } else {
              res = await addUser(obj)
            }
            if (res.code === 1) {
              this.$baseMessage(`${this.title}成功`, 'success')
              this.$emit('fetch-data')
              this.close()
            }
          } else {
            return false
          }
        })
      },
    },
  }
</script>
