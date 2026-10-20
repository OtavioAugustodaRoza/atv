<script setup>
import { ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import TutorFormFields from '@/components/TutorFormFields.vue';

const API_URL = 'http://localhost:3000';
const route = useRoute();
const router = useRouter();
const tutor = ref(null);
const pets = ref([]);
const editando = ref(false);
const loading = ref(true);
const salvando = ref(false);
const removendo = ref(false);
const erro = ref('');
const mensagemErro = ref('');

async function carregarTutor() {
  loading.value = true;
  erro.value = '';
  tutor.value = null;
  pets.value = [];
  editando.value = false;
  mensagemErro.value = '';
  try {
    const [respostaTutor, respostaPets] = await Promise.all([
      fetch(`${API_URL}/tutores/${route.params.id}`),
      fetch(`${API_URL}/pets`).catch(() => null),
    ]);
    if (respostaTutor.status === 404) {
      erro.value = 'Tutor não encontrado.';
      return;
    }
    if (!respostaTutor.ok) throw new Error();
    tutor.value = {
      cpfCnpj: '',
      email: '',
      dataNascimento: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      ...(await respostaTutor.json()),
    };
    if (respostaPets?.ok) {
      const todosPets = await respostaPets.json();
      pets.value = todosPets.filter(
        (pet) => String(pet.tutorId) === String(tutor.value.id),
      );
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
  if (salvando.value) return;
  if (!tutor.value.nome.trim() || !tutor.value.telefone.trim()) {
    mensagemErro.value = 'Preencha o nome e o telefone do tutor.';
    return;
  }
  salvando.value = true;
  mensagemErro.value = '';
  try {
    const resposta = await fetch(`${API_URL}/tutores/${route.params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tutor.value),
    });
    if (!resposta.ok) throw new Error('Não foi possível salvar as alterações.');
    tutor.value = await resposta.json();
    editando.value = false;
  } catch (error) {
    mensagemErro.value =
      error.message || 'Não foi possível salvar as alterações.';
  } finally {
    salvando.value = false;
  }
}

async function excluirTutor() {
  if (removendo.value) return;
  if (!window.confirm(`Tem certeza que deseja remover ${tutor.value.nome}?`))
    return;

  removendo.value = true;
  mensagemErro.value = '';
  try {
    const resposta = await fetch(`${API_URL}/tutores/${route.params.id}`, {
      method: 'DELETE',
    });
    if (!resposta.ok) throw new Error('Não foi possível excluir este tutor.');
    await router.push({ name: 'tutors' });
  } catch (error) {
    mensagemErro.value =
      error.message || 'Não foi possível excluir este tutor.';
  } finally {
    removendo.value = false;
  }
}

watch(() => route.params.id, carregarTutor, { immediate: true });
</script>

<template>
  <div class="tutor-page">
    <header class="mb-4">
      <h1 class="text-2xl fw-bold">Detalhes do Tutor</h1>
      <p class="text-body-secondary mb-0">
        Informações do tutor cadastrado no sistema.
      </p>
    </header>

    <div class="d-flex gap-2 mb-4">
      <RouterLink
        class="btn btn-outline-primary"
        :to="{ name: 'tutors' }"
        >Voltar para a lista</RouterLink
      >
      <RouterLink
        class="btn btn-primary"
        :to="{ name: 'addTutor' }"
        >Adicionar Tutor</RouterLink
      >
    </div>

    <div
      v-if="loading"
      class="text-body-secondary"
      role="status"
    >
      Carregando dados do tutor...
    </div>
    <div
      v-else-if="erro"
      class="alert alert-warning"
      role="alert"
    >
      {{ erro }}
    </div>

    <section
      v-else-if="tutor"
      aria-label="Dados do tutor"
    >
      <div class="px-md-3">
        <div
          v-if="mensagemErro"
          class="alert alert-danger"
          role="alert"
        >
          {{ mensagemErro }}
        </div>
        <form
          v-if="editando"
          class="tutor-form"
          @submit.prevent="salvarEdicao"
        >
          <fieldset :disabled="salvando">
            <TutorFormFields v-model="tutor" />
            <div class="d-flex justify-content-end gap-2 mt-2">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="cancelarEdicao"
              >
                Cancelar
              </button>
              <button
                class="btn btn-primary"
                type="submit"
                :disabled="salvando"
              >
                {{ salvando ? 'Salvando...' : 'Salvar alterações' }}
              </button>
            </div>
          </fieldset>
        </form>

        <template v-else>
          <h2 class="fs-5 fw-bold border-bottom pb-1 mb-3">Dados do Tutor</h2>
          <dl class="row mb-4">
            <dt class="col-sm-3">ID</dt>
            <dd class="col-sm-9">{{ tutor.id }}</dd>
            <dt class="col-sm-3">Nome Completo</dt>
            <dd class="col-sm-9">{{ tutor.nome }}</dd>
            <dt class="col-sm-3">CPF / CNPJ</dt>
            <dd class="col-sm-9">{{ tutor.cpfCnpj || 'Não informado' }}</dd>
            <dt class="col-sm-3">Telefone</dt>
            <dd class="col-sm-9">{{ tutor.telefone || 'Não informado' }}</dd>
            <dt class="col-sm-3">E-mail</dt>
            <dd class="col-sm-9">{{ tutor.email || 'Não informado' }}</dd>
            <dt class="col-sm-3">Data de Nascimento</dt>
            <dd class="col-sm-9">
              {{
                tutor.dataNascimento
                  ? tutor.dataNascimento.split('-').reverse().join('/')
                  : 'Não informada'
              }}
            </dd>
          </dl>

          <h2 class="fs-5 fw-bold border-bottom pb-1 mb-3">Endereço</h2>
          <dl class="row mb-4">
            <dt class="col-sm-3">Rua</dt>
            <dd class="col-sm-9">{{ tutor.rua || 'Não informada' }}</dd>
            <dt class="col-sm-3">Número</dt>
            <dd class="col-sm-9">{{ tutor.numero || 'Não informado' }}</dd>
            <dt class="col-sm-3">Bairro</dt>
            <dd class="col-sm-9">{{ tutor.bairro || 'Não informado' }}</dd>
            <dt class="col-sm-3">Cidade</dt>
            <dd class="col-sm-9">{{ tutor.cidade || 'Não informada' }}</dd>
            <dt class="col-sm-3">Estado</dt>
            <dd class="col-sm-9">{{ tutor.estado || 'Não informado' }}</dd>
            <dt class="col-sm-3">CEP</dt>
            <dd class="col-sm-9">{{ tutor.cep || 'Não informado' }}</dd>
          </dl>

          <dl class="row mb-0">
            <dt class="col-sm-3">Pets</dt>
            <dd class="col-sm-9">
              <span v-if="!pets.length">Nenhum pet cadastrado</span>
              <ul
                v-else
                class="list-unstyled mb-0"
              >
                <li
                  v-for="pet in pets"
                  :key="pet.id"
                >
                  {{ pet.nome }} ({{ pet.especie || 'espécie não informada' }})
                </li>
              </ul>
            </dd>
          </dl>
        </template>

        <div
          v-if="!editando"
          class="d-flex justify-content-end gap-2 mt-4"
        >
          <button
            class="btn btn-primary"
            type="button"
            :disabled="removendo"
            @click="editando = true"
          >
            Editar
          </button>
          <button
            class="btn btn-outline-danger"
            type="button"
            :disabled="removendo"
            @click="excluirTutor"
          >
            {{ removendo ? 'Removendo...' : 'Remover' }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
