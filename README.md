# PetSchool — Pets e Tutores

Aplicação para gerenciar pets e seus tutores. Permite cadastrar, listar,
visualizar e remover tutores com nome e telefone, usando a Fetch API e o
JSON Server para persistir os dados em `db.json`.

O formulário de tutores também permite informar CPF/CNPJ, e-mail, data de
nascimento e endereço (rua, número, bairro, cidade, estado e CEP). Esses campos
são opcionais e ficam disponíveis na visualização e na edição do tutor.

## Tecnologias

- Vue.js 3;
- Vite;
- Vue Router;
- Bootstrap 5;
- Bootstrap Icons;
- Fetch API;
- JSON Server.

## Pré-requisitos

Antes de iniciar, verifique se estão instalados:

- [Node.js](https://nodejs.org/);
- npm;
- [Git](https://git-scm.com/);
- [Visual Studio Code](https://code.visualstudio.com/), recomendado.

O projeto utiliza o Node.js `22.18.0`, definido no arquivo `.nvmrc`.

```bash
node --version
npm --version
git --version
```

Caso utilize NVM no Linux ou macOS:

```bash
nvm install
nvm use
```

No Windows com `nvm-windows`:

```powershell
nvm install 22.18.0
nvm use 22.18.0
```

## Instalação

Clone o repositório:

```bash
git clone URL-DO-REPOSITORIO
```

Acesse o diretório e instale as dependências:

```bash
cd nome-do-projeto
npm install
```

## Execução

Em um terminal, inicie a API:

```bash
npm run api
```

A API ficará disponível em `http://localhost:3000`. Os endpoints de tutores
são `GET /tutores`, `GET /tutores/:id`, `POST /tutores` e `DELETE /tutores/:id`.
O JSON Server gera o ID automaticamente no cadastro.

Em outro terminal, inicie a aplicação:

```bash
npm run dev
```

O terminal apresentará o endereço local da aplicação, normalmente:

```text
http://localhost:5173
```

Acesse `/tutores` para listar, visualizar ou remover tutores e
`/tutores/novo` para cadastrar. Os detalhes ficam em `/tutores/:id`.
Após salvar, a aplicação retorna à listagem; após remover, a tabela é atualizada.

Outros comandos disponíveis:

```bash
npm run format
npm run lint
npm run build
npm run preview
```

## Estrutura do projeto

A aplicação organiza páginas, componentes, serviços, rotas e estilos por
responsabilidade.

Consulte o [guia de estrutura do projeto](./docs/estrutura-projeto.md).

## Documentação

- [Como utilizar o template](./docs/como-utilizar-template.md);
- [Estrutura do projeto](./docs/estrutura-projeto.md);
- [Guia de padronização do código](./docs/guia-padronizacao-codigo.md);
- [Validação do projeto](./docs/validacao-template.md).

## Contribuição

Para contribuir:

1. faça um fork, caso não possua acesso direto ao repositório;
2. clone o repositório ou seu fork;
3. crie uma branch para a alteração;
4. desenvolva e teste a funcionalidade;
5. execute a formatação, o lint e o build;
6. crie um commit com uma mensagem descritiva;
7. envie a branch ao GitHub;
8. abra um Pull Request.

```bash
git switch -c feat/nome-da-funcionalidade
npm run format
npm run lint
npm run build
git add .
git commit -m "feat: adiciona nova funcionalidade"
git push origin feat/nome-da-funcionalidade
```

## Origem do template

Este projeto foi iniciado a partir do
[Template Vue.js com Bootstrap](https://github.com/ifc-dev-web2/tec-vue-bootstrap-template),
desenvolvido pelo
[Prof. Cristofer Sousa](https://github.com/cristofersousa) para atividades de
Desenvolvimento Web do Instituto Federal Catarinense — Campus Araquari.

## Licença

Consulte os termos de utilização no arquivo [LICENSE](LICENSE).
