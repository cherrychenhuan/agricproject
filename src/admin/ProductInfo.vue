<template>
  <div>
    <el-form class="calendarForm" style="background-color:#f4f4f5;margin-left:-10px;" label-width="80px">
      <el-row>
        <el-col :span="4">
          <el-form-item :label="'作物:'">
            <el-select v-model="filterData1.cropname">
              <el-option :key="0" :label="'无'" :value="''" />
              <el-option v-for="(item, index) in cropList" :key="item.id" :label="item.cropname"
                :value="item.cropname" />
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'年份:'">
            <el-select v-model="filterData1.xyear">
              <el-option :key="0" :label="'无'" :value="''" />
              <el-option v-for="(item, index) in yearList" :key="item" :label="item" :value="item" />
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'省份:'">
            <el-select v-model="filterData1.province">
              <el-option :key="0" :label="'无'" :value="''" />
              <el-option v-for="(item, index) in provinceList" :key="item.code" :label="item.name" :value="item.name" />
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button size='small' type="primary" style="height:30px;margin-left:30px;"
            @click="filterProductInfo">查询</el-button>
          <el-button size='small' type="success" style="height:30px;" @click="clearFilterInfo">清空筛选</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="14">
        <el-table id="profuctTable" style="margin-top:0;height:72.8vh;" @select="setSelectRows" :row-key="getRowKey"
          :key="isUpdate" ref="profuctTableRef" v-loading="loading" border stripe class="categorytableList"
          :data="productList" :row-style="{ height: 0 + 'px' }" highlight-current-row @row-dblclick="rowlineEditBtn"
          :header-cell-style="{ color: '#595959' }" @row-click="clickProductRow">
          <el-table-column type="selection" width="40" />
          <!-- <el-table-column align="center" fixed prop="id" label="编号" width="60" /> -->
          <el-table-column align="center" fixed prop="cropname" label="作物" width="80" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="provinceName" label="省份" width="90" />
          <el-table-column align="center" prop="xyear" :show-overflow-tooltip="true" label="年份" width="60" />
          <el-table-column align="center" prop="areaSeed" :show-overflow-tooltip="true" label="播种面积" />
          <el-table-column align="center" prop="yieldTotal" label="产量" />
          <el-table-column align="center" prop="yieldUnit" label="单产" />
          <el-table-column fixed="right" :show-overflow-tooltip="true" align="center" label="操作" width="60">
            <template #default="scope">
              <el-button @click="rowlineDeleteBtn1(scope.row)" size="small" type="round" :icon="Delete" circle />
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页条 -->
        <el-pagination class="xxxclass" v-model:current-page="pageNumProduct" v-model:page-size="pageSizeProduct"
          :page-sizes="[8, 10, 13, 14, 15, 16, 17, 20]" small layout="total, sizes, prev, pager, next, jumper"
          background="black" :total="totalproduct" @size-change="onSizeChange1" @current-change="onCurrentChange1"
          style="margin-top:5px; margin-right:10px;margin-bottom:5px; justify-content: flex-end" />
      </el-col>
      <el-col :span="10">
        <div
          style="color:#606266;font-weight:600;height:30px;line-height:30px;font-size:13px;background-color:aliceblue;padding-left:10px;">
          详细信息
        </div>
        <el-form ref="productForm" :show-message="false" :rules="rules" class="dialog-form" @submit.native.prevent=""
          :model="productData" label-width="90px" label-position="left" style="margin-top:10px;" :disabled="isCanEdit">
          <!-- <el-row :gutter="15">
            <el-col :span="24">
              <el-form-item label="作物ID:" style="margin-left:0;">

                <el-input disabled v-model="productData.cropid" />
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="24">
              <el-form-item :label="'作物:'">
                <el-select v-model="productData.cropname" @change="changeCrop">

                  <el-option v-for="(item, index) in cropList" :key="item.id" :label="item.cropname"
                    :value="item.cropname" />
                </el-select>

              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="15">
            <el-col :span="24">
              <el-form-item :label="'省份:'">
                <el-select v-model="productData.provinceName">

                  <el-option v-for="(item, index) in provinceList" :key="item.code" :label="item.name"
                    :value="item.name" />
                </el-select>

              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :span="24">
              <el-form-item :label="'年份:'">

                <el-select v-model="productData.xyear">

                  <el-option v-for="(item, index) in yearList" :key="item" :label="item" :value="item" />
                </el-select>

              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :span="24">
              <el-form-item :label="'播种面积:'">
                <el-input placeholder="" v-model="productData.areaSeed" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :span="24">
              <el-form-item :label="'产量:'">
                <el-input placeholder="" v-model="productData.yieldTotal" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :span="24">
              <el-form-item :label="'单产:'">
                <el-input placeholder="" v-model="productData.yieldUnit" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="position:absolute;right:10px;bottom:10px;">
          <el-button size="small" type="primary" @click="addProductInfo">新增</el-button>
          <el-button size="small" type="warning" @click="isCanEdit = false">编辑</el-button>
          <el-button size="small" type="danger" @click="saveProductInfo">保存</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
