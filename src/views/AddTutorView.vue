<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const API_URL = 'http://localhost:3000';
const router = useRouter();
const tutor = ref({ nome: '', telefone: '' });
const salvando = ref(false);
const erro = ref('');

async function salvarTutor() {
  salvando.value = true;
  erro.value = '';
  try {
    const resposta = await fetch(`${API_URL}/tutores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tutor.value),
    });
    if (!resposta.ok) throw new Error('Não foi possível cadastrar o tutor.');
    router.push({ name: 'tutors' });
  } catch (error) {
    erro.value = error.message || 'Não foi possível cadastrar o tutor.';
  } finally {
    salvando.value = false;
  }
}
</script>

<template>
  <div>
    <header class="mb-4">
      <h1 class="text-2xl fw-bold">Cadastrar Tutor</h1>
      <p class="text-body-secondary mb-0">Cadastre os dados do tutor no sistema.</p>
    </header>

    <div class="d-flex gap-2 mb-4">
      <RouterLink class="btn btn-outline-primary" :to="{ name: 'tutors' }">Voltar para a lista</RouterLink>
    </div>

    <section class="card shadow-sm" aria-label="Cadastro de tutor">
      <div class="card-body p-4">
        <div v-if="erro" class="alert alert-danger" role="alert">{{ erro }}</div>
        <form class="row g-3" @submit.prevent="salvarTutor">
          <div class="col-12">
            <label class="form-label" for="nome-tutor">Nome</label>
            <input id="nome-tutor" v-model.trim="tutor.nome" class="form-control" autocomplete="name" required />
          </div>
          <div class="col-md-6">
            <label class="form-label" for="telefone-tutor">Telefone</label>
            <input id="telefone-tutor" v-model.trim="tutor.telefone" class="form-control" type="tel" autocomplete="tel" />
          </div>
          <div class="col-12 d-flex gap-2">
            <button class="btn btn-success" type="submit" :disabled="salvando">
              {{ salvando ? 'Salvando...' : 'Salvar Tutor' }}
            </button>
            <RouterLink class="btn btn-outline-secondary" :to="{ name: 'tutors' }">Cancelar</RouterLink>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
