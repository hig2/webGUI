
const int sdaPin = 4;
const int sclPin = 5;

void initI2c(){
   Wire.begin(sdaPin, sclPin);
   //Wire.setClock(100000); 
}


void i2cWatcher(int adress){
   Wire.requestFrom(adress, 1);
   while(Wire.available()){
    widgetTempOut = Wire.read();
    //Serial.println(widgetTempOut);
   }
}
