<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
    num: number
    name: string
}

const props = defineProps<Props>()
const getNum = (): string => props.num > 1000 ? `${props.num / 1000}k` : `${props.num}`


</script>
<template>
    <div class="cont-data">
        <p class="num-pubs">{{ getNum() }}</p>
        <p class="name-acc-activity">{{ name }}</p>
    </div>
</template>

<style scoped>
.cont-data {
    width: 100%;
    gap: 20px;
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