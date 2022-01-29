
#include <ESP8266WiFi.h>        
#include <ESP8266WebServer.h>   
#include <ESP8266SSDP.h>        
#include <FS.h>                 
#include <ArduinoJson.h> 
#include <Wire.h>



IPAddress apIP(192, 168, 0, 176);

// Web интерфейс для устройства
ESP8266WebServer HTTP(80);
// Для файловой системы
File fsUploadFile;

// Определяем переменные wifi
String ssidAP = "АМГ \"Светлячок\"";   // SSID AP точки доступа
String passwordAP; 

//----- stateGlobal

int guiTypeFuel;
int guiRetentionTemp;
bool guiTermostat;

int widgetStatus;
int widgetTempFuel;
int widgetTempOut;
int widgetTempTermostat;
int widgetErrorStatus;

String networkTypeConnect;
String networkSSID;
String networkPassword;

String systemSerialNumber;
String systemVerA;
String systemVerB;
String systemPatch;

unsigned long oldTime;

//-----------------



void setup() {
  Serial.begin(19200);
  initI2c();
  FS_init(); //Запускаем файловую систему
  loadStageGlobal(); //Загружаем данные из JSON в глобальный обьект stateGlobal
  WIFIinit(); //Запускаем WIFI
  HTTP_init(); //Настраиваем и запускаем web server
  SSDP_init(); //Настраиваем и запускаем SSDP интерфейс
}

void loop() {
  HTTP.handleClient();
  serialMaster();
  i2cWatcher(0x01);
  termostat();
}
