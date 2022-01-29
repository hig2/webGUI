
bool saveJson(String fileName,String data) {    
  StaticJsonBuffer<900> jsonBuffer;
  JsonObject& json = jsonBuffer.parseObject(data);
    String path = {"/jornal/" + fileName + ".json"};                               
    File file = SPIFFS.open(path, "w");
    json.prettyPrintTo(file);                   // Записываем строку json в файл                                 
}

bool loadStageGlobal() {
  File file_1 = SPIFFS.open("/jornal/burner.json", "r");             // Открываем файл для чтения
  delay(50);
  StaticJsonBuffer<900> jsonBuffer;
  delay(50);
  JsonObject& burner = jsonBuffer.parseObject(file_1);
  guiTypeFuel = burner["guiTypeFuel"].as<int>();
  guiRetentionTemp = burner["guiRetentionTemp"].as<int>();
  guiTermostat = burner["guiTermostat"].as<int>();
  widgetTempTermostat  = guiRetentionTemp; // обновление виджета по загрузке из файла
  
  File file_2 = SPIFFS.open("/jornal/network.json", "r");             
  delay(50);
  JsonObject& network = jsonBuffer.parseObject(file_2);

  networkTypeConnect = network["networkTypeConnect"].as<String>();
  networkSSID = network["networkSSID"].as<String>();
  networkPassword = network["networkPassword"].as<String>();

  File file_3 = SPIFFS.open("/jornal/patch.json", "r");           
  delay(50);
  JsonObject& patch = jsonBuffer.parseObject(file_3); // выделяем патчь из джейсона


  systemVerB = patch["verB"].as<String>();
  systemPatch = patch["patch"].as<String>(); // переменная для передачи клиенту

  JsonObject& result = jsonBuffer.parseObject(systemPatch);

  String fireTask = result[String(guiTypeFuel)].as<String>();
  
  JsonObject& result_2 = jsonBuffer.parseObject(fireTask);
}
