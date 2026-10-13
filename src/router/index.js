import { createRouter, createWebHistory } from 'vue-router';
import PetsView from '../views/PetsView.vue';
import AddPetsView from '../views/AddPetsView.vue';
import PetsDetail from '../views/PetsDetail.vue';
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
  ],
});

export default router;
