# VITRA — Diretrizes do módulo de conferência de etiquetas

Atualizado em 16/11/2026. Referência documental: DOC.CQ.056 (Manual de Etiquetas e Rotulagem, revisão de 12/09/2026). Estas diretrizes complementam, sem substituir, o manual.

## Objetivo operacional
A conferência por fotografia deve produzir um diagnóstico rápido e rastreável. O operador deve identificar o cliente e informar, por segmentos, a rastreabilidade real da produção. Os demais dados devem ser reconhecidos na foto e comparados com referências aprovadas, sempre que disponível.

## Identificações variáveis
- A área, o setor e a válvula/parcela não seguem obrigatoriamente os códigos internos 100/200/300, 110/120/220 ou as letras A/B/C. Produtores externos podem utilizar números, letras ou outros identificadores. Não fixar o conjunto de válvulas.
- O formato de referência documentado é R-ANO-(ÁREA+VÁLVULA)-DDMM-MÉTODO-VARIEDADE, mas a interpretação da separação de área e válvula pode ser ambígua quando ambas são numéricas; não presumir limites que não foram documentados.
- Cliente comercial, produtor, data, área, válvula, variedade e método podem variar a cada lote/embalagem; não reutilizar valores de uma conferência em outra.
- Usar seleção pesquisável, ordenação alfabética quando for relação nominal e entrada livre em identificadores que não possuam catálogo fechado.
- O código da foto e a referência informada devem permanecer independentes: preencher a referência automaticamente com o código lido tiraria a utilidade da comparação.

## Identificações fixas e banco
- Quando constarem na etiqueta, comparar GGN, CNPJ, nome do produtor/comerciante e dados de endereço com a fonte documental disponível; não exigir digitação rotineira desses campos.
- GGN identifica produtor/propriedade, não necessariamente o cliente comercial. Para identificar o cliente, usar marca, modelo e código de barras aprovados.
- O catálogo interno de códigos de barras e a base privada de entidades documentadas devem ser consultados. O GGN pode estar associado a mais de um registro; nesse caso, sinalizar ambiguidade sem escolher um nome indevidamente.
- Dados institucionais históricos e avaliações originais não devem ser reescritos nem utilizados para inferir medidas ausentes.

## Resultado e evidências
- Estados da leitura: aprovado na conferência digital (referências suficientes, sem divergência), reprovado por divergência identificada (explicar valores encontrados e esperados) e pendente (informação ilegível, regra ausente ou ambiguidade).
- Uma foto ou OCR isolado não garante conformidade. A inspeção física, a ordem de produção e a aprovação do modelo continuam dependentes de validação humana.
- Cada diagnóstico salvo deve preservar fotografia, data, cliente, identificação da etiqueta, rastreabilidade lida/informada, referência usada, alertas e observações, com acesso ao histórico individual.
- Nunca marcar automaticamente como correto um campo não lido, não documentado ou associado a múltiplas referências. Não alimentar padrões de aprendizado com dados ainda pendentes.

## Interface
- Câmera traseira como preferência obrigatória, com alternativa explícita se indisponível.
- Recorte real para isolar uma etiqueta; permitir mover, ampliar e redimensionar o enquadramento, com opções horizontal, vertical e quadrada.
- Módulo administrativo em tela própria, sem os indicadores dos outros módulos.
- Cliente sempre editável e pesquisável. Outras opções nominais também devem permitir busca. O diagnóstico deve ser visualmente resumido; as evidências completas ficam acessíveis em detalhes.
- Preservar o restante do VITRA e não apagar relatórios ou registros.

## Pendências de validação em uso
Validar com etiquetas reais de caixa e cumbuca, múltiplos produtores, variantes de layout e números com caracteres parecidos. Regras de clientes ou destinos que não constem da documentação vigente devem permanecer como pendências, nunca ser aprovadas por suposição.


