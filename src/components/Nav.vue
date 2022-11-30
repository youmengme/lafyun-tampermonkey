<template>
  <div>
    <div
      class="box plan"
      :class="{
      show: open,
      hide: !open,
    }"
    >
      <div
        class="openBox"
        @click="toggle"
        v-if="!open"
      >
        展开
      </div>

      <div class="content">
        <div class="title">
          lafyun开发助手
          <div
            class="closeBox"
            @click="toggle"
          >
            隐藏
          </div>
        </div>
        <div class="group">
          <div class="group-title">
            Collection
          </div>
          <div
            class="group-body"
            v-if="collections.length"
          >
            <div
              class="group-item"
              v-for="item in collections"
            >
              <div
                class="labelBox"
                @click.stop="handleFunctionClick(item)"
              >
                <span class="label">
                  {{ item.label }}
                </span>
                <div
                  class="collection"
                  @click.stop="onCollectClick(item)"
                >
                  <i class="el-icon-star-on" />
                </div>
              </div>
              <div
                class="nameBox"
                @click="onNameClick(item.name)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
          <el-empty
            class="empty"
            :image-size='80'
            description="暂无收藏"
            v-else
          />
          <el-skeleton
            v-if="isCollectionLoading"
          />
        </div>
        <div class="group">
          <div class="group-title">
            <div class="group-name">
              Functions
            </div>
            <el-input
              placeholder="请输入关键词"
              prefix-icon="el-icon-search"
              class="group-action"
              v-model="functionKeyword"
              @input="filterFunctions"
            >
            </el-input>
          </div>
          <div
            class="group-body"
            v-if="displayFunctions.length"
          >
            <div
              class="group-item"
              v-for="item in displayFunctions"
            >
              <div
                class="labelBox"
                @click.stop="onFunctionClick(item)"
              >
                <span class="label">
                  {{ item.label }}
                </span>
                <div
                  class="collection"
                  @click="onCollectClick(item)"
                >
                  <i class="el-icon-star-on"
                     v-if="collectionMappings[item.name]"
                  />
                  <i class="el-icon-star-off"
                     v-else
                  />
                </div>
              </div>
              <div
                class="nameBox"
                @click="onNameClick(item.name)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
          <el-empty
            class="empty"
            image-size='80'
            description="暂无云函数"
            v-else
          />
          <el-skeleton
            v-if="isFunctionLoading"
          />
        </div>
        <div class="group">
          <div class="group-title">
            Database
          </div>
          <div
            class="group-body"
            v-if="databases.length"
          >
            <div
              class="group-item"
              v-for="item in databases"
              @click="onDatabaseClick(item)"
            >
              <span>{{ item.name }}</span>
            </div>
          </div>
          <el-empty
            class="empty"
            image-size='80'
            description="暂无云数据库"
            v-else
          />
          <el-skeleton
            v-if="isDatabaseLoading"
          />
        </div>
      </div>
      <div class="footer">
        <div class="search">
          <i class="el-icon-search" />
          搜索函数全文
        </div>
      </div>
    </div>
    <search-component />
  </div>
</template>

<script>
import { getCollections, getFunctions } from '@/api'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'
import { databaseLink, functionLink } from '@/utils/links'
import { initLafAppInfo } from '@/utils'

import searchComponent from './Search.vue'

