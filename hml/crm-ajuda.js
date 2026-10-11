// ─── Baby Gym Londrina — Manual e Novidades do CRM ───────────────────────────
// Carregado SÓ pelo crm.html (aba 📖 Ajuda). Conteúdo, não lógica: o desenho
// mora no `AjudaRenderer` do crm.html. Separado dele de propósito — o manual
// muda a cada entrega e não deve inchar a tela (mesma razão do crm-config.js).
//
// PADRÕES (sem reinventar):
//   • `novidades` segue o Keep a Changelog (keepachangelog.com/pt-BR): versões
//     da mais nova para a mais antiga, cada uma com data ISO e mudanças
//     agrupadas em Adicionado / Alterado / Corrigido / Removido.
//   • As versões são as de `BGL_CONST.APP_VERSION` (constants.js) — o mesmo
//     número que aparece no topo da tela.
//   • Cada seção do `manual` diz `desde` qual versão a funcionalidade existe,
//     como os "added in vX" das documentações de produto.
//
// REGRA DE ENTREGA (CLAUDE.md): versão nova com funcionalidade nova atualiza,
// NO MESMO COMMIT, (1) a seção do manual que mudou e (2) a primeira entrada de
// `novidades`. O teste `crm-ajuda.spec.js` reprova se o topo de `novidades`
// não for `APP_VERSION`/`APP_DATE`.
//
// O `html` das seções é conteúdo NOSSO, escrito aqui, nunca dado de lead ou da
// API — por isso entra na tela sem `esc()`. Não cole texto vindo de fora.
//
// Nunca commite sem rodar: npm run lint && npm test