## Fluxo operacional (16/11/2026 — v4)
1. A fotografia deve vir primeiro; não solicitar cliente ou código da produção antes da leitura.
2. Identificar preliminarmente o modelo. Cumbucas e cintas usam leitura de variedade, data, rastreabilidade, peso quando informado e EAN completo. Caixas podem incluir razão social, produtor, GGN, GLN, CNPJ e endereço.
3. Não identificar cumbuca ou caixa somente pela proporção do **recorte** da câmera: esse enquadramento não prova a dimensão física. Quando a identificação depender apenas da forma, exigir confirmação do tipo.
4. Solicitar cliente da ordem de produção mesmo quando o nome não estiver impresso na cumbuca. O cliente não deve ser inferido definitivamente por um EAN compartilhado.
5. Solicitar rastreabilidade independente: o colaborador lê no computador o código correto, e o VITRA compara **sem copiá-lo automaticamente** da etiqueta.
6. O diagnóstico só é apresentado após a confirmação do cliente, do modelo e da rastreabilidade. Cada divergência deve mostrar exatamente o valor impresso e o esperado.
7. Estados do resultado: **reprovado** quando há conflito comprovado; **pendente** quando a leitura ou a base não permitem confirmação; **aprovado na conferência digital** apenas quando as verificações exigidas estão completas e não há pendências.
8. O sistema só oferece o salvamento depois de parecer favorável e confirmação final do colaborador. Qualquer alteração posterior na referência invalida o parecer anterior.

## Observações documentais essenciais
- O código EAN-13 **7898366001754** aparece no manual para **Doce Mel e Trielo**, associado à uva Vitória (DOC.CQ.056, p. 13). Informar ambos os clientes quando esse EAN for lido não representa irregularidade. A associação com um terceiro cliente precisa ser verificada e justificada.
- Para a uva BRS Vitória, a sigla de rastreabilidade é **VI** (DOC.CQ.056, p. 5). O nome comercial impresso e a sigla devem ser comparados como campos diferentes do mesmo produto.
- A simples existência de 13 dígitos no GLN não permite aprovar o código sem uma referência de GLN atribuída à empresa. Manter pendente quando não houver cadastro.
- O reconhecimento de caracteres da foto pode falhar. Melhorias de contraste e nova leitura elevam a chance de identificação, sem garantia de precisão absoluta.

## Autorização e preservação do histórico
- O administrador mestre decide quais contas poderão entrar no módulo de etiquetas. A API valida essa autorização a cada solicitação.
- Os registros mostram usuário responsável, diagnóstico e fotografia. A conta mestre pode **ocultar e restaurar** registros; colaboradores não podem ocultar.
- O recurso é uma ocultação reversível com auditoria, **não** exclusão física dos documentos originais. Nunca apagar evidências sem autorização expressa.
- Controles visuais dos demais módulos devem respeitar as preferências atribuídas, mas uma eventual restrição de confidencialidade de dados publicados no HTML exige migração dos dados protegidos para uma API autenticada.


## Revisão operacional v5 — 16/11/2026, após teste móvel
### Câmera, rotação e recorte
- O carregamento da galeria deve apresentar a imagem inteira, sem preenchimento por corte e sem descartar margens por padrão.
- A área renderizada e o bitmap recortado usam a mesma geometria, inclusive em fotos verticais.
- A galeria oferece rotação de 90° nos dois sentidos e análise da foto completa. O recorte é opcional quando houver mais de uma etiqueta ou fundo em excesso.
- O reconhecimento tenta corrigir orientação e contraste em leituras difíceis; não pressupõe exatidão absoluta.

### Comparações específicas por tipo
- **Cumbuca/cinta:** verificar variedade, sigla, data impressa, rastreabilidade, peso/modelo quando disponível, EAN-13 do cliente, código decodificado das barras e 13 dígitos impressos abaixo. Essas duas leituras devem ser independentes; diferença comprovada reprova e falta de leitura mantém pendente.
- **Caixa:** não exigir EAN-13. Comparar produtor e comercializador separadamente; podem ser empresas distintas ou a mesma. Verificar nome, CNPJ se aplicável, GGN, GLN, endereço, CEP e coordenadas quando impressos e documentados. Um campo obrigatório ilegível impede aprovação.
- A confirmação do cliente vem depois da foto, usando a ordem de produção como referência independente.
- Não pedir o modelo novamente quando a leitura já sustenta sua identificação; em dúvida, solicitar confirmação sem presumir.
- Leitura inconclusiva não é aprovação, e referências fixas não podem ser substituídas para simular conformidade.

