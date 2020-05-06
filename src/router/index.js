import Vue from 'vue';
import VueRouter from 'vue-router';
import NotesListPage from '@/features/notes-list/pages/NotesListPage';
import EditNote from '@/features/edit-note/pages/EditNote';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'List of notes',
    component: NotesListPage,
  },
  {
    path: '/note/:id',
    name: 'Edit note',
    component: EditNote,
  },
  {
    path: '/note',
    name: 'Create note',
    component: EditNote,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
