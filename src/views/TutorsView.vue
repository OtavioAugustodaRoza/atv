<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const API_URL = 'http://localhost:3000';
const tutores = ref([]);
const loading = ref(true);
const erro = ref('');

async function carregarTutores() {
  try {
    const resposta = await fetch(`${API_URL}/tutores`);
    if (!resposta.ok) throw new Error();
    tutores.value = await resposta.json();
  } catch {
    erro.value = 'Não foi possível carregar os tutores. Verifique se a API está ativa.';
  } finally {
    loading.value = false;
  }
}

onMounted(carregarTutores);
</script>

<template>
  <div>
    <header class="mb-4">
      <h1 class="text-2xl fw-bold">Listagem de Tutores</h1>
      <p class="text-body-secondary mb-0">Tutores cadastrados no sistema.</p>
    </header>

    <RouterLink class="btn btn-primary mb-4" :to="{ name: 'addTutor' }">
      <i class="bi bi-plus-circle me-2" aria-hidden="true"></i>Adicionar Tutor
    </RouterLink>

    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle">
        <thead>
          <tr><th>ID</th><th>Nome</th><th>Telefone</th><th><span class="visually-hidden">Ações</span></th></tr>
        </thead>
        <tbody>
          <tr v-for="tutor in tutores" :key="tutor.id">
            <td>
              <RouterLink class="text-decoration-none" :to="{ name: 'tutorDetail', params: { id: tutor.id } }">{{ tutor.id }}</RouterLink>
            </td>
            <td>
              <RouterLink class="text-decoration-none text-body" :to="{ name: 'tutorDetail', params: { id: tutor.id } }">{{ tutor.nome }}</RouterLink>
            </td>
            <td>{{ tutor.telefone || 'Não informado' }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
