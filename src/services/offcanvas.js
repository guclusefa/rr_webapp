import store from "@/store";
import { markRaw } from "vue";

const showOffCanvas = (title, body, props = {}) => {
    store.dispatch("setOffCanvas", {
        title: title,
        body: markRaw(body),
        props: props
    });
};

export { showOffCanvas };