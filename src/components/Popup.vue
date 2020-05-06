<template>
  <div :class="{ popup: true, popup_finished: finished }" :style="{ display: value ? 'flex' : 'none' }">
    <div class="popup__content">
      <div class="popup__close" @click="finish">
        <icon-base width="15px" viewBox="0 0 492 492">
          <close-icon />
        </icon-base>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
  import IconBase from '@/components/svg/IconBase';
  import CloseIcon from '@/components/svg/Cancel';

  export default {
    components: {
      IconBase,
      CloseIcon,
    },
    props: {
      value: Boolean,
    },
    data: () => ({
      finished: false,
    }),
    methods: {
      async finish() {
        this.finished = true;
        await new Promise((r) => setTimeout(r, 300));
        this.finished = false;
        this.$emit('input', false);
      },
    },
  };
</script>

<style lang="scss">
  @keyframes transitionIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes transitionOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .popup {
    background-color: transparentize(#000, 0.7);
    z-index: 15;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: transitionIn 300ms;
    &_finished {
      animation: transitionOut 300ms forwards;
    }
    &__content {
      border-radius: 10px;
      background-color: #FFF;
      width: 450px;
      min-height: 220px;
      padding: 10px;
      box-sizing: border-box;
      position: relative;
    }
    &__close {
      cursor: pointer;
      position: absolute;
      top: 10px;
      right: 10px;
      &:hover > svg > g {
        fill: cadetblue;
      }
      & > svg > g {
        transition: fill 200ms;
        fill: darkslateblue;
      }
    }
  }
</style>
