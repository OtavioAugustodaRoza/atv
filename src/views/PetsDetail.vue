<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

const API_URL = 'http://localhost:3000';
const route = useRoute();
const router = useRouter();
const pet = ref(null);
const tutor = ref(null);
const tutores = ref([]);
const editando = ref(false);
const salvando = ref(false);
const mensagemErro = ref('');
const loading = ref(true);
const erro = ref('');

async function carregarPet() {
  loading.value = true;
  erro.value = '';

  try {
    const respostaPet = await fetch(`${API_URL}/pets/${route.params.id}`);
    if (!respostaPet.ok) {
      throw new Error('Pet não encontrado.');
    }

    pet.value = await respostaPet.json();

    const respostaTutores = await fetch(`${API_URL}/tutores`);
    if (respostaTutores.ok) {
      tutores.value = await respostaTutores.json();
      tutor.value = tutores.value.find((item) => item.id === pet.value.tutorId) || null;
    }

  } catch {
    erro.value = 'Não foi possível carregar os dados deste pet.';
  } finally {
    loading.value = false;
  }
}

function iniciarEdicao() {
  mensagemErro.value = '';
  editando.value = true;
}

function cancelarEdicao() {
  mensagemErro.value = '';
  editando.value = false;
  carregarPet();
}

async function salvarEdicao() {
  salvando.value = true;
  mensagemErro.value = '';

  try {
    const resposta = await fetch(`${API_URL}/pets/${route.params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: pet.value.nome,
        especie: pet.value.especie,
        tutorId: pet.value.tutorId,
      }),
    });

    if (!resposta.ok) throw new Error('Não foi possível salvar as alterações.');

    const petAtualizado = await resposta.json();
    pet.value = petAtualizado;
    tutor.value = tutores.value.find((item) => item.id === petAtualizado.tutorId) || null;
    editando.value = false;
  } catch (erro) {
    mensagemErro.value = erro.message || 'Não foi possível salvar as alterações.';
  } finally {
    salvando.value = false;
  }
}

async function excluirPet() {
  if (!window.confirm(`Tem certeza que deseja excluir ${pet.value.nome}?`)) return;

  mensagemErro.value = '';
  try {
    const resposta = await fetch(`${API_URL}/pets/${route.params.id}`, { method: 'DELETE' });
    if (!resposta.ok) throw new Error('Não foi possível excluir este pet.');
    router.push({ name: 'pets' });
  } catch (erro) {
    mensagemErro.value = erro.message || 'Não foi possível excluir este pet.';
  }
}

onMounted(carregarPet);
</script>

<template>
  <div>
    <header class="mb-4">
      <h1 class="text-2xl font-bold">Detalhes do Pet</h1>
      <p class="text-body-secondary mb-0">Informações do pet cadastrado no sistema.</p>
    </header>

    <div class="d-flex gap-2 mb-4">
      <RouterLink class="btn btn-outline-primary" :to="{ name: 'pets' }">
        Voltar para a lista
      </RouterLink>
      <RouterLink class="btn btn-primary" :to="{ name: 'addPet' }">
        Adicionar Pet
      </RouterLink>
    </div>

    <div v-if="loading" class="text-body-secondary" role="status">
      Carregando dados do pet...
    </div>

    <div v-else-if="erro" class="alert alert-warning" role="alert">
      {{ erro }}
    </div>

    <section v-else-if="pet" class="card shadow-sm" aria-label="Dados do pet">
      <div class="card-body p-4">
        <div v-if="mensagemErro" class="alert alert-danger" role="alert">
          {{ mensagemErro }}
        </div>
        <div class="d-flex align-items-center gap-3 mb-4">
          
          <div>
            <h2 class="h3 mb-1">{{ pet.nome }}</h2>
            <p class="text-body-secondary mb-0">{{ pet.especie || 'Espécie não informada' }}</p>
          </div>
        </div>

        <form v-if="editando" class="row g-3" @submit.prevent="salvarEdicao">
          <div class="col-12">
            <label class="form-label" for="nome-pet">Nome</label>
            <input id="nome-pet" v-model.trim="pet.nome" class="form-control" required />
          </div>
          <div class="col-md-6">
            <label class="form-label" for="especie-pet">Espécie</label>
            <input id="especie-pet" v-model.trim="pet.especie" class="form-control" required />
          </div>
          <div class="col-md-6">
            <label class="form-label" for="tutor-pet">Tutor</label>
            <select id="tutor-pet" v-model="pet.tutorId" class="form-select" required>
              <option value="" disabled>Selecione o tutor</option>
              <option v-for="item in tutores" :key="item.id" :value="item.id">
                {{ item.nome }}
              </option>
            </select>
          </div>
          <div class="col-12 d-flex gap-2">
            <button class="btn btn-success" type="submit" :disabled="salvando">
              {{ salvando ? 'Salvando...' : 'Salvar alterações' }}
            </button>
            <button class="btn btn-outline-secondary" type="button" @click="cancelarEdicao">
              Cancelar
            </button>
          </div>
        </form>

        <dl v-else class="row mb-0">
          <dt class="col-sm-3">ID</dt>
          <dd class="col-sm-9">{{ pet.id }}</dd>

          <dt class="col-sm-3">Nome</dt>
          <dd class="col-sm-9">{{ pet.nome }}</dd>

          <dt class="col-sm-3">Espécie</dt>
          <dd class="col-sm-9">{{ pet.especie || 'Não informada' }}</dd>

          <dt class="col-sm-3">Tutor</dt>
          <dd class="col-sm-9">{{ tutor?.nome || 'Tutor não encontrado' }}</dd>
        </dl>

        <div v-if="!editando" class="d-flex gap-2 mt-4">
          <button class="btn btn-primary" type="button" @click="iniciarEdicao">Editar</button>
          <button class="btn btn-outline-danger" type="button" @click="excluirPet">Excluir</button>
        </div>
      </div>
    </section>
  </div>
</template>
