<template>
  <div id="home">
    <div class="form-wrapper">
      <div class="header">SUPER CITY</div>
      <div class="input-wrapper">
        <div class="border-wrapper">
          <input
            type="text"
            name="username"
            placeholder="账号"
            class="border-item"
            autocomplete="off"
          />
        </div>
        <div class="border-wrapper">
          <input
            type="password"
            name="password"
            placeholder="密码"
            class="border-item"
            autocomplete="off"
          />
        </div>
      </div>

      <div class="action">
        <div class="btn" @click="loginBtn">登 录</div>
      </div>

      <div class="icon-wrapper">
        <el-icon class="icon-wrapper-item"><coffee-cup /></el-icon>
        <el-icon class="icon-wrapper-item"><comment /></el-icon>
        <el-icon class="icon-wrapper-item"><map-location /></el-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    methods:{
        loginBtn(){
            window.location.href = '/Map2D';
        }
    }
}
</script>

<style lang="scss">
#home {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url("/DataDir/images/home.webp");

  .form-wrapper {
    width: 300px;
    background-color: rgba(41, 45, 62, 0.7);
    color: #fff;
    border-radius: 2px;
    padding: 50px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    position: absolute;
  }

  .form-wrapper .header {
    text-align: center;
    font-size: 35px;
    font-style: oblique;
    // text-transform: uppercase;
    line-height: 85px;
  }

  .form-wrapper .input-wrapper input {
    background-color: rgb(41, 45, 62);
    border: 0;
    width: 100%;
    text-align: center;
    font-size: 15px;
    color: #fff;
    outline: none;
  }

  .form-wrapper .input-wrapper .border-wrapper {
    background-image: linear-gradient(to right, #e8198b, #0eb4dd);
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-wrapper .input-wrapper .border-wrapper .border-item {
    height: calc(100% - 4px);
    width: calc(100% - 4px);
    border-radius: 30px;
  }

  .form-wrapper .action {
    display: flex;
    justify-content: center;
  }

  .form-wrapper .action .btn {
    width: 60%;
    // text-transform: uppercase;
    border: 2px solid #0e92b3;
    text-align: center;
    line-height: 50px;
    border-radius: 30px;
    cursor: pointer;
  }

  .form-wrapper .action .btn:hover {
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  }

  .form-wrapper .icon-wrapper {
    text-align: center;
    width: 60%;
    margin: 0 auto;
    margin-top: 20px;
    border-top: 1px dashed rgb(146, 146, 146);
    padding: 20px;
  }

  .form-wrapper .icon-wrapper .icon-wrapper-item {
    font-size: 20px;
    color: rgb(187, 187, 187);
    cursor: pointer;
    border: 1px solid #fff;
    padding: 5px;
    border-radius: 20px;
    margin: 3px;
  }

  .form-wrapper .icon-wrapper .icon-wrapper-item:hover {
    background-color: #0e92b3;
  }
}
</style>