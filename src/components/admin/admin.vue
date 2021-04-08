<template>
  <div class="body">
    <div class="base">
      <div v-if="signUp">
        <a-button
          style="
            background: #ffc554;
            color: #2a3c60;
            display: block;
            z-index: 7;
            font-size: 1.2em;
            font-weight: 900;
            float: left;
          "
          @click="admin_flag = !admin_flag"
        >
          切换角色
        </a-button>
        <div class="aim">
          <div v-if="admin_flag">
            <h2>Welcome!</h2>
            <h6>欢迎来到民航售票系统</h6>
            <button @click="signUp = !signUp" class="btn">Sign in</button>
          </div>
          <div v-else>
            <h2>Welcome!</h2>
            <h6>请在这里注册您的个人账号</h6>
            <button @click="signUp = !signUp" class="btn">Sign in</button>
          </div>
        </div>
        <div class="formArea">
          <div v-if="admin_flag">
            <h2>王诗剑民航售票管理系统</h2>
            <h6>Aviation ticket management system</h6>
          </div>
          <div v-else>
            <h2>王诗剑民航订票系统</h2>
            <h6>Aviation ticket reservation system</h6>
          </div>
          <div v-if="admin_flag">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="exampleInputUsername1"
                v-model="username"
                placeholder="Company name"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                v-model="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div v-else>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="exampleInputUsername1"
                v-model="username"
                placeholder="Username"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                v-model="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div v-if="admin_flag">
            <button class="btn" @click="admin_login()">Sign up</button>
          </div>
          <div v-else>
            <button class="btn" @click="login()">Sign up</button>
          </div>
          <b-modal v-model="alert" title="登录失败"> 用户名或密码错误 </b-modal>
        </div>
      </div>

      <div v-else>
        <div class="aim in">
          <h2>Welcome back!</h2>
          <div v-if="admin_flag">
            <h6>如果您的公司已经注册完毕请返回登录界面</h6>
          </div>
          <div v-else>
            <h6>如果您已经注册完毕，请返回登录界面</h6>
          </div>
          <button @click="signUp = !signUp" class="btn">Sign up</button>
        </div>
        <div class="formArea in">
          <h2>创建账户</h2>
          <h6>Fill in the required fields</h6>
          <div v-if="admin_flag">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="exampleInputCompanyname1"
                v-model="username"
                placeholder="Company Name"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                id="exampleInputCompanyPassword1"
                v-model="password"
                placeholder="Password"
              />
            </div>
            <button class="btn" @click="admin_register()">
              Sign in
            </button>
          </div>
          <div v-else>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="exampleInputName1"
                v-model="name"
                placeholder="Name"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="exampleInputUsername1"
                v-model="username"
                placeholder="Username"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                v-model="password"
                placeholder="Password"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="exampleInputPhoneNumber1"
                v-model="phone_number"
                placeholder="Phone Number"
              />
            </div>
            <button class="btn" @click="register()">Sign in</button>
          </div>
          <b-modal v-model="register_flag" title="注册成功">
            注册成功！请返回登录页面登录</b-modal
          >
          <b-modal v-model="alert" title="注册失败">
            用户名或姓名已经存在
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      admin_flag: false,
      signUp: true,
      alert: false,
      register_flag: false,
      name:'',
      phone_number:'',
      username: "",
      password: "",
    };
  },
  methods: {
    admin_login: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/admin/admin_login_api",
        method: "post",
        data: {
          name: this.username,
          password: this.password,
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          this.$cookies.set("company_name", this.username);
          this.$cookies.set('company_password',this.password);
          this.$router.push("/company_admin_info");
        } else {
          this.alert = true;
        }
      });
    },
    admin_register: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/admin/add_company_api",
        method: "post",
        data: {
          company_name: this.username,
          company_password: this.password,
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          this.register_flag = true;
        } else {
          this.alert = true;
        }
      });
    },
    login: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/customer/login",
        method: "post",
        data: {
          username: this.username,
          password: this.password,
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          this.$cookies.set("username", this.username);
          this.$router.push("/first_page");
        } else {
          this.alert = true;
        }
      });
    },
    register: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/customer/add_customer_api",
        method: "post",
        data: {
          name: this.name,
          username: this.username,
          password: this.password,
          phone_number: this.phone_number,
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          //注册后返回到admin的登录？
          this.register_flag = true;
        } else {
          // this.alerter("错误", "此用户名已经存在！");
          this.alert = true;
        }
      });
    },
  },
};
</script>

<style scoped>
div {
  text-align: center;
}
.btn {
  width: 100%;
}
flex-box,
.body {
  display: flex;
  align-items: center;
  justify-content: center;
}

.body {
  height: 100vh;
  background-color: cadetblue;
  padding-top: 5vh;
}

.body .base {
  background-color: white;
  border-radius: 10px;
  width: 90%;
  height: 80vh;
  position: relative;
  overflow: hidden;
  z-index: 0;
  -webkit-box-shadow: 0 10px 6px -6px #2a3c60;
  -moz-box-shadow: 0 10px 6px -6px #2a3c60;
  box-shadow: 0 10px 6px -6px #2a3c60;
}

.body .base .btn {
  text-transform: uppercase;
  font-size: 1.5vw;
  font-family: "Poppins", sans-serif;
  margin-top: 20px;
}

.body .base h2 {
  font-size: 5vw;
  font-family: "Poppins", sans-serif;
  text-align: center;
}

.body .base h6 {
  font-size: 2vw;
  margin-top: 1vh;
  margin-bottom: 3vh;
  font-family: "PT Serif", serif;
  text-align: center;
}

.body .base .aim {
  padding: 5%;
  background-color: #ffc554;
  height: 100%;
  width: 40%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  transition: all 800ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.body .base .aim h2,
.body .base .aim h6 {
  color: white;
}

.body .base .aim .btn {
  border: 1px solid white;
  background-color: #ffc554;
  color: white;
}

.body .base .aim.in {
  left: 60%;
  transition: all 800ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.body .base .formArea {
  padding: 5%;
  background-color: white;
  height: 100%;
  width: 60%;
  position: absolute;
  top: 0;
  left: 40%;
  transition: all 800ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.body .base .formArea .btn {
  background-color: #395284;
  color: white;
}

.body .base .formArea .btn:focus {
  outline: none !important;
  box-shadow: none;
}

.body .base .formArea input {
  font-size: 1.5vw;
  font-family: "PT Serif", serif;
  background-color: white;
  color: #395284;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #395284;
}

.body .base .formArea input:focus {
  outline: none;
  box-shadow: none;
}

.body .base .formArea input::placeholder {
  color: #395284;
}

.body .base .formArea h2,
.body .base .formArea h6 {
  color: #395284;
}

.body .base .formArea.in {
  transition: all 800ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  left: 0%;
}
</style>