<template>
  <div class="edited-todo">
    <div
        :class="{'edited-todo__check-mark': true, 'edited-todo__check-mark_active': checked}"
        @click="toggle"
    >
    </div>
    <input
        class="edited-todo__input"
        type="text"
        v-if="editing"
        v-model="inputValue"
        v-on:blur="saveChanges"
        v-on:keyup="onKeyup"
    >
    <div
        v-else
        class="edited-todo__value"
        @click="toggle"
    >
      {{ value }}
    </div>
    <div
        :class="{'edited-todo__edit': true, 'edited-todo__edit_active': !editing}"
    >
      <icon-base viewBox="0 0 325 325.37515" :height="14" @click="editing = true">
        <pencil />
      </icon-base>
      <icon-base viewBox="0 0 425.984 425.984" :height="14" @click="deleteTodo">
        <trash />
      </icon-base>
    </div>
  </div>
</template>

<script>
  import IconBase from '@/components/svg/IconBase';
  import Pencil from '@/components/svg/Pencil';
  import Trash from '@/components/svg/Trash';
  export default {
    props: {
      value: String,
      isEditing: Boolean,
      checked: Boolean,
      toggle: Function,
      deleteTodo: Function,
    },
    components: {
      IconBase,
      Pencil,
      Trash,
    },
    created() {
      if (this.isEditing) {
        this.editing = true;
      }
      if (this.value) {
        this.inputValue = this.value;
      }
    },
    data: () => ({
      editing: false,
      inputValue: '',
    }),
    methods: {
      onKeyup(event) {
        if (event.key === 'Enter') {
          this.saveChanges();
        }
      },
      saveChanges() {
        if (this.inputValue.trim() !== '') {
          this.$emit('input', this.inputValue);
        }
        this.editing = false;
      },
    },
  };
</script>

<style lang="scss">
  .edited-todo {
    display: flex;
    align-items: center;
    &__check-mark {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      border: 1px solid cornflowerblue;
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &_active {
        &:before {
          content: '';
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 100%;
          background-color: #2c3e50;
        }
      }
    }
    &__input {
      flex: 1;
      font-size: 1.1rem;
      border: none;
      outline: none;
      border-bottom: 1px solid grey;
      padding: 8px 0;
    }
    &__value {
      flex: 1;
      font-size: 1.1rem;
      padding: 8px 0;
      cursor: pointer;
    }
    &__edit {
      visibility: hidden;
      margin-left: 10px;
      cursor: pointer;
      display: flex;
      width: 40px;
      justify-content: space-between;
    }
    &:hover {
      & > .edited-todo__edit_active {
        visibility: visible !important;
      }
    }
  }
</style>
