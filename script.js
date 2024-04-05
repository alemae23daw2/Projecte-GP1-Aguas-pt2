import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

window.onload = () => {
    createApp({
        data() {
            return {
                data: 'Hola Vue!'
            }
        }
    }).mount('#app');
    
}

