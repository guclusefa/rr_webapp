import store from "@/store";
import { markRaw } from "vue";

const showModal = (title, body, props = {}, large = false) => {
    store.dispatch("setModal", {
        title: title,
        body: markRaw(body),
        props: props,
        large: large,
    });
};

export { showModal };