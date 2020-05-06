<template>
  <div
      :class="{'edit-note-button': true, 'edit-note-button_red': red}"
      @click="$emit('click')"
  >
    <slot />
  </div>
</template>

<script>
  export default {
    props: {
      red: Boolean,
    },
  };
</script>

<style lang="scss">
  .edit-note-button {
    cursor: pointer;
    user-select: none;
    border-radius: 6px;
    background-color: cadetblue;
    color: #FFF;
    padding: 8px 15px;
    text-align: center;
    &:hover {
      background-color: lighten(cadetblue, 5%);
    }
    &:active {
      background-color: cadetblue;
    }
    &_red {
      background-color: indianred;
      &:hover {
        background-color: crimson;
      }
      &:active {
        background-color: indianred;
      }
    }
  }
</style>
