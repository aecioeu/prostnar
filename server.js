const express = require('express');
const path = require('path');
const axios = require('axios');
const sendPixelData  = require('./functions')

const app = express();
const port = 3001;

// Serve os arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal que vai servir o 'index.html'
/*app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});*/



/*
  
  url de testes
 ?
  CampaignID=987654321&adSETID=123456789&
  CreativeID=123456789&
  click_id=piXV6SmQBRfkrqCkCUZE9w
  &pixel_id=261835590859611
  
  */
  app.get('/obrigado', async (req, res) => {
    try {
      sendPixelData(req, 'EVENT_ADD_TO_CART')
      res.sendFile(path.join(__dirname, 'public', 'thanks.html'));
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      res.status(500).json({ message: 'Erro ao enviar dados', error: error.message });
    }
  });
  

app.get('/*', async (req, res) => {
  try {
    sendPixelData(req, 'EVENT_CONTENT_VIEW')
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
    res.status(500).json({ message: 'Erro ao enviar dados', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});