const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

const templates = [
  {
    id: 1,
    type: 'phishing',
    subject: 'Atribuição de Chamado Urgente: CAS-13820-B4L4K4',
    fromName: 'Suporte Bizapp',
    fromEmail: 'admin@bizapp-support-fake.com',
    bodyHtml: `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; color: #202020; line-height: 1.6;">
        <div style="background-color: #8c2e92; padding: 15px; color: white;">
          <h2 style="margin:0; font-size: 16px;">Novo Chamado Crítico - Nível 1</h2>
        </div>
        <div style="padding: 15px;">
          <p>O chamado <b>CAS-13820-B4L4K4</b> foi atribuído à sua fila devido à incapacidade da equipe de <span class="suspicious-target" data-id="typo1" style="cursor:pointer; border-bottom: 1px dotted red;">solusionar o ploblema</span>.</p>
          <p>O diretor financeiro relatou uma falha sistêmica <span class="suspicious-target" data-id="typo2" style="cursor:pointer; border-bottom: 1px dotted red;">catrastrófica</span> no faturamento central. Este incidente está afetando as subsidiárias na América Latina com severidade <strong>ALTA P1</strong>. É <span class="suspicious-target" data-id="typo3" style="cursor:pointer; border-bottom: 1px dotted red;">extritamente neçessário</span> que o atendimento inicie nos próximos 15 minutos.</p>
          <p>Temos anexado os logs do servidor e os prints de erro enviados pelo diretor. Baixe o pacote seguro e inicie o troubleshooting o mais rápido possível.</p>
          
          <div style="margin: 20px 0; text-align: center;">
            <a href="#" class="suspicious-target" data-id="fake_link_1" style="background-color: #0f6cbd; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">⬇️ Baixar Logs_de_Erro_SAP.zip (14.2 MB)</a>
          </div>

          <p style="color: #666; font-size: 12px; margin-top: 20px; border-top: 1px solid #ccc; padding-top: 10px;">Mensagem automática. Dificuldades técnicas? Contate o suporte através do <span class="suspicious-target" data-id="fake_domain_help">helpdesk-it-suporte.com.br</span> imediatamente.</p>
        </div>
      </div>
    `,
    explanation: 'Phishing disfarçado de incidente de TI crítico com erros grotescos espalhados pelo texto longo ("solusionar", "catrastrófica", "extritamente neçessário"). Pede para baixar um ZIP malicioso contendo logs de erro forjados.',
    suspiciousElements: ['fake_link_1', 'typo1', 'typo2', 'typo3', 'fake_domain_help']
  },
  {
    id: 2,
    type: 'safe',
    subject: 'Aviso Importante: Recesso de Feriado e Escalas de Plantão',
    fromName: 'Recursos Humanos / Comunicação',
    fromEmail: 'comunicacao-rh@nossaempresa.com.br',
    bodyHtml: `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; color: #202020; padding: 15px; line-height: 1.6;">
        <h3 style="color: #0f6cbd; border-bottom: 2px solid #eee; padding-bottom: 10px;">Comunicado - Departamento de Recursos Humanos</h3>
        <p>Olá a todos os colaboradores,</p>
        <p>Gostaríamos de formalizar as diretrizes de funcionamento e acesso aos prédios durante o feriado nacional prolongado desta sexta-feira.</p>
        <p>Garantir o descanso de todos é prioridade. Ressaltamos que as operações administrativas estarão suspensas e as portas bloqueadas via crachá.</p>
        <p>O prédio matriz passará por uma dedetização programada e substituição de cabeamento. O acesso ao interior do edifício será <strong>proibido</strong> durante todo o final de semana para qualquer pessoa, exceto segurança patrimonial.</p>
        
        <p><strong>Equipes de Plantão (NOC, SOC e Call Center):</strong></p>
        <p>A escala de sobreaviso já foi enviada pelos gestores via Teams. As marcações de ponto devem ser feitas pelo aplicativo no celular. As horas extras serão pagas no próximo mês com adicional de 100%.</p>
        
        <div style="margin-top: 20px; border-top: 1px solid #ccc; padding-top: 15px;">
          <p>Atenciosamente, <strong>Aline Ferreira Silva e Souza</strong><br/><a href="#" class="suspicious-target" data-id="safe_rh_link" style="color: #0f6cbd;">Visite nossa intranet para mais informações.</a></p>
        </div>
      </div>
    `,
    explanation: 'E-mail corporativo longo e perfeitamente legítimo do RH. Redigido com excelente gramática, detalha escalas e dedetização do prédio. O link ao final apenas leva à intranet oficial sem criar senso de urgência extrema.',
    suspiciousElements: [] // Safe links won't trigger points
  },
  {
    id: 3,
    type: 'phishing',
    subject: 'AÇÃO EXIGIDA: Sua conta será inativada às 18:00',
    fromName: 'Mircosoft Azure - Segurança',
    fromEmail: 'noreply-admin@mircosoft-alerts-azure.net',
    bodyHtml: `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; color: #202020; padding: 20px; border: 2px solid #d13438; border-radius: 8px; line-height: 1.5;">
        <h2 style="color: #d13438; margin: 0 0 15px 0;">⚠️ ALERTA DE EXCLUSÃO DE CAIXA DE CORREIO</h2>
        
        <p>Identificamos que o banco de dados da sua caixa de correio está sendo executado sobre uma versão desatualizada. Esta violação descumpre as novas diretrizes implementadas de forma <span class="suspicious-target" data-id="typo4" style="cursor:pointer; border-bottom: 1px dotted red;">ubrigatória</span>.</p>
        
        <p>Além da falha, sua conta consumiu <strong>99,8%</strong> da quota total. Os e-mails não estão chegando. Se não houver limpeza hoje, às 18:00, o sistema disparará a purga e o histórico será deletado <span class="suspicious-target" data-id="typo5" style="cursor:pointer; border-bottom: 1px dotted red;">permenantemente</span> sem backup.</p>
        
        <p>Para <span class="suspicious-target" data-id="typo6" style="cursor:pointer; border-bottom: 1px dotted red;">previnir a perca total</span> do histórico de clientes, você <span class="suspicious-target" data-id="typo7" style="cursor:pointer; border-bottom: 1px dotted red;">percisa validar seus credenciais</span> no novo painel da <span class="suspicious-target" data-id="fake_brand1" style="cursor:pointer; font-weight: bold;">Mircosoft Azure</span> para a migração de dados.</p>
        
        <div style="background-color: #fce4e4; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
          <a href="#" class="suspicious-target" data-id="fake_link_3" style="background-color: #d13438; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">🌐 Validar Conta no Portal Mircosoft</a>
        </div>
      </div>
    `,
    explanation: 'Engenharia social pautada em pânico e exclusão de e-mails, forçando o clique rápido. Possui erros graves ("permenantemente", "previnir a perca", "percisa validar") e utiliza uma variação enganosa da marca da Microsoft (Mircosoft).',
    suspiciousElements: ['typo4', 'typo5', 'typo6', 'typo7', 'fake_brand1', 'fake_link_3']
  },
  {
    id: 4,
    type: 'safe',
    subject: 'Aprovação de Despesas Confirmada: Viagem SP - Fluxo 4492',
    fromName: 'Sistema ERP Financeiro',
    fromEmail: 'notificacoes-erp@nossaempresa.com.br',
    bodyHtml: `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; color: #202020; padding: 15px; line-height: 1.5;">
        <h3 style="border-bottom: 2px solid #ccc; padding-bottom: 10px;">Transação Aprovada - Reembolsos</h3>
        <p>Prezado(a) Solicitante,</p>
        <p>Informamos que o seu relatório de despesas de viagem foi auditado e obteve a aprovação final do gestor financeiro.</p>
        
        <p>Segue o espelho da transação que foi liberada e encaminhada ao banco para processamento da TED/PIX:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px;">
          <thead>
            <tr style="background-color: #2c3e50; color: white;">
              <th style="padding: 10px; border: 1px solid #1a252f; text-align: left;">Cód. Relatório</th>
              <th style="padding: 10px; border: 1px solid #1a252f; text-align: left;">Descrição</th>
              <th style="padding: 10px; border: 1px solid #1a252f; text-align: left;">Aprovador</th>
              <th style="padding: 10px; border: 1px solid #1a252f; text-align: left;">Valor Líquido</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">RD-99381-V2</td>
              <td style="padding: 10px; border: 1px solid #ddd;">Visita presencial ao Cliente Alpha - Matriz SP</td>
              <td style="padding: 10px; border: 1px solid #ddd;">João Peixoto</td>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; color: #107c10;">R$ 1.450,00</td>
            </tr>
          </tbody>
        </table>

        <p>Este valor será creditado diretamente em sua conta corrente até a próxima sexta-feira às 17h00. Divergências devem ser contestadas via <a href="#" class="suspicious-target" data-id="safe_link_servicedesk" style="color: #0f6cbd;">Portal Service Desk</a>.</p>
      </div>
    `,
    explanation: 'E-mail 100% legítimo do sistema financeiro contendo tabela rica de informações, sem forçar clique para senhas nem anexos suspeitos.',
    suspiciousElements: [] // it has a safe link that does nothing negative
  },
  {
    id: 5,
    type: 'phishing',
    subject: 'CONFIDENCIAL: Lista final de desligamentos',
    fromName: 'Diretoria Executiva',
    fromEmail: 'rh-diretoria@nossaempresa-portal-docs.com.br',
    bodyHtml: `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; color: #202020; padding: 20px; line-height: 1.6; background-color: #fafafa; border: 1px solid #eee;">
        <h2 style="color: #333; margin-bottom: 5px;">Comunicado Interno Restrito</h2>
        
        <p>Prezado colaborador,</p>
        <p>Devido à reestruturação financeira que nossa corporação tem atravessado, a diretoria teve que aprovar uma <strong>lista de desligamentos em massa</strong> para equalização da folha salarial.</p>
        
        <p>Identificamos que o seu departamento e cargo foram mapeados na área primária de corte. O arquivo gerado contendo os nomes, cálculos rescisórios e opções de benefícios foi disponibilizado pela contabilidade.</p>
        
        <p>Enviamos este e-mail em <strong>extrema confidencialidade</strong> antes do pronunciamento de amanhã às 09:00.</p>
        
        <div style="background-color: #fff; border-left: 4px solid #d13438; padding: 15px; margin: 20px 0;">
          <p><strong>Ação Necessária:</strong> Acesse com urgência a planilha de projeção de rescisão hospedada no cofre seguro corporativo. Verifique se os dados bancários e cálculos da multa do FGTS estão corretos antes do travamento da folha no final do dia.</p>
          
          <div style="margin: 20px 0; text-align: center;">
            <a href="#" class="suspicious-target" data-id="fake_link_5" style="color: #d13438; font-size: 16px; font-weight: bold; background: #ffebeb; padding: 10px; border-radius: 6px; display: inline-block;">📁 ABRIR: Confidencial_Calculos_Rescisao_2025.xlsx</a>
          </div>
        </div>
        
        <p>Exigimos que você <strong>não comente sobre essa mensagem</strong> para não reter seu pacote de bônus.</p>
        <p><a href="#" class="suspicious-target" data-id="fake_domain_rh" style="color: #666; font-size: 11px;">rh-diretoria@nossaempresa-portal-docs.com.br</a></p>
      </div>
    `,
    explanation: 'Engenharia Social Pesadíssima (Medo e Ansiedade). Ameaça de demissão cria pânico imediato no funcionário, que clica na falsa planilha correndo para conferir os "cálculos de sua rescisão".',
    suspiciousElements: ['fake_link_5', 'fake_domain_rh']
  },
  {
    id: 6,
    type: 'phishing',
    subject: 'Sua remuneração adicional (PIX) pendente de validação.',
    fromName: 'Folha de Pagamento - Banco',
    fromEmail: 'noreply@banco-digital-pagamentos-empresa.com.br',
    bodyHtml: `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; color: #202020; padding: 20px; line-height: 1.6;">
        <h2 style="color: #2e8b57; margin-bottom: 15px;">Aviso de Transferência de Bônus</h2>
        <p>Prezado colaborador,</p>
        <p>Durante a auditoria anual do contábil, foi identificado um erro no repasse do seu bônus de participação nos lucros (PLR). O valor líquido de <strong>R$ 3.850,42</strong> encontra-se aguardando liberação.</p>
        
        <p>Como não conseguimos processar esta transferência automaticamente pelas vias bancárias normais, o pagamento será <span class="suspicious-target" data-id="typo_pix1" style="cursor:pointer; border-bottom: 1px dotted red;">realizado exclusivamentee via PIX</span> para a chave cadastrada em seu CPF.</p>
        
        <div style="background-color: #f4fdf8; border: 1px solid #c3e6cb; padding: 15px; margin: 20px 0; border-radius: 5px;">
          <p>Para destrancar o sistema e permitir o repasse imediato, precisamos <span class="suspicious-target" data-id="typo_pix2" style="cursor:pointer; border-bottom: 1px dotted red;">confirmaar</span> alguns dados e que autorize a TED antes de 17h30.</p>
          
          <div style="text-align: center; margin: 20px 0;">
            <a href="#" class="suspicious-target" data-id="fake_pix_link" style="background-color: #28a745; color: white; padding: 12px 25px; text-decoration: none; border-radius: 30px; font-weight: bold; display: inline-block;">💳 AUTORIZAR RECEBIMENTO PIX</a>
          </div>
          <p style="font-size: 12px; color: #888;">Nota: Sem validação, o bônus só poderá ser reinvindicado no ano que vem.</p>
        </div>
      </div>
    `,
    explanation: 'Engenharia Social ativada pela Ganância e Esperança. Oferece um dinheiro fácil, um erro que beneficia o funcionário, exigindo cliques urgentes para não "perder a bolada". O botão tenta simular a experiência de bancos.',
    suspiciousElements: ['typo_pix1', 'typo_pix2', 'fake_pix_link']
  },
  {
    id: 7,
    type: 'safe',
    subject: 'Convite Oficial: Reunião de Alinhamento Trimestral Q3',
    fromName: 'Diretoria de Vendas',
    fromEmail: 'diretoria@nossaempresa.com.br',
    bodyHtml: `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; color: #202020; padding: 20px; line-height: 1.6;">
        <h2 style="color: #333; font-size: 20px;">Alinhamento Estratégico - Apresentação Q3</h2>
        <p><strong>Data:</strong> Quarta-feira, 28 de Outubro | <strong>Horário:</strong> 14:00 às 15:30</p>
        <p><strong>Local:</strong> Reunião Online Microsoft Teams</p>
        
        <hr style="border: 0; border-top: 1px solid #dcdcdc; margin: 20px 0;" />
        
        <p>Prezados gestores e equipes comerciais,</p>
        <p>Convidamos vocês para a nossa apresentação trimestral de resultados operacionais, referente ao terceiro quarter comercial (Q3).</p>
        <p>Nesta pauta, nosso CEO e Diretor Financeiro abordarão o balanço de fechamento, o alcance de metas, e anunciaremos as diretrizes finais da Participação nos Lucros (PLR) do ano.</p>
        
        <p>Encorajamos o envio de perguntas anônimas pela <a href="#" style="color: #0f6cbd; text-decoration: underline;" class="suspicious-target" data-id="safe_link_suggest">nossa caixa de sugestões da Intranet</a> até amanhã à noite, para que a liderança responda ao vivo.</p>
        
        <p>Garantam que suas câmeras e microfones estejam no modo mudo ao ingressar para evitar ruídos na transmissão.</p>
        <p style="font-weight: bold;">Contamos com a presença de todos!</p>
      </div>
    `,
    explanation: 'Convite de calendário longo, caloroso e perfeitamente seguro. Informa dados úteis da reunião trimestral (Q3), remetente está correto e não existe nenhum botão induzindo pânico.',
    suspiciousElements: []
  },
  {
    id: 8,
    type: 'phishing',
    subject: 'ALERTA: Atividade Incomum Detectada no Microsoft 365',
    fromName: 'Azure Security Team',
    fromEmail: 'alerts@microsofft-security-cloud-auth.com',
    bodyHtml: `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; color: #202020; padding: 20px; line-height: 1.6;">
        <h2 style="color: #d13438; border-bottom: 2px solid #d13438; padding-bottom: 10px;">Acesso Negado Temporariamente pela Diretiva de Risco</h2>
        
        <p>Nossos algoritmos detectaram um login suspeito na sua conta corporativa vindo de um endereço IP da Federação Russa (IP: 195.22.45.199).</p>
        
        <p>O hacker iniciou um <span class="suspicious-target" data-id="typo_hack1" style="cursor:pointer; border-bottom: 1px dotted red;">dowload massivo</span> de 45.000 arquivos confidenciais do OneDrive e SharePoint, visando aplicar um ataque de Ransomware com pedido de resgate.</p>
        
        <p style="font-size: 15px; font-weight: bold; color: #d13438;">Seus acessos serão SUSPENSOS PERMANENTEMENTE e apagados remotamente em exatos 15 minutos se você não comprovar que é o titular!</p>
        
        <p>Para barrar a invasão russa e redefinir sua senha com uma chave de segurança, utilize o painel de emergência disponibilizado pela equipe de TI abaixo:</p>
        
        <div style="margin: 25px auto; padding: 20px; text-align: center; background: #fff; border: 2px dashed #d13438; border-radius: 10px; max-width: 500px;">
          <h3 style="margin-top:0;">CENTRAL ZERO-TRUST</h3>
          <a href="#" class="suspicious-target" data-id="fake_link_8" style="display: block; background-color: #d13438; color: white; padding: 15px; text-decoration: none; font-weight: bold; border-radius: 4px;">🔒 BLOQUEAR INVASOR E TROCAR MINHA SENHA</a>
        </div>
      </div>
    `,
    explanation: 'Ataque de pânico cibernético clássico. O atacante inventa uma história detalhada (hacker da Rússia baixando 45.000 arquivos) para cegar o usuário de desespero. Domínio possui erro ortográfico grosseiro: "microsofft".',
    suspiciousElements: ['fake_link_8', 'typo_hack1']
  },
  {
    id: 9,
    type: 'phishing',
    subject: 'Notificação Judicial Oficial: Mensagem de Voz Trabalhista Retida',
    fromName: 'Sistema Cloud PABX',
    fromEmail: 'voicemail-recording@cloud-pabx-recordings.com',
    bodyHtml: `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; color: #202020; padding: 20px; line-height: 1.7; background-color: #fdfdfd; border: 1px solid #ddd;">
        <h3 style="color: #444; border-bottom: 2px solid #ccc; padding-bottom: 10px;">Nova Mensagem de Voz Criptografada Retida</h3>
        
        <p>Você recebeu um recado de voz no seu ramal telefônico hoje à tarde. A ligação foi classificada como <strong>ALTO SIGILO JURÍDICO</strong> devido às palavras-chave severas contidas no áudio, origem de <strong>TRIBUNAL DO TRABALHO (TRT-2A)</strong>.</p>
        
        <p>O nosso sistema de I.A transcreveu automaticamente uma amostra da denúncia para pré-visualização:</p>
        
        <blockquote style="border-left: 5px solid #d13438; padding: 15px; background: #fff0f0; margin: 20px 0; font-style: italic;">
          "...Este é o último aviso oficial de citação do processo trabalhista de assédio moral continuado envolvendo você... Caso ignore esta tentativa, o juiz assinará sua condução coercitiva até amanhã de manhã..."
        </blockquote>
        
        <p>A mensagem completa e os autos oficiais foram encriptados e bloqueados na nuvem. Para ouvir o depoimento na íntegra de 2 minutos e baixar os autos do tribunal, clique no botão do player abaixo:</p>
        
        <div style="background-color: #f1f3f4; border: 1px solid #cdd1d5; padding: 20px; margin: 20px 0; text-align: center; border-radius: 8px;">
          <a href="#" class="suspicious-target" data-id="fake_link_9" style="background-color: #217346; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">▶ OUVIR GRAVAÇÃO PABX (.EXE)</a>
        </div>
      </div>
    `,
    explanation: 'Engenharia social pavorosa e cinematográfica. O tema assédio moral e justiça do trabalho costuma causar cegueira instantânea na vítima pela vergonha e medo, que clica desesperadamente no link do falso "áudio judicial" que fará o download silêncioso de um cavalo de troia (trojan) disfarçado num EXE executável.',
    suspiciousElements: ['fake_link_9']
  },
  {
    id: 10,
    type: 'safe',
    subject: 'Boletim Informativo: Mês da Saúde Mental e Novos Benefícios',
    fromName: 'Comitê de Bem-Estar',
    fromEmail: 'bemestar-corporativo@nossaempresa.com.br',
    bodyHtml: `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; color: #202020; padding: 20px; line-height: 1.6;">
        <h2 style="color: #d7b500;">Mês da Saúde Mental e Equilíbrio</h2>
        
        <p>Olá equipe,</p>
        <p>Acreditamos que sua saúde mental deve estar sempre em primeiro lugar. Aproveitando o "Setembro Amarelo", inauguramos um pacote corporativo de benefícios focados na qualidade de vida <strong>sem repasse de custos adicionais em folha</strong>.</p>
        
        <ul style="background: #f4f6f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <li><strong>Gympass Expandido:</strong> Meditação guiada e terapias.</li>
          <li><strong>Terapia Profissional Gratuita:</strong> 4 sessões mensais via Vittude.</li>
          <li><strong>Palestras Quinzenais:</strong> Prevenção de Burnout.</li>
        </ul>
        
        <p>Para ler as regras e ativar seus vouchers, <a href="#" class="suspicious-target" data-id="safe_link_benefits" style="color: #0f6cbd; font-weight: 600;">acesse diretamente a aba "Benefícios e Saúde" pelo seu portal central na intranet</a> usando as mesmas credenciais do dia-a-dia.</p>
        
        <p>Contem permanentemente com a nossa total discrição para qualquer tema particular.</p>
      </div>
    `,
    explanation: 'Boletim interno genuíno longo e muito agradável de se ler. Aborda lindamente um tema real de saúde mental corporativa, o tom de voz é absurdamente afetuoso e seguro, e não tenta em nenhum parágrafo induzir o funcionário a fornecer cliques sob pressão desesperada. Ele apenas os orienta calmamente a usar o caminho padronizado da intranet para ativar os vouchers legais da empresa.',
    suspiciousElements: []
  },
  {
    id: 11,
    type: 'phishing',
    subject: 'CONFIDENCIAL: Proposta Salarial Fabulosa - Tech Lead Global no Google LLC.',
    fromName: 'Headhunter Google',
    fromEmail: 'recruiter-headhunter-google-international@careers-tech-jobs-offers-verified.com',
    bodyHtml: `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; color: #202020; padding: 20px; line-height: 1.6; border: 1px solid #e1e4e8; border-radius: 8px;">
        <h2 style="color: #202124;">Convite VIP para Diretoria Internacional</h2>
        
        <p>A minha equipe tem acompanhado seu histórico invejável no LinkedIn (<span class="suspicious-target" data-id="typo_google1" style="cursor:pointer; border-bottom: 1px dotted red;">ficamso supreendidos</span> com suas habilidades). O seu score global deu match absoluto na nossa Inteligência Artificial!</p>
        
        <p>Você foi pré-selecionado de forma direta, sem burocracias, para assumir como <strong>Senior Tech Lead Director</strong> no Google da Califórnia (com opção 100% Remoto do Brasil).</p>
        
        <div style="background-color: #f8f9fa; border-left: 4px solid #34a853; padding: 15px; margin: 20px 0;">
          <ul style="margin: 0; padding-left: 20px;">
            <li><strong>Salário Fixado:</strong> U$ 14.500,00 dólares americanos limpos de impostos mensais.</li>
            <li><strong>Sign-on Bonus:</strong> Ações restritas (RSU) de 50 mil dólares!</li>
          </ul>
        </div>
        
        <p>Preciso fechar esta vaga esta semana. Para gerar sua contratação imediata, eu <span class="suspicious-target" data-id="typo_google2" style="cursor:pointer; border-bottom: 1px dotted red;">perciso adiantadamente</span> que preencha os formulários burocráticos e assine eletronicamente hoje mesmo nosso Acordo de Confidencialidade (NDA):</p>
        
        <div style="text-align: center; margin: 25px 0;">
          <a href="#" class="suspicious-target" data-id="fake_link_11" style="background-color: #4285F4; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">🚀 [CLIQUE AQUI DE IMEDIATO PARA ASSINAR O NDA]</a>
        </div>
      </div>
    `,
    explanation: 'Engenharia Social baseada puramente na extrema Vaidade, Ganância desmedida e Ego inflado do alvo. O cibercriminoso dispara uma falsa oferta irrecusável e pomposa, absurdamente fora da realidade local de valores, em nome de um recrutador do Google empolgado e usa o pretexto fictício de assinar o sigilo urgente (NDA) e formulário burocrático minucioso antes da entrevista para roubar cruelmente e de uma vez só todos os dados sensíveis da identidade, CPF e senhas da inocente vítima e limpar suas contas.',
    suspiciousElements: ['fake_link_11', 'typo_google1', 'typo_google2']
  },
  {
    id: 12,
    type: 'safe',
    subject: 'Comunicado Conjunto sobre Horário Flexível',
    fromName: 'Departamento Pessoal Oficial',
    fromEmail: 'dp-oficial@nossaempresa.com.br',
    bodyHtml: `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; color: #202020; padding: 20px; line-height: 1.6;">
        <h2 style="color: #333; border-bottom: 2px solid #0f6cbd; padding-bottom: 10px;">Política de Flexibilidade Organizacional</h2>
        
        <p>Prezados colaboradores,</p>
        
        <p>A partir do próximo mês, flexibilizaremos de vez a nossa política de horários de marcações diárias do ponto eletrônico para todas as áreas administrativas e operacionais.</p>
        
        <p>Ao invés de cobrarmos estritamente o horário fixo, teremos uma faixa núcleo fundamental de alinhamento com a equipe presencial, apenas entre as <strong>10h00 e 16h00</strong>. As horas restantes diárias poderão ser livremente remanejadas, para que cada colaborador possa entrar mais cedo para fugir do trânsito ou sair mais tarde, se preferir trabalhar à noite.</p>
        
        <p>Todas as horas excedentes entrarão diretamente no nosso novo sistema de Banco de Horas automático da Ahgora System, eliminando chamados manuais na chefia para solicitar meios expedientes compensatórios.</p>
        
        <p>O manual didático contendo regras, deveres e eventuais penalidades por quebra do acordo do banco de horas estará disponível ainda no dia de hoje em caráter público impresso na recepção e em arquivo PDF publicado na raiz criptografada da nossa rede da intranet local corporativa.</p>
        
        <p>Qualquer dúvida, o departamento de DP permanece com as portas abertas na sala 104.</p>
      </div>
    `,
    explanation: 'Comunicação interna 100% segura. O RH não exige senha, assinatura digital de senhas ou download imposto ou urgente nem envia nenhum link suspeito, apenas indica longamente o lugar que todos já conhecem (intranet oficial/Drive Z e a recepção) onde se acha a informação segura da política real.',
    suspiciousElements: []
  }
];

