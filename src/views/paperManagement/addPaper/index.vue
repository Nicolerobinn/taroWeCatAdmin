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
        label="小程序新闻列表图片地址(逗号隔开)"
        style="width: 800px"
        prop="imgPaths"
      >
        <el-input v-model="form.imgPaths" type="textarea" :rows="4"></el-input>
      </el-form-item>

      <el-form-item label="内容" prop="content" class="vab-quill-content">
        <vab-quill
          v-model="form.content"
          :min-height="400"
          :options="options"
        ></vab-quill>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSee">预览效果</el-button>
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
  import { addPaper, getChannel } from '@/api/paperList'
  import vabQuill from '@/plugins/vabQuill'
  export default {
    name: 'AddPaper',
    components: { vabQuill },
    data() {
      return {
        options: {
          theme: 'snow',
          bounds: document.body,
          debug: 'warn',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ color: [] }, { background: [] }],
              ['blockquote', 'code-block'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ align: [] }],
              [{ direction: 'rtl' }],
              [{ font: [] }],
              ['clean'],
              ['link', 'image'],
            ],
          },
          placeholder: '内容...',
          readOnly: false,
        },
        dialogTableVisible: false,
        form: {
          title: '',
          remark: '',
          channel: '',
          content: '',
          author: '',
          imgPaths: '',
        },
        channelList: [],
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
          content: [
            {
              required: true,
              message: '请输入内容',
              trigger: 'blur',
            },
          ],
          imgPaths: [
            {
              required: true,
              message: '请输入图片地址',
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
    async mounted() {
      const res = await getChannel()
      this.channelList = res.data ?? []
    },
    methods: {
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
            const res = await addPaper(obj)
            console.log(res)
            this.$baseMessage('submit!', 'success')
          } else {
            return false
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .editor-container {
    .news {
      &-title {
        text-align: center;
      }

      &-content {
        ::v-deep {
          p {
            line-height: 30px;

            img {
              display: block;
              margin-right: auto;
              margin-left: auto;
            }
          }
        }
      }
    }

    .vab-quill-content {
      ::v-deep {
        .el-form-item__content {
          line-height: normal;
        }
      }
    }
  }
</style>
