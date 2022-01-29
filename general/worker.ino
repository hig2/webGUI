
String getGlobalStageJson() {
  String json = "{";
  json += "\"typeFuel\":";
  json += guiTypeFuel;
  json += ",\"retentionTemp\":";
  json += guiRetentionTemp;
  json += ",\"termostat\":";
  json += guiRetentionTemp;

  json += ",\"status\":";
  json += widgetStatus;
  json += ",\"tempFuel\":";
  json += widgetTempFuel;
  json += ",\"tempOut\":";
  json += widgetTempOut;
  json += ",\"tempTermostat\":";
  json += widgetTempTermostat;
  json += ",\"errorStatus\":";
  json += widgetErrorStatus;

  json += ",\"ssid\":\"";
  json += networkSSID;
  json += "\",\"password\":\"";
  json += networkPassword;
  json += "\",\"typeConnect\":\"";
  json += networkTypeConnect;

  json += "\",\"serialNumber\":\"";
  json += systemSerialNumber;
  json += "\",\"verA\":\"";
  json += systemVerA;
  json += "\",\"verB\":\"";
  json += systemVerB;
  json += "\",\"patch\":";
  json += systemPatch;
  
  json += "}";
  
  return json; 
}

String getPullAnswer() {
  String json = "{";
  json += "\"status\":";
  json += widgetStatus;
  json += ",\"tempFuel\":";
  json += widgetTempFuel;
  json += ",\"tempOut\":";
  json += widgetTempOut;
  json += ",\"tempTermostat\":";
  json += widgetTempTermostat;
  json += ",\"errorStatus\":";
  json += widgetErrorStatus;
  json += "}";

  return json; 
}
