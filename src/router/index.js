import { createRouter, createWebHistory } from 'vue-router';
import PetsView from '../views/PetsView.vue';
import AddPetsView from '../views/AddPetsView.vue';
import PetsDetail from '../views/PetsDetail.vue';
import TutorsView from '../views/TutorsView.vue';
import AddTutorView from '../views/AddTutorView.vue';
import TutorDetail from '../views/TutorDetail.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/pets',
    },
    {
      path: '/pets',
      name: 'pets',
      component: PetsView,
    },
    {
      path: '/pets/novo',
      name: 'addPet',
      component: AddPetsView,
    },
    {
      path: '/pets/:id',
      name: 'petDetail',
      component: PetsDetail,
    },
    {
      path: '/tutores',
      name: 'tutors',
      component: TutorsView,
    },
    {
      path: '/tutores/novo',
      name: 'addTutor',
      component: AddTutorView,
    },
    {
      path: '/tutores/:id',
      name: 'tutorDetail',
      component: TutorDetail,
    },
  ],
});

export default router;