let players = {};
let roundStatus = 'lobby'; // lobby | voting | reveal | finished
let sessionInbox = [];
let pendingEmails = [];
let currentTemplate = null;

let timerInterval = null;
let timeLeft = 0;

let playerVotes = {}; 

function broadcastState() {
  const sortedPlayers = Object.values(players).sort((a, b) => b.score - a.score);
  io.emit('state_update', {
    status: roundStatus,
    players: sortedPlayers,
    timeLeft,
    inbox: sessionInbox,
    currentEmailId: currentTemplate ? currentTemplate.id : null
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (name) => {
    if (!players[name]) {
      players[name] = { name, score: 0, clickedElements: [], connected: true };
    } else {
      players[name].connected = true;
    }
    socket.playerName = name;
    console.log(`${name} joined.`);
    broadcastState();
  });

  socket.on('start_round', () => {
    if (roundStatus === 'voting' || roundStatus === 'reveal') return;

    // Remover jogadores que caíram antes de iniciar nova rodada
    for (const name in players) {
      if (players[name].connected === false) {
        delete players[name];
      }
    }

    sessionInbox = [];
    pendingEmails = shuffleArray([...templates]); 
    playerVotes = {};
    
    Object.values(players).forEach(p => {
      p.score = 0;
      p.clickedElements = [];
    });
    
    nextRound();
  });

  socket.on('vote_email', ({ emailId, voteType }) => {
    if (roundStatus !== 'voting' || !currentTemplate || currentTemplate.id !== emailId) return;
    
    if (!playerVotes[socket.playerName]) playerVotes[socket.playerName] = {};
    if (playerVotes[socket.playerName][emailId]) return;

    playerVotes[socket.playerName][emailId] = voteType;
    
    const player = players[socket.playerName];
    if (player) {
      io.emit('player_voted', { name: player.name, emailId });
    }
  });

  socket.on('click_suspicious', ({ emailId, elementId }) => {
    if (roundStatus !== 'voting') return;
    const player = players[socket.playerName];
    if (!player) return;

    const template = templates.find(t => t.id === emailId);
    if (template) {
      const isFakeDomain = elementId === `fake_domain_${emailId}` && template.type === 'phishing';
      if (template.suspiciousElements.includes(elementId) || isFakeDomain) {
        if (!player.clickedElements.includes(elementId)) {
          player.clickedElements.push(elementId);
          player.score += 25; 
          socket.emit('point_awarded', { points: 25, reason: 'Alvo Suspeito Encontrado!' });
          broadcastState(); 
        }
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    if (socket.playerName && players[socket.playerName]) {
      players[socket.playerName].connected = false;
      broadcastState();
    }
  });
});

function nextRound() {
  if (timerInterval) clearInterval(timerInterval);

  if (pendingEmails.length === 0) {
    roundStatus = 'finished';
    currentTemplate = null;
    broadcastState();
    return;
  }

  currentTemplate = pendingEmails.shift();
  sessionInbox.push(currentTemplate);
  roundStatus = 'voting';
  timeLeft = 35; // 35 SEGUNDOS por e-mail!
  
  const isFirst = sessionInbox.length === 1;
  io.emit('new_inbox_email', { isFirst }); 
  broadcastState();

  timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      revealRound();
    } else {
      io.emit('time_tick', timeLeft);
    }
  }, 1000);
}

function revealRound() {
  roundStatus = 'reveal';
  
  for (const [socketId, votesMap] of Object.entries(playerVotes)) {
    if (players[socketId]) {
      const playerVote = votesMap[currentTemplate.id] || 'none'; 
      
      if (playerVote === 'escalate') {
        players[socketId].score += 10;
      } else if (playerVote === currentTemplate.type) {
        players[socketId].score += 50;
      } else if (playerVote !== 'none') {
        players[socketId].score -= 20;
      }
    }
  }

  const resultData = {
    id: currentTemplate.id,
    correctType: currentTemplate.type,
    subject: currentTemplate.subject,
    explanation: currentTemplate.explanation
  };

  broadcastState();
  io.emit('reveal_single_result', resultData);

  setTimeout(() => {
    nextRound();
  }, 8000);
}

app.use(express.static('public'));

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Master Server Emulator running on port ${PORT}`);
});
