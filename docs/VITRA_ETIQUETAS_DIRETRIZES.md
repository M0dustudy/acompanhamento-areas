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
