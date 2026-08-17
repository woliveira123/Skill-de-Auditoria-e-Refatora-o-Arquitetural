# Skill de Auditoria e Refatoração Arquitetural

Este repositório contém a entrega do desafio de criação de uma skill reutilizável para auditar projetos backend e orientar sua refatoração para o padrão MVC.

## Objetivo do desafio

O objetivo foi criar uma skill capaz de analisar uma codebase, identificar problemas de segurança, arquitetura e qualidade, gerar um relatório de auditoria e, somente após aprovação explícita, orientar a refatoração e a validação do resultado. A solução precisava funcionar em três projetos com níveis distintos de organização e duas tecnologias: Python/Flask e Node.js/Express.

## O que foi entregue

- A skill `refactor-arch` nos três projetos, em `.claude/skills/refactor-arch/`.
- Fluxo de três fases: análise, auditoria e refatoração/validação.
- Arquivos Markdown de referência para descoberta de stack, catálogo de anti-patterns, template de relatório, MVC e playbook de transformação.
- Relatórios dos três projetos em [`reports/`](reports/).
- Configuração por variáveis de ambiente e arquivos `.env.example`.
- Regras de Git para impedir o envio de segredos, chaves e certificados.
- Correções iniciais de segurança identificadas durante a auditoria.

## Como a skill funciona

### Fase 1 - Análise

A skill inspeciona manifests, imports, dependências e pontos de entrada para descobrir linguagem, framework, banco de dados, domínio, arquivos de código e arquitetura atual. Ela não altera arquivos nesta fase.

### Fase 2 - Auditoria

O código é comparado com o catálogo de anti-patterns. Cada achado deve apresentar severidade, caminho e linhas exatas, evidência, impacto e recomendação. Os achados são ordenados de CRITICAL a LOW. Ao final, a skill para e pede a confirmação explícita:

```text
Phase 2 complete. Proceed with refactoring (Phase 3)? [y/n]
```

Nenhuma modificação deve ser feita antes de a resposta ser `y`.

### Fase 3 - Refatoração e validação

Após aprovação, a skill orienta a separação de responsabilidades entre rotas/views, controllers/services, models/repositories, configuração e tratamento de erros. O contrato dos endpoints deve ser preservado e a validação deve incluir boot da aplicação, health check e endpoints originais.

## Projetos auditados

| Projeto | Stack | Relatório |
|---|---|---|
| `code-smells-project` | Python + Flask | [`audit-project-1.md`](reports/audit-project-1.md) |
| `ecommerce-api-legacy` | Node.js + Express + SQLite | [`audit-project-2.md`](reports/audit-project-2.md) |
| `task-manager-api` | Python + Flask + SQLAlchemy | [`audit-project-3.md`](reports/audit-project-3.md) |

Os relatórios documentam pelo menos cinco problemas por projeto, incluindo problemas CRITICAL/HIGH, MEDIUM e LOW. Entre os exemplos encontrados estão segredos expostos, SQL arbitrário, concatenação de SQL, hashing fraco, módulos com responsabilidades excessivas, consultas N+1, APIs obsoletas e tratamento de erro inconsistente.

## Segurança aplicada

Foram adicionadas proteções para evitar vazamento de informações sensíveis:

- `.env`, variações de `.env`, chaves, certificados e diretórios `secrets/` são ignorados pelo Git.
- Cada aplicação tem um `.env.example` com nomes de variáveis, sem valores reais.
- Configurações sensíveis foram movidas para variáveis de ambiente.
- O projeto Node passou a usar `scrypt` em vez do hash customizado inseguro.
- O endpoint de saúde do projeto Flask deixou de devolver a chave secreta.

Nunca inclua arquivos `.env` reais, chaves privadas, tokens, senhas ou certificados em commits.

## Estrutura relevante

```text
.
├── code-smells-project/
│   └── .claude/skills/refactor-arch/
├── ecommerce-api-legacy/
│   └── .claude/skills/refactor-arch/
├── task-manager-api/
│   └── .claude/skills/refactor-arch/
└── reports/
    ├── audit-project-1.md
    ├── audit-project-2.md
    └── audit-project-3.md
```

## Como executar

1. Entre no diretório de um dos projetos.
2. Copie `.env.example` para `.env` e preencha somente valores locais.
3. Instale as dependências do projeto:

   ```bash
   # Flask
   pip install -r requirements.txt

   # Node.js
   npm install
   ```

4. Execute a skill pela ferramenta compatível:

   ```text
   /refactor-arch
   ```

5. Revise o relatório da Fase 2 e aprove a Fase 3 somente quando estiver de acordo com as alterações planejadas.

## Critérios atendidos

- Detecção de stack para os três projetos.
- Relatórios com achados classificados por severidade e linhas exatas.
- Pelo menos cinco achados por projeto, incluindo CRITICAL ou HIGH.
- Skill com pausa obrigatória antes da modificação.
- Material de referência para análise, auditoria, relatório, MVC e refatoração.
- Proteções contra envio acidental de segredos ao Git.