### Catálogo e rastreabilidade da fonte
- Preservados os 196 vínculos EAN/cliente do módulo anterior, com 163 códigos distintos e 17 identificações de clientes no catálogo de códigos. A transcrição foi espelhada numa tabela privada para conferência adicional no servidor.
- As filiais CIA PA SP, RJ, PE e CE aparecem separadas porque constam no manual, mas o EAN genérico não aprova automaticamente uma filial sem autorização própria.
- A base privada de entidades conserva os dados documentados. O manual DOC.CQ.056, p. 38, sustenta as coordenadas de Expofrut e Fazenda Novo Rumo.
- A importação do catálogo não equivale a auditoria documental de todos os códigos e imagens: divergências exigem consulta à página correspondente do manual.

### Histórico, exclusão e segurança
- Salvar somente após parecer digital favorável e confirmação humana. O servidor confere rastreabilidade, existência das referências e, na cumbuca, a igualdade entre EAN das barras, número impresso e catálogo autorizado.
- Novas verificações pertencem ao fluxo v5; registros anteriores não foram alterados e não devem ser confundidos com verificações v5.
- Só a conta mestre pode ocultar, restaurar ou excluir definitivamente um registro. Excluir exige digitação literal da palavra EXCLUIR e elimina a foto e eventuais padrões aprendidos somente daquele registro; o evento de auditoria permanece.
- Nenhum registro histórico foi excluído como parte desta atualização.


## Revisão de confiabilidade da leitura — 16/11/2026, fluxo v6
- Corrigir a espera interminável do OCR: carregar o leitor de texto com prazo, reaproveitar o worker, limitar os pixels processados e interromper a tentativa após um tempo máximo. Exibir falha recuperável, sem aprovar e sem exigir nova digitação de informações impressas.
- Pré-carregar o motor de texto após abrir o módulo para reduzir o tempo de espera da primeira fotografia.
- Executar no máximo uma releitura complementar da imagem inteira; não rodar várias rotações automáticas pesadas, especialmente em celulares. A galeria mantém rotação manual e recorte opcional, e qualquer rotação invalida o diagnóstico anterior.
- Para cumbucas, tentar a leitura independente dos 13 dígitos impressos na região próxima ao código de barras reconhecido por leitor nativo ou ZXing. Se não for possível comprová-los, manter pendência; nunca copiar o número decodificado das barras para simular a leitura do texto.
- O código de rastreabilidade digitado pelo colaborador é uma referência independente. Se a câmera não conseguir ler o código impresso, o diagnóstico deve explicar claramente que o código digitado não comprova a coincidência.
- Eliminar campos de transcrição de rastreabilidade impressa, peso, EAN, data, lote, CNPJ, GGN e produtor. O sistema deve extrair esses dados da fotografia e compará-los com o banco. Deixar exposto apenas o cliente e a rastreabilidade da produção; exigir classificação da ordem somente em etiquetas de caixa.
- A classificação impressa na caixa deve coincidir com a classificação informada da ordem de produção. Essa condição é verificada tanto no frontend quanto pela Edge Function no momento do salvamento.
- Manter a visualização de texto bruto apenas para auditoria, sem permitir que uma correção manual simule reconhecimento automático.
- Antes de publicar, executar testes de unidade e integração simulada de cumbuca, caixa, rastreabilidade divergente, EAN divergente, GGN incorreto, classe divergente e falha por tempo esgotado. Teste móvel físico continua necessário para medir a confiabilidade real do OCR.


## Ajuste da conferência por tipo — 16/11/2026

