# Teste Fluig

## Descrição do Problema
A empresa XPTO Inc tem a necessidade de feedback do responsável do almoxarifado quanto a entrega de remessas e mercadorias entre as unidades dela. Uma unidade cadastra uma solicitação onde identifica o ponto de coleta, a unidade destino e qual a mercadoria/conteúdo da entrega.
Após essa etapa inicial, cabe ao responsável do almoxarifado da unidade destino confirmar o recebimento da mercadoria.
Para tal objetivo, pretende-se implementar:
- Um pré-cadastro de filial com campos de código, nome, endereço e zoom de usuário responsável almoxarifado. Ao cadastrar um novo registro validar se o código já está cadastrado. Todos os campos são obrigatórios.
- Um processo de entrega, com os campos de CEP origem integrando CEP (consulta pública de algum serviço de CEP - exemplo ViaCEP) que preencha campos complementares (campos esses bloqueados, que serão preenchidos automaticamente com base no retorno obtido da consulta de CEP), como nome da rua, cidade e estado, zoom de filial destino (listar com base nos dados do cadastro de empresa), um campo prazo da entrega (não pode ser inferior a data atual) e um campo descritivo da mercadoria, sendo os campos mencionados obrigatórios. Usuário responsável pelo almoxarifado daquela filial confirma recebimento da mercadoria.

## Como executar

1. Realize o clone do projeto em sua máquina;
2. Abra o arquivo `index.html` em seu _browser_;
3. Realize o teste do programa;

> Como não há base de dados para buscar, criei algumas fictícias no arquivo `Model.js` de _Responsável_, _Filial_ e _Código Filial_.

> De acordo com a descrição do problema, parece ser uma sequência de um processo, portanto procurei seguir a sequência dos fatos descritos, simulando a execução de um processo.
