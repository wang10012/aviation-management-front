<template>
  <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
    <b-modal v-model="success_flag" title="飞机信息添加成功！">
      飞机信息添加成功！
    </b-modal>
    <b-modal v-model="init_alert" title="初始化失败"> 初始化失败！ </b-modal>
    <b-modal v-model="false_flag" title="飞机信息添加失败！">
      飞机信息添加失败！已经添加过此飞机
    </b-modal>
    <b-modal v-model="delete_success_flag" title="删除失败">
      删除飞机信息成功！
    </b-modal>
    <a-form-model-item label="公司名">
      <a-input v-model="form.company_name" disabled />
    </a-form-model-item>

    <a-form-model-item label="飞机型号">
      <a-select  style="width: 600px" v-model="form.plane_id">
        <a-select-option value="波音735">
          波音735
        </a-select-option>
        <a-select-option value="波音736">
          波音736
        </a-select-option>
         <a-select-option value="波音737">
          波音737
        </a-select-option>
         <a-select-option value="波音738">
          波音738
        </a-select-option>
         <a-select-option value="波音739">
          波音739
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 12 }">
      <a-button type="primary" @click="add_plane_info()">
        添加
        <!-- 想做一个弹窗确认再修改成功的效果 TODO -->
      </a-button>
    </a-form-model-item>

    <a-card>
      <div style="margin-bottom: 16px">
        <a-button
          type="primary"
          :disabled="!hasSelected"
          :loading="loading"
          @click="start()"
        >
          delete
        </a-button>
        <span style="margin-left: 8px">
          <template v-if="hasSelected">
            {{ `Selected ${selectedRowKeys.length} items` }}
          </template>
        </span>
      </div>
      <a-table
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        :columns="columns"
        :data-source="company_plane_infos"
      />
    </a-card>
  </a-form-model>
</template>

<script>
export default {

  data() {
    return {
      delete_success_flag: false,
      success_flag: false,
      init_alert: false,
      false_flag: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      company_plane_infos: [],

      selectedRowKeys: [],
      allSelected:[],
     
      loading: false,
      columns: [
        {
          title: "公司名",
          dataIndex: "company_name",
          // key: 'company_name'
        },
        {
          title: "飞机型号",
          dataIndex: "plane_id",
          // key: 'plane_id'
        },
      ],

      form: {
        company_plane_id:'',
        company_name: "",
        plane_id: "",
      },
    };
  },
  created: function () {
    this.init_company_info();
    this.init_infos();
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  methods: {
    init_infos: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/admin/get_company_plane_info_api",
        method: "post",
        data: {
          company_name: this.$cookies.get("company_name"),
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          console.log(data.company_plane_infos); //TODO
          let company_plane_infos = [];
          for (let item of data.company_plane_infos) {
            company_plane_infos.push(item);
          }
          this.company_plane_infos = company_plane_infos;
        } else {
          this.init_alert = true; //TODO
        }
      });
    },

    start:function() {
      this.loading = true;
      setTimeout(() => {
        this.delete_plane_info();
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    
    onSelectChange(selectedRowKeys, allSelected) {
      this.selectedRowKeys = selectedRowKeys;
      this.allSelected = allSelected;
    },

    init_company_info: function () {
      this.form.company_name = this.$cookies.get("company_name");
    },

    add_plane_info: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/admin/add_company_plane_info_api",
        method: "post",
        data: {
          company_name: this.$cookies.get("company_name"),
          plane_id: this.form.plane_id,
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          this.success_flag = true;
          this.init_company_info();
          this.init_infos();
        } else {
          this.false_flag = true;
        }
      });
    },


    delete_plane_info: function () {
      let ids = this.allSelected.map((i) => {
        return i.company_plane_id;
      });
      console.log(ids);
      for(let id of ids){
        this.$axios({
        url: "http://127.0.0.1:5000/admin/delete_company_plane_info_api",
        method: "post",
        data: {
          company_plane_id: id,
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          this.delete_success_flag = true;
          this.init_company_info();
          this.init_infos();
        }
      });
      }
    },
  },
};
</script>
<style>
</style>