- **Cumbuca:** não solicitar seleção de caixa nem identificação do tipo de caixa embalada. Na rastreabilidade de referência, o colaborador confirma ano, área, válvula, data e variedade. O método impresso na etiqueta segue o glossário documental (C, 5 ou 8), sem necessidade de entrada adicional para cumbuca. A verificação do servidor respeita essa distinção e não confunde campo dispensado com informação ausente.
- **Caixa:** manter a identificação da caixa/pesagem na conferência quando o código impresso a exigir. Ler automaticamente o modelo e suas siglas: MEI (mercado interno), EX (externo), V (verde), P (preta), PA (parda), 50 (5 kg), 80 (8 kg), variedade e embalagem (10, 20, 21). Não solicitar cor manualmente. Uma sigla reconhecida pelo glossário não comprova, sozinha, a cor física da caixa; comparar o que estiver disponível na foto e no padrão aprovado.
- **Produtor e comercializador são pessoas ou empresas distintas**, embora possam coincidir. Associar cada CNPJ, GGN, GLN, endereço, CEP e coordenada à seção correspondente da etiqueta.
- **Dados opcionais:** vários produtores não possuem GGN, GLN ou coordenadas, e alguns modelos não imprimem todos os dados. Não tratar a simples ausência como divergência. Se o campo estiver efetivamente impresso, cruzar o valor lido com o registro da entidade identificada; informar número, campo e referência quando houver conflito. Campo impresso mas ilegível permanece pendente. Não atribuir o GGN comercial ao produtor.
- **Identidade prevalece sobre identificador conflitante:** quando o nome reconhecido identifica inequivocamente um produtor/comerciante do cadastro, comparar o documento impresso com esse cadastro, em vez de aceitar outro titular apenas por coincidência do número.
- A validação do cadastro de caixa continua exigindo produtor e comercializador identificados. Dados opcionais ausentes não devem impedir a conferência; incompatibilidades comprovadas devem impedir aprovação.


## Simplificação orientada por evidências — 16/11/2026, revisão v9

- Exibir o EAN-13 uma única vez na visualização principal. Manter separadas, na conferência técnica, a leitura das barras e a leitura dos 13 números impressos. Quando houver conflito, apresentar os dois valores no diagnóstico; não considerar uma única leitura suficiente para aprovar.
- A classificação detectada na **fotografia** é independente da classificação **esperada pelo cadastro ou ordem de produção**. Nunca preencher o campo “classe impressa” com o valor do catálogo quando o texto da fotografia não tiver sido reconhecido.
- Dispensa de seleção manual de classe: permitida somente quando houver EAN válido, cliente confirmado e todas as referências aplicáveis daquele EAN/cliente indicarem exatamente a mesma classificação não vazia. O servidor revalida essa unicidade no catálogo. Sem referência exclusiva, solicitar a classificação da ordem; texto da etiqueta, sozinho, não é referência independente.
- Peso ou modalidade da caixa: dispensar o seletor somente quando o código de modelo reconhecido e a rastreabilidade impressa coincidirem quanto a 5 kg ou 8 kg. Divergência, contentor ou leitura incompleta não autorizam essa inferência. O servidor confere os dois códigos antes de salvar quando essa dispensa é utilizada.
- A identificação de sacola, cumbuca, cinta e outros modelos deve aproveitar o código e o glossário quando houver regra documentada, sem campos manuais repetidos. Modelos ainda desconhecidos **não podem ser aprovados** como se fossem de caixa ou de cumbuca.
- Etiquetas compactas, inclusive as de duas linhas, e formatos inéditos serão estudados com fotografias reais. Uma fotografia não autoriza concluir dimensões físicas, identidade de cliente ou classificação apenas pelo formato.
- A revisão v9 permite **registrar amostras pendentes** com fotografia, leitura disponível e perfil observacional de cores/layout, mesmo quando cliente, modelo ou variedade não puderem ser identificados. Essa ação exige clique explícito e **não aprova, não substitui análise e não cria padrões automáticos**. O histórico identifica essas amostras separadamente.
- Nas conferências aprovadas e nas amostras registradas, guardar os dados observados de proporção da foto, quantidade de linhas reconhecidas e distribuição aproximada de tons como evidência; nunca usar a cor dominante inferida do arquivo como prova de classificação, especialmente com fotos de iluminação, fundo e enquadramento diferentes.
- Somente referências documentadas e padrões aprovados podem ser utilizados para bloqueios e liberações. A equipe pode relacionar cores e modelos a classificações após confirmação recorrente e revisão humana, mantendo histórico e origem de cada evidência.
- A solicitação mínima que permanece obrigatória deve representar uma fonte **independente da própria etiqueta** quando necessária para encontrar erros: por exemplo, cliente da ordem de produção e rastreabilidade correta. Comparar duas cópias de dados da mesma fotografia não comprova a ordem.
- Não alterar nem excluir avaliações anteriores, fotos, códigos ou catálogos para acelerar a conferência. Toda alteração das regras deve permitir verificar os fundamentos de cada inferência.

