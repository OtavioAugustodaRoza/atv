<script setup>
import { ref } from 'vue';
const tutor = defineModel({ type: Object, required: true });

const estados = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];

const cepApi = ref({});

async function buscaCep(cep) {
  const cepLimpo = cep.replace(/\D/g, '');
  const API_CEP = 'https://viacep.com.br/ws';
  const respostaCep = await fetch(`${API_CEP}/${cepLimpo}/json/`);
  cepApi.value = await respostaCep.json();

  tutor.value.rua = cepApi.value.logradouro;
  tutor.value.bairro = cepApi.value.bairro;
  tutor.value.cidade = cepApi.value.localidade;
  tutor.value.estado = cepApi.value.uf;
}
</script>

<template>
  <fieldset class="mb-4">
    <legend class="float-none fs-5 fw-bold lh-sm border-bottom pb-1 mb-2">
      Dados do Tutor
    </legend>

    <div class="row g-3">
      <div class="col-md-4">
        <label
          class="form-label"
          for="id-tutor"
          >ID</label
        >
        <input
          id="id-tutor"
          :value="tutor.id"
          class="form-control"
          type="text"
          placeholder="Gerado automaticamente"
          disabled
        />
      </div>
      <div class="col-md-8">
        <label
          class="form-label"
          for="nome-tutor"
          >Nome Completo</label
        >
        <input
          id="nome-tutor"
          v-model.trim="tutor.nome"
          class="form-control"
          type="text"
          autocomplete="name"
          placeholder="Digite o nome completo"
          required
        />
      </div>
      <div class="col-md-6">
        <label
          class="form-label"
          for="documento-tutor"
          >CPF / CNPJ</label
        >
        <input
          id="documento-tutor"
          v-model.trim="tutor.cpfCnpj"
          class="form-control"
          type="text"
          inputmode="numeric"
          placeholder="Digite o CPF ou CNPJ"
        />
      </div>
      <div class="col-md-6">
        <label
          class="form-label"
          for="telefone-tutor"
        >
          Telefone / Celular / WhatsApp
        </label>
        <input
          id="telefone-tutor"
          v-model.trim="tutor.telefone"
          class="form-control"
          type="tel"
          autocomplete="tel"
          placeholder="(00) 00000-0000"
          required
        />
      </div>
      <div class="col-md-6">
        <label
          class="form-label"
          for="email-tutor"
          >E-mail</label
        >
        <input
          id="email-tutor"
          v-model.trim="tutor.email"
          class="form-control"
          type="email"
          autocomplete="email"
          placeholder="nome@example.com"
        />
      </div>
      <div class="col-md-6">
        <label
          class="form-label"
          for="nascimento-tutor"
          >Data de Nascimento</label
        >
        <input
          id="nascimento-tutor"
          v-model="tutor.dataNascimento"
          class="form-control"
          type="date"
          autocomplete="bday"
        />
      </div>
    </div>
  </fieldset>
  <!-- Endereço do tutor -->
  <fieldset>
    <legend class="float-none fs-5 fw-bold lh-sm border-bottom pb-1 mb-2">
      Endereço
    </legend>
    <!-- CEP do Tutor -->
    <div class="row g-3 mb-3">
      <div class="col-md-4">
        <label
          for="cep"
          class="form-label"
        >
          CEP
        </label>
        <input
          type="text"
          class="form-control"
          id="cep"
          v-model.trim="tutor.cep"
          inputmode="numeric"
          placeholder="00000-000"
          maxlength="9"
          required
          @blur="buscaCep(tutor.cep)"
        />
      </div>

      <div class="col-12 col-md-4">
        <!-- RUA -->
        <label
          for="rua"
          class="form-label"
        >
          Rua:
        </label>
        <input
          type="text"
          class="form-control"
          id="rua"
          v-model.trim="tutor.rua"
          autocomplete="address-line1"
          required
        />
      </div>
      <!-- Número do endereço -->
      <div class="col-md-4">
        <label
          for="numero"
          class="form-label"
        >
          Número:
        </label>
        <input
          type="text"
          class="form-control"
          id="numero"
          v-model.trim="tutor.numero"
          required
        />
      </div>
    </div>

    <div class="row g-3">
      <div class="col-md-4">
        <label
          for="bairro"
          class="form-label"
        >
          Bairro
        </label>
        <input
          type="text"
          class="form-control"
          id="bairro"
          v-model.trim="tutor.bairro"
          required
        />
      </div>

      <div class="col-12 col-md-4">
        <!-- Cidade -->
        <label
          for="cidade"
          class="form-label"
        >
          Cidade:
        </label>
        <input
          type="text"
          class="form-control"
          id="cidade"
          v-model.trim="tutor.cidade"
          autocomplete="address-level2"
          required
        />
      </div>
      <!-- Estado -->
      <div class="col-md-4">
        <label
          for="estado"
          class="form-label"
        >
          Estado:
        </label>
        <select
          class="form-select"
          id="estado"
          v-model="tutor.estado"
          autocomplete="address-level1"
          required
        >
          <option
            value=""
            disabled
          >
            Selecione
          </option>
          <option
            v-for="estado in estados"
            :key="estado"
            :value="estado"
          >
            {{ estado }}
          </option>
        </select>
      </div>
    </div>
  </fieldset>
</template>
