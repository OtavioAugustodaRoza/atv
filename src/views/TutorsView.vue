<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const API_URL = 'http://localhost:3000';
const tutores = ref([]);
const loading = ref(true);
const erro = ref('');
const removendo = ref(null);

async function carregarTutores() {
  loading.value = true;
  erro.value = '';
  try {
    const resposta = await fetch(`${API_URL}/tutores`);
    if (!resposta.ok) throw new Error();
    tutores.value = await resposta.json();
  } catch {
    erro.value =
      'Não foi possível carregar os tutores. Verifique se a API está ativa.';
  } finally {
    loading.value = false;
  }
}

async function removerTutor(tutor) {
  if (removendo.value !== null) return;
  if (!window.confirm(`Tem certeza que deseja remover ${tutor.nome}?`)) return;

  removendo.value = tutor.id;
  erro.value = '';
  try {
    const resposta = await fetch(`${API_URL}/tutores/${tutor.id}`, {
      method: 'DELETE',
    });
    if (!resposta.ok) throw new Error();
    tutores.value = tutores.value.filter((item) => item.id !== tutor.id);
  } catch {
    erro.value = 'Não foi possível remover o tutor. Tente novamente.';
  } finally {
    removendo.value = null;
  }
}

onMounted(carregarTutores);
</script>

<template>
  <div class="tutor-page">
    <header class="mb-4">
      <h1 class="text-2xl fw-bold">Listagem de Tutores</h1>
      <p class="text-body-secondary mb-0">Tutores cadastrados no sistema.</p>
    </header>

    <RouterLink
      class="btn btn-primary mb-4"
      :to="{ name: 'addTutor' }"
    >
      <i
        class="bi bi-plus-circle me-2"
        aria-hidden="true"
      ></i
      >Adicionar Tutor
    </RouterLink>

    <div
      v-if="erro"
      class="alert alert-danger"
      role="alert"
    >
      {{ erro }}
    </div>

    <div
      v-if="loading"
      class="text-body-secondary"
      role="status"
    >
      Carregando tutores...
    </div>

    <div
      v-else
      class="table-responsive"
    >
      <table class="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Telefone</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="tutor in tutores"
            :key="tutor.id"
          >
            <td>
              <RouterLink
                class="text-decoration-none"
                :to="{ name: 'tutorDetail', params: { id: tutor.id } }"
                >{{ tutor.id }}</RouterLink
              >
            </td>
            <td>
              <RouterLink
                class="text-decoration-none text-body"
                :to="{ name: 'tutorDetail', params: { id: tutor.id } }"
                >{{ tutor.nome }}</RouterLink
              >
            </td>
            <td>{{ tutor.telefone || 'Não informado' }}</td>
            <td>
              <div class="d-flex gap-2">
                <RouterLink
                  class="btn btn-outline-primary btn-sm"
                  :to="{ name: 'tutorDetail', params: { id: tutor.id } }"
                >
                  Visualizar
                </RouterLink>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  :disabled="removendo !== null"
                  @click="removerTutor(tutor)"
                >
                  {{ removendo === tutor.id ? 'Removendo...' : 'Remover' }}
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="!tutores.length && !erro">
            <td
              colspan="4"
              class="text-center text-body-secondary"
            >
              Nenhum tutor cadastrado.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
