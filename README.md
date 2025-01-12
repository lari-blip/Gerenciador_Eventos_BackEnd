<h2 align="left">Gerenciador de Eventos</h2>

###

<h3 align="left">Visão do produto</h3>

###

<h4 align="left">Este é o backend do Gerenciador de Eventos, responsável por fornecer serviços RESTful para autenticação, gerenciamento de administradores e eventos. Ele é projetado para integrar-se ao frontend desenvolvido com React e React Native.</h4>

###

<h2 align="left">Funcionalidades</h2>

###

<h4 align="left">Serviço de Login de Administrador</h4>

###

<p align="left">• Objetivo: Autenticar administradores.<br>Processo:<br>Verifica email e senha fornecidos.<br>Retorna um token JWT para autenticação nos demais serviços.</p>

###

<h4 align="left"></h4>

###

<h4 align="left">Serviço de Cadastro de Evento</h4>

###

<p align="left">• Objetivo: Permitir o registro de novos administradores.<br>Processo:<br>Recebe os dados de nome, email e senha.<br>Armazena a senha de forma criptografada para garantir a segurança.</p>

###

<h4 align="left">Serviço de Cadastro de Administrador</h4>

###

<p align="left">• Objetivo: Permitir que administradores registrem novos eventos.<br>Processo:<br>Recebe os seguintes dados:<br>Nome do Evento<br>Data<br>Localização<br>Imagem<br>adminId para associar o evento ao administrador<br>Salva o evento no banco de dados.</p>

###

<h4 align="left">Serviço de Cadastro de Evento</h4>

###

<p align="left">• Objetivo: Permitir que administradores registrem novos eventos.<br>Processo:<br>Recebe os seguintes dados:<br>Nome do Evento<br>Data<br>Localização<br>Imagem<br>adminId para associar o evento ao administrador<br>Salva o evento no banco de dados.</p>

###

<h4 align="left">Serviço de Atualização de Evento</h4>

###

<p align="left">• Objetivo: Atualizar informações de um evento existente.<br>Processo:<br>Permite modificar a data e/ou localização de um evento.<br>Usa o eventoId para identificar o evento</p>

###

<h4 align="left">Serviço de Exclusão de Evento</h4>

###

<p align="left">• Objetivo: Remover eventos cadastrados.<br>Processo:<br>Exclui o evento com base no eventoId.</p>

###

<h2 align="left">Como Executar o Projeto</h2>

###

<p align="left">Pré-requisitos:<br>Node.js instalado na máquina.<br>SpringBoot ou Visual Studio instalado.<br><br>Clone este repositório:<br><br>https://github.com/lari-blip/Gerenciador_Eventos_BackEnd.git<br><br>npm install<br>Inicie o servidor local:<br><br>node server.js</p>

###

<h2 align="left">Techs</h2>

###

<p align="left">Framework: Visual Studio<br>Autenticação: JWT<br>Criptografia: BCrypt para armazenamento seguro de senhas</p>

###

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg" height="40" alt="visualstudio logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" height="40" alt="spring logo"  />
</div>

###

<h4 align="left">Observação: Este backend é essencial para a funcionalidade completa da aplicação. Certifique-se de configurá-lo corretamente antes de executar o frontend.</h4>

###
