# Descrição do Projeto
A ideia é que **organizações** registrem **pets** que estejam disponíveis para adoção, fornecendo também um número de telefone, pelo qual potenciais tutoras possam entrar em contato, via WhatsApp, e acordar a adoção. 

## Requisitos Funcionais
**Pets**:
- [x] Deve ser possível cadastrar um pet;
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma **cidade**;
- [x] Deve ser possível filtrar pets por suas características;
    - Idade (Filhote ou Adulto);
    - Nível de energia (0 a 5);
    - Porte do animal (pequeno, médio grande);
    - Nível de independência (baixa, média, alta);
    - Tipo de animal (Cachorro ou gato);
- [x] Deve ser possível visualizar detalhes de um pet para adoção;

**Organizações**:
- [x] Deve ser possível se cadastrar como uma Organização;
- [x] Deve ser possível realizar login como uma Organização;

## Regras de Negócio
**Pets:**
- [x] Para listar os pets, é **necessário** informar uma cidade;
- [x] Um pet **PRECISA** estar ligado a uma Organização;
- [x] Os filtros de pet são opcionais, com exceção da cidade;

**Organizações**:
- [x] Uma Organização **PRECISA** ter endereço e número de WhatsApp;
- [x] O número de WhatsApp **PRECISA** ser único;
- [x] Para Organização ter permissão de admin, precisa estar logada;
- [x] Authenticação será controlada via Refresh Token;

## Requisitos Não Funcionais
**Pets:**
- [x] Os pets devem ser identificados com ids únicos e universais (UUID);

**Organizações:**
- [x] As organizações devem ser identificados com ids únicos e universais (UUID);
- [x] As organizações devem ser autenticadas via JWT;