**Validação em uso ainda necessária:** testar etiqueta pequena de duas linhas, caixa sem EAN, cumbucas de clientes diferentes que compartilham EAN, divergências de classe e de pesagem, fotos com cores distintas e falhas de OCR em celular. A revisão do código não substitui esses testes físicos.


### Interface v10 — referência de produção em um campo

- O caminho principal aceita colar/digitar **um código de rastreabilidade completo da ordem de produção**, reduzindo o formulário. As partes individuais permanecem acessíveis em uma seção recolhida, para casos sem código completo.
- A referência completa é obrigatoriamente **independente da fotografia**; o programa nunca a preenche com a rastreabilidade lida na etiqueta. Em cumbucas, o método C/5/8 é desconsiderado apenas na comparação em que o manual dispensa informar esse método; nos demais modelos, é verificado integralmente.
- Código informado com formato inválido não habilita aprovação, mesmo que os demais campos antigos estejam preenchidos. A edição de uma das partes limpa o código completo anterior para impedir duas referências contraditórias.
- Na interface, uma mesma sequência EAN aparece uma única vez. A checagem técnica e o histórico preservam a distinção entre barras lidas e dígitos impressos. Sem ambas as leituras, a aprovação da cumbuca permanece pendente.
- Há uma ação explícita para guardar fotografias de modelos desconhecidos ou de leitura falha como **amostras pendentes**. Amostras não entram no catálogo aprovado; exigem estudo e validação humana antes de virar regra.
- Em cumbucas, se a fotografia contiver classificação reconhecível e o EAN/cliente tiver classe única documentada, comparar as duas e reprovar divergência. A classe da foto deve ser registrada com sua origem, e não inventada a partir do cadastro.
- A comparação de coordenadas geográficas deve conferir graus, minutos, segundos **e hemisférios** (N/S, E/W/O); números iguais com direções opostas não são iguais. Formato parcialmente ilegível permanece pendente, sem aprovação por comparação apenas dos dígitos.


## Leitura detalhada de etiquetas — revisão de 16/11/2026, OCR v14
- A leitura principal usa a fotografia completa com resolução ampliada. Quando identifica dados institucionais ou não localiza rastreabilidade, examina faixas superior e inferior parcialmente sobrepostas, uma delas com contraste adaptado; há releitura de contraste para rastreabilidade não reconhecida.
- A quantidade de passagens é limitada por tempo e recursos do celular. Repetições ilimitadas não melhoram necessariamente a precisão; em caso de falha, preservar a foto e permitir reexame aprofundado por decisão do usuário.
- Preservar separadamente os resultados das passagens durante a análise, reaproveitar campos identificados em faixas ampliadas e usar a seção individual mais completa para comparar informações do produtor e comercializador. Não copiar números faltantes do banco para fingir que foram lidos da etiqueta.
- Identificar discordâncias entre passagens de OCR em rastreabilidade, CNPJ, GGN, GLN, data e classificação. Leituras conflitantes geram alerta **pendente**, não aprovação ou reprovação automática com base em caracteres incertos.
- Exibir previamente divergências institucionais relevantes que já foram encontradas na leitura, sem substituir a decisão final baseada na ordem de produção e nas referências disponíveis.
- Comparar CNPJ, GGN, GLN, endereço, CEP e coordenadas somente quando a fotografia e a referência cadastrada oferecem evidência suficiente; campos opcionais não impressos não são automaticamente erro. "Não localizado pelo OCR" não equivale a "ausente na etiqueta".
- A rastreabilidade da ordem de produção é fonte **independente** da foto. Diferença comprovada reprova; dúvida de OCR permanece pendente.
- O histórico guarda o número de passagens e os campos com leituras conflitantes. Fotografias e registros anteriores permanecem preservados.
- O teste automatizado scripts/testar-ocr-etiquetas.mjs protege extração de rastreabilidade, documentos e bloqueios de aprovação, mas não mede a qualidade com fotos reais. A leitura em celulares, etiquetas pequenas, cores diferentes e impressões pouco legíveis continua pendente de ensaios físicos.


