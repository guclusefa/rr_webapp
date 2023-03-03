import store from "@/store";
import { markRaw } from "vue";

const showModal = (title, body, props = {}) => {
    store.dispatch("setModal", {
        title: title,
        body: markRaw(body),
        props: props
    });
};

export { showModal };