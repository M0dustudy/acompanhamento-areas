# VITRA — Gestão de Acessos (versão de teste)

Esta branch **não está publicada no GitHub Pages**. A versão oficial permanece na branch `main`, com 348 avaliações de estoque e arquivos históricos preservados.

## Componentes preparados
- `vitra-access.css`: tela de login responsiva e área de administração.
- `vitra-access.js`: usuário/senha, sessão individual, saída e painel exclusivo de administrador mestre.
- `vitra-setup.html`: ativação única da conta mestre com código privado. O usuário escolhe a própria senha, sem enviá-la por chat.
- `vitra-access-config.js`: exclusivamente URL e chave **publicável** do Supabase, sem dados confidenciais.
- `acessos/vitra-auth-schema.sql`: usuários, eventos de login e estrutura de controle, com RLS e sem acesso direto de anon/authenticated.
- `acessos/vitra-access-edge.ts`: validação de credenciais, operações de usuário e registro de entradas no servidor.

## Antes de ligar o login em produção
1. Criar projeto Supabase **específico do VITRA**, em organização autorizada pelo responsável. Não utilizar o projeto NEXO.
2. Aplicar `acessos/vitra-auth-schema.sql` no projeto novo, conferir RLS, permissões e extensões.
3. Gerar código de ativação de alta entropia, guardar somente o SHA-256 no `vitra_auth_setup`; fornecer o código exclusivamente ao responsável e nunca incluí-lo no GitHub.
4. Implantar a Edge Function com `verify_jwt=false` **porque a própria função verifica JWT em todas as operações exceto login e bootstrap**; restringir origens e conferir a obtenção das chaves secretas no servidor. **Nunca** publicar secret keys no JavaScript ou no HTML.
5. Atualizar `vitra-access-config.js` somente com a URL e a publishable key do projeto novo.
6. Ativar a conta mestre em `vitra-setup.html`, criar a senha privada e testar login.
7. Testar conta master, conta comum, edição de usuário, troca de senha, bloqueio, revogação, exclusão, histórico, restauração de sessão e acesso pelo celular.
8. Conferir o total de avaliações no VITRA e os vínculos dos PDFs; só depois publicar a experiência na `main`.

## Observações
- O GitHub Pages e os PDFs do repositório continuam públicos. Este login limita o acesso normal à interface, não torna os documentos privados.
- As senhas são gerenciadas pelo Supabase Auth, sem armazenamento em texto claro no VITRA.
- O histórico de entradas identifica **a conta que autenticou**, não prova quem fisicamente digitou as credenciais se forem compartilhadas.
- Remoção de acesso no servidor impede novas autenticações; o painel verifica periodicamente a validade da sessão. Tokens antigos podem permanecer tecnicamente válidos até expirar, mas o servidor rejeita operações com conta removida ou bloqueada.
- Backup anterior ao login: `backup/vitra-2026-11-13-antes-login`, commit `58a805db38f7a1f049a53f156f3f94c35a8d75d3`.
- Não apague versões históricas enquanto houver dados exclusivos de avaliações antigas a investigar.
