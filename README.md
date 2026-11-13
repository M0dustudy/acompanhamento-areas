# VITRA — Inteligência e Rastreabilidade da Uva

Dashboard de acompanhamento das áreas de uva e controle de qualidade.

## Regras permanentes — atraso da colheita e interface limpa

- **A data original de colheita é imutável**: identificar a previsão nos relatórios oficiais iniciais da área (avaliações de 21, 14 e 07 dias) e registrar sua origem. Uma avaliação adicional realizada depois da data prevista não pode substituir essa referência, mesmo que o PDF informe uma data nova ou provisória.
- **Conferir atrasos em todos os estados a cada atualização**: para cada área, verificar a previsão original, a data atual e a situação. Se a previsão passou e a colheita não foi finalizada, mostrar o aviso em Acompanhamento, Em colheita ou Pausadas, conforme o status atual. Aplica-se também às áreas futuras. Para Finalizadas, exibir atraso histórico apenas quando a data efetiva da finalização estiver documentada e for posterior à previsão; nunca continuar contando atraso até hoje depois da finalização.
- **Não presumir datas**: se a previsão original não estiver comprovada, deixar a pendência identificada para conferência, sem inventar a data nem marcar um atraso fictício. Registros temporários ou calendários de poda não substituem o relatório oficial da previsão.
- **O aviso de atraso deve ser discreto**: mostrar a informação em um único local próximo à identificação e à previsão da área, sem multiplicar banners, cards, badges ou mensagens repetidas. Preservar as cores dos indicadores de Brix e manter leitura confortável em celular.
- **Preservar sempre os dados**: nenhuma correção de previsão ou interface pode alterar medições, percentuais, datas originais dos relatórios, PDFs, recepções, históricos ou estados de colheita. Informar nome exato e número do documento quando encontrar inconsistências.
- **Revisar antes de publicar**: comparar com o GitHub atual, conferir contagens e duplicidades, testar a lógica de datas e a visualização quando possível; confirmar a publicação somente depois de verificar o commit.

## Regras permanentes — interpretação contextual de relatórios e apresentação

- **Ler todo o documento antes de cadastrar:** comparar respostas de campos, observações livres, pré-limpeza, danos maiores e menores, resultados, tabelas e fotografias quando disponíveis. Um problema pode estar descrito em outro campo do mesmo relatório; consolidar o conteúdo comprovado sem depender exclusivamente da aba em que foi digitado.
- **Não transformar falhas comuns de preenchimento em alarmes no painel:** não mostrar textos como “inconsistência no PDF”, “formato antigo” ou “confirmar classificação da linha” quando a informação pode ser interpretada com segurança pelo contexto. Exibir diretamente os achados relevantes, com linguagem natural e sem inventar intensidades.
- **Resumos de campo com linguagem natural e objetiva:** descrever diretamente o que foi observado na área. Evitar construções como “o PDF informa”, “o relatório ressalta”, “o documento identifica” e comentários de bastidor sobre o cadastro, a digitação ou a origem da informação. Corrigir ortografia, concordância e pontuação dos resumos; preservar os nomes dos danos e as intensidades expressamente registrados, sem criar termos técnicos, diagnósticos ou informações novas.
- **Danos organizados sem excesso visual:** reunir em frases curtas os danos em grande quantidade, quantidade moderada e pequena quantidade, nessa ordem, quando a fonte informar essas intensidades. Não misturar intensidades, não inventar classificações e não criar vários cartões para dizer a mesma coisa. Observações complementares necessárias podem ficar em uma frase breve.
- **Pré-limpeza no final do resumo:** quando constar indicação explícita, destacar ao final “Pré-limpeza: Necessária”; quando a dispensa estiver expressa, destacar “Pré-limpeza: Dispensada”. Se não houver informação conclusiva, não inferir dispensa nem necessidade, e não criar aviso baseado apenas na presença de danos. O destaque deve ser discreto, distinto do texto e não duplicar a orientação.
- **Não corrigir silenciosamente medições nem documentos originais:** manter intactos valores, respostas, datas, classificação comercial, PDFs e histórico. Se houver divergência material que não possa ser resolvida pelo próprio documento (por exemplo, lote, Brix ou resultado final incompatíveis), fazer conferência técnica antes de registrar qualquer interpretação e preservar a informação da fonte.
- **Conferir a estrutura das tabelas:** uma categoria de fruta não pode ser preenchida com valor numérico de Brix. Revisar colunas, sequência dos grupos, médias, tipo de fruta e fotografias; normalizar o rótulo apenas quando o conjunto de dados sustentar a interpretação, sem alterar as medições originais.
- **Reconhecer nomes equivalentes:** ARD 36 é a variedade comercialmente conhecida como ARRA Cherry Crush (Arra Cherry). Não criar alerta de divergência quando um relatório usar o código varietal e o cadastro usar o nome comercial. Preservar a nomenclatura original na origem.
- **Atraso de colheita visível e único:** quando houver atraso confirmado, exibir um aviso compacto e legível no topo do cartão, antes de Campo, Titulação e Recepção, independentemente de a área estar em Acompanhamento, Em colheita ou Pausadas. Nas Finalizadas, quando houver confirmação documental da data de encerramento, distinguir o atraso histórico do atraso em andamento. Não repetir a previsão ou o alerta em outro ponto do cartão.
- **Titulação com um padrão único:** manter um único bloco expansível “Medições individuais por rua” vinculado à Titulação, após as colunas de Campo, Titulação e Recepção, ocupando toda a largura do cartão. Apresentar duas tabelas lado a lado quando houver espaço, uma por coloração; em telas pequenas, empilhá-las. Centralizar os títulos Rua / ponto, Fruta, Brix, Acidez e Ratio e os respectivos resultados. **As medições individuais devem ter seleção de data própria, sincronizada com os botões de data da Titulação**, sem perder a data selecionada ou o estado de expansão ao trocar de relatório. Exibir as datas históricas existentes e, quando uma data tiver apenas resultados gerais, informar a ausência de leituras por rua sem inventar ou reutilizar dados. Não criar botões duplicados com a mesma finalidade, grupos artificiais ou modelos diferentes por área.
- **Verificação da publicação:** checar integridade dos registros, ausência de duplicações, sintaxe do JavaScript e visualização em desktop/celular quando possível. Um commit confirmado não comprova, sozinho, a atualização imediata do GitHub Pages.

