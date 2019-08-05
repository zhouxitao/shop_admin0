<template>
  <div>
    <el-button
      type='primary'
      plain
      @click='addGoodsData'
    >添加商品</el-button>
    <el-table
      :data="goodsData"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="商品数量"
      >
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.add_time | timeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
      >
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      goodsData: [{
        goods_name: '虎子',
        goods_price: '1999',
        goods_number: '上海市普陀区',
        add_time: '2019-8-4'
      }]
    }
  },
  created () {
    this.loadGoodsData()
  },
  filters: {
    timeFilter (res) {
      // console.log(res)
      return moment(res).format('YYYY-MM-DD')
    }
  },
  methods: {
    // 加载商品列表
    async loadGoodsData () {
      let res = await this.$axios.get('goods', {
        params: {
          query: '',
          pagenum: 1,
          pagesize: 4
        }
      })
      console.log(res)
      this.goodsData = res.data.data.goods
    },
    // 添加列表
    addGoodsData () {
      this.$router.push('/goods-add')
    }
  }
}
</script>

<style>
</style >
