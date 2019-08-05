export default {
  data () {
    return {
      rolesData: [{
        roleName: '王小虎',
        roleDesc: '2016'

      }],
      treeData: [{
        authName: '一级 1',
        children: [{
          authName: '二级 1-1',
          children: [{
            authName: '三级 1-1-1'
          }]
        }]
      }, {
        authName: '一级 2',
        children: [{
          authName: '二级 2-1',
          children: [{
            authName: '三级 2-1-1'
          }]
        }, {
          authName: '二级 2-2',
          children: [{
            authName: '三级 2-2-1'
          }]
        }]
      }, {
        authName: '一级 3',
        children: [{
          authName: '二级 3-1',
          children: [{
            authName: '三级 3-1-1'
          }]
        }, {
          authName: '二级 3-2',
          children: [{
            authName: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 显示状态框
      dialogAssignRightVisible: false,
      // 角色寻找数据
      key: 0,
      // 权限选择id
      id: 0
    }
  },
  created () {
    this.loadRolesForm()
    this.loadRightsList()
  },
  methods: {
    // 处理索引
    indexMethod (index) {
      return index
    },
    // 加载角色列表
    async loadRolesForm () {
      let res = await this.$axios.get('roles')
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.rolesData = res.data.data
      }
    },
    // 加载权限列表
    async loadRightsList () {
      let res = await this.$axios.get('rights/tree')
      console.log(res)
      this.treeData = res.data.data
    },
    // 显示对话框
    showAssignRightsDialog (row) {
      this.dialogAssignRightVisible = true
      console.log(row)
      let keys = []
      this.id = row.id
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            keys.push(item3.id)
          })
        })
      })
      // console.log(keys)

      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(keys)
      })
      // let key1 = this.$refs.tree.getCheckedKeys()
      // let key2 = this.$refs.tree.getHalfCheckedKeys()
      // console.log(key1, key2)
    },
    async assignRights () {
      let id = this.id
      let keys1 = this.$refs.tree.getHalfCheckedKeys()
      let keys2 = this.$refs.tree.getCheckedKeys()
      let key = [...keys1, ...keys2]
      let res = await this.$axios.post(`roles/${id}/rights`, {
        rids: key.join(',')
      })
      if (res.data.meta.status === 200) {
        this.$message({
          message: '授权成功',
          type: 'success',
          duration: 800
        })
        this.dialogAssignRightVisible = false
        this.loadRolesForm()
      }
      console.log(res)
    }
  }
}