//调用后台接口，完成调用
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, nextTick, toRefs, toRef, watch } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { filterProductInfoService, deleteProductInfoService, getProductDataService, addProductDataService, updateProductDataService, getNewProductService } from '@/api/admin.js'
import { getLocationService, provinceListService, areaListService } from '@/api/area.js'
import { Edit, Delete, Plus, Upload, Search } from '@element-plus/icons-vue'
import { UserInfoStore } from '@/stores/userInfo.js'
import { cropAllDataService } from '@/api/cropcategory.js'
// import { defineEmits } from 'vue'
//获取所有作物列表
const isCanEdit = ref(true)
const userInfoStore = UserInfoStore();
//total
const filterData1 = ref({
  cropname: '',
  xyear: '',
  province: ''
})
const isFilter = ref(false)
const totalproduct = ref(0)
const pageNumProduct = ref(1)
const pageSizeProduct = ref(14)
const productForm = ref('')
const productData = ref({
  "provinceCode": "110000",
  "provinceName": "北京",
  "cropid": 101,
  "cropname": "水稻",
  "xyear": 2013,
  "areaSeed": 0.19,
  "yieldTotal": 0.13,
  "yieldUnit": 456.14
})
const editState1 = ref('edit')
const profuctTableRef = ref('')
const provinceList = ref([])
const cropList = ref([])
const yearList = ref([])
const idtime1 = ref('')
const idtime2 = ref('')
const idtime3 = ref('')
const idtime4 = ref('')
//表格列表
const productList = ref([
  {
    "verifyid": 1,
    "userid": "19816893354",
    "realname": "陈欢",
    "idnumber": "呃呃呃呃呃",
    "verifytime": "2024-03-30T12:57:28.000+00:00",
    "examinetime": null,
    "examineadmin": null,
    "verifystate": null,
    "remark": null
  }
])
//表格列表
const dataList2 = ref([
  {
    "verifyid": 1,
    "userid": "19816893354",
    "realname": "陈欢",
    "idnumber": "呃呃呃呃呃",
    "verifytime": "2024-03-30T12:57:28.000+00:00",
    "examinetime": null,
    "examineadmin": null,
    "verifystate": null,
    "remark": null
  }
])
const getCropList = async () => {
  let result = await cropAllDataService()
  cropList.value = result.data
  for (let i = 2013; i <= 2023; i++) {
    yearList.value.push(i)
  }
}
getCropList()
const addProductInfo = async () => {
  isCanEdit.value = false
  productData.value = {
    "provinceCode": "",
    "provinceName": "",
    "cropid": '',
    "cropname": "",
    "xyear": '',
    "areaSeed": '',
    "yieldTotal": '',
    "yieldUnit": ''
  }
  profuctTableRef.value.setCurrentRow({})
  editState1.value = 'add'
}

const saveProductInfo = async () => {

  if (editState1.value == 'add') {

    let result = await addProductDataService(productData.value)
    if (result.data == '已经存在') {
      ElMessage.error('新增失败，该作物相应年份和城市的数据已存在！')
    } else {
      isCanEdit.value = true
      ElMessage.success('新增成功')
      let result1 = await getNewProductService(productData.value);
      pageNumProduct.value = Math.floor((result1.data + 1) / pageSizeProduct.value) + 1; //这个必须 给表格加上row-key属性才可以更新
      editState1.value == 'edit'
      await getProductList(1)
    }
  } else {
    let result = await updateProductDataService(productData.value)
    ElMessage.success('更新成功')
    isCanEdit.value = true
    getProductList()
    let itemRow = {};
    let rowIndex = 0;
    for (let i = 0; i < productList.value.length; i++) {
      let item = productList.value[i];
      console.log("xxx", item, productData.value)
      // 判断查询的数据是否存在，存在则进行定位操作
      if (item.cropname == productData.value.cropname && item.xyear == productData.value.xyear && item.provinceName == productData.value.provinceName) {
        itemRow = item;
        rowIndex = i;
        break;
      }
    }
    profuctTableRef.value.setCurrentRow(itemRow)

  }
}


