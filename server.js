const express = require('express');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Funções para manipular usuários
const getUsers = () => {
  try {
    const data = fs.readFileSync('users.json');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const saveUsers = (users) => {
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
};

// Funções para manipular eventos
const getEventos = () => {
  try {
    const data = fs.readFileSync('eventos.json');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const saveEventos = (eventos) => {
  fs.writeFileSync('eventos.json', JSON.stringify(eventos, null, 2));
};

// Cadastro de administrador
app.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).send('Nome, email e senha são obrigatórios');
  }

  const users = getUsers();
  const userExists = users.find(user => user.email === email);

  if (userExists) {
    return res.status(400).send('Administrador já cadastrado');
  }

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const newUser = {
      id: users.length + 1,
      nome,
      email,
      password: hashedPassword,
    };

    users.push(newUser);
    saveUsers(users);

    res.status(201).send('Administrador cadastrado com sucesso');
  } catch (error) {
    res.status(500).send('Erro ao cadastrar administrador');
  }
});

// Login do administrador
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email e senha são obrigatórios');
  }

  const users = getUsers();
  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(401).send('Credenciais inválidas');
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).send('Credenciais inválidas');
    }

    const token = jwt.sign({ userId: user.id }, 'segredo', { expiresIn: '1h' });
    res.json({ token });
  });
});

// Cadastro de eventos
app.post('/eventos', (req, res) => {
  const { nome_evento, data_evento, localizacao, imagem, adminId } = req.body;

  if (!nome_evento || !data_evento || !localizacao || !imagem || !adminId) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  const eventos = getEventos();

  const novoEvento = {
    id: eventos.length + 1,
    nome_evento,
    data_evento,
    localizacao,
    imagem,
    id_administrador: adminId,
  };

  eventos.push(novoEvento);
  saveEventos(eventos);

  res.status(201).json(novoEvento);
});

// Listar eventos por administrador
app.get('/eventos/:id_administrador', (req, res) => {
  const idAdministrador = parseInt(req.params.id_administrador, 10);
  const eventos = getEventos();
  const eventosFiltrados = eventos.filter(evento => evento.id_administrador === idAdministrador);

  if (eventosFiltrados.length === 0) {
    return res.status(404).json({ message: 'Nenhum evento encontrado para este administrador' });
  }

  res.status(200).json(eventosFiltrados);
});

// Atualizar evento (data ou localização)
app.put('/eventos/:eventoId', (req, res) => {
  const eventoId = parseInt(req.params.eventoId, 10);
  const { data_evento, localizacao } = req.body;

  if (!data_evento && !localizacao) {
    return res.status(400).json({ message: 'Pelo menos uma propriedade (data ou localização) deve ser fornecida' });
  }

  const eventos = getEventos();
  const eventoIndex = eventos.findIndex(evento => evento.id === eventoId);

  if (eventoIndex === -1) {
    return res.status(404).json({ message: 'Evento não encontrado' });
  }

  const eventoAtualizado = eventos[eventoIndex];

  if (data_evento) eventoAtualizado.data_evento = data_evento;
  if (localizacao) eventoAtualizado.localizacao = localizacao;

  eventos[eventoIndex] = eventoAtualizado;
  saveEventos(eventos);

  res.status(200).json(eventoAtualizado);
});

// Exclusão de evento
app.delete('/eventos/:eventoId', (req, res) => {
  const eventoId = parseInt(req.params.eventoId, 10);
  const eventos = getEventos();

  // Encontra o índice do evento a ser removido
  const eventoIndex = eventos.findIndex(evento => evento.id === eventoId);

  if (eventoIndex === -1) {
    return res.status(404).json({ message: 'Evento não encontrado' });
  }

  // Remove o evento do array
  eventos.splice(eventoIndex, 1);

  // Salva a lista de eventos atualizada
  saveEventos(eventos);

  res.status(200).json({ message: 'Evento excluído com sucesso' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
