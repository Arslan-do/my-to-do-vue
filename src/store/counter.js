import { ref } from "vue"
const { defineStore } = require("pinia")

export  const  useCounterStore = defineStore('counter', ()=>{
    const count = ref(0)

    const increment = ()=> {
        count.value = count.value + 1
    }
    return {count, increment}
})