<template>
  <div class="notes-list-header">
    <h3>Все заметки</h3>
    <router-link :to="{name: 'Create note'}" class="notes-list-header__add-note">
      + Добавить заметку
    </router-link>
  </div>
</template>

<style lang="scss">
  .notes-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__add-note {
      text-decoration: none;
      cursor: pointer;
      color: darkgreen;
      &:hover {
        color: lighten(darkgreen, 10%);
      }
      &:active {
        color: darkgreen;
      }
    }
  }
</style>
