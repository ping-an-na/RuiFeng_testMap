<template>
  <el-drawer
      :title="`${file.name}-接口调试`"
      :visible.sync="drawer"
      :direction="direction"
      :wrapperClosable="false"
      :before-close="handleClose"
      custom-class="api-drawer">
    <div class="api-tester">
      <div class="request-header">
        <el-input v-model="url" placeholder="请输入请求地址" class="url-input">
          <template slot="prepend">{{ file.method }}</template>
        </el-input>
        <el-button :loading="sending" type="primary" @click="sendRequest">
          发送
        </el-button>
      </div>

      <!-- 原有的请求配置区域 -->
      <div class="request-config">
        <el-tabs v-model="activeTab" type="border-card">
          <el-tab-pane label="Headers" name="headers">
            <el-form>
              <el-row v-for="(item, index) in headers" :key="index">
                <el-col :span="10">
                  <el-input size="mini" v-model="item.key" placeholder="Key"></el-input>
                </el-col>
                <el-col :span="10" :offset="1">
                  <el-input size="mini" v-model="item.value" placeholder="Value"></el-input>
                </el-col>
                <el-col :span="2" :offset="1">
                  <el-button type="danger" size="mini" icon="el-icon-delete" circle
                             @click="removeParam('headers', index)"></el-button>
                </el-col>
              </el-row>
              <el-button type="primary" size="mini" @click="addParam('headers')">添加 Header</el-button>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="Query" name="query">
            <el-form>
              <el-row align="middle" type="flex" v-for="(item, index) in query" :key="index">
                <el-col :span="10">
                  <el-input size="mini" v-model="item.key" placeholder="Key"></el-input>
                </el-col>
                <el-col :span="10" :offset="1">
                  <el-input size="mini" v-model="item.value" placeholder="Value"></el-input>
                </el-col>
                <el-col :span="2" :offset="1">
                  <el-button type="danger" size="mini" icon="el-icon-delete" circle
                             @click="removeParam('query', index)"></el-button>
                </el-col>
              </el-row>
              <el-button type="primary" size="mini" @click="addParam('query')">添加 Query</el-button>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="Body" name="body">
            <el-input
                style="line-height: 1;"
                type="textarea"
                v-model="requestBody"
                :rows="15"
                placeholder="请输入请求体（JSON 格式）">
            </el-input>
          </el-tab-pane>

        </el-tabs>
      </div>

      <!-- 响应结果预览区域 -->
      <div class="response-header">
        <span class="title">响应结果</span>
        <span v-if="responseTime" class="response-time">
                    <i class="el-icon-timer"></i>
                    耗时：{{ responseTime }}ms
                </span>
      </div>
      <pre v-if="responseData" v-highlightjs="responseData">
                <code class="javascript"></code>
            </pre>
      <div v-loading="sending" class="response-preview" v-else>
        <el-empty :image-size="200" description="点击发送请求查看结果..."></el-empty>
      </div>
      <div style="height: 20px;width: 10px;"></div>


    </div>
  </el-drawer>
</template>

<script>
// import {baseUrl} from "@/utils/shopStoreFetch"
const baseUrl = '11'
// import {getToken} from "@/utils/auth";
import axios from "axios";

export default {
  props: {
    drawer: {
      type: Boolean,
      default: false
    },
    file: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      direction: 'rtl',
      activeTab: 'body',
      headers: [],
      query: [],
      requestBody: '',
      responseData: '',
      responseTime: null,
      url: '',
      userToken: '',
      sending: false
    }
  },
  mounted() {
    if (this.file) {
      this.url = `${baseUrl}${this.file.url}`
      this.createRequestCode()
    } else {
      this.url = `${baseUrl}`
    }
  },
  methods: {
    handleClose() {
      this.$emit('closeDrawer', false)
    },
    addParam(type) {
      this[type].push({
        key: '',
        value: ''
      })
    },

    removeParam(type, index) {
      this[type].splice(index, 1)
    },
    createRequestCode() {
      if (this.file.body.length) {
        this.requestBody = JSON.stringify(this.buildRequest(this.file.body), null, 4)
      }
    },
    buildRequest(bodyArray) {
      let request = {};
      bodyArray.forEach(item => {
        if (item.children && item.children.length) {
          if (item.type === 'array') {
            request[item.requestName] = [this.buildRequest(item.children)];
          } else {
            request[item.requestName] = this.buildRequest(item.children);
          }
        } else {
          request[item.requestName] = item.example;
        }
      });
      return request;
    },
    async sendRequest() {
      this.responseData = null
      try {
        const startTime = Date.now()

        // 构建请求参数
        const requestConfig = {
          url: this.url,
          method: this.file.method,
          headers: this.headers.reduce((acc, curr) => {
            if (curr.key && curr.value) {
              acc[curr.key] = curr.value
            }
            return acc
          }, {}),
          params: this.query.reduce((acc, curr) => {
            if (curr.key && curr.value) {
              acc[curr.key] = curr.value
            }
            return acc
          }, {})
        }

        if (this.requestBody) {
          try {
            requestConfig.data = JSON.parse(this.requestBody)
          } catch (e) {
            this.$message.error('请求体 JSON 格式错误')
            return
          }
        }

        if (!this.url) {
          this.$message.error('请输入请求地址')
          return
        }
        this.sending = true
        const response = await axios(requestConfig)
        this.responseTime = Date.now() - startTime
        this.responseData = JSON.stringify(response.data, null, 2)
        this.sending = false
      } catch (error) {
        this.responseData = JSON.stringify(error.response?.data || error.message, null, 2)
        this.$message.error('请求失败')
        this.sending = false
      }
    }
  }
}
</script>
<style lang="less">
.api-drawer {
  .el-drawer__header {
    margin-bottom: 0;
    padding: 15px 20px;
    border-bottom: 1px solid #ebeef5;
    background: #fff;

    span {
      font-size: 16px;
      font-weight: 500;
      color: #1f2937;
    }
  }
}

.api-tester {
  padding: 16px;
  //height: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  background: #fff;
  //overflow: auto;

  .request-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;

    .url-input {
      flex: 1;

      .el-input__inner {
        border-color: #dcdfe6;

        &::placeholder {
          color: #909399;
        }
      }
    }

  }

  .request-config {
    .el-tabs--border-card {
      border: 1px solid #e4e7ed;
      box-shadow: none;
      background: #fff;

      .el-tabs__header {
        background: #f5f7fa;
        border-bottom: 1px solid #e4e7ed;
      }

      .el-tabs__item {
        color: #606266;

        &.is-active {
          //color: #7468f2;
          border-right-color: #e4e7ed;
        }
      }
    }

    .el-button {
      min-height: auto;
    }

    .el-row {
      margin-bottom: 10px;
    }
  }

  .response-header {
    margin-top: 20px;

    .title {
      color: #313f57;
    }

    .response-time {
      margin-left: 10px;
      color: #313f57;
    }
  }

  .response-preview {
    background: #fff;
    border: 1px solid #e4e7ed;
    margin-top: 20px;
    padding: 10px;

    .el-textarea__inner {
      background: #fff;
      border: none;
      color: #1f2937;
    }
  }
}

</style>
