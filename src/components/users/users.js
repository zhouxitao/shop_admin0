export default {
  data () {
    return {
      userData: [{
        username: '彪子',
        email: '12345@qq.com',
        mobile: '15512341234'
      }],
      // 页码数量
      total: 0,
      // 当前页
      pagenum: 1,
      // 搜索数据
      input3: '',
      // 显示对话窗口
      dialogAddUserVisible: false,
      // 新增窗口
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 对话框校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在6-12个字符', trigger: 'blur' }
        ],
        email: [{
          pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          message: '格式不正确',
          trigger: 'blur'
        }],
        mobile: [{
          pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
          message: '格式不正确',
          trigger: 'blur'
        }]
      },
      // 默认打开开关
<<<<<<< HEAD
      value1: true,

      // 显示编辑用户对话框==============
      dialogEditUserFormVisible: false,
      // 编辑用户对话框对象
      editUserForm: {
        username: '王小虎',
        email: '1231@qq.com',
        mobile: '15511223344',

        // 发送请求用
        id: '-1'
      },
      // 第3====修改权限对话框=============
      dialogAssignRoleVisible: false,
      // 修改权限对话框数据
      assignRoleForm: {
        username: '彪子',
        id: 0,
        rid: ''
      },
      // 角色列表
      roleData: []
      // 获取url后面的页码
      // page: ''
    }
  },
  created () {
    let page = this.$route.params.page
    // console.log(page)

    this.getUsersData(page)
    this.loadRightData()
=======
      value1: true
    }
  },
  created () {
    this.getUsersData(1)
>>>>>>> be99e3889f7062001f88c9e1dc597a78c70a3261
  },
  methods: {
    // 获取所有用户信息
    getUsersData (pagenum = 1, query = '') {
      this.$axios.get('users', {
        params: {// 查询参数
          query,
          // 当前页
          pagenum,
          // 每页条数
          pagesize: 2
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.userData = res.data.data.users
          // 设置分页数量
          this.total = res.data.data.total
          // 当前页
          this.pagenum = res.data.data.pagenum
        }
      })
    },
    // 页码改变时，页面跳转
    currentChange (curPage) {
      // console.log(curPage)
      this.getUsersData(curPage, this.input3)
<<<<<<< HEAD
      this.$router.push('/users/' + curPage)
      console.log(this.$route)
=======
>>>>>>> be99e3889f7062001f88c9e1dc597a78c70a3261
    },
    // 点击搜索框
    search () {
      this.getUsersData(1, this.input3)
    },
    // 点击显示对话框
    isShowAddUser () {
      this.dialogAddUserVisible = true
    },
    // 添加用户
    addUser () {
      this.$axios.post('users', this.addUserForm, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        // console.log(res)
        if (res.data.meta.status === 201) {
          this.dialogAddUserVisible = false
          this.$message({
            message: '添加成功',
            type: 'success',
            duration: 800
          })
          this.getUsersData()
        }
      })
    },
    // 对话框关闭，清空
    closeDialog () {
      this.$refs.refAddUserRef.resetFields()
    },
    // 删除列表
    delUser (id) {
      console.log(id)
      this.$confirm('此操作将删除该列表, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        this.$axios.delete(`users/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }).then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 800
            })
            this.getUsersData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出',
          duration: 800
        })
      })
    },
    // 修改开关状态
    changeState (row) {
      console.log(row)
      let id = row.id
      let state = row.mg_state
      this.$axios.put(`users/${id}/state/${state}`, null, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            message: '修改状态成功',
            type: 'success',
            duration: 800
          })
        }
      })
<<<<<<< HEAD
    },
    // 显示---编辑用户---对话框====================
    showEditUserDialog (row) {
      this.dialogEditUserFormVisible = true
      console.log(row)
      this.editUserForm.username = row.username
      this.editUserForm.email = row.email
      this.editUserForm.mobile = row.mobile
      this.editUserForm.id = row.id
      // 解构
      // let { username, email, mobile, id } = row
      // this.editUserForm.username = username
      // this.editUserForm.email = email
      // this.editUserForm.mobile = mobile
      // this.editUserForm.id = id
    },
    // =====编辑用户====确认
    async editUserConfirm () {
      let id = this.editUserForm.id
      let email = this.editUserForm.email
      let mobile = this.editUserForm.mobile

      // var { email1, mobile1, id1 } = this.editUserForm
      // console.log(id1, email1, mobile1)

      let res = await this.$axios.put(`users/${id}`, {
        // email: this.editUserForm.email,
        // mobile: this.editUserForm.mobile
        email,
        mobile
      })
      console.log(res)
      if (res.data.meta.status === 200) {
        this.dialogEditUserFormVisible = false
        this.$message({
          message: '编辑成功',
          type: 'success',
          duration: 800
        })
        this.getUsersData(this.pagenum, this.input3)
      }
    },
    // 加载角色列表
    async loadRightData () {
      let res = await this.$axios.get('roles')
      // console.log(res)
      this.roleData = res.data.data
    },
    // 显示分配权限对话框
    async showAssignRightDialog (row) {
      this.dialogAssignRoleVisible = true
      // console.log(row)
      let { username, id } = row
      this.assignRoleForm.userName = username
      this.assignRoleForm.id = id

      let res = await this.$axios.get(`users/${id}`)
      // console.log(res)
      this.assignRoleForm.rid = res.data.data.rid === -1 ? '' : res.data.data.rid
    },
    // 修改用户权限
    async assignRole () {
      let { id, rid } = this.assignRoleForm

      let res = await this.$axios.put(`users/${id}/role`, {
        rid
      })
      console.log(res)
      if (res.data.meta.status === 200) {
        this.dialogAssignRoleVisible = false
        this.$message({
          message: '权限设置成功',
          type: 'success',
          duration: 800
        })
        this.getUsersData(this.pagenum, this.input3)
      }
=======
>>>>>>> be99e3889f7062001f88c9e1dc597a78c70a3261
    }
  }
}
