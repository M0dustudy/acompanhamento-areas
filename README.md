# VITRA — Inteligência e Rastreabilidade da Uva

Dashboard de acompanhamento das áreas de uva e controle de qualidade.

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
- **Nome genérico ou repetido** (por exemplo, `aplicação145879.pdf`, `FOR.CQ.068 - 1.pdf` ou similares): **obrigatoriamente conferir o PDF no chat ANTES de o usuário enviá-lo ao GitHub** e informar o nome exclusivo recomendado no padrão `ESTOQUE_AAAA-MM-DD_DOC_NUMERODORELATORIO_LOTE_NUMERODOLOTE.pdf`, com base na data da avaliação, no identificador do relatório e no(s) lote(s) registrados no próprio documento. Exemplo real: `ESTOQUE_2026-10-22_DOC_92956762_LOTE_28189.pdf`. Para vários lotes declarados, incluir os números identificáveis em um nome seguro, preservando a relação de cada lote no cadastro. **Nunca usar a data de envio no lugar da avaliação.**
- `FOR.CQ.068` identifica o **modelo do formulário**, não um relatório específico. Os sufixos `.1`, `.2` em nomes manuais não comprovam que os documentos são diferentes.
- **Conferência obrigatória antes do envio:** verificar se o nome sugerido já existe no GitHub, se o número de relatório já consta no estoque e se o conteúdo equivale a uma avaliação existente. Informar imediatamente ao usuário o **nome exato para renomear** e o motivo, sem exigir renomeação dos arquivos com nomes automáticos exclusivos do Clicq.
- **Nunca sobrescrever:** quando o nome já existir ou houver dúvida sobre lote/identificador, interromper o procedimento, revisar e propor outro nome seguro. Arquivo repetido não gera avaliação nova. Não remover, sobrescrever ou renomear documentos já publicados para abrir espaço para outro.
- **Dados insuficientes:** se o número de relatório ou lote estiver ausente/ilegível, avisar antes do envio e usar uma identificação exclusiva somente após comprovar a identidade e ausência de colisão. Não inventar dados para compor nomes.
- **Nunca renomear automaticamente PDFs antigos**. Renomeações de documentos publicados exigem atualizar e verificar todos os vínculos de visualização e download.
- Antes de cadastrar, conferir data e horário da avaliação, produtor/área, variedade, lote, mercado, classificação, pallets e identificação do relatório. Usar o hash SHA-256 para identificar arquivos binariamente idênticos quando possível; hashes diferentes não provam que sejam avaliações diferentes.
- Se o conteúdo for igual a uma avaliação já cadastrada, **não criar registro duplicado**, mesmo que o nome do arquivo seja diferente. Se houver dúvida sobre a identidade, suspender o cadastro e solicitar confirmação.
- Preservar os dados originais, as observações, o PDF e todo o histórico. Não inventar campos ausentes e não sobrescrever documentos.
- Para cada novo cadastro, verificar o pareamento relatório ↔ PDF, a existência do arquivo no GitHub, a sintaxe do JavaScript e a renderização do painel antes de considerar a publicação validada. Caso o teste de navegador não seja possível, declarar essa limitação.
- Os relatórios devem aparecer da data de avaliação mais recente para a mais antiga, independentemente da data de envio.

### Procedimento de entrada

**Novo procedimento obrigatório para documentos com nomes genéricos:** assim que o usuário enviar um PDF no chat, analisar data da avaliação, relatório, produtor/área e lote(s); consultar o GitHub e o cadastro para evitar colisão e duplicidade; **informar o novo nome ao usuário antes de ele colocar o arquivo no GitHub**. Depois de o usuário confirmar o upload, conferir o nome e o conteúdo hospedados e cadastrar/vincular apenas avaliações novas. Relatórios com nomes automáticos e exclusivos podem manter o nome original. A simples inclusão de um PDF no GitHub não dispara cadastro automático.

### Regra crítica de disponibilidade

Não publicar alterações no `index.html` sem validar a sintaxe de todo o JavaScript e a integridade dos registros. Manter backup recuperável antes de alterações de maior risco. Tela vazia ou falha de inicialização é defeito crítico: interromper a publicação e restaurar a última versão funcional quando necessário.