const BGL_CRM_AJUDA = {
  manual: [
    {
      id: 'comecar',
      titulo: 'Primeiros passos',
      desde: '3.8',
      html: `
        <p>O CRM é a tela do dia a dia da equipe: mostra quem vem para a Primeira Experiência Baby Gym, deixa registrar o que aconteceu, mostra os leads a recuperar, busca qualquer família e prepara a proposta de planos.</p>
        <h4>Entrar</h4>
        <ol>
          <li>Abra o link do CRM e clique em <b>Entrar com Google</b>, com a sua conta autorizada.</li>
          <li>A sessão é a mesma do <b>proposta.html</b>: entrou em uma tela, já está na outra. Dura 24 horas.</li>
          <li>Se o Google abrir dentro de outro aplicativo (Instagram, WhatsApp), a tela avisa para abrir no navegador.</li>
          <li>Se o seu e-mail não tiver acesso, fale com o Michel: o e-mail precisa ser liberado no servidor, não só no login.</li>
        </ol>
        <h4>O topo da tela</h4>
        <p>Mostra o seu e-mail, o ambiente (produção ou homologação), a versão da tela, o botão <b>↻ Atualizar</b> e o botão <b>Sair</b>. O topo e as abas acompanham a rolagem.</p>
        <h4>As abas</h4>
        <div class="tabela-wrap"><table>
          <thead><tr><th>Aba</th><th>Para que usar</th></tr></thead>
          <tbody>
            <tr><td><b>📌 Painel do Dia</b></td><td>A agenda de hoje, dividida pelo horário. É onde você trabalha durante o dia.</td></tr>
            <tr><td><b>🗓️ Semana</b></td><td>Os 7 dias anteriores e os 7 seguintes, dia a dia.</td></tr>
            <tr><td><b>📅 Mês</b></td><td>O mês inteiro numa tabela só, com filtros.</td></tr>
            <tr><td><b>❄️ Frios</b></td><td>Leads a recuperar.</td></tr>
            <tr><td><b>🔎 Buscar</b></td><td>Procura qualquer família por nome ou telefone.</td></tr>
            <tr><td><b>📖 Ajuda</b></td><td>Este manual e as novidades de cada versão.</td></tr>
          </tbody>
        </table></div>
      `,
    },
    {
      id: 'planilha',
      titulo: 'O CRM e a planilha: use só o CRM',
      desde: '3.9',
      html: `
        <p>Tudo o que você faz no CRM é <b>sincronizado com a planilha "Dados de atendimento IA"</b>. Ao clicar em um botão de ação, o CRM grava no seu banco e, no mesmo instante, escreve a célula correspondente na planilha:</p>
        <div class="tabela-wrap"><table>
          <thead><tr><th>No CRM</th><th>Célula atualizada na planilha</th></tr></thead>
          <tbody>
            <tr><td>Marcar presença</td><td>DadosAgendamento, coluna V (Compareceu)</td></tr>
            <tr><td>Marcar fechou</td><td>DadosAgendamento, coluna X (Fechou)</td></tr>
            <tr><td>Cancelar</td><td>DadosAgendamento, coluna T (status de confirmação = cancelado)</td></tr>
            <tr><td>Travar ou destravar recuperação</td><td>LeadsFrios, coluna A (Travar)</td></tr>
            <tr><td>Anotações pós-PE</td><td>DadosAgendamento, colunas Y, Z e AA</td></tr>
            <tr><td>💰 Marcar PE paga</td><td>DadosAgendamento, colunas AB (pago), AN (valor), AO (seu e-mail) e AP (o motivo)</td></tr>
          </tbody>
        </table></div>
        <p>O caminho contrário também existe: o que muda na planilha chega ao CRM automaticamente, em até cerca de 30 minutos.</p>
        <p><b>Mas o ideal é operar somente pelo CRM.</b> A planilha continua sendo a base mestre e recebe os agendamentos novos do atendimento, porém:</p>
        <ul>
          <li><b>Clicou no CRM, não edita a célula. Editou a célula, não clica no CRM.</b> Fazer as duas coisas para a mesma ação duplica a escrita e suja a conferência que valida o sistema.</li>
          <li>O CRM junta o dia, a confirmação, o pagamento da PE, as anotações e as propostas num lugar só.</li>
          <li>Use a planilha só para o que o CRM ainda não faz (veja "O que o CRM ainda não faz").</li>
        </ul>
        <div class="aviso aviso-info"><b>Aviso "não atualizou a planilha":</b> às vezes o clique é salvo no CRM mas a planilha não recebe a célula (planilha fora do ar, linha que não existe mais). O clique não se perde. Confira a linha na planilha e atualize essa célula à mão. Se for frequente, avise o Michel.</div>
      `,
    },
    {
      id: 'painel',
      titulo: 'Painel do Dia',
      desde: '3.8',
      html: `
        <p>Segue o relógio do computador e muda sozinho, sem recarregar. A linha de status mostra a hora ("agora são 14:05").</p>
        <div class="tabela-wrap"><table>
          <thead><tr><th>Faixa</th><th>O que é</th></tr></thead>
          <tbody>
            <tr><td><b>Agora</b></td><td>O horário corrente, em destaque: quem deve chegar agora.</td></tr>
            <tr><td><b>Já passou</b></td><td>Horários anteriores, esmaecidos. É a sua lista de conferência. Aqui aparece também o botão 📄 Proposta.</td></tr>
            <tr><td><b>Ainda vem</b></td><td>Os próximos horários de hoje.</td></tr>
          </tbody>
        </table></div>
        <p>Às 13:59 o bloco das 14h está em "Ainda vem". Às 14:00 vira "Agora". Às 15:00 vai para "Já passou".</p>
        <p>Cada bloco mostra o horário, a turma (uma vez só) e quantos agendamentos tem. Cada linha mostra o bebê (👦 ou 👧 quando o sexo está cadastrado), a mãe, as etiquetas de confirmação e de pagamento da PE e os botões de ação.</p>
        <p>Embaixo das faixas fica <b>"Todos os agendamentos de hoje"</b>: a lista de conferência da manhã, com hora, bebê, mãe, turma, telefone, confirmação e pagamento da PE. Ali só existem Detalhe e Conversa (as ações ficam nas faixas, para não repetir o botão).</p>
        <p>Agendamento sem horário na planilha não entra em nenhuma faixa: aparece num aviso laranja e na lista completa. Se acontecer com frequência, a coluna de horário está ficando vazia na planilha.</p>
      `,
    },
    {
      id: 'etiquetas',
      titulo: 'Etiquetas das linhas',
      desde: '3.8',
      html: `
        <div class="tabela-wrap"><table>
          <thead><tr><th>Etiqueta</th><th>Significado</th></tr></thead>
          <tbody>
            <tr><td>Confirmado (verde)</td><td>A família confirmou presença.</td></tr>
            <tr><td>Pendente, A confirmar (laranja)</td><td>Ainda não confirmou.</td></tr>
            <tr><td>Aguardando pagamento (laranja)</td><td>Confirmou, mas a PE não foi paga.</td></tr>
            <tr><td>Sem confirmação (cinza)</td><td>Nenhuma confirmação registrada.</td></tr>
            <tr><td>PE paga (verde)</td><td>A Primeira Experiência foi paga.</td></tr>
            <tr><td>PIX gerado (laranja)</td><td>O PIX foi gerado, mas ainda não foi pago.</td></tr>
            <tr><td>PE não paga (cinza)</td><td>Sem PIX nem pagamento.</td></tr>
            <tr><td>✓ Presença, ✓ Fechou</td><td>A ação já foi marcada.</td></tr>
          </tbody>
        </table></div>
      `,
    },
    {
      id: 'acoes',
      titulo: 'Botões de ação',
      desde: '3.9',
      html: `
        <div class="tabela-wrap"><table>
          <thead><tr><th>Botão</th><th>O que faz</th></tr></thead>
          <tbody>
            <tr><td><b>Marcar presença</b></td><td>Registra que a família compareceu (planilha, coluna V) e abre a pergunta sobre a proposta (próxima seção). Depois vira "✓ Presença" e não dá para desmarcar pela tela: se marcou errado, avise o Michel. Aparece nas três faixas, porque a presença é marcada quando a mãe chega, dentro do horário corrente.</td></tr>
            <tr><td><b>Marcar fechou</b></td><td>Registra que a família fechou o plano (coluna X) e <b>manda a mensagem de boas-vindas pelo WhatsApp</b>. Só se marca uma vez; depois vira "✓ Fechou". Quem fechou continua na lista, com o selo.</td></tr>
            <tr><td><b>➕ Agendar</b></td><td>Fica no topo da tela, ao lado de ↻ Atualizar, e só aparece quando o Michel libera. Cria a Primeira Experiência de uma família e a linha na planilha. Veja a seção "Agendar uma Primeira Experiência".</td></tr>
            <tr><td><b>💰 Marcar PE paga</b></td><td>Registra à mão que a Primeira Experiência foi paga (planilha, colunas AB, AN, AO e AP). Pede o valor recebido e o motivo, e some quando a PE já consta como paga. Veja a seção "Marcar a PE como paga à mão".</td></tr>
            <tr><td><b>Cancelar</b></td><td>Cancela o agendamento (coluna T). Pede confirmação ("Cancelar o agendamento de [bebê]? Ele sai da agenda."), por ser a ação mais difícil de desfazer.</td></tr>
            <tr><td><b>📄 Proposta</b></td><td>Só na faixa "Já passou". Abre o detalhe do lead, de onde sai a proposta.</td></tr>
            <tr><td><b>📄 Detalhe</b></td><td>Nas tabelas (Semana, Mês, Frios, lista do rodapé do Painel). Abre o detalhe do lead.</td></tr>
            <tr><td><b>💬 Conversa</b></td><td>Abre a conversa no WhatsApp com o telefone do lead. Só aparece se há telefone.</td></tr>
          </tbody>
        </table></div>
        <p>Cada clique aparece na tela <b>na hora</b>, antes de a planilha confirmar. O botão fica desabilitado enquanto o pedido está no ar, o que evita clique duplo. Se algo falhar (sem internet, sessão expirada), a tela desfaz o que mostrou e avisa em vermelho: clique de novo.</p>
        <p>Presença, Fechou e Cancelar funcionam no Painel, na Semana e no Mês.</p>
      `,
    },
    {
      id: 'presenca',
      titulo: 'Marcar presença e a proposta',
      desde: '3.13',
      html: `
        <p>Ao clicar em <b>Marcar presença</b> abre o diálogo "Presença de [bebê]" com a pergunta "Marcar presença e…". Clicar fora do diálogo ou em Cancelar não marca nada.</p>
        <ol>
          <li><b>📤 Revisar e enviar a proposta padrão pelo WhatsApp</b>: marca a presença e o sistema monta a proposta com as configurações padrão (plano em destaque Semestral, validade de 30 dias, Primeira Experiência, nome da mãe, nome do bebê, sexo e turma do cadastro). O texto da mensagem e os preços vêm das configurações do Config Editor, o mesmo que o proposta.html usa: mudou um preço lá, a proposta padrão acompanha. <b>Nada sai sozinho:</b> abre uma janela com o texto numa caixa que você pode editar, e só o botão <b>📤 Enviar pela Alice</b> manda. Só existe uma proposta padrão por agendamento; se já foi enviada, a tela avisa "já tinha sido enviada, não mandei de novo" com um link "Ver proposta".</li>
          <li><b>✏️ Editar a proposta antes de enviar</b>: marca a presença e abre o proposta.html em outra aba, já preenchido (mãe, bebê, sexo, turma, telefone, PE paga). Ajuste desconto, destaque ou validade, gere o link e use <b>🤖 Enviar pela Alice</b>: ele mostra o texto numa caixa editável e só envia quando você confirma (ou use Abrir no WhatsApp).</li>
          <li><b>✅ Só marcar presença, sem proposta.</b></li>
        </ol>
        <p><b>Depois de marcar a presença</b>, o botão <b>📤 Enviar proposta</b> aparece na linha do bebê (até o Fechou) e reabre o diálogo só com as opções de proposta: <b>revisar e enviar a proposta padrão</b> ou <b>editar a proposta</b>. Ele não marca a presença de novo. Use quando você escolheu "Editar a proposta" e saiu sem enviar, escolheu "Só marcar presença" e mudou de ideia, ou quando a proposta padrão não foi gerada.</p>
        <p><b>Cuidado com proposta duplicada:</b> se uma proposta (por exemplo a editada) já foi enviada para aquele agendamento, a janela de revisão da proposta padrão mostra um aviso em destaque ("Já saiu uma proposta… a família recebe DUAS") com data e quem enviou. O sistema só avisa: confira na lista Propostas e nas Comunicações do detalhe do lead antes de enviar outra.</p>
        <p>Avisos possíveis depois da proposta padrão:</p>
        <ul>
          <li>"Proposta enviada para [mãe] pelo WhatsApp. ✓"</li>
          <li>"Proposta gerada, mas não enviada": você cancelou a janela do texto. A proposta ficou gravada e o link continua valendo; o link <b>Enviar pelo WhatsApp</b> abre o WhatsApp Web com o texto.</li>
          <li>"Proposta gerada, mas a mensagem automática não saiu": a proposta ficou gravada e aparece o link <b>Enviar pelo WhatsApp</b> (WhatsApp Web com o texto pronto). Clique e envie.</li>
          <li>"Presença marcada, mas a proposta padrão não foi gerada": o aviso diz o motivo (sem agendamento, sem nome da mãe, sem turma reconhecida ou texto não configurado). Use <b>Gerar proposta</b> no detalhe do lead.</li>
        </ul>
        <p>Se o clique falhou em dois lugares (planilha e WhatsApp), o aviso conta as duas coisas.</p>
      `,
    },
    {
      id: 'pe-paga',
      titulo: 'Marcar a PE como paga à mão',
      desde: '3.20',
      html: `
        <p>Quando a família pagou a Primeira Experiência <b>por fora do PIX do sistema</b> (PIX direto na conta da BGL, por exemplo), registre no CRM em vez de digitar na planilha. O botão <b>💰 Marcar PE paga</b> aparece na linha do bebê enquanto a PE não consta como paga.</p>
        <ol>
          <li><b>Valor recebido (R$)</b>: o que realmente entrou, como <b>47,00</b> ou <b>23,50</b>. É esse número que a proposta abate do plano. Se já havia um valor do PIX do sistema, ele vem preenchido: corrija se o recebido for outro. Acima de R$200 a tela recusa (provável erro de digitação).</li>
          <li><b>Por que está marcando à mão?</b>: campo <b>obrigatório</b>, com no mínimo 10 caracteres. Escreva o motivo de verdade, por exemplo "PIX direto na conta da BGL, conferi o comprovante no extrato". Ele fica gravado junto da PE.</li>
          <li><b>💰 Marcar como paga</b>: só libera com o valor e o motivo preenchidos.</li>
        </ol>
        <ul>
          <li><b>Seu e-mail fica registrado</b> como quem conferiu o pagamento. Não dá para assinar por outra pessoa.</li>
          <li><b>Só marque depois de receber.</b> "Vai pagar" ainda não é pago: a proposta passaria a abater um valor que não entrou.</li>
          <li><b>PIX do sistema ainda pendente:</b> se já existe um PIX gerado para essa PE e ele <b>ainda não venceu</b>, o diálogo avisa. Se a família ainda puder pagá-lo, o dinheiro entra duas vezes: peça para ela ignorar o PIX antigo. PIX já vencido não pode mais ser pago, então não há aviso.</li>
          <li><b>Já confirmada pelo Mercado Pago:</b> não dá para marcar à mão, porque o pagamento já foi confirmado pelo sistema. A tela avisa e nada muda.</li>
          <li><b>Digitou o valor errado?</b> Depois de marcada, a tela não oferece corrigir (o botão some). Avise o Michel, que corrige.</li>
          <li>Se o servidor recusar, o diálogo <b>continua aberto</b> com o motivo em vermelho e o que você digitou fica lá.</li>
        </ul>
        <div class="aviso aviso-info"><b>Se vier o aviso "não atualizou a planilha":</b> a PE foi salva no CRM, mas a planilha ainda está com o estado antigo, e <b>na próxima sincronização (até cerca de 30 minutos) a PE volta a "não paga"</b>. Digite você mesma na linha do bebê: <b>AB = pago</b>, <b>AN</b> = o valor, <b>AO</b> = seu e-mail e <b>AP</b> = o motivo. Depois disso nada mais se perde.</div>
        <p><b>Sem o botão?</b> Agendamentos antigos, sem identificação da linha, não têm o botão 💰: a marcação não teria onde ser gravada na planilha e voltaria sozinha. Nesses, marque direto na planilha (AB, AN, AO e AP).</p>
      `,
    },
    {
      id: 'agendar',
      titulo: 'Agendar uma Primeira Experiência',
      desde: '3.22',
      html: `
        <div class="aviso aviso-info"><b>Este botão ainda não está liberado.</b> O ➕ Agendar está em teste e só aparece na versão de homologação (endereço com <code>/hml/</code>); lá, a linha criada é <b>real</b> na planilha, então não use com dados de uma família de verdade. No sistema de verdade, continue agendando como hoje até o Michel liberar.</div>
        <p>O botão <b>➕ Agendar</b> marca a Primeira Experiência de uma família que você captou e <b>cria a linha na planilha sozinho</b>, no lugar certo. Acabou o "colar a linha": o sistema grava, e você só confere.</p>
        <ol>
          <li><b>Procure a família primeiro.</b> Digite o <b>telefone</b> ou o <b>nome</b> (da mãe ou do bebê) e clique em 🔎 Buscar. Se a família aparecer, clique em <b>Usar esta família</b>: o formulário já vem com o cadastro dela. <b>Só cadastre uma família nova se ela não estiver na lista</b>: o botão para isso diz "Nenhuma destas é a família", justamente para ninguém criar uma família repetida só porque ela está com outro número.</li>
          <li><b>Preencha o formulário.</b> Obrigatórios: telefone e responsável (família nova), nome e nascimento do bebê, a <b>turma</b>, o <b>horário</b> da Primeira Experiência e a <b>cobrança da PE</b>. A <b>turma é sugerida pelo nascimento</b> (Pitocos 2 a 6 meses, Sapecas 6 a 12, Exploradores 12 a 18, Artistas 18 meses a 2 anos, Atletas 2 a 4 anos). É só uma sugestão: se a turma que cabe no horário for outra, troque, e a sugestão não volta a mexer. Fora das faixas, escolha você.</li>
          <li><b>Escolha o horário da turma.</b> Não se digita data nem hora: com a turma escolhida, aparecem os <b>horários dela</b> (por exemplo "Terça 11:00" e "Quinta 14:00"). Clique no horário e a tela lista as <b>próximas datas</b> que caem naquele dia da semana; clique na data. A Primeira Experiência <b>só pode ser marcada dentro dos horários cadastrados</b>, nunca fora (o sistema recusa). A lista mostra os horários da turma, não as vagas: confira a lotação como sempre. Se mudar a turma, escolha o horário de novo. Se a lista disser que não conseguiu carregar, clique em "Tentar de novo".</li>
          <li><b>Escolha a cobrança da PE.</b> Não vem nada marcado de propósito:
            <ul>
              <li><b>Pedir para gerar o PIX:</b> o sistema <b>gera o PIX no Mercado Pago</b> e a mãe recebe as duas mensagens pelo WhatsApp (o link do PIX e os dados do pagamento). É o único que fala com ela, e isso não se desfaz: a tela avisa antes de gravar. <b>Vale para qualquer família</b>, também a que você acabou de cadastrar pela tela. <b>Precisa do e-mail do responsável</b> (o Mercado Pago exige): sem ele a tela recusa e nada é criado. <b>O valor da PE</b> aparece num campo logo abaixo: a lista traz os valores que estão <b>valendo hoje</b> (cadastrados com início e fim) e já vem marcado o mais recente; escolha outro se for o caso. O valor que a mãe paga é o escolhido. Se nenhum valor estiver cadastrado, a tela avisa e pede para falar com o Michel. A validade do PIX é calculada pela aula (vence 12 horas antes dela, no mínimo 2 horas depois de gerado). Se o Michel ainda não tiver ligado o PIX por aqui, o sistema recusa ao confirmar e nada é criado.</li>
              <li><b>PIX já enviado:</b> você já mandou o PIX à mãe. Nada sai pelo sistema. Quando ela pagar, use 💰 Marcar PE paga.</li>
              <li><b>Não vai pagar a PE:</b> exige uma <b>justificativa</b> (no mínimo 10 caracteres). A PE fica como dispensada e nunca abate o plano.</li>
            </ul>
          </li>
          <li><b>Revise e confirme.</b> A tela mostra um resumo em texto (bebê, responsável, data, turma, cobrança). Confira com calma, principalmente nome e data: é a única ação do CRM que cria um agendamento e não dá para desfazer por ele. Clique em <b>✅ Confirmar e criar</b>.</li>
        </ol>
        <h3>Preencher a partir do ChatGPT</h3>
        <p>O caminho do print continua valendo, com o passo ruim trocado. No formulário, abra <b>Preencher a partir do ChatGPT</b>: clique em <b>📋 Copiar prompt</b>, cole no ChatGPT junto com o print da conversa e <b>traga de volta o JSON</b> que ele devolver. Cole no campo e clique em <b>⬇️ Preencher o formulário</b>. O JSON <b>só preenche</b>: nada é gravado até você revisar e confirmar. O que o ChatGPT não achou na conversa fica em branco (ele foi instruído a não inventar), e uma data como "sexta que vem" não é convertida: você preenche. A data e a hora do JSON só valem se caírem nos horários da turma; se não caírem, a tela avisa e você escolhe o horário. Se o texto colado não for um JSON válido, o formulário não é alterado. <b>Use sempre o prompt da tela</b> (não o que você tinha guardado): ele já traz as turmas atuais e pede o JSON, não mais a linha da planilha.</p>
        <h3>Se algo der errado</h3>
        <ul>
          <li><b>"Salvo no CRM, mas a linha NÃO entrou na planilha":</b> o agendamento existe, só a linha faltou. Clique em <b>🔁 Tentar de novo</b>. <b>Não crie de novo</b>: o agendamento já existe e a tela vai recusar. Se continuar falhando, avise o Michel.</li>
          <li><b>"Fora do ar" ou erro de conexão:</b> o pedido fica na tela, com tudo o que você digitou. Clique em Confirmar de novo: o sistema reconhece que é o mesmo pedido e não cria duas vezes.</li>
          <li><b>"O PIX NÃO foi gerado":</b> o agendamento e a linha estão salvos, só o PIX não saiu (o Mercado Pago recusou, por exemplo). Clique em <b>🔁 Tentar de novo</b>: ele gera o PIX de novo, <b>sem criar outro agendamento e sem cobrar duas vezes</b>. Se continuar falhando, avise o Michel e peça o PIX pelo caminho de sempre.</li>
          <li><b>"Não respondeu a tempo" ou "a planilha/o CRM não gravou":</b> o Mercado Pago, a planilha ou o CRM demorou ou falhou no meio. <b>Nada foi enviado à mãe</b> até terminar tudo. Aguarde alguns segundos e clique em <b>🔁 Tentar de novo</b>: ele termina o que faltou e o sistema <b>não cobra duas vezes</b>.</li>
          <li><b>"O PIX foi gerado, mas as mensagens NÃO saíram":</b> o PIX existe. A tela mostra o <b>link</b>: mande-o à mãe pelo WhatsApp. <b>Não use Tentar de novo.</b></li>
          <li><b>O bebê já tem um agendamento ativo:</b> a tela avisa e trava. Reagendar ainda é feito na planilha, e o CRM ainda não faz.</li>
          <li>Na planilha, a linha nova mostra seu e-mail na coluna <b>agendadoPor</b>, no lugar do nome genérico de antes.</li>
        </ul>
      `,
    },
    {
      id: 'fechou',
      titulo: 'Marcar fechou: a mensagem que a família recebe',
      desde: '3.12',
      html: `
        <p>Ao clicar em <b>Marcar fechou</b>, abre uma janela com a mensagem de boas-vindas numa caixa que você pode <b>editar</b>. Ela substitui a mensagem manual que a equipe mandava com o app Tecnofit, e só sai pela Alice quando você escolhe:</p>
        <ul>
          <li><b>✅ Marcar e enviar</b>: marca o Fechou e envia o texto que está na caixa (editado ou não).</li>
          <li><b>☑️ Só marcar, sem mensagem</b>: marca o Fechou e não manda nada.</li>
          <li><b>Cancelar</b>: não marca nada.</li>
        </ul>
        <p>Se a janela não conseguir carregar o texto, o Fechou <b>não é marcado</b> e a tela avisa: tente de novo. Se o envio automático estiver desligado, a janela avisa e oferece <b>📲 Abrir no WhatsApp Web com este texto</b>; marcar então não manda mensagem.</p>
        <p>A mensagem só sai <b>uma vez</b>, no momento em que o agendamento passa de "não fechou" para "fechou": clicar de novo, ou a planilha reenviar a linha, não repete a mensagem (nem a editada).</p>
        <p>Texto enviado (o que está entre colchetes muda por família):</p>
        <blockquote>
          <p>Oi, [primeiro nome da mãe] e [primeiro nome do bebê]! 💛</p>
          <p>Boas-vindas à família Baby Gym Londrina! A partir de agora, [o/a] [bebê] faz parte da turma [Turma]. [Frase da turma] ✨</p>
          <p>Para acompanhar o calendário de aulas, é só acessar nosso app:<br>📲 Baixe o Tecnofit Aluno: https://tecnofitacademia.page.link/App<br>📝 Toque em "Novo Cadastro" e use o mesmo e-mail que você passou pra gente.<br>📧 A senha chega no seu e-mail.</p>
          <p>💡 Coloque uma fotinha [do/da] [bebê] no perfil. A gente ama ver cada carinha por aqui!</p>
          <p>Qualquer dúvida, é só chamar. Esperamos vocês logo logo! 😊</p>
          <p>Com carinho,<br>Equipe Baby Gym Londrina 🧸<br>Aqui o brincar transforma.</p>
        </blockquote>
        <div class="tabela-wrap"><table>
          <thead><tr><th>Turma</th><th>Frase</th></tr></thead>
          <tbody>
            <tr><td>Pitocos</td><td>Nessa fase, cada toque, som e cor é uma descoberta nova.</td></tr>
            <tr><td>Sapecas</td><td>É a fase de explorar o corpo, rolar, sentar e se aventurar pelo espaço.</td></tr>
            <tr><td>Exploradores</td><td>É a fase de ganhar o mundo, com os primeiros passos e muita curiosidade.</td></tr>
            <tr><td>Artistas</td><td>É a fase da imaginação, das primeiras palavras e da criatividade a mil.</td></tr>
            <tr><td>Atletas</td><td>É a fase da energia, dos desafios e das primeiras amizades.</td></tr>
          </tbody>
        </table></div>
        <ul>
          <li>A mensagem usa só o <b>primeiro nome</b> da mãe e do bebê.</li>
          <li>Se faltar um dado, a frase correspondente some em vez de sair quebrada: sem nome da mãe vira "Oi, família do bebê"; sem sexo do bebê as frases saem sem artigo; sem turma reconhecida a frase da turma não entra.</li>
          <li><b>Antes de clicar em Fechou, confira se a família já passou o e-mail do cadastro do app</b>: a mensagem diz "use o mesmo e-mail que você passou pra gente".</li>
          <li>O envio depende de uma chave de liberação no servidor. Se estiver desligada ou falhar, a tela avisa "A mensagem automática no WhatsApp não saiu." com o link <b>Enviar pelo WhatsApp</b> (o WhatsApp Web com o texto que você revisou), e o Fechou fica registrado do mesmo jeito.</li>
          <li>No ambiente de testes (homologação) a mensagem nunca vai para a família: vai para um número de teste, com o prefixo "[HML]".</li>
        </ul>
        <div class="aviso aviso-info"><b>Atenção:</b> mensagem enviada não tem como ser desfeita. Clique em Marcar fechou só quando a matrícula está de fato fechada.</div>
      `,
    },
    {
      id: 'semana-mes',
      titulo: 'Semana e Mês',
      desde: '3.8',
      html: `
        <h4>Semana</h4>
        <ul>
          <li>De 7 dias atrás até 7 dias à frente, um grupo por dia, com cabeçalho do dia.</li>
          <li>Os dias passados servem para contato e acompanhamento de quem já fez a PE. Os futuros seguem a janela da mensagem das 18h.</li>
          <li>Ao entrar na aba, a tela já rola até hoje e deixa uma faixa do dia anterior à vista: role para cima para ver os dias passados.</li>
          <li>Hoje leva o selo <b>hoje</b>. Os dias passados levam o selo <b>já passou</b> e fundo mais apagado.</li>
          <li>Nada é escondido: quem já fechou continua na lista, com o selo Fechou.</li>
          <li>Colunas: hora, bebê, mãe, turma, telefone, confirmação, PE e botões (Marcar presença, Marcar fechou, Cancelar, Detalhe, Conversa).</li>
        </ul>
        <h4>Mês</h4>
        <ul>
          <li>O mês inteiro numa tabela só, com a coluna <b>Data</b> primeiro. As setas <b>◀ ▶</b> trocam o mês.</li>
          <li>Chips de filtro: <b>Compareceu</b>, <b>Fechou</b>, <b>PE paga</b>, <b>Confirmado</b> e <b>Pesquisa enviada</b> (a pesquisa de satisfação já foi enviada; a resposta não aparece).</li>
          <li>Os chips se combinam: a linha precisa atender a todos os chips marcados. O número em cada chip é sempre o total do mês, não do filtro.</li>
          <li>Mesmos botões de ação da Semana.</li>
        </ul>
      `,
    },
    {
      id: 'detalhe',
      titulo: 'Detalhe do lead',
      desde: '3.8',
      html: `
        <p>O botão <b>📄</b> abre uma janela com tudo o que o CRM sabe da família. Fecha no × do canto ou clicando fora. De cima para baixo:</p>
        <div class="tabela-wrap"><table>
          <thead><tr><th>Bloco</th><th>O que mostra</th></tr></thead>
          <tbody>
            <tr><td><b>Dados do responsável</b></td><td>Responsável, telefone, e-mail, canal de entrada, como conheceu a Baby Gym e data do primeiro contato.</td></tr>
            <tr><td><b>Recuperação</b></td><td>Etiquetas "Travado" (a equipe assumiu o lead) e "Reengajável" ou "Não reengajável" (sem telefone para contato).</td></tr>
            <tr><td><b>💬 Abrir conversa</b></td><td>Abre o WhatsApp com a família.</td></tr>
            <tr><td><b>Bebês</b></td><td>Um cartão por bebê: nome (👦/👧), nascimento, sexo, prematuro e alergia, quando cadastrados. Cada cartão tem o botão <b>📄 Gerar proposta</b>.</td></tr>
            <tr><td><b>Agendamentos</b></td><td>Todos os agendamentos, do mais recente ao mais antigo: data, hora, bebê, turma, status, confirmação, pagamento da PE e etiquetas Compareceu/Fechou.</td></tr>
            <tr><td><b>Anotações pós-PE</b></td><td>Três campos de texto livre por agendamento (veja abaixo).</td></tr>
            <tr><td><b>Propostas</b></td><td>As propostas já geradas para esta família (veja abaixo).</td></tr>
            <tr><td><b>Comunicações</b></td><td>As mensagens que o sistema mandou para a família, com data, tipo, quem mandou, se saiu e o texto (veja abaixo).</td></tr>
          </tbody>
        </table></div>
        <h4>Gerar proposta</h4>
        <p>Abre o proposta.html em outra aba, já preenchido com mãe, bebê, sexo, turma, telefone, se a PE está paga e <b>quanto a família pagou na PE</b> (campo "valor pago", que aparece com "PE foi paga" marcado; dá para corrigir antes de gerar, e vazio usa o valor padrão da PE). O abatimento no plano é esse valor, não o preço do dia. Como o botão é por bebê, a família com dois filhos em turmas diferentes recebe a proposta certa de cada um. Gere o link e envie; a proposta gerada volta a aparecer na lista Propostas do lead.</p>
        <h4>Lista de Propostas <small>(desde a versão 3.12)</small></h4>
        <ul>
          <li>É onde se responde "já mandaram proposta para essa mãe?". Se houver mais de uma, vale a mais recente: a hora de geração sai junto da data.</li>
          <li>A lista carrega depois do resto do detalhe ("Carregando…"). Se falhar, aparece a mensagem na própria seção.</li>
          <li>Só aparecem propostas ligadas ao lead. As geradas antes dessa ligação existir, ou abertas direto no proposta.html sem passar pelo CRM, podem não aparecer. <b>Lista vazia não prova que ninguém mandou proposta</b>: confira antes de reenviar.</li>
        </ul>
        <h4>Comunicações <small>(desde a versão 3.17)</small></h4>
        <ul>
          <li>É onde se responde "o que a mãe recebeu?" sem abrir o WhatsApp. A lista mostra a mais nova primeiro: data e hora, tipo (Boas-vindas, Proposta…), quem mandou (o e-mail de quem clicou), se <b>Enviada</b> ou <b>Não saiu</b> (com o motivo) e o texto, que abre em <b>Ver texto</b>.</li>
          <li>Texto que a equipe mudou na janela de revisão aparece com a etiqueta <b>Editada</b>, e o texto original fica ao lado.</li>
          <li>Registra também as tentativas que <b>falharam</b>, para você saber que a família não recebeu.</li>
          <li>Só aparecem as mensagens enviadas pelo sistema (Boas-vindas do Fechou e propostas pela Alice). <b>O que foi digitado à mão no WhatsApp não aparece</b>, e as mensagens automáticas do Make (confirmação do dia anterior, pesquisa de satisfação e PIX) aparecem aqui, com "make" em Quem, <b>só depois</b> que o cenário correspondente for ajustado para registrar; até lá, não aparecem.</li>
        </ul>
        <h4>Anotações pós-PE <small>(desde a versão 3.12)</small></h4>
        <ul>
          <li>Registram o que aconteceu depois da Primeira Experiência: Análise, 1º contato e 2º contato pós-PE.</li>
          <li>Há um cartão por agendamento, com data, hora e bebê. Agendamentos reagendados ou cancelados só aparecem se já têm anotação.</li>
          <li>Clique em <b>✏️ Editar</b> no campo, escreva e clique <b>Salvar</b> (ou <b>Cancelar</b>). Salva também na planilha (colunas Y, Z e AA).</li>
          <li>Se o salvamento falhar, o editor volta com o seu texto: nada se perde. Tente de novo.</li>
          <li>Agendamento antigo, sem identificação da linha, mostra a nota "edite estas anotações direto na planilha".</li>
        </ul>
      `,
    },
    {
      id: 'frios',
      titulo: 'Frios: recuperação de leads',
      desde: '3.8',
      html: `
        <p>A lista "Leads a recuperar (N)" tem nome, motivo, data, situação e botões.</p>
        <div class="tabela-wrap"><table>
          <thead><tr><th>Motivo</th><th>Significa</th></tr></thead>
          <tbody>
            <tr><td>Nunca agendou</td><td>Conversou, mas não marcou a Primeira Experiência.</td></tr>
            <tr><td>Faltou na PE</td><td>Marcou e não compareceu.</td></tr>
            <tr><td>Não fechou</td><td>Compareceu e não fechou.</td></tr>
          </tbody>
        </table></div>
        <p>Etiquetas: <b>Travado</b> (a equipe assumiu o lead) e <b>Sem telefone</b> (não dá para reengajar). Botões: <b>📄 Detalhe</b>, <b>Travar recuperação</b> (vira <b>Destravar recuperação</b> quando já está travado) e <b>💬 Conversa</b>.</p>
        <div class="aviso aviso-info"><b>Travar vale dinheiro:</b> travar significa que você assumiu o lead. Se ele fechar um dia, <b>sem prazo</b>, a comissão de quem travou dobra. Só trave um lead que você está de fato trabalhando. O lead que fecha sai da lista de Frios.</div>
      `,
    },
    {
      id: 'buscar',
      titulo: 'Buscar',
      desde: '3.11',
      html: `
        <ul>
          <li>Um campo só: nome do bebê, nome do responsável ou telefone. Mínimo de 2 caracteres. Clique em <b>Buscar</b> (ou Enter).</li>
          <li>Aceita erro de digitação e nome com som parecido.</li>
          <li>O resultado é <b>sempre uma lista</b>, nunca abre direto. Cada item mostra o bebê que casou, a turma e o telefone, para você conferir antes de abrir. Clique no item para abrir o detalhe do lead.</li>
          <li>Se o telefone completo não existir, a tela avisa "Nenhum lead com esse telefone. Confira o número, ou ele ainda não existe no CRM."</li>
        </ul>
      `,
    },
    {
      id: 'atualizacao',
      titulo: 'Quando a tela atualiza',
      desde: '3.8',
      html: `
        <ul>
          <li>Ao abrir;</li>
          <li>ao voltar para a aba do navegador;</li>
          <li>sozinha, a cada 5 minutos, enquanto a aba estiver à vista;</li>
          <li>ao clicar em <b>↻ Atualizar</b>.</li>
        </ul>
        <p>Aba escondida atrás de outra não busca nada, de propósito. Se ficou muito tempo em outra aba, volte para ela ou clique em Atualizar. A Ajuda não faz nenhuma busca.</p>
      `,
    },
    {
      id: 'colunas',
      titulo: 'Mapa: colunas da planilha no CRM',
      desde: '3.14',
      html: `
        <p>Aba <b>DadosAgendamento</b> da planilha "Dados de atendimento IA". <b>Aparece</b>: o dado é mostrado na tela. <b>Escreve</b>: um botão do CRM grava nessa coluna. <b>Guardado</b>: o CRM guarda, mas nenhuma tela mostra. <b>Não lido</b>: o CRM não recebe a coluna.</p>
        <div class="tabela-wrap"><table>
          <thead><tr><th>Col</th><th>Campo</th><th>Situação</th><th>Onde aparece ou para que serve</th></tr></thead>
          <tbody>
            <tr><td>A</td><td>Timestamp</td><td>Guardado</td><td>Data de criação da linha; identidade de linha antiga sem UUID.</td></tr>
            <tr><td>B</td><td>chatID (GPT Maker)</td><td>Guardado</td><td>Identifica o lead quando não há telefone válido (só se acha pela Buscar).</td></tr>
            <tr><td>C</td><td>numeroResponsavel</td><td>Aparece</td><td>Coluna Telefone das tabelas, campo Telefone do detalhe, botão 💬 Conversa, Buscar e link da proposta. Sem telefone somem Detalhe, Conversa e Proposta da linha.</td></tr>
            <tr><td>D</td><td>nomeWhatsApp</td><td>Não lido</td><td>É um rótulo montado pela Alice. O nome do WhatsApp usado como reserva vem da aba DadosPrimeiroAtendimento.</td></tr>
            <tr><td>E</td><td>turma</td><td>Aparece</td><td>Cabeçalho de cada horário no Painel, coluna Turma, detalhe e Buscar. Decide a frase da mensagem de Fechou e a turma da proposta.</td></tr>
            <tr><td>F</td><td>nomeResponsavel</td><td>Aparece</td><td>Nome da mãe no Painel, coluna Mãe, campo Responsável do detalhe, Buscar, Frios e saudação da mensagem de Fechou.</td></tr>
            <tr><td>G</td><td>nomeBebe</td><td>Aparece</td><td>Nome do bebê no Painel, coluna Bebê, cartão do detalhe, Buscar e mensagem de Fechou. Também identifica qual agendamento cada botão altera.</td></tr>
            <tr><td>H</td><td>nascimentoBebe</td><td>Aparece</td><td>Cartão do bebê no detalhe.</td></tr>
            <tr><td>I</td><td>sexoBebe</td><td>Aparece</td><td>👦/👧 no Painel e no detalhe, sexo da proposta e o "o/a" da mensagem de Fechou.</td></tr>
            <tr><td>J</td><td>emailResponsavel</td><td>Aparece</td><td>Campo E-mail do detalhe.</td></tr>
            <tr><td>K</td><td>agendamentoData</td><td>Aparece</td><td>Define o dia: Semana, coluna Data do Mês, Painel (hoje), detalhe e os selos "hoje" e "já passou".</td></tr>
            <tr><td>L</td><td>agendamentoHora</td><td>Aparece</td><td>Define o bloco de horário e a faixa do Painel. Sem hora, o agendamento não entra em faixa.</td></tr>
            <tr><td>M</td><td>agendamentoDia</td><td>Não lido</td><td>O CRM não usa.</td></tr>
            <tr><td>N</td><td>alergia</td><td>Aparece</td><td>Cartão do bebê no detalhe.</td></tr>
            <tr><td>O</td><td>prematuro</td><td>Aparece</td><td>Cartão do bebê no detalhe.</td></tr>
            <tr><td>P</td><td>comoConheceu</td><td>Aparece</td><td>Campo Como conheceu do detalhe.</td></tr>
            <tr><td>Q</td><td>resumo (da IA)</td><td>Guardado</td><td>Nenhuma tela mostra; para ler o resumo da conversa, só na planilha.</td></tr>
            <tr><td>R</td><td>humorDoCliente</td><td>Guardado</td><td>Nenhuma tela mostra.</td></tr>
            <tr><td>S</td><td>confirmacaoEnviada</td><td>Guardado</td><td>Não aparece; a tela mostra o resultado da confirmação (coluna T), não quando foi enviada.</td></tr>
            <tr><td>T</td><td>statusConfirmacao</td><td>Aparece e escreve</td><td>Etiqueta de confirmação (Painel, tabelas, detalhe) e coluna Status do detalhe. "cancelado" e "reagendado" tiram o agendamento das listas do dia. O botão Cancelar grava aqui.</td></tr>
            <tr><td>U</td><td>agendadoPor</td><td>Escreve</td><td>Só nas linhas criadas pelo botão ➕ Agendar: o e-mail de quem criou. Nas demais, o CRM não a usa.</td></tr>
            <tr><td>V</td><td>Compareceu</td><td>Aparece e escreve</td><td>"✓ Presença", chip Compareceu do Mês e etiqueta no detalhe. Marcar presença grava aqui.</td></tr>
            <tr><td>W</td><td>PesquisaEnviada</td><td>Aparece</td><td>Chip Pesquisa enviada do Mês (só o envio, não a resposta).</td></tr>
            <tr><td>X</td><td>Fechou</td><td>Aparece e escreve</td><td>"✓ Fechou", chip Fechou do Mês e etiqueta no detalhe. Marcar fechou grava aqui e dispara a mensagem de boas-vindas.</td></tr>
            <tr><td>Y</td><td>Analise Pós Aula</td><td>Aparece e escreve</td><td>Anotações pós-PE (Análise), editável no detalhe.</td></tr>
            <tr><td>Z</td><td>Contato Pós Aula 1</td><td>Aparece e escreve</td><td>Anotações pós-PE (1º contato), editável.</td></tr>
            <tr><td>AA</td><td>Contato Pós Aula 2</td><td>Aparece e escreve</td><td>Anotações pós-PE (2º contato), editável.</td></tr>
            <tr><td>AB</td><td>statusPagamento</td><td>Aparece e escreve</td><td>Etiqueta PE (paga, PIX gerado, não paga), chip PE paga do Mês e o "PE paga" da proposta. O botão 💰 Marcar PE paga grava "pago" aqui.</td></tr>
            <tr><td>AC a AF</td><td>payment_id, external_reference, pix_emv, ticket_url</td><td>Guardado</td><td>Dados do PIX no Mercado Pago. Nenhuma tela mostra.</td></tr>
            <tr><td>AG a AI</td><td>data_hora_geracao, expiracao e pagamento</td><td>Guardado</td><td>Nenhuma tela mostra; a tela mostra só o status (AB).</td></tr>
            <tr><td>AJ, AK</td><td>(controle do sync)</td><td>Interno</td><td>Sincronização planilha para CRM. Não mexer.</td></tr>
            <tr><td>AL</td><td>agendamentoId (UUID)</td><td>Interno</td><td>Não aparece, mas é a identidade do agendamento: é como cada botão acha a linha certa da planilha. Sem ela, as anotações pós-PE ficam só para leitura. Nunca copiar linha (o UUID vai junto). No botão ➕ Agendar, o identificador nasce no sistema e vai junto com a linha.</td></tr>
            <tr><td>AM</td><td>(sem uso)</td><td>Não lido</td><td>Coluna antiga, vazia. Não preencher.</td></tr>
            <tr><td>AN</td><td>valorPE</td><td>Escreve</td><td>Quanto a família pagou na Primeira Experiência, em reais (ex.: 47 ou 23,50). O Make preenche no PIX do Mercado Pago; <b>na PE paga por PIX direto, use o botão 💰 Marcar PE paga, que grava o valor recebido aqui</b>. É o número que a proposta abate do plano. Sem valor, ou com valor acima de R$200 (provável erro de digitação), a proposta usa o valor padrão da PE.</td></tr>
            <tr><td>AO</td><td>comprovanteConferidoPor</td><td>Escreve</td><td>Só no PIX direto: quem conferiu o pagamento. O botão 💰 Marcar PE paga grava aqui o e-mail de quem clicou. Preenchida significa conferido. No Mercado Pago fica vazia.</td></tr>
            <tr><td>AP</td><td>observacaoPE</td><td>Escreve</td><td>O motivo de a PE ter sido marcada à mão, escrito por quem clicou em 💰 Marcar PE paga. Obrigatório nesse botão. No botão ➕ Agendar, quando a cobrança é "Não vai pagar a PE", é a justificativa. Fica só nesta coluna e no CRM: nenhuma tela a mostra ainda.</td></tr>
          </tbody>
        </table></div>
        <p>Outras abas: <b>DadosPrimeiroAtendimento</b> alimenta Primeiro contato (A), nome de reserva (D), telefone (E), Canal (F) e chatID (G). <b>LeadsFrios</b> coluna A (Travar) alimenta a etiqueta Travado e o botão Travar/Destravar. O campo "Reengajável" do detalhe é calculado (lead com telefone válido), não vem de coluna.</p>
        <p>Ainda exige abrir a planilha: ler o resumo da IA e o humor do cliente (Q, R), ver quando a confirmação foi enviada (S), consultar dados do PIX e a data do pagamento (AC a AI) e ver quem agendou (U).</p>
      `,
    },
    {
      id: 'fora',
      titulo: 'O que o CRM ainda não faz',
      desde: '3.8',
      html: `
        <ul>
          <li><b>Agendar uma Primeira Experiência nova:</b> é o botão ➕ Agendar (veja "Agendar uma Primeira Experiência"), quando liberado. <b>Reagendar</b> ainda é na planilha. <b>Ao reagendar, crie uma linha nova. Não copie a linha existente.</b> A cópia leva o identificador do agendamento, o sistema acha que são o mesmo e o agendamento antigo some do CRM. Se já copiou, apague o conteúdo da coluna do identificador (código parecido com 8f25a6aa-7901-…) na linha nova.</li>
          <li><b>Desmarcar presença ou fechou:</b> não existe na tela. Peça ao Michel.</li>
          <li><b>Dispensar a PE (a família não vai pagar) e ler o motivo gravado na AP:</b> ainda não existe na tela.</li>
          <li>Os PIX da PE e as confirmações automáticas continuam sendo gerados pelos fluxos que já existiam (Make e Alice).</li>
        </ul>
      `,
    },
    {
      id: 'erros',
      titulo: 'Quando alguma coisa dá errado',
      desde: '3.8',
      html: `
        <div class="tabela-wrap"><table>
          <thead><tr><th>Mensagem</th><th>O que fazer</th></tr></thead>
          <tbody>
            <tr><td>"Sua sessão expirou"</td><td>Entrar de novo com o Google.</td></tr>
            <tr><td>"Seu e-mail não tem acesso à API do CRM"</td><td>Falar com o Michel.</td></tr>
            <tr><td>"Sem conexão com a API do CRM"</td><td>Conferir a internet e clicar em ↻ Atualizar.</td></tr>
            <tr><td>"A API do CRM está fora do ar"</td><td>Esperar alguns minutos. Se insistir, avisar o Michel.</td></tr>
            <tr><td>"A URL da API do CRM não está configurada"</td><td>Avisar o Michel. É configuração.</td></tr>
            <tr><td>"Isso foi salvo no CRM, mas não atualizou a planilha automaticamente"</td><td>Conferir a linha na planilha e atualizar a célula à mão.</td></tr>
            <tr><td>"A mensagem automática no WhatsApp não saiu"</td><td>A ação foi salva. Falar com a família pela 💬 Conversa. Se vier junto o aviso da planilha, os dois valem.</td></tr>
            <tr><td>Botão que a tela desfez, com aviso em vermelho</td><td>Não foi salvo. Clicar de novo.</td></tr>
          </tbody>
        </table></div>
      `,
    },
    {
      id: 'regras',
      titulo: 'Regras de ouro',
      desde: '3.9',
      html: `
        <ol>
          <li>Opere pelo CRM. Clicou no CRM, não edita a célula; editou a célula, não clica no CRM.</li>
          <li>Ao reagendar uma PE, crie uma linha nova na planilha. Nunca copie a linha.</li>
          <li>Clique em Marcar fechou só com a matrícula fechada e o e-mail do cadastro do app já coletado: a mensagem sai quando você confirma na janela de revisão e não volta.</li>
          <li>Só trave recuperação do lead que você está trabalhando: trava = comissão dobrada se ele fechar.</li>
          <li>Lista de Propostas vazia não prova que não foi enviada proposta.</li>
          <li>Sempre diga <b>Primeira Experiência Baby Gym</b>. Nunca "aula experimental" nem "primeira aula".</li>
        </ol>
      `,
    },
    {
      id: 'rotina',
      titulo: 'Rotina sugerida do dia',
      desde: '3.13',
      html: `
        <ol>
          <li>De manhã, abra o Painel e confira na lista completa a confirmação e o pagamento da PE de cada agendamento. Quem não confirmou ou não pagou, chame pela 💬 Conversa.</li>
          <li>Quando a família chega, clique em Marcar presença e escolha no diálogo: proposta padrão, editar ou só marcar.</li>
          <li>Depois da PE, na faixa "Já passou", use 📄 Proposta ou 💬 Conversa para fechar. Registre o combinado nas Anotações pós-PE.</li>
          <li>Quando a família fecha, clique em Marcar fechou.</li>
          <li>Nos intervalos, passe pela Semana (contato de quem já fez a PE) e por Frios (recuperação).</li>
          <li>Precisa de uma família específica? Use Buscar.</li>
        </ol>
      `,
    },
  ],

  // Keep a Changelog. Mais nova primeiro. As versões 3.8 a 3.13 foram
  // reconstruídas do histórico do git (o que entrou entre um bump de
  // `APP_VERSION` e o seguinte).
  novidades: [
    {
      versao: '3.24',
      data: '2026-10-09',
      mudancas: {
        adicionado: [
          'No ➕ Agendar, "Pedir para gerar o PIX" agora gera o PIX de verdade no Mercado Pago e manda as mensagens à mãe (link do PIX e dados do pagamento) (#414, #419). Vale para qualquer família, inclusive a cadastrada à mão pela tela, sem conversa anterior com a gente (#416); precisa do e-mail do responsável. Se algo falhar, o resultado avisa o que aconteceu e "Tentar de novo" repete sem duplicar e sem cobrar duas vezes. Se as mensagens não saírem, a tela mostra o link do PIX para você mandar.',
          'No ➕ Agendar, "Pedir para gerar o PIX" ganha o campo "Valor da PE" (#427): a lista traz os valores cadastrados com início e fim que estão valendo hoje, o mais recente já marcado. O PIX sai com o valor escolhido, e o "Tentar de novo" mantém o mesmo valor mesmo que a oferta acabe nesse meio-tempo. Quem cadastra os valores é o Michel (Config → Planos).',
        ],
        alterado: [],
        corrigido: [
          'O texto anterior prometia que essa opção gerava o PIX, mas ela só gravava o status e nenhum PIX saía. Agora a promessa vale (depois de o Michel ligar a opção).',
        ],
        removido: [],
      },
    },
    {
      versao: '3.23',
      data: '2026-10-08',
      mudancas: {
        adicionado: [],
        alterado: [
          'No ➕ Agendar, data e hora deixam de ser digitadas: você escolhe um dos horários da turma e depois uma das próximas datas daquele dia da semana. A Primeira Experiência só pode ser marcada dentro dos horários cadastrados (#413). A turma passou a ser obrigatória.',
        ],
        corrigido: [],
        removido: [],
      },
    },
    {
      versao: '3.22',
      data: '2026-10-08',
      mudancas: {
        adicionado: [
          'Botão ➕ Agendar: marca a Primeira Experiência de uma família e cria a linha na planilha, sem colar nada (#271). Em teste: por enquanto só aparece na versão de homologação (/hml/); no sistema de verdade aparece quando o Michel liberar, depois de validar a criação da linha.',
          'O formulário procura a família por telefone ou nome antes de cadastrar uma nova, sugere a turma pela idade do bebê e traz a porta do JSON do ChatGPT, com o prompt para copiar.',
          'Três cobranças da PE ao agendar, sem nenhuma pré-marcada: pedir para gerar o PIX, PIX já enviado ou não vai pagar a PE (com justificativa).',
          'Novos rótulos da PE na agenda: "Aguardando PIX", "PIX enviado (manual)" e "PE dispensada".',
        ],
        alterado: [],
        corrigido: [],
        removido: [],
      },
    },
    {
      versao: '3.21',
      data: '2026-10-08',
      mudancas: {
        adicionado: [],
        alterado: [
          'No diálogo Marcar PE paga, o aviso de "já existe um PIX gerado" só aparece enquanto o PIX ainda não venceu. PIX vencido não pode mais ser pago, então deixa de avisar (#405).',
        ],
        corrigido: [],
        removido: [],
      },
    },
    {
      versao: '3.20',
      data: '2026-10-07',
      mudancas: {
        adicionado: [
          'Botão 💰 Marcar PE paga na agenda: registra à mão que a Primeira Experiência foi paga (PIX direto, por exemplo), sem abrir a planilha. Pede o valor recebido e um motivo obrigatório (mínimo de 10 caracteres), e grava seu e-mail como quem conferiu (#397).',
          'Aviso no diálogo quando já existe um PIX do sistema pendente para a PE: se a família ainda puder pagá-lo, o dinheiro entra duas vezes.',
          'Coluna AP (observacaoPE) na planilha, com o motivo escrito ao marcar a PE como paga.',
        ],
        alterado: [],
        corrigido: [],
        removido: [],
      },
    },
    {
      versao: '3.19',
      data: '2026-10-05',
      mudancas: {
        adicionado: [
          'As mensagens automáticas do Make (confirmação D-1, pesquisa de satisfação e PIX) passam a poder aparecer na seção Comunicações do detalhe do lead, com "make" em Quem, à medida que os cenários forem ajustados para registrá-las (#336).',
        ],
        alterado: [],
        corrigido: [],
        removido: [],
      },
    },
    {
      versao: '3.18',
      data: '2026-10-05',
      mudancas: {
        adicionado: [
          'Botão 📤 Enviar proposta nos agendamentos com presença marcada (até o Fechou): reabre as opções de proposta, para enviar a padrão depois de ter escolhido "Editar a proposta" ou "Só marcar" (#381).',
          'Aviso na revisão da proposta padrão quando outra proposta (a editada, por exemplo) já foi enviada para o mesmo agendamento: a família receberia duas (#381).',
        ],
        alterado: [],
        corrigido: [
          'Depois de "Editar a proposta" no Marcar presença, não havia mais como enviar a proposta padrão pelo CRM (#381).',
        ],
        removido: [],
      },
    },
    {
      versao: '3.17',
      data: '2026-10-05',
      mudancas: {
        adicionado: [
          'Seção Comunicações no detalhe do lead: o histórico do que o sistema mandou à família (boas-vindas e propostas), com quem mandou, se saiu, o motivo da falha e o texto (#335).',
          'Quando a equipe edita o texto antes de enviar, o histórico guarda a etiqueta Editada e o texto original.',
        ],
        alterado: [],
        corrigido: [],
        removido: [],
      },
    },
    {
      versao: '3.16',
      data: '2026-10-05',
      mudancas: {
        adicionado: [
          'Marcar fechou abre a mensagem de boas-vindas numa caixa editável, com "Marcar e enviar", "Só marcar, sem mensagem" e Cancelar (#338).',
          'A proposta padrão do Marcar presença e o botão Enviar pela Alice do proposta.html mostram o texto numa caixa editável antes de enviar (#337).',
        ],
        alterado: [
          'A proposta padrão gera e grava a proposta, mas só é enviada depois que a equipe confirma o texto.',
          'Quando a mensagem do Fechou ou da proposta não sai, o link Enviar pelo WhatsApp leva o texto que a equipe revisou.',
        ],
        corrigido: [],
        removido: [],
      },
    },
    {
      versao: '3.15',
      data: '2026-10-04',
      mudancas: {
        adicionado: [
          'A proposta abate o valor que a família PAGOU na Primeira Experiência (coluna AN da planilha), e não o preço do dia: promoção de PE não muda o abatimento de quem já pagou (#354, #358).',
          'Campo "valor pago" no formulário da proposta, preenchido pelo CRM e pela planilha, editável antes de gerar o link.',
          'Colunas novas na DadosAgendamento: AN (valor da PE) e AO (quem conferiu o comprovante do PIX direto) (#355).',
          'O link da proposta vindo da planilha passa a levar o id do agendamento (#321).',
        ],
        alterado: [
          'Na PE paga por PIX direto, a equipe passa a digitar na AN o valor recebido, junto do "pago" na AB.',
        ],
        corrigido: [],
        removido: [],
      },
    },
    {
      versao: '3.14',
      data: '2026-10-02',
      mudancas: {
        adicionado: [
          'Aba 📖 Ajuda: manual do CRM com índice e histórico de novidades por versão (issue #348).',
          'Mapa de quais colunas da planilha DadosAgendamento aparecem no CRM.',
        ],
        alterado: [
          'A mensagem de boas-vindas do Marcar fechou agora traz o app Tecnofit, a foto no perfil e a turma do bebê (#328).',
        ],
        corrigido: [
          'A Semana não esconde mais quem já fechou nos dias passados (#344).',
          'A proposta enviada a partir do CRM leva só o primeiro nome da mãe e do bebê (#343).',
        ],
      },
    },
    {
      versao: '3.13',
      data: '2026-09-29',
      mudancas: {
        adicionado: [
          'Marcar presença abre a pergunta "Marcar presença e…": enviar a proposta padrão pela Alice, editar a proposta antes de enviar, ou só marcar (#329).',
          'Botão 🤖 Enviar pela Alice no proposta.html.',
        ],
      },
    },
    {
      versao: '3.12',
      data: '2026-09-24',
      mudancas: {
        adicionado: [
          'Anotações pós-PE no detalhe do lead, editáveis e sincronizadas com a planilha (#308).',
          'Lista de Propostas já geradas no detalhe do lead (#296).',
          'Botões Marcar presença, Marcar fechou e Cancelar também na Semana e no Mês (#244).',
          'Coluna Data no Mês e selos "hoje" e "já passou" na Semana.',
          'Aviso na tela quando a mensagem automática do WhatsApp não sai (#269).',
        ],
        alterado: ['A Semana abre ancorada em hoje.'],
      },
    },
    {
      versao: '3.11',
      data: '2026-09-18',
      mudancas: {
        adicionado: [
          'Aba 📅 Mês, com navegação por mês e filtros combináveis.',
          'Aba 🔎 Buscar: nome do bebê, do responsável ou telefone, com tolerância a erro de digitação.',
        ],
        alterado: [
          'A Semana passou a mostrar 7 dias antes e 7 depois de hoje (#244).',
          'O topo da tela (abas) fica fixo ao rolar.',
        ],
      },
    },
    {
      versao: '3.10',
      data: '2026-09-16',
      mudancas: {
        alterado: ['Os botões de ação (presença, fechou, cancelar, travar) passam a vir ligados.'],
      },
    },
    {
      versao: '3.9',
      data: '2026-09-16',
      mudancas: {
        adicionado: [
          'Botões Marcar presença, Marcar fechou, Cancelar e Travar/Destravar recuperação, sincronizados com a planilha.',
          '👦/👧 ao lado do nome do bebê no Painel do Dia.',
        ],
      },
    },
    {
      versao: '3.8',
      data: '2026-08-25',
      mudancas: {
        adicionado: [
          'Primeira versão da tela da equipe (somente leitura): Painel do Dia, Semana, Frios, detalhe do lead e Gerar proposta.',
        ],
      },
    },
  ],
};
