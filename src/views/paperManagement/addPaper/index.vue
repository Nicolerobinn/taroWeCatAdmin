<template>
  <div class="editor-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="新闻标题" prop="title">
        <el-input v-model="form.title" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="摘要" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item label="作者" style="width: 400px" prop="author">
        <el-input v-model="form.author" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="所属频道" prop="channel">
        <el-select v-model="form.channel">
          <template v-for="(a, i) in channelList">
            <el-option
              :key="i"
              :label="a.channel_name"
              :value="a.id"
            ></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item
        label="小程序新闻列表图片"
        style="width: 800px"
        prop="imgPaths"
      >
        <el-upload
          action="http://139.196.30.186/api/web/upload"
          list-type="picture-card"
          :headers="importHeaders"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :on-error="handleError"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="内容" prop="content" class="vab-quill-content">
        <div id="editor"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="预览效果" :visible.sync="dialogTableVisible">
      <div style="min-height: 60vh">
        <h1 class="news-title">{{ form.title }}</h1>
        <div class="news-content" v-html="form.content"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { addPaper, getChannel, uploadFile } from '@/api/paperList'
  import E from 'wangeditor'
  import store from '@/store'
  export default {
    name: 'AddPaper',
    data() {
      return {
        importHeaders: { token: store.getters['user/accessToken'] },
        dialogImageUrl: '',
        dialogVisible: false,
        dialogTableVisible: false,
        form: {
          title: '',
          remark: '',
          channel: '',
          content: '',
          author: '',
          imgPaths: [],
        },
        fileList: [],
        paperList: [],
        paperImgList: [],
        channelList: [],
        editor: null,
        editorData: '',
        rules: {
          title: [
            {
              required: true,
              message: '请输入标题',
              trigger: 'blur',
            },
          ],
          remark: [
            {
              required: true,
              message: '请输入摘要',
              trigger: 'blur',
            },
          ],
          author: [
            {
              required: true,
              message: '请输入作者',
              trigger: 'blur',
            },
          ],
          content: [
            {
              required: true,
              message: '请输入内容',
              trigger: 'blur',
            },
          ],
          channel: [
            {
              required: true,
              message: '请选择频道',
              trigger: 'blur',
            },
          ],
        },
      }
    },
    beforeDestroy() {
      // 调用销毁 API 对当前编辑器实例进行销毁
      this.editor.destroy()
      this.editor = null
    },
    async mounted() {
      const editor = new E('#editor')
      editor.config.showFullScreen = true
      // 配置菜单栏，设置不需要的菜单
      // editor.config.uploadImgServer = 'http://32douu18xq.cqhttp.cn/web/upload'
      // editor.config.uploadImgHeaders = {
      //   token: store.getters['user/accessToken'],
      // }
      // editor.config.uploadFileName = 'file'
      editor.config.excludeMenus = ['video', 'emoticon']
      editor.config.customUploadImg = this.custom
      editor.config.uploadImgTimeout = 5 * 1000000000
      editor.config.uploadImgMaxLength = 1 // 一次最多上传 5 个图片
      editor.config.onchange = (newHtml) => {
        this.form.content = newHtml
      } // 插入网络图片的回调
      editor.config.showLinkImg = false
      editor.create()
      this.editor = editor
      const res = await getChannel()
      this.channelList = res.data ?? []
    },
    methods: {
      async custom(resultFiles, insertImgFn) {
        // 上传文件 创建FormData
        const formData = new FormData()
        // upFile就是后台接收的key
        formData.append('file', resultFiles[0], resultFiles[0].name)
        const res = await uploadFile(formData)
        if (res.code === 1) {
          insertImgFn(res.data)
        }
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法
        // 上传图片，返回结果，将图片插入到编辑器中
      },
      handleRemove(file, fileList) {
        const ind = this.fileList.findIndex((e) => e.uid === file.uid)
        this.fileList = this.fileList.filter((e, i) => ind !== i)
      },
      handleSuccess(e) {
        this.$baseMessage('上传图片成功', 'success')
        this.fileList.push({
          name: '',
          url: e.data,
        })
      },
      beforeRemove(file) {
        return this.$baseMessage(`确定移除 ${file.name}？`, 'error')
      },
      handleError(e) {
        this.$baseMessage('上传图片失败', 'error')
      },
      handlePictureCardPreview(file) {
        conosle.log(file.url)
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleSee() {
        this.$refs['form'].validate((valid) => {
          this.$refs.form.validateField('content', (errorMsg) => {})
          if (valid) {
            this.dialogTableVisible = true
          } else {
            return false
          }
        })
      },
      handleSave() {
        this.$refs['form'].validate(async (valid) => {
          this.$refs.form.validateField('content', (errorMsg) => {
            if (errorMsg) {
            }
          })
          if (valid) {
            const obj = { ...this.form }
            obj.imgPaths = this.fileList.map((e) => e.url).join()
            const res = await addPaper(obj)
            if (res.code === 1) {
              this.$baseMessage('添加新闻成功!', 'success')
            }
          } else {
            return false
          }
        })
      },
    },
  }
</script>
