const express = require('express')

const router = express.Router()





let pessoas = [
    {
      id: 1,
      nome: 'Mateus',
      idade: 28,
      email: 'Mateus@email.com',
      telefone: '40028922'
    }
  ];
  
  // Recuperar todas as pessoas da lista
  app.get('/pessoas', (req, res) => {
    res.status(200).json(pessoas);
  });
  
  // Recuperar uma pessoa pelo id
  app.get('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
    if (!pessoa) {
      res.status(404).json({ message: 'Pessoa não foi encontrada' });
    } else {
      res.status(200).json(pessoa);
    }
  });
  
  // Adicionar pessoas
  app.post('/pessoas', (req, res) => {
    const novaPessoa = req.body;
    if (!novaPessoa.nome || !novaPessoa.idade || !novaPessoa.email || !novaPessoa.telefone) {
      res.status(400).json({ message: 'Todos os atributos são obrigatórios' });
    } else {
      novaPessoa.id = pessoas.length + 1;
      pessoas.push(novaPessoa);
      res.status(201).json(novaPessoa);
    }
  });
  
  // Atualizar 
  app.put('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = pessoas.findIndex(p => p.id === id);
    if (index === -1) {
      res.status(404).json({ message: 'Pessoa não encontrada' });
    } else {
      const pessoaAtualizada = req.body;
      if (!pessoaAtualizada.nome || !pessoaAtualizada.idade || !pessoaAtualizada.email || !pessoaAtualizada.telefone) {
        res.status(400).json({ message: 'Todos os atributos são obrigatórios' });
      } else {
        pessoas[index] = { id, ...pessoaAtualizada };
        res.status(200).json(pessoas[index]);
      }
    }
  });
  
  // Remove
  app.delete('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = pessoas.findIndex(p => p.id === id);
    if (index === -1) {
      res.status(404).json({ message: 'Pessoa não encontrada' });
    } else {
      pessoas.splice(index, 1);
      res.status(204).send();
    }
  });


module.exports = router