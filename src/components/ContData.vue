<script lang="ts">
import { defineProps } from 'vue';

const { num, name } = defineProps({
    num: Number,
    name: String
})

</script>

<template>
    <div class="cont-data">
        <p class="num-pubs">{{ num }}</p>
        <p class="name-acc-activity">{{ name }}</p>
    </div>
</template>

<style scoped>
.cont-data {
    text-align: center;
}

.num-pubs {
    font-weight: 600;
    margin: 0;
}

.name-acc-activity {
    margin-top: 0;
    font-size: 0.8rem;
}
</style>