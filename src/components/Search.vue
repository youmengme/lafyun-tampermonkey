<template>
  <div>
    <el-dialog
      :visible.sync="open"
      :show-close="false"
    >
      <div class="content">
        <div class="search-bar">
          123
        </div>
        <el-table :data="[]">
          <el-table-column property="date" label="日期" width="150"></el-table-column>
          <el-table-column property="name" label="姓名" width="200"></el-table-column>
          <el-table-column property="address" label="地址"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'searchComponent',
  data() {
    return {
      open: true,
    }
  }
}
</script>

<style scoped>

</style>