## Redesenho operacional da conferência — 16/11/2026, versão v16

### Problemas que motivaram a revisão
- O campo de digitar a rastreabilidade completa foi rejeitado no uso. Restaurar o formulário estruturado com ano, área, válvula, dia, mês, modalidade quando aplicável e variedade visíveis.
- As leituras em faixas adicionais estavam sendo disparadas mesmo quando a fotografia já oferecia identificadores suficientes, causando espera desnecessária em conferências repetidas.
- O resumo inicial priorizava o CNPJ de origem, deixando em segundo plano o parecer completo e as eventuais divergências da comercialização, dos endereços e de outros campos.
- Variedades impressas podiam não ser reconhecidas como nome ou sigla; deve-se procurar evidência na fotografia, no código de modelo e no EAN autorizado, mantendo a distinção entre reconhecimento fotográfico e dado cadastrado.

### Comportamento atual
- Mostrar primeiro uma **conclusão única**, com quantidade de divergências e pendências, e os campos divergentes em leitura rápida. O detalhamento completo permanece disponível.
- Conferir produtor e comercializador separadamente, incluindo documentos, endereço, CEP e localização geográfica quando houver esses dados e referências documentais. Nunca concluir que campo não existe apenas porque o OCR não o reconheceu.
- Para a variedade, consultar nome impresso, código final de rastreabilidade, sigla do modelo de embalagem e catálogo de EAN. Quando fontes independentes forem incompatíveis, bloquear aprovação e apresentar divergência, sem escolher uma fonte arbitrariamente.
- **Leitura rápida:** uma passagem integral com dimensão limitada; só executar automaticamente uma passagem adicional em região ampliada quando faltar informação importante. OCR profundo, com mais regiões, é opcional e reaproveita resultados já encontrados.
- Mantém-se o motor OCR local por Tesseract.js; não foi acrescentado serviço externo, licença paga ou transferência não prevista de fotografias. A primeira carga de linguagem ainda pode ser mais lenta que as leituras seguintes.
- Pequenas fotografias podem ser ampliadas moderadamente antes do reconhecimento. A qualidade real continua dependente do foco, da iluminação e da quantidade de pixels nos caracteres.
- O código do modelo pode identificar caixa/sacola, e o EAN com texto e ausência de indicadores de caixa pode sugerir cumbuca estreita; sugestões baseadas apenas em forma permanecem sujeitas a confirmação.
- Comparar todos os componentes documentados do endereço para classificá-lo como integralmente conferido. Leitura parcial ou ambígua não equivale a aprovação.
- Proteger registros históricos, fotos e padrões. Registros legados sem a verificação da versão atual não devem ser apresentados como aprovações recentes.

