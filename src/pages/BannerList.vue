<template>
  <div class="banner-manager">
    <div class="toobar">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>banner管理</el-breadcrumb-item>
        <el-breadcrumb-item>banner列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="query">
      <el-form ref="form" :inline="true" class="demo-form-inline">
        <el-form-item label="图片类别:">
          <el-select v-model="bannerInfo.categoryId" placeholder="请选择图片类别">
            <el-option label="banner图" value="0"></el-option>
            <el-option label="详情图" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            type="date"
            placeholder="开始日期"
            v-model="bannerInfo.startDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            type="date"
            placeholder="结束日期"
            v-model="bannerInfo.endDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-switch v-model="bannerInfo.status" active-text="禁用" inactive-text="启用"></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryClick">查询</el-button>
          <el-button type="success">新增商品</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="querylist">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="id" label="序号" width="120"></el-table-column>
        <el-table-column align="center" prop="title" label="图片标题" width="220"></el-table-column>
        <el-table-column align="center" prop="imgSrc" label="图片" width="300">
          <template slot-scope="scope">
            <img class="img" :src="scope.row.imgSrc" />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="desc" label="图片描述" width="220"></el-table-column>
        <el-table-column align="center" prop="cate" label="图片类别" width="120">
          <template slot-scope="scope">
            <span v-text="scope.row.categoryId==0 ? 'banner图' : '详情页'"></span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <span v-text="scope.row.status==0 ? '启用' : '禁用'"></span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createdAt" label="创建时间" width="220"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        align="center"
        background
        :current-page="page"
        layout="prev, pager, next, sizes"
        @current-change="currentChange"
        :total="tableCount"
      ></el-pagination>
    </div>

    <el-dialog title="添加banner图" :visible.sync="addbannerVisible" width="50%">
      <el-form
        label-width="100px"
      >
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input  placeholder></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addbannerVisible = false">取 消</el-button>
        <el-button type="primary" @click="addbannerVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "BannerManager",
  data() {
    return {
      bannerInfo: {
        categoryId: "",
        startDate: "",
        endDate: "",
        status: 0
      },
      page: 1,
      tableData: [],
      tableCount: 0,
      addbannerVisible:false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    queryClick() {},
    getList() {
      let data = {
        page: this.page,
        size: 10
      };

      this.$http.bannerapi.queryBanner(data).then(res => {
        res.list.map((ele, idx) => {
          res.list[idx].createdAt = moment(ele.createdAt).format(
            "yyyy-MM-DD hh:mm:ss"
          );
          res.list[idx].id = idx + 1;
        });

        this.tableData = res.list;
        this.tableCount = res.totalPage;
      });
    },
    currentChange(page) {
      console.log("page", page);
      this.page = page;
      this.getList();
    },
    handleClick() {}
  }
};
</script>

<style lang='scss' scoped>
.toobar {
  width: 100%;
  height: 28px;
  padding: 10px;
  box-sizing: border-box;
}
.query {
  height: 60px;
  width: 100%;
  margin-top: 10px;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
}

.querylist {
  margin-top: 10px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  height: 100%;
}

.img {
  height: 80px;
  width: 120px;
}

.el-pagination {
  margin-top: 20px;
}
</style>
