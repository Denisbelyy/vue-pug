<template lang="pug">
  svg(class="icon")
    use(:xlink:href="`#${name}`")
</template>
<script>
export default {
  name: "VIcon",
  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>
<style lang="scss">
.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
}
</style>
