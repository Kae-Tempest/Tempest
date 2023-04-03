#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <DHT.h>
#include <ArduinoJson.h>
// #include <rgb_lcd.h>
#include <JSON.h>
DHT dht(2, DHT22);
// rgb_lcd LCD;

const char* mySSID = "Bbox-D78B31C8";
const char* mySecKey = "dgs964tvXzS2LQg97J";
String serverName = "http://192.168.1.28:5000/data/1";

void setup() {
    Serial.begin(9600);
    delay(100) ;
    WiFi.begin(mySSID, mySecKey) ;
    int tryNumber = 1 ;
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        if (++tryNumber > 20) {
            return ;
        }
    }
    dht.begin();

    
}

void loop() {
    if(WiFi.status() == WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;
      http.begin(client, serverName);
      http.addHeader("Content-Type", "application/json");
      int h = dht.readHumidity();
      int t = dht.readTemperature();
      DynamicJsonDocument doc(512);
      JsonObject dataDHT = doc.to<JsonObject>();
      dataDHT["temp"] = t;
      dataDHT["hum"] = h;
      String data;
      serializeJsonPretty(dataDHT, data);
      int httpResponseCode = http.POST(data);
      
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
   delay(300000);
  }
