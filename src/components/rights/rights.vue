<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格部分 -->
    <el-table
      :data="rightsData"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
        :index='indexMethod'
      >
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="level"
        label="等级"
      >
        <template slot-scope='scope'>
          <span v-if='scope.row.level==0'>一级</span>
          <span v-else-if='scope.row.level==1'>二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightsData: [{
        authName: '王小虎',
        level: 'SSS级',
        path: '上海市普陀区'
      }]
    }
  },
  created () {
    this.getAllRights()
  },
  methods: {
    // 获取全部权限
    async getAllRights () {
      let res = await this.$axios.get('rights/list')
      console.log(res)
      if (res.data.meta.status === 200) {
        this.rightsData = res.data.data
      }
    },
    // 处理索引
    indexMethod (index) {
      return index
    }
  }
}
</script>

<style scoped>
.el-breadcrumb {
  height: 40px;
  background: #d4dae0;
  line-height: 40px;
  padding-left: 20px;
}
</style>