const isUpdate = ref(false)
const filterProductInfo = async () => {
  isFilter.value = true
  let result1 = await filterProductInfoService(filterData1.value, pageNumProduct.value, pageSizeProduct.value)
  productList.value = result1.data.items
  totalproduct.value = result1.data.total
}
const clearFilterInfo = () => {
  pageNumProduct.value = 1
  filterData1.value = {
    cropname: '',
    xyear: '',
    province: ''
  }
  // pageSizeProduct.value
  isFilter.value = false
  getProductList()
}

const getProductList = async (flag, row) => {
  try {
    let params = {
      pageNum: pageNumProduct.value,
      pageSize: pageSizeProduct.value
    }
    let result = await getProductDataService(params);
    console.log("xxx", result.data)
    //渲染视图
    totalproduct.value = result.data.total;
    productList.value = result.data.items;

    if (flag == 1) {//代表是新增
      nextTick(() => {
        let itemRow = {};
        let rowIndex = 0;
        for (let i = 0; i < productList.value.length; i++) {
          let item = productList.value[i];
          console.log("xxx", item, productData.value)
          // 判断查询的数据是否存在，存在则进行定位操作
          if (item.cropname == productData.value.cropname && item.xyear == productData.value.xyear && item.provinceName == productData.value.provinceName) {

            itemRow = item;
            rowIndex = i;
            break;
          }
        }
        profuctTableRef.value.setCurrentRow(itemRow)
      })
    }
  } catch (error) {
    // console.log(result  )
    console.error('捕获到错误：', error);
    // 在这里处理错误，例如重新抛出错误、显示错误消息等
  }
}
const initPage = async () => {
  await getProductList()
  nextTick(() => {
    profuctTableRef.value.setCurrentRow(productList.value[0])
    clickProductRow(productList.value[0])
  })
}
initPage()
const clickProductRow = (row) => {
  productData.value = cloneDeep(row)
  console.log(row)
}

//搜索功能  模糊查询
const searchInput = ref('')
const searchfilterState = ref(false)


const onSizeChange1 = (size) => {
  pageSizeProduct.value = size
  if (isFilter.value == false) getProductList()
  else filterProductInfo()
}
const onCurrentChange1 = (num) => {
  pageNumProduct.value = num
  if (isFilter.value == false) getProductList()
  else filterProductInfo()
}
//当前页码发生变化，调用此函数


//给每行定义一个key 定义了这个才可以和页面数据的自动刷新实现一个合作
const getRowKey = (row) => {
  return row.id;
}
//删除行toolbar
const deleteProductInfo = async (rowData) => {
  try {
    let result = await deleteProductInfoService(rowData);
    getProductList(-1) //为避免异步导致更新不及时，直接在此更新
  } catch (error) {
    // console.log(result  )
    console.error('捕获到错误：', error);
    // 在这里处理错误，例如重新抛出错误、显示错误消息等
  }
};
//删除行表格操作
const rowlineDeleteBtn1 = async (rowData) => {
  ElMessageBox.confirm(
    '确认删除' + rowData.xyear + '年' + rowData.provinceName + '的' + rowData.cropname + '市场数据吗?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async (action, instance, done) => {
    if (action === 'confirm') {
      productList.value.forEach((v, i) => {
        if (v.cropname == rowData.cropname && v.xyear == rowData.xyear && v.provinceName == rowData.provinceName) {
          productList.value.splice(i, 1);

          deleteProductInfo(rowData);
        }
      });
      //getcategoryList()
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    }

  })

}
import { reactive } from 'vue'

const getProvinceList = async () => {
  let result = await provinceListService()
  for (let i = 0; i < result.data.length; i++) {
    result.data[i].name = result.data[i].name.replace('市', '').replace('省', '').replace('自治区', '').replace('维吾尔', '').replace('壮族', '').replace('回族', '')
    result.data[i].label = result.data[i].name
    result.data[i].value = result.data[i].name
  }
  provinceList.value = result.data
}
getProvinceList() //首先调用
//关于弹窗


const selectRows = ref()
//定义点击选中行
const clickRow = ref()
//获取选中的单行数据

const setSelectRows = (selection) => {
  selectRows.value = selection //注意 selection是所有的选中行，不是当前勾选的行
}


const editState = ref('')

const dialogForm = ref(null);
const tryeditRow = ref(null);


//编辑数据
const rowlineEditBtn = (row) => {
  openDialog('审核用户身份认证')
  editState.value == 'edit'
  copyuserList.value = cloneDeep(productList.value);
  tryeditRow.value = cloneDeep(row)

  let i = 0;
  dataForm1.value = row
}


</script>
