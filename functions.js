const axios = require('axios');

const ACCESS_TOKEN = "UQgW2zd02NaUL3Zpq6DclH5xJFe2BGQYi34uAKHOCtg"

async function sendPixelData(req, event) {
  // Pega os parâmetros da URL
  const { CampaignID, adSETID, CreativeID, click_id, pixel_id } = req.query;

  // Dados que serão enviados para a API
  const data = {
    access_token: ACCESS_TOKEN,
    clickid: click_id,
    event_name: event,
    is_attributed: 1,
    mmpcode: 'PL',
    pixelId: pixel_id,
    pixelSdkVersion: '9.9.9',
    properties: JSON.stringify({
      content_id: CreativeID,
      content_type: 'product',
      content_name: 'Pagina de Captura' // Substitua conforme necessário
    }),
    testFlag: false,
    // third_party: 'shopline', // Descomente se necessário
    trackFlag: true  
  };

  try {
    // Envia a requisição para a API do Kwai
    const response = await axios.post('https://www.adsnebula.com/log/common/api', data, {
      headers: {
        'accept': 'application/json;charset=utf-8',
        'Content-Type': 'application/json'
      }
    });

    console.log('Dados enviados com sucesso:', response.data);
    return response.data; // Retorna a resposta da API
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
    throw new Error('Erro ao enviar dados para a API do Kwai');
  }
}

module.exports = sendPixelData; // Exporta a função para uso em outras partes do aplicativo
