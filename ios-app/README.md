# VITRA para iPhone (iOS) — versão de desenvolvimento

Esta versão compartilha com o Android o código do VITRA, as avaliações de campo, colheita, recepção, titulação, estoque, o controle de permissões do administrador e a consulta de PDFs mediante primeira abertura. O aplicativo iOS usa Capacitor 8 e WKWebView.

**Não altera o site oficial nem os registros históricos.** A implementação permanece na branch `feature/vitra-ios-preview`, isolada da versão Android.

## Como a compilação funciona

O GitHub Actions `VITRA iOS - compilacao de teste` usa um executor macOS com Xcode. Ele gera o projeto Xcode, prepara o conteúdo do VITRA sem incluir os PDFs originais, incorpora o ícone e compila o aplicativo para simulador de iPhone.

O artefato `VITRA-iOS-Simulador-Sem-Assinatura` é um arquivo ZIP contendo `App.app`. **Ele não pode ser instalado em um iPhone físico**. Serve para validação em simulador e revisão técnica.

## Para instalar em um iPhone real

É necessário disponibilizar a assinatura de distribuição iOS vinculada a uma equipe Apple Developer. O caminho recomendado é TestFlight (convite para testadores). A alternativa é distribuição Ad Hoc para dispositivos registrados. A Apple gerencia certificados, perfis de provisionamento e App Store Connect.

Somente depois da assinatura e do provisionamento adequados é que um `.ipa` utilizável poderá ser distribuído. Não guardar senhas, tokens da conta Apple nem chaves privadas no repositório público.

O bundle ID planejado no iOS é `br.com.vitra.qualidade`. Antes de publicar, ele precisa ser registrado na equipe Apple Developer que administrará o aplicativo.

## Armazenamento e sincronização

- Avaliações são incorporadas ao app para consulta offline e atualizadas por sincronização com o GitHub.
- O conteúdo da interface acompanha a versão oficial, quando a sincronização é concluída.
- PDFs não são embarcados em massa. A primeira visualização online salva apenas o documento escolhido em IndexedDB; depois o leitor tenta reutilizar o documento local.
- iOS pode eliminar caches locais por pressão de espaço. O comportamento de persistência de PDFs deve ser testado em iPhone físico antes de considerar o recurso garantido em produção.
- O botão de movimentar áreas só é mostrado para a conta de administrador mestre. O servidor também verifica as permissões.
- `capacitor://localhost` é uma origem local permitida especificamente no backend de autenticação, sem mudar a verificação das credenciais.

## Compilar em um Mac

Com Node.js 22 e Xcode atualizado:

```sh
cd android-app
npm install
node prepare.mjs
node ../ios-app/configure.mjs
npx cap add ios
npx cap sync ios
node ../ios-app/icon.mjs
npx cap open ios
```

Para teste técnico sem assinatura, selecione um simulador no Xcode. Para um iPhone físico, configure equipe, assinatura e dispositivo no Xcode antes de compilar.

## Situação

Projeto de teste: build em simulador pela integração contínua. Publicação no TestFlight, instalação em iPhone real e teste de login/cache offline são pendências distintas que exigem uma conta Apple Developer e testes em dispositivo.
