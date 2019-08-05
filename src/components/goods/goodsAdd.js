import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      // 导航编码
      activeIndex: 1,
      activeName: 'one',
      // 第一步表单数据
      addGoodsForm: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_cat: [],
        goods_introduce: '',
        pics: []
      },
      // 级联选择器
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }]
        }]
      }],
      defaultProps: {
        label: 'cat_name',
        value: 'cat_id'
      },
      // 商品分类

      // 单选框
      radio: true,
      // 上传图片
      dialogImageUrl: '',
      dialogVisible: false,
      // 设置请求头
      headers: {
        Authorization: localStorage.getItem('token')
      },
      // 富文本数据
      content: '',
      editorOption: {
        // some quill options
        placeholder: '请输入内容'
      }

    }
  },
  created () {
    this.loadCatData()
  },
  methods: {
    next () {
      if (this.activeIndex++ > 2) this.activeIndex = 0
    },
    // tab切换时,实现与导航条同步
    tabClick (res) {
      // console.log(res.index)
      this.activeIndex = +res.index + 1
    },
    // 下一步按钮
    nextTab (index, path) {
      this.activeIndex = index
      this.activeName = path
    },
    // 加载商品分类数据
    async loadCatData () {
      let res = await this.$axios.get('categories')
      // console.log(res)
      this.options = res.data.data
    },
    // 上次图片
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
      console.log(file.url)
    },
    // 图片上传成功后
    handleSuccess (res) {
      // console.log(res)
      this.addGoodsForm.pics.push({
        pic: res.data.tmp_path
      })
      // console.log(this.addGoodsForm.pics)
    },
    // 确认添加分类
    async addGoods () {
      let {
        goods_name,
        goods_price,
        goods_number,
        goods_weight,
        goods_cat,
        goods_introduce,
        pics } = this.addGoodsForm
      let res = await this.$axios.post('goods', {
        goods_name,
        goods_price,
        goods_number,
        goods_weight,
        goods_cat: goods_cat.join(','),
        goods_introduce,
        pics
      })
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '添加成功',
          type: 'success',
          duration: 800
        })
      }
      this.$router.push('/goods')
    }
  }
}
