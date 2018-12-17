<template>
    <div class="cinema-list">
        <h1>我是影院页面</h1>
        <h2>{{ curCity }}</h2>
        <h2>{{ projectName }}</h2>
        <h2>{{ getCinemaName }}</h2>

        <ul>
            <li v-for="(item,index) in filtLike"
                :key="index"
            >{{ item.fimlsName }}</li>
        </ul>

        <button @click="changeCity">点击更换成 陆丰市</button>
    </div>
</template>

<script>
// import store from "../store";
import { mapState, mapGetters } from 'vuex';
export default {
    name: 'Cinema',
    data () {
        return {
            cinemaName: '深圳-西部硅谷影院'
        }
    },
    methods: {
        changeCity () {
            // 这样只是改变了影院页的状态，改变不了仓库里边的共用状态
            // this.xStore.state.curCity = '陆丰市'
            // 要改变仓库只能用mutations来改变，这边直接调用提交
            this.$store.commit('changeStateCurCity', {
                city: '广州市',
                district: '白云区'
            })
        }
    },

    // 仓库的状态用计算属性获取
    // computed: {
    //     curCity () {
    //         return this.$store.state.curCity
    //     },

    //     projectName () {
    //         return this.$store.state.projectName
    //     }
    // }

    // 用辅助函数，比直接用计算属性更方便
    // computed: mapState([
    //     'curCity',
    //     'projectName'
    // ])

    // 以下方法可以让计算属性即有私有也有共用(对象展开运算符)
    computed: {
        ...mapState({
            curCity: 'curCity',
            projectName: 'projectName'
        }),

        ...mapGetters([
            'filtLike'
        ]),

        getCinemaName () {
            return this.cinemaName.split('-')[1]
        }
    }
}
</script>

<style lang="scss">
// 脚手架配置了别名 src 的目录用 @
@import '@/styles/common/px2rem.scss';
    .cinema-list {
        flex: 1;
    }
</style>
