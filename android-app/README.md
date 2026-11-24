# VITRA para Android — protótipo isolado

Branch de desenvolvimento: `feature/vitra-android-preview`. **Não altera o site publicado nem as avaliações.**

## Funcionamento proposto

- A instalação contém uma cópia de leitura dos dados e dos recursos web do VITRA, sem PDFs.
- Ao entrar com internet, o app pode consultar a versão oficial publicada no repositório `main` e guardar a versão atualizada localmente. A sincronização troca o conjunto de recursos de forma atômica.
- O visualizador do APK utiliza uma cópia local do PDF.js; cada PDF é solicitado somente quando o usuário o abre e guardado em IndexedDB. A nova abertura reutiliza o mesmo arquivo, inclusive offline.
- Os relatórios originais permanecem no GitHub; apagar o aplicativo não altera documentos oficiais.
- A autenticação permanece com o servidor Supabase. **Este protótipo requer internet para entrar novamente após fechar o app; não implementa login offline em uma nova sessão.** Nunca contornar permissões de usuário.
- O protótipo deve ser testado no aparelho antes de ser considerado produção. Mudanças na estrutura do VITRA oficial podem precisar de nova versão do APK.
- O pacote gerado por CI é um `debug APK`, assinado para testes; não é uma versão de loja.

## Compilar

No GitHub: Actions → **VITRA Android — APK de teste** → última execução → Artifacts → `VITRA-Android-Preview-APK`.

Ou no PC com Node 22, JDK 21, Android SDK e Java/Gradle:

```sh
cd android-app
npm install
npx cap add android
node prepare.mjs
npx cap sync android
cd android
./gradlew assembleDebug
```

O APK será gerado em `android/app/build/outputs/apk/debug/app-debug.apk`.

Os arquivos de estoque **não** são incluídos no APK. Há arquivos públicos do site no APK, como já ocorre no repositório; o aplicativo não deve ser usado como barreira de confidencialidade dos dados embutidos.
