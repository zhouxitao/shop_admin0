export default {
  data () {
    return {
      rolesData: [{
        roleName: '王小虎',
        roleDesc: '游击队队长',
        id: -1,
        children: ''
      }],
      form: {
        name: 'erya'

      },
      // 对话框显示
      dialogAssignRightsVisible: false,
      // 对话框树结构
      treeData: [{
        id: 1,
        authName: '一级 1',
        children: [{
          id: 4,
          authName: '二级 1-1',
          children: [{
            id: 9,
            authName: '三级 1-1-1'
          }, {
            id: 10,
            authName: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        authName: '一级 2',
        children: [{
          id: 5,
          authName: '二级 2-1'
        }, {
          id: 6,
          authName: '二级 2-2'
        }]
      }, {
        id: 3,
        authName: '一级 3',
        children: [{
          id: 7,
          authName: '二级 3-1'
        }, {
          id: 8,
          authName: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 角色ID
      roleId: 0
    }
  },
  created () {
    this.getRolesData()
    this.loadAssignRights()
  },
  methods: {
    // 处理索引
    indexMethod (index) {
      return index
    },
    // 获取角色列表
    async getRolesData () {
      let res = await this.$axios.get('roles')
      console.log(res)
      this.rolesData = res.data.data
    },
    // 加载权限树数据
    async loadAssignRights () {
      let res = await this.$axios.get('rights/tree')
      this.treeData = res.data.data
    },
    // 显示数据树对话框
    getAssignRights (row) {
      this.dialogAssignRightsVisible = true
      this.roleId = row.id
      // console.log(row)
      let keys = []
      // console.log(row.children)

      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            // console.log(item3.id)

            keys.push(item3.id)
          })
        })
      })
      // console.log(keys)
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(keys)
      })
    },
    // 修改权限
    async assignRights () {
      let keys1 = this.$refs.tree.getCheckedKeys()
      let keys2 = this.$refs.tree.getHalfCheckedKeys()
      console.log(keys1)
      console.log(keys2)
      let keys = [...keys1, ...keys2]
      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: keys.join(',')
      })
      if (res.data.meta.status === 200) {
        this.$message({
          message: '更新权限成功',
          type: 'success',
          duration: 800
        })
        this.dialogAssignRightsVisible = false
        this.getRolesData()
      }
      // console.log(res)
    }
  }
}
