import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
       {
       path: '/',
       name: 'pets',
       component: () => import('../views/PetView.vue'),
     }, 
    {
      path: '/pets/novo',
      name: 'pet-novo',
      component: () => import('../views/AddPetView.vue'),
    },
    // },  {
    //   path: '/',
    //   name: 'tutores',
    //   component: () => import('../views/TutorView.vue'),
    // },
  ],
});

export default router;
