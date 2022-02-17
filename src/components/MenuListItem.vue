<template>
    <div>
        <PopularItem 
            v-if="type === 'popular'"
            :data-popular="data"
        />
        <SingleItem 
            v-else
            v-for="(item, index) in data" :key="index"
            :data="item"
        />
        
    </div>
</template>

<script>
import SingleItem from '@/components/SingleItem.vue';
import PopularItem from '@/components/PopularItem.vue';
export default {
    name: 'MenuListItem',
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        type: {
            type: String,
            default: '',
        }
    },
    components: {
        SingleItem,
        PopularItem,
    }
}
</script>
