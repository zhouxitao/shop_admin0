
<template>
  <div>
    <!-- 添加按钮 -->
    <el-button
      type='primary'
      plain
      @click='showAddCatDialog'
    >添加分类</el-button>
    <!-- 表格部分 -->
    <el-table
      :data="catData"
      style="width: 100%"
    >
      <el-table-column type='expand'>
        <template slot-scope="scope">
          <el-tree
            :data="scope.row.children"
            :props="defaultProps"
          ></el-tree>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="cat_deleted"
        label="是否有效"
        width="180"
      >
        <template slot-scope='scope'>
          <span>{{scope.row.cat_deleted?'否':"是"}}</span>

        </template>
      </el-table-column>
      <el-table-column
        prop="cat_level"
        label="层级"
        :props='defaultProps2'
      >
        <template slot-scope='scope'>
          <span v-if='scope.row.cat_level == 0'>一级</span>
          <span v-else-if='scope.row.cat_level == 1'>二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="dialogAddCatVisible"
    >
      <el-form
        ref='addCatForm'
        :model="addCatForm"
        label-width='80px'
      >
        <el-form-item label="分类名称">
          <el-input
            v-model="addCatForm.cat_name"
            autocomplete="off"
            placeholder="请输入分类名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="父级名称">

          <!-- 级联选择器 -->
          <el-cascader
            v-model='addCatForm.cat_pid_arr'
            :props="defaultProps2"
            :options="addCatOptions"
            clearable
          ></el-cascader>

        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogAddCatVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addCat"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      catData: [{
        cat_name: 'ff',
        cat_deleted: '是',
        cat_level: '1级'
      }],
      // 下拉按钮数据
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'cat_name'
      },
      // 添加分类对话框
      addCatForm: {
        cat_name: '',
        cat_pid_arr: []
      },
      // 显示添加分类对话框
      dialogAddCatVisible: false,
      addCatOptions: [{
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      defaultProps2: {
        value: 'cat_id',
        label: 'cat_name'
      }
    }
  },
  created () {
    this.loadCatData()
    this.loadCatData2()
  },
  methods: {
    // 加载商品分类
    async loadCatData () {
      let res = await this.$axios.get('categories', {
        params: {
          type: 3,
          pagenum: 1,
          pagesize: 4
        }
      })
      console.log(res)
      this.catData = res.data.data.result
    },
    // 加载级联选择器
    async loadCatData2 () {
      let res = await this.$axios.get('categories', {
        params: {
          type: 2
        }
      })
      console.log(res)

      this.addCatOptions = res.data.data
    },
    // 显示添加分类对话框
    showAddCatDialog () {
      this.dialogAddCatVisible = true
      // 重置对话框
    },
    // 添加商品分类
    async addCat () {
      const { cat_name, cat_pid_arr } = this.addCatForm
      let res = await this.$axios.post('categories', {
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1],
        cat_name,
        cat_level: 2
      })
      // console.log(res)
      if (res.data.meta.status === 201) {
        this.dialogAddCatVisible = false
        this.$message({
          message: '创建成功',
          type: 'success',
          duration: 800
        })
        this.loadCatData()
        // 重置未完成======================
        this.addCatForm.resetFields()
      }
    }
  }
}
</script>

<style>
</style>
