# Desafio API

O seu desafio é construir uma API que conta o número de acessos ao site do Ton e permitir que um usuário crie uma conta. Para contar os acessos você deverá usar a API CountAPI e para criar a conta você pode usar o banco de dados e as bibliotecas que preferir, mas queremos que você saiba explicar sua escolha e como elas funcionam (de forma aprofundada, de preferência).

## Sua Tarefa

1. Criar uma rota para incrementar o número de acessos;
2. Criar uma rota para consultar o número de acessos;
3. Criar uma rota para criar um usuário;
4. Criar uma rota para visualizar as informações de um usuário.

### Bônus

Disponibilizar o desafio em algum servidor, escrever testes para os códigos (unitários, de integração e e2e) e documentação (open-api, fluxogramas e etc).

## Instruções

- Use versionamento (aqui no Ton tentamos seguir essa convenção:
https://www.conventionalcommits.org/en/v1.0.0/#summary)
- Mande o link do repositório ou um .zip caso você prefira
- Seguimos o clean code, e gostaríamos de ver isso também em sua implementação:
https://github.com/ryanmcdermott/clean-code-javascript
- Queremos uma entrega pronta para ir para produção, então pense em um sistema
resiliente e na segurança do mesmo
- Qualquer solução será aceita e avaliada igual pois queremos entender seu
conhecimento, mas seria interessante utilizar a mesma arquitetura que usamos, a
Arquitetura Serverless (API Gateway + Lambda + DynamoDB)
- Para infraestrutura, pode utilizar serverless ou terraform.
