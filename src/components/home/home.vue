<template>
  <el-container>
    <!-- 顶部 -->
    <el-header>
      <el-row>
        <el-col :span='8'>
          <img
            src="../../assets/logo.png"
            alt=""
          ></el-col>
        <el-col :span='8'>
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col
          class='cl3'
          :span='8'
        >
          恭喜黑马前端程序猿年薪200W
          <a
            href="#"
            @click.prevent='logout'
          >退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>

      <!-- 导航部分 -->
      <el-aside width="200px">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router='true'
          :default-active='handleUrlPath()'
        >
          <el-submenu
            :index="item1.id+''"
            v-for='item1 in menusData'
            :key='item1.id'
          >
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>{{ item1.authName }}</span>
            </template>
            <el-menu-item
              v-for='item2 in item1.children'
              :key='item2.id'
              :index="'/'+item2.path"
            >{{item2.authName }}</el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">用户列表</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles">角色列表</el-menu-item>
            <el-menu-item index="/rights">权限列表</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">商品列表</el-menu-item>
            <el-menu-item index="3-2">分类参数</el-menu-item>
            <el-menu-item index="3-3">商品分类</el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-2">订单列表</el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>数据管理</span>
            </template>
            <el-menu-item index="1-2">数据报表</el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-aside>

      <!-- 页面主体部分 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menusData: {
        authName: '',
        order: ''
      }
    }
  },
  created () {
    this.loadMenusData()
  },
  methods: {
    // 退出登录
    logout () {
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        this.$message({
          type: 'success',
          message: '退出成功!',
          duration: 800
        })
        localStorage.removeItem('token')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出',
          duration: 800
        })
      })
    },
    // 点击谁跳到谁那里
    handleUrlPath () {
      // 锁定选定背景色
      // console.log(this.$route)
      if (this.$route.path === '/goods-add') {
        return '/goods'
      }
      if (this.$route.path.startsWith('/users')) {
        return '/users'
      }
      return this.$route.path
    },
    // 获取左侧导航列表
    async loadMenusData () {
      let res = await this.$axios.get('menus')
      // console.log(res)
      this.menusData = res.data.data
    }
  }
}
</script>

<style lang='less'>
.el-container {
  height: 100%;
}
.el-header {
  height: 60px;
  background-color: #b3c1cd;
  padding: 0;

  h1 {
    font-size: 26px;
    color: #fff;
    line-height: 60px;
  }

  .cl3 {
    line-height: 60px;

    a {
      color: orange;
    }
  }
}
.el-aside {
  .el-menu {
    height: 100%;
  }
}
.el-main {
  background-color: #eaeef1;
}
</style>
