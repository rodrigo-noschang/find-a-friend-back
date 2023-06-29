# Descrição do Projeto
A ideia é que **organizações** registrem **pets** que estejam disponíveis para adoção, fornecendo também um número de telefone, pelo qual potenciais tutoras possam entrar em contato, via WhatsApp, e acordar a adoção. 

## Requisitos Funcionais

- [ ] Deve ser possível cadastrar um pet;
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma **cidade**;
- [ ] Deve ser possível filtrar pets por suas características;
    - Idade (Filhote ou Adulto);
    - Nível de energia (0 a 5);
    - Porte do animal (pequeno, médio grande);
    - Nídel de independência (baixa, média, alta)
- [ ] Deve ser possível visualizar detalhes de um pet para adoção;
- [ ] Deve ser possível se cadastrar como uma Organização;
- [ ] Deve ser possível realizar login como uma Organização;

## Regras de Negócio
- [ ] Para listar os pets, é **necessário** informar uma cidade;
- [ ] Uma Organização **PRECISA** ter endereço e número de WhatsApp;
- [ ] Um pet **PRECISA** está ligado a uma Organização;
- [ ] Os filtros de pet são opcionais, com exceção da cidade;
- [ ] Para Organização ter permissão de admin, precisa estar logada.

## Requisitos Não Funcionais
- [ ] Os pets devem ser identificados com ids únicos e universais (UUID);
- [ ] As organizações devem ser identificados com ids únicos e universais (UUID);
- [ ] As organizações devem ser autenticadas via JWT;