## Padrões de reavaliação pré-colheita e apresentação do estoque

- Após as avaliações oficiais de 21, 14 e 07 dias, registrar novas visitas como **Reavaliação · DD/MM/AAAA**, preservando todas as avaliações anteriores e diferenciando visitas da mesma data pelo número do relatório.
- A data de avaliação posterior nunca altera `originalHarvestDate`, estabelecida pelos documentos oficiais do ciclo inicial. Um campo de data posterior usado apenas como referência não reinicia a contagem de atraso.
- No painel, apresentar o atraso discretamente ao lado da previsão original e com no máximo um ponto de identificação no seletor da área; não usar grandes faixas, alertas repetitivos ou alterações nas cores de Brix.
- Para áreas sem previsão original confirmada, apresentar **Previsão original: a confirmar**, sem inferir atraso por datas de poda, cronogramas provisórios ou títulos antigos.
- PDFs genéricos de campo devem ser identificados por área, data e número do relatório, receber nome técnico único (exemplo: `ACOMPANHAMENTO_DE_AREA_PRE_-_COLHEITA-93302668-pt_BR.pdf`) e ser renomeados sem duplicar seu conteúdo binário; conferir os vínculos da avaliação e do visualizador.
- No Estoque, deixar **Produção própria**, **Produtores externos** e **Mistos** em filtros exclusivos da mesma tela, sem duplicar os registros, preservando a identificação verdadeira das avaliações.

## Separação obrigatória: nome do arquivo × apresentação no VITRA

O nome padronizado `ESTOQUE_AAAA-MM-DD_DOC_..._LOTE_....pdf` é um **identificador técnico exclusivo para armazenamento no GitHub e para os links do PDF original**. Ele **não é o título, nome ou classificação da avaliação no VITRA**.

- **Na interface do VITRA**, manter a nomenclatura e a apresentação já estabelecidas: **produtor ou área, variedade, data da avaliação, lote e resultado**. As demais informações continuam organizadas nos detalhes conforme o documento.
- **No GitHub**, o campo do caminho/nome do arquivo poderá mudar exclusivamente para impedir colisões, sempre com o vínculo correto entre avaliação e PDF.
- Renomear um arquivo não deve modificar produtor/área, variedade, lote, mercado, classificação, status, medições, título de card nem qualquer outro dado original da avaliação.
- Nunca exibir o nome técnico do PDF como título do card nem incluir sequências como `DOC_92956762` ou `ESTOQUE_2026...` na nomenclatura visível do estoque.
- Havendo renomeação segura de um PDF hospedado, atualizar **somente suas referências técnicas de arquivo e os links** associados, preservando todo o histórico e verificando a visualização e o download.

## Regra obrigatória: identificação de PDFs de estoque

O conteúdo da avaliação, e não apenas o nome do arquivo, determina se um relatório é novo ou duplicado.

