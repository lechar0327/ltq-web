<template>
  <div class="product-manager">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="query">
      <el-form ref="form" :inline="true" class="demo-form-inline">
        <el-form-item label="商品名称:">
          <el-input prefix="商品名称:" v-model="queryInfo.productName" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品品类:">
          <el-select v-model="cate" placeholder="请选择商品品类">
            <el-option
              v-for="item in queryInfo.category"
              :key="item.id"
              :label="item.cate_zh"
              :value="item.cate"
            ></el-option>.
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            type="date"
            placeholder="开始日期"
            v-model="queryInfo.startDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            type="date"
            placeholder="结束日期"
            v-model="queryInfo.endDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-switch v-model="queryInfo.putaway" active-text="上架" inactive-text="下架"></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryClick">查询</el-button>
          <el-button type="success" @click="addgoodVisible = true">新增商品</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="querylist">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" fixed prop="id" label="序号" width="120"></el-table-column>
        <el-table-column align="center" fixed prop="name" label="商品名称" width="220"></el-table-column>
        <el-table-column align="center" fixed prop="img" label="图片" width="300">
          <template slot-scope="scope">
            <img class="img" :src="scope.row.img" />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="price" label="价格" width="120">
          <template slot-scope="scope">
            <span v-text="'¥ '+scope.row.price.$numberDecimal"></span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="cate" label="品类" width="120" :formatter="getCateZh"></el-table-column>
        <el-table-column align="center" prop="hot" label="是否推荐" width="300">
          <template slot-scope="scope">
            <span v-text="scope.row.isHot ? '是' : '否'"></span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createdAt"
          label="创建时间"
          :formatter="formatter"
          width="220"
        ></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="goodDetails(scope.row)" type="text" size="small">详情</el-button>
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

    <el-dialog title="添加商品" :visible.sync="addgoodVisible" width="50%" @close="closeDialog">
      <el-form label-width="100px">
        <el-form-item label="商品名称:">
          <el-input prefix="商品名称:" v-model.trim="addDilogInfo.productName" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品品类:">
          <el-select v-model="cate" placeholder="请选择商品品类">
            <el-option
              v-for="item in addDilogInfo.category"
              :key="item.id"
              :label="item.cate_zh"
              :value="item.cate"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格:">
          <el-input prefix="商品价格:" v-model.trim.number="addDilogInfo.price" placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <el-form-item label="是否推荐:">
          <el-switch v-model="addDilogInfo.isHot"></el-switch>
        </el-form-item>

        <el-form-item label="上传图片:">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addgoodVisible = false">取 消</el-button>
        <el-button type="primary" @click="addgoodVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="商品详情" :visible.sync="goodDetailsVisible" width="60%" @close="closeDialog">
      <el-form label-width="100px">
        <el-form-item label="商品发货地:">
          <el-input
            prefix="商品发货地:"
            v-model.trim="goodDetailsInfo.goodAddress"
            placeholder="请输入商品发货地"
          ></el-input>
        </el-form-item>

        <el-form-item label="商品详情描述:">
       
          <Editor></Editor>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="addgoodVisible = false">取 消</el-button>
        <el-button type="primary" @click="addgoodVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import listObj from "@/utils/data";


export default {
  name: "productManager",
  components: {
       Editor: () => import("@/components/Editor.vue"),
  },
  data() {
    return {
      // 查询对象
      queryInfo: {
        productName: "",
        category: [],
        startDate: "",
        endDate: "",
        putaway: 0
      },
      page: 1,
      tableData: [],
      tableCount: 0,
      cate: "",
      addgoodVisible: false,
      goodDetailsVisible: false,
      //添加商品对象
      addDilogInfo: {
        productName: "",
        category: [],
        price: "",
        isHot: false
      },
      //商品详情对象
      goodDetailsInfo: {
        goodAddress: "",
        goodDesc: ""
      },
      content: ``,
      editorOption: {}
    };
  },
  watch: {
    cate: function() {
      this.page = 1;
      this.getList();
    }
  },
  mounted() {
    listObj.category.unshift({ cate: "", cate_zh: "全部品类" });
    this.queryInfo.category = listObj.category;
    this.addDilogInfo.category = listObj.category;

    this.getList();
  },
  methods: {
    //查询
    queryClick() {},
    //获取商品列表
    getList() {
      let data = {
        page: this.page,
        size: 10,
        hot: true,
        cate: this.cate
      };

      this.$http.productapi.getHotGoodList(data).then(res => {
        res.list.map((ele, idx) => {
          res.list[idx].createAt = moment(ele.createAt).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          res.list[idx].id = idx + 1;
        });

        this.tableData = res.list;
        this.tableCount = res.totalPage;
      });
    },
    //关闭弹框
    closeDialog() {
      this.addDilogInfo.productName = "";
      this.addDilogInfo.category = [];
      this.addDilogInfo.price = "";
      this.addDilogInfo.isHot = false;
    },
    //查看商品详情
    goodDetails(row) {
      this.$http.productapi.getGoodDetail({ id: row._id }).then(res => {
        console.log(res);

        this.goodDetailsVisible = true;
        // if(res.data){

        // }
        // else{

        // }
      });
    },
    //分页
    currentChange(page) {
      this.page = page;
      this.getList();
    },
    //格式化品类,中文显示
    getCateZh(row) {
      var obj = this.queryInfo.category.find(item => {
        return item.cate == row.cate;
      });

      return obj.cate_zh;
    },
    //格式化日期
    formatter(row) {
      return moment(row.createAt).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};


</script>

<style lang='scss' scoped>
.query {
  width: 100%;
  margin-top: 20px;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
}
.grid-content {
  display: flex;
  justify-content: space-around;
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
