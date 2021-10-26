//Comunicação HTTP
#include <WiFi.h>;

//Acessar e enviar JSON para o Firebase
#include <IOXhop_FirebaseESP32.h>
#include <ArduinoJson.h>;


// Biblioteca DS18B20 Dallas Temperatura
#include <OneWire.h>
#include <DallasTemperature.h>

//               Pinos de acesso ao Esp32 ////////////////
#define DS18B20      15 // OK 

// Sensor de Temperatura DS18B20

//Instacia o Objeto oneWire e Seta o pino do Sensor para iniciar as leituras
OneWire oneWire(DS18B20);

//Repassa as referencias do oneWire para o Sensor Dallas (DS18B20)
DallasTemperature Sensor(&oneWire);

// Variavel para Armazenar os dados de Leitura
float leitura;

const char* ssid = "ssid";
const char* password = "pass";

#define FIREBASE_HOST "https://mapsprojeto01-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "BczpAb7pgl2apU8ndzQTdKqY87JlDJXaDdVKqQ1D"

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  WiFi.begin(ssid, password);
  Serial.print("Conetando no WiFi...");

  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(500);
  }

  Serial.println("\nConectado ao WiFi");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // Inicia o Sensor
  Sensor.begin();

  // Inicia o firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

void loop() {
    // Leitura do Sensor  DS18B20  //////////////
    Sensor.requestTemperatures();

     // Armazerna na variavel o valor da Leitura
    leitura          = Sensor.getTempCByIndex(0);
  
    if ((WiFi.status() == WL_CONNECTED))
    {
      Serial.println(leitura); //So funciona se fizer o print(???)
      //Firebase.pushFloat("/latitude", -26.915);
      //Firebase.pushFloat("/longitude", -48.666);
      Firebase.pushFloat("/temperatura", leitura); //Manda temperatura em push (está criando um obj. novo no BD, mudar "pushFloat(...)" para "setFloat(...)" se for atualizar um campo existen no BD)
    }
    else
    {
      Serial.println("Conexão perdida");
    }
    delay(10000);
}
