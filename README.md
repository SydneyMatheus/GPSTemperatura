# Projeto de Aplicação de Sensores com Geolocalização e Temperatura
Trabalho realizado para a disiciplina de Tópicos Especiais em Integração Software Hardware. O objetivo do trabalho é explorar e entender mais sobre os sensores de geolocalização (GPS) e temperatura bem como a API do Google Maps.

Sensor de temperatura utilizado DS18B20.

Imagem referente a página na web que foi desenvolvida em HTML/CSS e NodeJS.
![](images/GPS_Temperatura.png)

Para fazer a comunicação entre o web-server e a ESP32 foi utilizado o firebase. Logo a ESP32 lia os dados fazia push destes e então o web-server via get recebia os mesmos para atualização do HTML. A parte referente ao GPS por problemas de hardware ainda não foi concluída, exceto pela aplicação da API, conforme imagem acima está ativa apontando para uma coordenada determinada.
