<template>
    <div class="about">
        <div class="photo">
            <Loder
            v-if="imageLoading"
            absolute />
            <img 
            :src="image" 
            :alt="name" />
        </div>
        <div class="name">
            {{ name }}
        </div>
        <div>{{ email }}</div>
        <div>{{ github }}</div>
        <div>{{ phone }}</div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Loder from '~/components/Loder'

export default{
    components:{
        Loder
    },
    data(){
        return{
            imageLoading: true
        }
    },
    computed:{
        ...mapState('about', [
            'image',
            'name',
            'email',
            'phone',
            'github'
        ])
    },
    mounted(){
        this.init()
    },
    methods:{
        async init(){
            await this.$loadImage(this.image)
            this.imageLoading = false
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/scss/main';
    .about {
        text-align: center;
        .photo{
            width: 250px;
            height: 250px;
            margin: 40px auto 20px;
            padding: 30px;
            border: 10px solid $gray-300;
            box-sizing: border-box;
            background-color: $gray-200;
            position: relative;
            border-radius: 50%;
            img{
                width: 100%;
            }
        }

        .name {
            font-size: 40px;
            font-family: "Oswald", sans-serif;
            margin-bottom: 20px;
        }
    }
</style>