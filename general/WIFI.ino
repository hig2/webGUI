void WIFIinit(){
  //Serial.print("Type connect: ");
  //Serial.println(networkTypeConnect);
  //Serial.print("SSID: ");
  //Serial.println(networkSSID);
  //Serial.print("Password: ");
  //Serial.println(networkPassword);
  
  StartAPMode();
  /*
  if(networkTypeConnect == "sta"){
    WiFi.mode(WIFI_STA); // Попытка подключения к станции
    delay(100);
    byte tries = 20;
    delay(100);
    WiFi.begin(networkSSID.c_str(), networkPassword.c_str());
    // Делаем проверку подключения до тех пор пока счетчик tries
    // не станет равен нулю или не получим подключение
    while (--tries && WiFi.status() != WL_CONNECTED){
      Serial.print(".");
      delay(1000);
    }
    delay(100);
    if (WiFi.status() != WL_CONNECTED){
      // Если не удалось подключиться запускаем в режиме AP
      Serial.println("");
      Serial.println("WiFi up AP");
      StartAPMode();
      networkTypeConnect = "ap"; // если не удалось подключится по sta ставим статус ap для коректного отображения в панели управления
    }
    else {
      // Иначе удалось подключиться отправляем сообщение
      // о подключении и выводим адрес IP
      Serial.println("");
      Serial.println("WiFi connected");
      Serial.println("IP address: ");
      Serial.println(WiFi.localIP());
    }
  }else {
    //Serial.println("");
    //Serial.println("WiFi up AP");
    //StartAPMode();
  }
  */
}

void StartAPMode(){ 
  // Отключаем WIFI
  //WiFi.disconnect();
  // Меняем режим на режим точки доступа
  WiFi.mode(WIFI_AP);
  // Задаем настройки сети
  WiFi.softAPConfig(apIP, apIP, IPAddress(255, 255, 255, 0));
  // Включаем WIFI в режиме точки доступа с именем и паролем
  // хронящихся в переменных _ssidAP _passwordAP
  WiFi.softAP(ssidAP.c_str(), passwordAP.c_str());
}
