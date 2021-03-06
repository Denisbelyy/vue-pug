<template lang="pug">
  div(class="v-select")
    div(for="v-select-input" class="v-select__label" ref="vSelect")
      input(
        v-model="searchValue"
        class="v-select__input"
        id="v-select-input"
        autocomplete="off"
        @input="inputText"
      )
      div(class="v-select__items")
        div(v-for="(label, i) in selectValues" class="v-select__item")
          span {{label}}
          v-icon(name="close-label" @click.native="removeItem(i)")
    div(
      class="v-select__dropdown" 
      @click.stop 
      v-if="showDropdown"
    )
      div(
        v-for="item in items" 
        class="v-select__dropdown-item" 
        @click="selectItem(item)"
      ) {{ item }}
    div(class="v-select__toolbar")
      v-icon(name="check" @click.native="$emit('click-check', selectValues)")
      v-icon(name="close" @click.native="$emit('click-close', $event)")
</template>
<script>
import VIcon from "./VIcon";
export default {
  name: "VSelect",
  components: {
    VIcon
  },
  props: {
    value: {
      required: true
    },
    listItems: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showDropdown: false,
      selectValues: [],
      items: [],
      searchValue: "",
      idElement: null
    };
  },
  mounted() {
    this.selectValues = [...this.selectValues, ...this.value];
    document.addEventListener("click", this.hideDropdown);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideDropdown);
  },
  methods: {
    hideDropdown() {
      this.showDropdown = false;
    },
    inputText(event) {
      this.showDropdown = true;
      this.items = this.listItems.filter(el => el.includes(event.target.value));
    },
    selectItem(item) {
      if (!this.selectValues.includes(item)) {
        this.selectValues.push(item);
      }
      this.searchValue = "";
      this.showDropdown = false;
    },
    removeItem(index) {
      this.selectValues.splice(index, 1);
    }
  }
};
</script>
<style lang="scss">
.v-select {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  &__label {
    width: 70%;
    display: flex;
    flex-wrap: wrap;
  }
  &__item {
    background: #bababa;
    padding: 4px 25px 4px 15px;
    display: inline-block;
    margin: 2px;
    border-radius: 34px;
    position: relative;
    .icon {
      width: 9px;
      height: 9px;
      margin-left: 4px;
      cursor: pointer;
      position: absolute;
      top: 10px;
      right: 0px;
    }
  }
  &__input {
    padding: 10px 15px;
    background: #ffffff;
    border: 1px solid #071ac3;
    box-sizing: border-box;
    position: relative;
    text-align: left;
    width: 100%;
    margin-bottom: 8px;
    font-size: 14px;
    &:active,
    &:hover,
    &:focus {
      outline: 0;
      outline-offset: 0;
    }
  }
  &__dropdown {
    width: 70%;
    position: absolute;
    top: 38px;
    left: 0;
    box-shadow: 0px 1px 2px 0 grey;
    max-height: 160px;
    overflow-y: scroll;
    margin-bottom: 10px;
    &-item {
      width: 100%;
      padding: 10px 20px;
      background: #fff;
      cursor: pointer;
      box-sizing: border-box;
      &:hover {
        background: #f1f1f1;
      }
    }
  }
  &__toolbar {
    margin-left: 10px;
    padding-top: 10px;
    .icon {
      cursor: pointer;
    }
  }
}
</style>
