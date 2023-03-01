<template>
    <OffCanvasButton :label="'comments.filter'" :classes="'btn btn-primary'" />
    <OffCanvas title="comments.filter">
      <template #body>
        <CommentFilters />
      </template>
    </OffCanvas>
  </template>
  
  <script>
  import OffCanvasButton from "@/components/fragments/OffCanvasButton.vue";
  import OffCanvas from "@/components/fragments/OffCanvas.vue";
  import CommentFilters from "@/components/comment/CommentFilters.vue";
  
  export default {
    name: "FilterCommentButton",
    components: {
      OffCanvasButton,
      OffCanvas,
      CommentFilters,
    },
  };
  </script>