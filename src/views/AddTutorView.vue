<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import TutorFormFields from '@/components/TutorFormFields.vue';

const API_URL = 'http://localhost:3000';
const router = useRouter();
const tutor = ref({
  nome: '',
  cpfCnpj: '',
  telefone: '',
  email: '',
  dataNascimento: '',
  rua: '',
  numero: '',
  bairro: '',
  cidade: '',
  estado: '',
  cep: '',
});
const salvando = ref(false);
const erro = ref('');





async function salvarTutor() {
  if (salvando.value) return;
  if (!tutor.value.nome.trim() || !tutor.value.telefone.trim()) {
    erro.value = 'Preencha o nome e o telefone do tutor.';
    return;
  }
  salvando.value = true;
  erro.value = '';
  try {
    const resposta = await fetch(`${API_URL}/tutores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tutor.value),
    });
    if (!resposta.ok) throw new Error('Não foi possível cadastrar o tutor.');
    await router.push({ name: 'tutors' });
  } catch (error) {
    erro.value = error.message || 'Não foi possível cadastrar o tutor.';
  } finally {
    salvando.value = false;
  }
}
</script>

<template>
  <div class="tutor-page">
    <header class="mb-3">
      <h1 class="text-2xl fw-bold">Cadastrar Tutor</h1>
      <p class="text-body-secondary lh-sm mb-0">
        Preencha os dados para cadastrar um novo tutor.
      </p>
    </header>

    <form
      class="tutor-form px-md-3"
      @submit.prevent="salvarTutor"
    >
      <div
        v-if="erro"
        class="alert alert-danger"
        role="alert"
      >
        {{ erro }}
      </div>
      <fieldset :disabled="salvando">
        <TutorFormFields v-model="tutor" />
        <div class="d-flex justify-content-end gap-2 mt-2">
          <RouterLink
            class="btn btn-outline-secondary"
            :to="{ name: 'tutors' }"
            >Cancelar</RouterLink
          >
          <button
            class="btn btn-primary"
            type="submit"
            :disabled="salvando"
          >
            {{ salvando ? 'Cadastrando...' : 'Cadastrar Tutor' }}
          </button>
        </div>
      </fieldset>
    </form>
  </div>
</template>
