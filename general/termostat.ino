

void termostat(){
  const int gistTemp = 5;
  static unsigned long timerDef = 0;

  if(widgetTempTermostat > 90){
    widgetTempTermostat = 90;
  };

  
  if(widgetTempOut > widgetTempTermostat){
    buferComand[0] = 0; //останавливаем горелку

  }else if(widgetTempOut < (widgetTempTermostat - gistTemp)){ 
    if(widgetTempOut != 0){
        timerDef = millis();
        buferComand[0] = 1; // росжиг
    }else if((millis() - timerDef) > 300000){
      buferComand[0] = 27; // ошибка
    }
  }  
}
