<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

const API_URL = 'http://localhost:3000';
const route = useRoute();
const router = useRouter();
const tutor = ref(null);
const pets = ref([]);
const editando = ref(false);
const loading = ref(true);
const salvando = ref(false);
const erro = ref('');
const mensagemErro = ref('');

async function carregarTutor() {
  loading.value = true;
  erro.value = '';
  try {
    const [respostaTutor, respostaPets] = await Promise.all([
      fetch(`${API_URL}/tutores/${route.params.id}`),
      fetch(`${API_URL}/pets`),
    ]);
    if (!respostaTutor.ok) throw new Error();
    tutor.value = await respostaTutor.json();
    if (respostaPets.ok) {
      const todosPets = await respostaPets.json();
      pets.value = todosPets.filter((pet) => String(pet.tutorId) === String(tutor.value.id));
    }
  } catch {
    erro.value = 'Não foi possível carregar os dados deste tutor.';
  } finally {
    loading.value = false;
  }
}

function cancelarEdicao() {
  mensagemErro.value = '';
  editando.value = false;
  carregarTutor();
}

async function salvarEdicao() {
  salvando.value = true;
  mensagemErro.value = '';
  try {
    const resposta = await fetch(`${API_URL}/tutores/${route.params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: tutor.value.nome, telefone: tutor.value.telefone || '' }),
    });
    if (!resposta.ok) throw new Error('Não foi possível salvar as alterações.');
    tutor.value = await resposta.json();
    editando.value = false;
  } catch (error) {
    mensagemErro.value = error.message || 'Não foi possível salvar as alterações.';
  } finally {
    salvando.value = false;
  }
}

async function excluirTutor() {
  if (pets.value.length) {
    mensagemErro.value = 'Este tutor possui pets cadastrados. Transfira ou remova os pets antes de excluir o tutor.';
    return;
  }
  if (!window.confirm(`Tem certeza que deseja excluir ${tutor.value.nome}?`)) return;

  mensagemErro.value = '';
  try {
    const resposta = await fetch(`${API_URL}/tutores/${route.params.id}`, { method: 'DELETE' });
    if (!resposta.ok) throw new Error('Não foi possível excluir este tutor.');
    router.push({ name: 'tutors' });
  } catch (error) {
    mensagemErro.value = error.message || 'Não foi possível excluir este tutor.';
  }
}

onMounted(carregarTutor);
</script>

<template>
  <div>
    <header class="mb-4">
      <h1 class="text-2xl fw-bold">Detalhes do Tutor</h1>
      <p class="text-body-secondary mb-0">Informações do tutor cadastrado no sistema.</p>
    </header>

    <div class="d-flex gap-2 mb-4">
      <RouterLink class="btn btn-outline-primary" :to="{ name: 'tutors' }">Voltar para a lista</RouterLink>
      <RouterLink class="btn btn-primary" :to="{ name: 'addTutor' }">Adicionar Tutor</RouterLink>
    </div>

    <div v-if="loading" class="text-body-secondary" role="status">Carregando dados do tutor...</div>
    <div v-else-if="erro" class="alert alert-warning" role="alert">{{ erro }}</div>

    <section v-else-if="tutor" class="card shadow-sm" aria-label="Dados do tutor">
      <div class="card-body p-4">
        <div v-if="mensagemErro" class="alert alert-danger" role="alert">{{ mensagemErro }}</div>
        <div class="mb-4">
          <h2 class="h3 mb-1">{{ tutor.nome }}</h2>
          <p class="text-body-secondary mb-0">{{ tutor.telefone || 'Telefone não informado' }}</p>
        </div>

        <form v-if="editando" class="row g-3" @submit.prevent="salvarEdicao">
          <div class="col-12">
            <label class="form-label" for="nome-tutor-edicao">Nome</label>
            <input id="nome-tutor-edicao" v-model.trim="tutor.nome" class="form-control" autocomplete="name" required />
          </div>
          <div class="col-md-6">
            <label class="form-label" for="telefone-tutor-edicao">Telefone</label>
            <input id="telefone-tutor-edicao" v-model.trim="tutor.telefone" class="form-control" type="tel" autocomplete="tel" />
          </div>
          <div class="col-12 d-flex gap-2">
            <button class="btn btn-success" type="submit" :disabled="salvando">{{ salvando ? 'Salvando...' : 'Salvar alterações' }}</button>
            <button class="btn btn-outline-secondary" type="button" @click="cancelarEdicao">Cancelar</button>
          </div>
        </form>

        <dl v-else class="row mb-0">
          <dt class="col-sm-3">ID</dt><dd class="col-sm-9">{{ tutor.id }}</dd>
          <dt class="col-sm-3">Nome</dt><dd class="col-sm-9">{{ tutor.nome }}</dd>
          <dt class="col-sm-3">Telefone</dt><dd class="col-sm-9">{{ tutor.telefone || 'Não informado' }}</dd>
          <dt class="col-sm-3">Pets</dt>
          <dd class="col-sm-9">
            <span v-if="!pets.length">Nenhum pet cadastrado</span>
            <ul v-else class="list-unstyled mb-0">
              <li v-for="pet in pets" :key="pet.id">{{ pet.nome }} ({{ pet.especie || 'espécie não informada' }})</li>
            </ul>
          </dd>
        </dl>

        <div v-if="!editando" class="d-flex gap-2 mt-4">
          <button class="btn btn-primary" type="button" @click="editando = true">Editar</button>
          <button class="btn btn-outline-danger" type="button" @click="excluirTutor">Excluir</button>
        </div>
      </div>
    </section>
  </div>
</template>
