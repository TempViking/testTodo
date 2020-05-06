<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :aria-labelledby="iconName"
    role="presentation"
    @click="$emit('click')"
  >
    <g>
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'box',
    },
    width: [Number, String],
    height: [Number, String],
    viewBox: {
      type: String,
      default: '0 0 18 18',
    },
  },
};
</script>
