# VITRA — Inteligência e Rastreabilidade da Uva

Dashboard de acompanhamento das áreas de uva e controle de qualidade.

## Regra obrigatória: identificação de PDFs de estoque

O conteúdo da avaliação, e não apenas o nome do arquivo, determina se um relatório é novo ou duplicado.

- **Nome automático do Clicq** (por exemplo, `AVALIACAO_DE_ESTOQUE_EM_CAMARA_FRIA_-_FOR.CQ.-1792596800968-pt_BR.pdf`): preservar o nome original.
- **Nome genérico** (por exemplo, `aplicação145879.pdf`, ou um nome manual com `FOR.CQ.068 - 1`): após ler o PDF e identificar a data **da avaliação**, usar `ESTOQUE_AAAA-MM-DD_FOR-CQ068_NNN.pdf`, onde `NNN` é um sequencial **livre para aquela data e formulário**, conferido no repositório antes de gravar.
- `FOR.CQ.068` identifica o **modelo do formulário**, não um relatório específico. Os sufixos `.1`, `.2` em nomes manuais não comprovam que os documentos são diferentes.
- **Nunca renomear automaticamente PDFs antigos**. Renomeações de documentos publicados exigem atualizar e verificar todos os vínculos de visualização e download.
- Antes de cadastrar, conferir data e horário da avaliação, produtor/área, variedade, lote, mercado, classificação, pallets e identificação do relatório. Usar o hash SHA-256 para identificar arquivos binariamente idênticos quando possível; hashes diferentes não provam que sejam avaliações diferentes.
- Se o conteúdo for igual a uma avaliação já cadastrada, **não criar registro duplicado**, mesmo que o nome do arquivo seja diferente. Se houver dúvida sobre a identidade, suspender o cadastro e solicitar confirmação.
- Preservar os dados originais, as observações, o PDF e todo o histórico. Não inventar campos ausentes e não sobrescrever documentos.
- Para cada novo cadastro, verificar o pareamento relatório ↔ PDF, a existência do arquivo no GitHub, a sintaxe do JavaScript e a renderização do painel antes de considerar a publicação validada. Caso o teste de navegador não seja possível, declarar essa limitação.
- Os relatórios devem aparecer da data de avaliação mais recente para a mais antiga, independentemente da data de envio.

### Procedimento de entrada

Relatórios enviados no chat ou adicionados manualmente ao GitHub podem chegar com qualquer nome. A padronização e o cadastro são realizados **quando uma atualização do VITRA for solicitada**, após consultar a versão atual do repositório. A simples inclusão de um PDF no GitHub não dispara cadastro automático.

### Regra crítica de disponibilidade

Não publicar alterações no `index.html` sem validar a sintaxe de todo o JavaScript e a integridade dos registros. Manter backup recuperável antes de alterações de maior risco. Tela vazia ou falha de inicialização é defeito crítico: interromper a publicação e restaurar a última versão funcional quando necessário.