export default {
  name: 'Nav',
  components: {
    searchComponent,
  },
  data() {
    return {
      isFunctionLoading: true,
      isCollectionLoading: true,
      isDatabaseLoading: true,
      appid: '',
      open: true,
      functions: [],
      collections: [],
      displayFunctions: [],
      functionKeyword: '',
      databases: []
    }
  },
  computed: {
    collectionMappings() {
      return this.collections.reduce((acc, cur) => {
        acc[cur.name] = cur
        return acc
      }, {})
    }
  },
  mounted() {
    const appid = initLafAppInfo()
    if (!appid) return
    this.appid = appid
    this.initFunctions(appid)
    this.initDatabases(appid)
  },
  methods: {
    initFunctions(appid) {
      getFunctions(appid).then(res => {
        if (!res.data) return
        console.log(res)
        this.functions = res.data
        this.displayFunctions = res.data
        this.refreshCollections()
      }).finally(() => {
        this.isFunctionLoading = false
      })
    },
    initDatabases(appid) {
      getCollections(appid).then(res => {
        this.databases = res || []
      }).finally(() => {
        this.isDatabaseLoading = false
      })
    },
    toggle() {
      this.open = !this.open
    },
    onSearch() {
      console.log('onSearch')
    },
    onFunctionClick(fn) {
      if (fn.appid) window.location.href = functionLink(fn.appid, fn._id)
    },
    onDatabaseClick(fn) {
      if (this.appid) window.location.href = databaseLink(this.appid)
    },
    filterFunctions() {
      if (this.functionKeyword) {
        this.displayFunctions = this.functions.filter(item => {
          const nameMatch = item.name.indexOf(this.functionKeyword) > -1
          const labelMatch = item.label.indexOf(this.functionKeyword) > -1
          return nameMatch || labelMatch
        })
      } else {
        this.displayFunctions = this.functions
      }
    },
    refreshCollections() {
      const collections = getLocalStorage('collections')
      if (Array.isArray(collections)) {
        this.collections = this.functions.filter(item => collections.includes(item.name))
      }
      this.isCollectionLoading = false
    },
    onCollectClick(item) {
      const res = getLocalStorage('collections')
      const collections = res || []
      const index = collections.findIndex(i => i === item.name)
      if (index > -1) {
        collections.splice(index, 1)
      } else {
        collections.push(item.name)
      }
      setLocalStorage('collections', collections)
      this.refreshCollections()
    },
    fnDetailLink(fn) {
      functionLink(fn.appid, fn._id)
    },
    handleFunctionClick(fn) {
      this.$router.push({
        path: this.fnDetailLink(fn)
      })
    },
    onNameClick(message) {
      this.$copyText(message).then(() => {
        this.$message({
          message: '复制成功',
          type: 'success'
        })
      })
    }
  }
}
</script>


<style lang="less" scoped>
@plan-width: 300px;

.plan {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: @plan-width;
  z-index: 100;
  background: #fff;
  border-radius: 0 10px 10px 0;
  transition: left .3s ease-in-out;
  box-shadow: 8px 0 21px rgba(0, 0, 0, 0.1);
  overflow: scroll;
  user-select: none;

  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }


  &.show {
    right: 0;
  }

  &.hide {
    right: -110%;
  }

}

.title {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #fff;
  padding: 16px 0;
  font-size: 18px;
  font-weight: bold;

  .closeBox {
    position: absolute;
    left: 0;
    top: 0;
    width: 60px;
    height: 30px;
    border-radius: 16px 0 16px 0;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    background: #000;
    cursor: pointer;
  }
}

.openBox {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 30px 5px;
  background: black;
  font-size: 14px;
  border-radius: 16px 0 0 16px;
  writing-mode: vertical-lr;
  color: #ffffff;
  cursor: pointer;
  transition: right .3s ease-in-out;

  &.show {
    right: 0;
  }

  &.hide {
    right: -110%;
  }
}

.group {
  margin-top: 20px;
  padding: 0 12px;
}

.group-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 20px;
  font-weight: bold;

  .group-action {
    margin-left: 10px;

    & /deep/ input {
      border: none;
      outline: none;
      box-shadow: none;
      border-bottom: 1px solid #eee;
      border-radius: 0;
    }
  }
}

.group-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eeefff;
  font-size: 13px;
  cursor: pointer;

  .labelBox {
    display: flex;
    align-content: center;
    justify-content: space-between;
    width: 100%;
    font-size: 15px;
    font-weight: bold;

    .collection {
      font-size: 16px;
      color: #aaa;
    }
  }

  .nameBox {
    font-size: 12px;
    max-width: @plan-width;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #999;
    margin-top: 6px;

    &:hover {
      color: #409eff;
    }
  }
}

.footer {
  position: sticky;
  bottom: 0;
  left: 0;
  width: @plan-width;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666;
  padding: 10px 10px 20px;
  background: #fff;
  box-shadow: 0 0 35px rgba(0, 0, 0, 0.07);
}
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px 0;

  /deep/ .el-empty__description {
    color: #999999;
    margin-top: 10px;
  }
}
</style>
