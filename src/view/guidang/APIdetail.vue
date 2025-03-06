<template>
  <div class="api-detail" v-loading="pageLoading">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>API市场</el-breadcrumb-item>
        <el-breadcrumb-item>{{ file.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="api-name">
      {{ file.name }}
    </div>
    <div class="api-url">
      <div class="url-box">
        <el-tag effect="dark">{{ file.method }}</el-tag>
        <span class="url" @click="copyUrl(file.url)">{{ file.url | urlFilter }}</span>
      </div>

      <el-button @click="testApi()" round type="primary" icon="el-icon-caret-right">调试</el-button>
    </div>
    <div class="title-item">
      <div class="title">
        <span></span>
        <span>请求参数</span>
      </div>
      <el-table border
                :data="file.body"
                stripe
                row-key="id"
                :tree-props="{children: 'children', hasChildren: 'undefined'}"
      >
        <el-table-column prop="requestName" label="参数名称" width="200"></el-table-column>
        <el-table-column prop="type" label="参数类型" width="100"></el-table-column>
        <el-table-column prop="required" label="是否必填" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.required" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="参数描述"></el-table-column>
        <el-table-column prop="example" label="示例值">
          <template slot-scope="scope">
            <div>{{ JSON.stringify(scope.row.example) }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="title-item" v-if="requestTemplate">
      <div class="title">
        <span></span>
        <span>请求示例</span>
      </div>
      <pre :key="uid1" v-highlightjs="requestTemplate"><code class="javascript"></code></pre>
    </div>
    <div class="title-item">
      <div class="title">
        <span></span>
        <span>响应参数</span>
      </div>
      <el-table border
                :data="file.response"
                stripe
                row-key="id"
                :tree-props="{children: 'children', hasChildren: 'undefined'}"
      >
        <el-table-column prop="responseName" label="名称" width="300"></el-table-column>
        <el-table-column prop="type" label="类型" width="100"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="example" label="示例值">
          <template slot-scope="scope">
            <div>{{ JSON.stringify(scope.row.example) }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="title-item" v-if="responseTemplate">
      <div class="title">
        <span></span>
        <span>响应示例</span>
      </div>
      <pre :key="uid2" v-highlightjs="responseTemplate">
                <code class="javascript"></code>
            </pre>
    </div>

    <APIdrawer :drawer="drawer" :file="fileCopy" @closeDrawer="closeDrawer"/>
  </div>
</template>

<script>
const baseUrl = '/file/115069958.json'
import APIdrawer from "./APIdrawer.vue";

export default {
  name: "APIdetail",
  components: {
    APIdrawer
  },
  data() {
    return {
      pageLoading: false,
      file: {
        name: "",
      },
      fileCopy: {},
      requestTemplate: '',
      responseTemplate: '',
      drawer: false,
      uid1: "1",
      uid2: "2",
    }
  },
  computed: {},
  created() {
    this.getFile();
  },
  filters: {
    urlFilter(url) {
      return baseUrl
    }
  },
  methods: {
    closeDrawer(type) {
      this.drawer = type;
      setTimeout(() => {
        this.createRequestCode()
        this.createResponseCode()
      }, 100)
    },
    creatId(data) {
      data.forEach(res => {
        if (res.children && res.children.length) {
          res.children = this.creatId(res.children);
        }

        res.id = Math.random().toString(36).substring(4)
      })

      return data

    },
    getFile() {
      this.pageLoading = true;
      this.file = require(`@/assets/apiList/115069958.json`)
      this.fileCopy = JSON.parse(JSON.stringify(this.file))
      this.file.body = this.creatId(this.file.body)
      this.file.response = this.creatId(this.file.response)
      this.pageLoading = false;


      setTimeout(() => {
        this.createRequestCode()
        this.createResponseCode()
      }, 100)
    },
    copyUrl(url) {
      navigator.clipboard.writeText(`${baseUrl}${url}`)
          .then(() => {
            this.$message.success('已复制到剪贴板');
          })
          .catch(err => {
            this.$message.error('复制失败: ' + err);
          });
    },
    createRequestCode() {
      this.requestTemplate = JSON.stringify(this.buildRequest(this.file.body), null, 4)
      this.uid1 = Math.random().toString(36).substring(4);
    },
    createResponseCode() {
      this.responseTemplate = JSON.stringify(this.buildResponse(this.file.response), null, 4);
      this.uid2 = Math.random().toString(36).substring(4);
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
    buildResponse(responseArray) {
      let response = {};
      responseArray.forEach(item => {
        if (item.children && item.children.length) {
          if (item.type === 'array') {
            response[item.responseName] = [this.buildResponse(item.children)];
          } else {
            response[item.responseName] = this.buildResponse(item.children);
          }
        } else {
          response[item.responseName] = item.example;
        }
      });
      return response;
    },
    testApi() {
      this.drawer = true;
      this.createRequestCode()
      this.createResponseCode()
    }
  }
}
</script>

<style scoped lang="less">
.api-detail {
  padding: 20px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.3);

  .breadcrumb {
    margin-bottom: 20px;
  }

  .api-name {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .api-url {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .url-box {
      display: flex;
      align-items: center;
      padding: 4px 16px 4px 4px;
      background-color: rgba(0, 0, 0, 0.04);
      backdrop-filter: blur(20px);
      border-radius: 4px;
      margin-right: 16px;

      .url {
        white-space: nowrap;
        max-width: 600px;
        min-width: 200px;
        margin-left: 16px;
        overflow-x: auto;
        cursor: pointer;
      }
    }
  }

  .title-item {
    background: rgba(0, 0, 0, 0.04);
    padding: 20px;
    border-radius: 4px;
    margin-bottom: 20px;

    .title {

      margin-bottom: 20px;
      display: flex;
      align-items: center;

      span {
        &:first-child {
          width: 6px;
          height: 16px;
          background: #0061f3;
          border-radius: 2px;
          margin-right: 8px;
        }

        &:last-child {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
