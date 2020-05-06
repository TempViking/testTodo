<template>
  <div class="edit-note">
    <edit-header
      class="edit-note__header"
      :cancel="() => { popup = true }"
      :prev-state="removeChanges"
      :repeat-state="repeatChanges"
    />
    <input
      type="text"
      class="edit-note__title"
      placeholder="Введите название заметки"
      v-model.trim="title"
    >
    <div class="todos-container">
      <todo
          v-for="(todo, key) in todos" :key="key"
          v-model="todo.value"
          :checked="todo.checked"
          :toggle="() => { toggleTodo(key) }"
          :delete-todo="() => { deleteTodo(key) }"
      />
    </div>
    <div
        class="edit-note__add-point"
        @click="addPoint"
    >
      Добавить пункт
    </div>
    <confirm-button class="mt-1" @click="save">
      Сохранить
    </confirm-button>
    <confirm-button :red="true" class="mt-1" @click="deleteNoteConfirm = true">
      Удалить заметку
    </confirm-button>
    <popup v-model="popup">
      <div class="edit-note__alert">
        Вы уверены, что хотите уничтожить все изменения?
        <confirm-button class="mt-1" @click="goBack">
          Да, удалить
        </confirm-button>
      </div>
    </popup>
    <popup v-model="emptyTitleError">
      <div class="edit-note__alert">
        Вы не ввели название заметки!
      </div>
    </popup>
    <popup v-model="deleteNoteConfirm">
      <div class="edit-note__alert">
        Вы уверены, что хотите удалить заметку?
        <confirm-button :red="true" class="mt-1" @click="deleteNote">
          Да, удалить
        </confirm-button>
      </div>
    </popup>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import EditHeader from '@/features/edit-note/atoms/Header';
  import Todo from '@/features/edit-note/atoms/Todo';
  import ConfirmButton from '@/features/edit-note/atoms/Button';
  import Popup from '@/components/Popup';

  export default {
    components: {
      Popup,
      EditHeader,
      Todo,
      ConfirmButton,
    },
    data: () => ({
      popup: false,
      title: '',
      todos: [],
      emptyTitleError: false,
      deleteNoteConfirm: false,
      repeatState: null,
    }),
    created() {
      if (this.$route.params.id !== undefined) {
        const todo = this.notes.find(
          el => el.id === this.$route.params.id,
        );
        if (todo !== undefined) {
          this.title = todo.title;
          this.todos = todo.todos.map(el => {
            return {
              value: el.value,
              checked: el.checked,
            };
          });
        }
      }
    },
    methods: {
      ...mapActions({
        addNote: 'notes/addNote',
        updateTodo: 'notes/updateTodo',
        deleteFromState: 'notes/deleteNote',
      }),
      goBack() {
        this.$router.push({name: 'List of notes'});
      },
      toggleTodo(togKey) {
        this.todos = this.todos.map((el, key) => {
          if (key === togKey) {
            const newEl = el;
            newEl.checked = !el.checked;
            return newEl;
          } else {
            return el;
          }
        });
      },
      deleteTodo(id) {
        this.todos = this.todos.filter(
          (el, key) => key !== id,
        );
      },
      async save() {
        if (this.title !== '') {
          if (this.$route.params.id !== undefined) {
            await this.updateTodo({
              _id: this.$route.params.id,
              todo: {
                title: this.title,
                todos: this.todos,
              },
            });
          } else {
            await this.addNote({
              title: this.title,
              todos: this.todos,
            });
          }
          this.$router.push({name: 'List of notes'});
        } else {
          this.emptyTitleError = true;
        }
      },
      async deleteNote() {
        await this.deleteFromState(this.$route.params.id);
        this.$router.push({name: 'List of notes'});
      },
      addPoint() {
        this.todos.push({
          value: 'Новый пункт',
          checked: false,
        });
      },
      removeChanges() {
        this.repeatState = {
          title: this.title,
          todos: this.todos,
        };
        if (this.$route.params.id !== undefined) {
          const todo = this.notes.find(
            el => el.id === this.$route.params.id,
          );
          if (todo !== undefined) {
            this.title = todo.title;
            this.todos = todo.todos.map(el => {
              return {
                value: el.value,
                checked: el.checked,
              };
            });
          }
        } else {
          this.title = '';
          this.todos = [];
        }
      },
      repeatChanges() {
        if (this.repeatState !== null) {
          this.title = this.repeatState.title;
          this.todos = this.repeatState.todos;
          this.repeatState = null;
        }
      },
    },
    computed: {
      ...mapState({
        notes: state => state.notes.notes,
      }),
    },
  };
</script>

<style lang="scss">
  .edit-note {
    &__header {
      margin-top: 20px;
    }
    &__title {
      width: 100%;
      border: none;
      outline: none;
      font-size: 1.4rem;
      margin-top: 20px;
    }
    &__alert {
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    &__add-point {
      color: cadetblue;
      cursor: pointer;
      text-decoration: underline;
      margin-bottom: 20px;
      text-align: right;
    }
  }
  .todos-container {
    margin: 20px 0 10px 0;
  }
  .mt-1 {
    margin-top: 10px;
  }
</style>