- **Nome automático do Clicq** (por exemplo, `AVALIACAO_DE_ESTOQUE_EM_CAMARA_FRIA_-_FOR.CQ.-1792596800968-pt_BR.pdf`): preservar o nome original.
- **Nome genérico ou repetido** (por exemplo, `aplicação145879.pdf`, `FOR.CQ.068 - 1.pdf` ou similares): **conferir o conteúdo do PDF e sua identificação antes de cadastrá-lo ou disponibilizar um link no VITRA**, mesmo quando o arquivo já estiver hospedado no GitHub e informar o nome exclusivo recomendado no padrão `ESTOQUE_AAAA-MM-DD_DOC_NUMERODORELATORIO_LOTE_NUMERODOLOTE.pdf`, com base na data da avaliação, no identificador do relatório e no(s) lote(s) registrados no próprio documento. Exemplo real: `ESTOQUE_2026-10-22_DOC_92956762_LOTE_28189.pdf`. Para vários lotes declarados, incluir os números identificáveis em um nome seguro, preservando a relação de cada lote no cadastro. **Nunca usar a data de envio no lugar da avaliação.**
- `FOR.CQ.068` identifica o **modelo do formulário**, não um relatório específico. Os sufixos `.1`, `.2` em nomes manuais não comprovam que os documentos são diferentes.
- **Conferência obrigatória antes do vínculo:** verificar se o nome padronizado já existe no GitHub, se o número de relatório já consta no estoque e se o conteúdo corresponde a uma avaliação existente. Com acesso de escrita autorizado, renomear o arquivo diretamente no GitHub e atualizar os vínculos, sem exigir procedimento técnico do usuário. Nomes automáticos exclusivos do Clicq permanecem inalterados.
- **Nunca sobrescrever:** quando o nome já existir ou houver dúvida sobre lote/identificador, interromper o procedimento, revisar e propor outro nome seguro. Arquivo repetido não gera avaliação nova. Não remover, sobrescrever ou renomear documentos já publicados para abrir espaço para outro.
- **Dados insuficientes:** se o número de relatório ou lote estiver ausente/ilegível, avisar antes do envio e usar uma identificação exclusiva somente após comprovar a identidade e ausência de colisão. Não inventar dados para compor nomes.
- **Autorização permanente de 13/11/2026:** padronizar os PDFs de estoque com nomes genéricos já existentes e os futuros antes de ativar qualquer link no VITRA. Manter os bytes originais dos PDFs, criar backup e atualizar conjuntamente `stockData`, `stockVerifiedFiles`, `visualizador.html` e o caminho no GitHub. A renomeação não altera identificadores internos, dados, resultados nem histórico.
- Antes de cadastrar, conferir data e horário da avaliação, produtor/área, variedade, lote, mercado, classificação, pallets e identificação do relatório. Usar o hash SHA-256 para identificar arquivos binariamente idênticos quando possível; hashes diferentes não provam que sejam avaliações diferentes.
- Se o conteúdo for igual a uma avaliação já cadastrada, **não criar registro duplicado**, mesmo que o nome do arquivo seja diferente. Se houver dúvida sobre a identidade, suspender o cadastro e solicitar confirmação.
- Preservar os dados originais, as observações, o PDF e todo o histórico. Não inventar campos ausentes e não sobrescrever documentos.
- Para cada novo cadastro, verificar o pareamento relatório ↔ PDF, a existência do arquivo no GitHub, a sintaxe do JavaScript e a renderização do painel antes de considerar a publicação validada. Caso o teste de navegador não seja possível, declarar essa limitação.
- Os relatórios devem aparecer da data de avaliação mais recente para a mais antiga, independentemente da data de envio.

### Procedimento de entrada

**Novo procedimento obrigatório para documentos com nomes genéricos:** analisar a data da avaliação, o número do relatório, o produtor/área e os lotes; consultar o GitHub e o estoque para evitar colisão ou duplicidade; definir o nome técnico `ESTOQUE_AAAA-MM-DD_DOC_NUMERO_LOTE_NUMERO.pdf` (ou `LOTES_NUMERO-NUMERO`). Se o arquivo já estiver no GitHub, renomeá-lo diretamente quando houver permissão, preservar sua identidade binária e conferir os vínculos atualizados. **Nunca publicar ou habilitar visualização/download de PDF genérico antes de renomeá-lo e confirmar a existência do nome final no GitHub.** Relatórios com nomes automáticos exclusivos permanecem com seu nome original. Arquivos sem data, número de documento ou lote verificáveis ficam sem vínculo até a identificação; não presumir metadados. A inclusão de um PDF no GitHub, por si só, não efetua o cadastro.


### Arquivos arquivados sem cadastro

- Arquivos antigos depositados em `relatorios/arquivados_sem_cadastro/` não representam avaliações cadastradas. Quando não for possível confirmar data, documento e lote, usar apenas o nome técnico `ARQUIVADO_SEM_CADASTRO_ID_<identificador-original>.pdf` nessa pasta; **esse nome não é um laudo padronizado nem autoriza link no VITRA**.
- Antes de migrar qualquer arquivado para `relatorios/estoque/`, ler o documento original, confirmar seus metadados e ausência de duplicidade, atribuir o nome completo no padrão `ESTOQUE_...`, cadastrar as caixas e medições e validar a relação 1:1.
- O validador `scripts/validar-vitra.mjs` deve reprovar arquivos de estoque com nomes genéricos, nomes padronizados incompatíveis com os metadados, PDFs hospedados sem cadastro, cadastro com arquivo ausente (salvo pendência explícita sem link) e visualizador desatualizado. Esta proteção se aplica também aos próximos uploads.

### Regra crítica de disponibilidade

Não publicar alterações no `index.html` sem validar a sintaxe de todo o JavaScript e a integridade dos registros. Manter backup recuperável antes de alterações de maior risco. Tela vazia ou falha de inicialização é defeito crítico: interromper a publicação e restaurar a última versão funcional quando necessário.
