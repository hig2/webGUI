void SSDP_init(void) {
  HTTP.on("/description.xml", HTTP_GET, []() {
    SSDP.schema(HTTP.client());
  });
  //Если версия  2.0.0 закаментируйте следующую строчку
  SSDP.setDeviceType("upnp:rootdevice");
  SSDP.setSchemaURL("description.xml");
  SSDP.setHTTPPort(80);
  SSDP.setName(ssidAP);
  SSDP.setSerialNumber(systemSerialNumber);
  SSDP.setURL("/");
  SSDP.setModelName("Светлячок");
  SSDP.setModelNumber("004");
  SSDP.setModelURL("http://kitkb.ru/produktsiya/svetlyachok/");
  SSDP.setManufacturer("Кит КБ");
  SSDP.setManufacturerURL("http://www.kitkb.ru");
  SSDP.begin();
}
