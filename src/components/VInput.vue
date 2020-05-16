<template lang="pug">
  div(class="input-text")
    input(
      :value="value"
      @input="$emit('input', $event.target.value)"
      @click="$emit('click', $event.target.value)"
      @change="$emit('change', $event.target.value)"
    )
    v-icon(name="check" @click.native="$emit('click-check', $event)")
    v-icon(name="close" @click.native="$emit('click-close', $event)")
</template>
<script>
import VIcon from "./VIcon";
export default {
  name: "VInputText",
  components: {
    VIcon
  },
  props: {
    value: {
      required: false,
      default() {
        return "";
      }
    }
  }
};
</script>
<style lang="scss">
.input-text {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  input {
    width: 80%;
    padding: 10px 15px;
    background: #ffffff;
    border: 1px solid #071ac3;
    box-sizing: border-box;
  }
  .icon {
    margin: 2px 10px 0;
    cursor: pointer;
  }
}
</style>
