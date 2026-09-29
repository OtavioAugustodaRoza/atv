<template>
  <div>
    <header class="mb-4">
      <h1 class="text-2xl font-bold">Cadastro de Pets</h1>
      <p class="text-body-secondary mb-0">Cadastro de Pets no sistema.</p>
    </header>

    <RouterLink
      class="btn btn-primary mb-3"
      :to="{ name: 'pets' }"
    >
      Voltar para a listagem
    </RouterLink>

    <form @submit.prevent="postPet">
      <div class="mb-3">
        <label
          for="nome"
          class="form-label"
          >Nome</label
        >
        <input
          type="text"
          class="form-control"
          id="nome"
          v-model="novoPet.nome"
          required
        />
      </div>
      <div class="mb-3">
        <label
          for="especie"
          class="form-label"
          >Espécie</label
        >
        <input
          type="text"
          class="form-control"
          id="especie"
          v-model="novoPet.especie"
          required
        />
      </div>
      <div class="mb-3">
        <label
          for="tutorId"
          class="form-label"
          >Tutor</label
        >
        <select
          class="form-control"
          id="tutorId"
          v-model="novoPet.tutorId"
          required
        >
          <option value="">Selecione um tutor</option>
          <option
            v-for="tutor in tutores"
            :key="tutor.id"
            :value="tutor.id"
          >
            {{ tutor.nome }}
          </option>
        </select>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Cadastrando...' : 'Cadastrar Pet' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();
const api_URL = 'http://localhost:3000';
const tutores = ref([]);
const isSubmitting = ref(false);

const novoPet = ref({
  nome: '',
  especie: '',
  tutorId: '',
  id: idgenerated(),
});

async function getTutors() {
  const resp = await fetch(`${api_URL}/tutores`);
  tutores.value = await resp.json();
}

async function postPet() {
  if (!novoPet.value.nome || !novoPet.value.especie || !novoPet.value.tutorId) {
    console.error('Preencha todos os campos do pet');
    return;
  }

  isSubmitting.value = true;

  try {
    const resp = await fetch(`${api_URL}/pets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoPet.value),
    });

    if (resp.ok) {
      novoPet.value = {
        nome: '',
        especie: '',
        tutorId: '',
      };
      router.push({ name: 'pets' });
    } else {
      console.error('Erro ao cadastrar pet');
    }
  } finally {
    isSubmitting.value = false;
  }
}
const Idgenerated = () => {
  const idMiasAlto = Math.max(...tutores.value.map(tutor => tutor.id), 0);
  return idMiasAlto + 1;
};
onMounted(getTutors);
</script>
