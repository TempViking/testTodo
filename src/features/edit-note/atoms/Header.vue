<template>
  <div class="edit-note-header">
    <div class="edit-note-header__cancel-edit" @click="cancel">
      <icon-base :height="12" view-box="0 0 257.57 451.85">
        <chevron-left />
      </icon-base>
      Отменить редактирование без сохранения
    </div>
    <div class="edit-note-header__actions">
      <icon-base :height="22" view-box="0 0 512.011 512.011" @click="prevState">
        <option-back />
      </icon-base>
      <icon-base :height="20" view-box="0 0 512.01 448.02" @click="repeatState">
        <option-repeat />
      </icon-base>
    </div>
  </div>
</template>

<script>
  import IconBase from '@/components/svg/IconBase';
  import ChevronLeft from '@/components/svg/ChevronLeft';
  import OptionBack from '@/components/svg/OptionBack';
  import OptionRepeat from '@/components/svg/OptionRepeat';

  export default {
    props: {
      cancel: Function,
      prevState: Function,
      repeatState: Function,
    },
    components: {
      IconBase,
      ChevronLeft,
      OptionBack,
      OptionRepeat,
    },
  };
</script>

<style lang="scss">
  .edit-note-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__cancel-edit {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: indianred;
      & > svg {
        margin-right: 10px;
      }
      & > svg > g {
        fill: indianred;
      }
      &:hover {
        color: lighten(indianred, 10%);
        & > svg > g {
          fill: lighten(indianred, 10%);
        }
      }
      &:active {
        color: indianred;
      }
    }
    &__actions {
      width: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > svg {
        cursor: pointer;
        &:hover {
          &:first-of-type > g {
            fill: lighten(indianred, 10%);
          }
          &:last-of-type > g {
            fill: lighten(darkgreen, 10%);
          }
        }
        &:first-of-type > g {
          fill: indianred;
        }
        &:last-of-type > g {
          fill: darkgreen;
        }
      }
    }
  }
</style>
