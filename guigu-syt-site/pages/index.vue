<template>
  <div class="home page-component">
    <el-carousel indicator-position="outside">
      <el-carousel-item>
        <img src="~assets/images/web-banner1.png" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索 -->
    <div class="search-container">
      <div class="search-wrapper">
        <div class="hospital-search">
          <el-input
            class="search-input"
            v-model="searchObj.hosname"
            prefix-icon="el-icon-search"
            placeholder="输入医院名称"
          >
            <span
              @click="fetchDate()"
              slot="suffix"
              class="search-btn v-link highlight clickable selected"
              >搜索
            </span>
          </el-input>
        </div>
      </div>
    </div>
    <!-- bottom -->
    <div class="bottom">
      <div class="left">
        <div class="home-filter-wrapper">
          <div class="title">医院</div>
          <div>
            <div class="filter-wrapper">
              <span class="label">等级：</span>
              <div class="condition-wrapper">
                <span
                  class="item v-link clickable"
                  :class="hostypeActiveIndex == -1 ? 'selected' : ''"
                  @click="hostypeSelect(undefined, -1)"
                >
                  全部
                </span>
                <span
                  class="item v-link clickable"
                  :class="hostypeActiveIndex == index ? 'selected' : ''"
                  v-for="(item, index) in hostypeList"
                  :key="item.id"
                  @click="hostypeSelect(item.value, index)"
                >
                  {{ item.name }}
                </span>
              </div>
            </div>
            <div class="filter-wrapper">
              <span class="label">地区：</span>
              <div class="condition-wrapper">
                <span
                  class="item v-link clickable"
                  :class="areaActiveIndex == -1 ? 'selected' : ''"
                  @click="areaSelect(undefined, -1)"
                >
                  全部 </span
                ><span
                  class="item v-link clickable"
                  :class="areaActiveIndex == index ? 'selected' : ''"
                  v-for="(item, index) in areaList"
                  :key="item.id"
                  @click="areaSelect(item.code, index)"
                >
                  {{ item.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="v-scroll-list hospital-list">
          <div
            v-for="item in hospitalList"
            :key="item.hoscode"
            class="v-card clickable list-item"
          >
            <div class="">
              <div
                @click="show(item.hoscode)"
                class="hospital-list-item hos-item"
                index="0"
              >
                <div class="wrapper">
                  <div class="hospital-title">{{ item.hosname }}</div>
                  <div class="bottom-container">
                    <div class="icon-wrapper">
                      <span class="iconfont"></span>
                      {{ item.param.hosTypeName }}
                    </div>
                    <div class="icon-wrapper">
                      <span class="iconfont"></span>
                      每天{{ item.bookingRule.releaseTime }}放号
                    </div>
                  </div>
                </div>
                <img
                  :src="'data:image/jpeg;base64,' + item.logoData"
                  :alt="item.hosname"
                  class="hospital-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="common-dept">
          <div class="header-wrapper">
            <div class="title">常见科室</div>
            <div class="all-wrapper">
              <span>全部</span>
              <span class="iconfont icon"></span>
            </div>
          </div>
          <div class="content-wrapper">
            <span class="item v-link clickable dark">神经内科 </span>
            <span class="item v-link clickable dark">消化内科 </span>
            <span class="item v-link clickable dark">呼吸内科 </span>
            <span class="item v-link clickable dark">内科 </span>
            <span class="item v-link clickable dark">神经外科 </span>
            <span class="item v-link clickable dark">妇科 </span>
            <span class="item v-link clickable dark"> 产科 </span>
            <span class="item v-link clickable dark">儿科 </span>
          </div>
        </div>
        <div class="space">
          <div class="header-wrapper">
            <div class="title-wrapper">
              <div class="icon-wrapper">
                <span class="iconfont title-icon"></span>
              </div>
              <span class="title">平台公告</span>
            </div>
            <div class="all-wrapper">
              <span>全部</span>
              <span class="iconfont icon"></span>
            </div>
          </div>
          <div class="content-wrapper">
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark"
                >关于延长北京大学国际医院放假的通知
              </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark"
                >北京中医药大学东方医院部分科室医生门诊医
              </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark">
                武警总医院号源暂停更新通知
              </span>
            </div>
          </div>
        </div>
        <div class="suspend-notice-list space">
          <div class="header-wrapper">
            <div class="title-wrapper">
              <div class="icon-wrapper">
                <span class="iconfont title-icon"></span>
              </div>
              <span class="title">停诊公告</span>
            </div>
            <div class="all-wrapper">
              <span>全部</span>
              <span class="iconfont icon"></span>
            </div>
          </div>
          <div class="content-wrapper">
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark">
                中国人民解放军总医院第六医学中心(原海军总医院)呼吸内科门诊停诊公告
              </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark">
                首都医科大学附属北京潞河医院老年医学科门诊停诊公告
              </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark"
                >中日友好医院中西医结合心内科门诊停诊公告
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dictApi from '~/api/dict'
import regionApi from '~/api/region'
import hospitalApi from '~/api/hospital'
//跨域问题
export default {
  async asyncData() {
    //获取等级
    const hostypeResponse = await dictApi.dictList(1)
    //获取地区
    const regionResponse = await regionApi.regionList('110100')
    //获取医院
    const hospitalResponse = await hospitalApi.hospitalList()
    return {
      hostypeList: hostypeResponse.data,
      areaList: regionResponse.data,
      hospitalList: hospitalResponse.data
    }
  },
  data () {
    return {
      searchObj:{},
      hostypeList: [],
      areaList: [],
      hospitalList: [],
      hostypeActiveIndex: "",
      areaActiveIndex: ""
    }
  },
  /*
  nuxt框架：
  静态路由地址： 地址不变的路由地址：（静态路由地址）：多层目录                                           单层目录
                                                        /xxxxx/yyyy/zzzzz                               /ZZZZZZ
                                                         /xxxxx/yyyy/是目录                             /ZZZZZZ是目录
                                                         zzzzzz是页面                                     页面默认是 index.vue
  动态路由地址： 地址值变化的路由地址             
                                                        /xxxx/yyyy/234
                                                        /xxxx/yyyy/是目录
                                                      页面： 
                                                             1.必须以下划线开头 _   _hoscode.vue
                                                             2.同一个目录下只能有一个以_下划线开头的页面
                                                             3.在页面内部如果想要动态的获取页面对应的值： this.$route.params.hoscode
  */
  methods: {
    fetchDate(){
      hospitalApi.hospitalList(this.searchObj).then(res=>{
        this.hospitalList = res.data;
      })
    },
    show(hoscode){
      window.location.href = '/hospital/' + hoscode
      //  this.$router.push('/hospital/' + hoscode)
    },
  
    hostypeSelect(value,index){
      this.searchObj.hostype=value;
      this.hostypeActiveIndex=index
      this.fetchDate();
    },
    areaSelect(code,index){
      this.searchObj.districtCode=code;
      // this.searchObj.hostype=index
      this.fetchDate();
    }
  },
  created(){
     
    },
}
</script>