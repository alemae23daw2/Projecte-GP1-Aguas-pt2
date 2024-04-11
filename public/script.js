import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    data() {
        return {
            data: {
                isModalOpen: false
            },
            methods:{
                open() {
                    this.isModalOpen = true;
                    console.log("si")
                },
                close() {
                    this.isModalOpen = false;
                }
            }
        }
    }
}).mount('.header');

