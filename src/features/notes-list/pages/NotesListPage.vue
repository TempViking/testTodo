<template>
  <div>
    <notes-header />
    <div
        v-for="note in notes"
        :key="note.id"
        @click="editNote(note.id)"
        class="notedited-note"
    >
      {{ note.title }}
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import NotesHeader from '@/features/notes-list/atoms/Header';

  export default {
    components: {
      NotesHeader,
    },
    computed: {
      ...mapState({
        notes: state => state.notes.notes,
      }),
    },
    async created() {
      // TODO: Uncomment
      // await this.getNotes();
    },
    methods: {
      ...mapActions({
        getNotes: 'notes/getNotes',
      }),
      editNote(_id) {
        this.$router.push({
          name: 'Edit note',
          params: {
            id: _id,
          },
        });
      },
    },
  };
</script>

<style lang="scss">
  .notedited-note {
    border: 1px solid darkslateblue;
    padding: 5px;
    cursor: pointer;
    margin-top: 5px;
  }
</style>
