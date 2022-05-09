<template>
    <div>
        <div @api="getApi"></div>
        <ul>
            <li>
                
            </li>
        </ul>
    </div>
</template>

<script>
import state from "@/state.js"

export default({

    name: 'SiteMain',
    components: {},
    data(){
        return {
            Link_API: `https://api.themoviedb.org/3/search/movie?api_key=40a522c8e1eb2b9eb0188889f1def2c9&language=it-IT&page=1&include_adult=false&query=${state.search}`,
            query: null
        }
    },
    methods: {
        getApi(){
            console.log(this.Link_API);
            console.log(state.search);
            state.search = this.query
        }
    },
    computed:{},
    mounted() {
        this.getApi()
    }
})
</script>

<style lang="scss" scoped>
</style>
