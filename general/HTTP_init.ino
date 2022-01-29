void HTTP_init(void) {
//Api
  HTTP.on("/start", startFun); //Start - стартовый запрос.  
  HTTP.on("/pull", pullFun); // Pull - запрос на мониторинг состояния. 
  HTTP.on("/connect", connectFun); // Connect - сохранение настроек.
  HTTP.on("/burner", burnerFun); // Burner - сохранение настроек.
  HTTP.on("/update", updateFun); // update - сохранение файла пресетов
  
  HTTP.begin(); // Запускаем HTTP сервер
}

// Функции API-Set

void startFun(){
  HTTP.send(200, "text/json", getGlobalStageJson());
}


void pullFun(){
  HTTP.send(200, "text/json", getPullAnswer());
}

void updateFun(){
  String json = HTTP.arg("plain");
  HTTP.send(200, "text/json", "{}");
  saveJson("patch", json);
  Serial.println("RESTART!");
  delay(1000);
  ESP.restart();
}


void connectFun() {
  String data = HTTP.arg("plain");
  HTTP.send(200, "text/json", "{}");
  StaticJsonBuffer<900> jsonBuffer;
  delay(100);
  JsonObject& network = jsonBuffer.parseObject(data);

  String ssid = network["ssid"].as<String>();
  String password = network["password"].as<String>();
  String typeConnect = network["typeConnect"].as<String>();

  String json = "{";
  json += "\"networkSSID\":\"";
  json += ssid;
  json += "\",\"networkPassword\":\"";
  json += password;
  json += "\",\"networkTypeConnect\":\"";
  json += typeConnect;
  json += "\"}";
  
  saveJson("network", json);
  Serial.println("RESTART!");
  delay(1000);
  ESP.restart();
}

void burnerFun(){
  String data = HTTP.arg("plain");
  StaticJsonBuffer<900> jsonBuffer;
  delay(100);
  JsonObject& burner = jsonBuffer.parseObject(data);

  String typeFuel = burner["typeFuel"].as<String>();
  String retentionTemp = burner["retentionTemp"].as<String>();
  String termostat = burner["termostat"].as<String>();

  String json = "{";
  json += "\"guiTypeFuel\":";
  json += typeFuel;
  json += ",\"guiRetentionTemp\":";
  json += retentionTemp;
  json += ",\"guiTermostat\":";
  json += termostat;
  json += "}";
  
  saveJson("burner", json);
  
  loadStageGlobal();
  HTTP.send(200, "text/json", getGlobalStageJson());
  
  Serial.println("Burner saved");
  
}
