<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col">
          <ResourceList />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ResourceList from "@/components/resource/ResourceList";

export default {
  name: "ResourcesView",
  components: {
    ResourceList,
  },
};
</script>