### Referências de desenho consultadas
- Scandit Smart Label Capture / MatrixScan Batch: captura em alto volume e feedback visual de ocorrências (https://docs.scandit.com/sdks/web/batch-scanning/).
- Google ML Kit Text Recognition: exigência de pixels por caractere e dimensionamento adequado para OCR móvel (https://developers.google.com/ml-kit/vision/text-recognition/v2/android).
- Amazon Textract e Google Document AI: separação entre reconhecimento, vínculo do campo e valor, nível de confiança e revisão de exceções; **não foram integrados ao VITRA** (https://aws.amazon.com/textract/features/ e https://docs.cloud.google.com/document-ai/docs/custom-extractor-overview).

### Verificação e limites
- A integridade das avaliações históricas é checada pelo fluxo automático no GitHub.
- Testes não fotográficos exercitam identificação de variedade, reconhecimento de modelos, formulário e uma passagem OCR quando a leitura simulada está completa, com segunda passagem seletiva quando não está.
- **Não declarar taxa de acerto nem tempo real por etiqueta sem ensaio com fotos e celulares da operação.** O resultado verdadeiro só pode ser confirmado com exemplos reais de todas as famílias e tamanhos de etiqueta. Em caso de dúvida, apresentar pendência e preservar a foto.


## Auditoria crítica de rótulos em par — 20/11/2026

### Fonte e limite da revisão

Esta revisão utiliza a foto real enviada no chat (etiqueta branca da caixa e etiqueta laranja da cumbuca), os códigos e modelos **já documentados** nas diretrizes do DOC.CQ.056 e as referências privadas atualmente disponíveis no VITRA. O PDF integral do manual está armazenado de forma privada, com acesso restrito ao administrador; **não presumir que cada página/modelo foi reinspecionado diretamente nesta revisão**. Uma foto pode não conter resolução suficiente para ler todos os caracteres, mesmo com realce.

### Leitura de duas etiquetas em uma única foto

- Não misturar as informações institucionais da etiqueta de caixa com o EAN da cumbuca. Em fotos horizontais, tentar duas regiões parcialmente sobrepostas; em fotos verticais, tentar regiões superior e inferior. Manter a fotografia original e disponibilizar recorte opcional em caso de ambiguidade.
- Comparar separadamente os dois códigos de rastreabilidade. Conferir ano, área/válvula, data codificada e sigla de variedade em ambos. A modalidade `C`, `5` ou `8` pode indicar embalagens diferentes, portanto exige regra específica antes de sinalizar divergência por esse elemento isolado.
- Conferir variedade por texto, código do modelo, sigla da rastreabilidade e, quando houver, catálogo EAN. Duas etiquetas da mesma embalagem física podem possuir textos distintos; a semelhança de cor ou proximidade na imagem **não comprova** que pertencem ao mesmo lote.
- EAN e QR Code devem ser decodificados diretamente da imagem. Para EAN-13, confirmar o dígito verificador e diferenciar as barras decodificadas dos 13 números impressos abaixo. Não copiar uma leitura para fingir que a outra foi comprovada. QR ou Data Matrix podem conter dados diferentes de EAN; sem esquema/documentação, exibir o conteúdo como pendente, nunca inventar significado.
- Em etiquetas de caixa, confrontar classe, peso, código de mercado, cor, variedade e modalidade, produtor e comercializador como entidades distintas. Conferir CNPJ, GGN, GLN, CEP, endereço completo e coordenadas quando impressos e houver referência independente. IE, e-mail e site **só podem aparecer em verde** se estiverem na base de referência aprovada; na falta dela, exibir a leitura e sinalizar pendência.
- Em etiquetas arredondadas ou selos/bolinhas da ARRA, modelos novos e formatos desconhecidos, não homologar automaticamente com regras de caixa ou cumbuca. Exigir evidências reais e revisão humana para criar um padrão.

### Referências documentadas do exemplo fornecido

- `MEI-PA50VI20`: `MEI` = mercado interno; `PA` = caixa parda; `50` = caixa de 5 kg; `VI` = variedade Vitória; `20` = modalidade de cumbuca 500 g, conforme glossário já documentado.
- Classe de caixa impressa: **Extra**; variedade: **BRS Vitória**; peso impresso: **5,00 kg**. Classe Extra é distinta de Extra A; não normalizar uma na outra.
- Etiqueta da caixa: comercializadora Expofrut Brasil Importadora e Exportadora LTDA, CNPJ registrado `04420687000256`; produtora Fazenda Novo Rumo Agricola LTDA, CNPJ registrado `03438392000163`. Estas referências existem na base privada, com endereço e coordenadas documentados no DOC.CQ.056, p. 38. Para a Fazenda Novo Rumo, GGN cadastrado `4069453004221`. Esses identificadores precisam ser **lidos na foto** e comparados à base; valores da base não podem substituir OCR ausente.
- Etiqueta laranja: EAN `7898366001754`, variedade Vitória e data de embalagem impressa `19/11/2026` (conforme foto). No catálogo DOC.CQ.056, o EAN se associa a **Doce Mel e Trielo**. O EAN isolado **não distingue os dois clientes**; a ordem de produção deve confirmar o cliente.
- A foto apresenta dois códigos de rastreabilidade visualmente diferentes, portanto não se deve aprovar automaticamente a associação como "mesmo embalamento" sem leitura confiável de ambos, comparação com a ordem e conferência física.

### Cobertura real da base de referência (auditoria de 20/11/2026)

A consulta direta ao banco VITRA identificou **196 vínculos EAN/cliente**, correspondentes a **163 EANs diferentes** e **17 clientes**; **18 EANs** aparecem vinculados a mais de um cliente. Esses casos exigem evidência adicional da marca/ordem para não inferir um cliente pelo EAN compartilhado.

A tabela institucional contém **49 entidades**, com endereço cadastrado para todas. Porém **37** não possuem CNPJ cadastrado, **24** não possuem GGN, **47** não possuem coordenadas e **49** não possuem GLN. IE, e-mail e site também não integram os campos homologados dessa tabela. **Uma fotografia mais nítida não corrige a ausência da referência:** quando a etiqueta mostrar algum desses dados e a base não permitir a conferência, o VITRA deve exibir o valor lido e manter o item pendente, nunca verde.

Os totais descrevem o cadastro existente nessa consulta, não significam defeito nas etiquetas e podem mudar com inclusão futura de referências oficiais. Não preencher os campos ausentes por pesquisa genérica na internet nem por aproximação; cada correção exige manual, documento oficial ou autorização específica.

### Estados e encerramento

- **Verde:** valor realmente extraído da fotografia e comparado, com sucesso, à referência aprovada e identificada; ou correspondência entre dois valores lidos independentemente quando isso bastar para a verificação específica.
- **Vermelho:** divergência comprovada entre valores lidos com segurança, ou código incompatível com o cadastro aprovado. Exibir o valor observado, o esperado e a origem.
- **Pendente:** baixa nitidez, caracteres ambíguos, QR sem esquema, ausência de referência confiável, campo não extraído ou modelo não reconhecido. Não trocar pendência por aprovação.
- Não prometer 100% de precisão com qualquer câmera e qualquer fotografia; os ensaios com aparelhos móveis, etiquetas pequenas, reflexo e impressão desgastada continuam indispensáveis.
- O histórico e os registros de campo, estoque, recepção e titulação permanecem intocados pela revisão do módulo de etiquetas.

## EAN compartilhado e datas reais de colheita — regra confirmada em 20/11/2026

- Um EAN-13 pode ter **vários clientes autorizados**: o compartilhamento não é erro. Exemplo documentado no DOC.CQ.056: `7898366001754` para Doce Mel e Trielo. Exibir todos os clientes vinculados, preservar os dois no cadastro e comparar o destinatário **independentemente** informado pela ordem de produção.
- Usar marca impressa, modelo e demais evidências fotográficas para distinguir clientes quando existirem; uma marca comprovadamente diferente do cliente da ordem é erro, mas o compartilhamento do EAN não é. Se a marca não estiver legível ou não constar na etiqueta, não inventar identificação a partir do número.
- Em Áreas finalizadas, exibir previsão original e data **documentada** de conclusão, sem confundí-la com a data em que o operador informou o status. Se o dia não foi comprovado, marcar **Data não informada**. Encerramento sem colheita integral deve ser identificado separadamente, com sua data confirmada.

- Distinção documental adicional: quando a fonte informa apenas que a **área** foi finalizada, a data é apresentada como **finalização registrada da área**, nunca como conclusão comprovada da colheita. Exemplo: 108B em 06/10/2026. Essa data não serve para calcular atraso de conclusão da colheita sem confirmação específica.
