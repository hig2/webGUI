
const int sdaPin = 4;
const int sclPin = 5;
int inArray[5];
int outArray[1];
int slaveAdress = 0x01;

void initI2c(){
   Wire.begin(sdaPin, sclPin);
   //Wire.setClock(100000); 
}

void masterTask(int timer){
  static unsigned long t = 0;
  if((millis() - t) > timer){
    t = millis();
    i2cArrayOutUpdater();
    read_I2C_master(slaveAdress);
    write_I2C_master(slaveAdress);
  }
}

void write_I2C_master(int slaveAdress){
  const int lenOutArray = sizeof(outArray) / sizeof(outArray[0]);
  const int lenWriteArray = (lenOutArray * 2) + 4;
  byte writeArray[lenWriteArray];
  long acc = 0;
  
  for(int i = 0; i < lenOutArray; i++ ){
    writeArray[i * 2] = (byte)outArray[i];
    writeArray[(i * 2) + 1 ] = (byte)(outArray[i] >> 8);
    acc += outArray[i];
  }
  
  for(int i = 0; i < 4; i++){
    writeArray[i +(lenOutArray * 2)] = i == 0 ? (byte) acc : (byte) (acc >> (i * 8));
  }

  
  Wire.beginTransmission(slaveAdress); 
  Wire.write(writeArray, lenWriteArray);
  Wire.endTransmission();     
}



bool read_I2C_master(int slaveAdress){
  const int lenInArray = sizeof(inArray ) / sizeof(inArray[0]);
  int bufferInArray[lenInArray];
  long crc = 0;
  long acc = 0;
  
  Wire.requestFrom(slaveAdress, (lenInArray * 2) + 4);
  while(int numBytes = Wire.available()){
    byte secondBuffer[numBytes];
    for(int i = 0; i < numBytes; i++){
      secondBuffer[i] = Wire.read();
    }

    for(int i = 0; i < lenInArray; i++){
        bufferInArray[i] = (((int)secondBuffer[(i * 2) + 1 ]) << 8 ) | secondBuffer[ i * 2];
        acc += bufferInArray[i];
    }

    for(int i = 0; i < 4; i++){
      crc = i == 0 ? secondBuffer[i + (lenInArray * 2)] : (((int)secondBuffer[i + (lenInArray * 2)]) << (8 * i)) | crc;
    } 

    if(acc == crc){
      for(int i = 0; i < lenInArray; i++){
        inArray[i] = bufferInArray[i];
        Serial.print(bufferInArray[i]);
        Serial.print(" ");
      }
      Serial.println("CRC: " + crc);
      i2cArrayInUpdater();
    }else{
      Serial.print("Ошибка crc: ");
      Serial.println(crc);
    }
  }   
}

void i2cArrayOutUpdater(){
  outArray[0] = guiRetentionTemp;
}


void i2cArrayInUpdater(){
  widgetErrorStatus = inArray[0]; // 
  widgetStatus = normalStatus(inArray[1]);
  widgetTempFuel = inArray[2];
  widgetTempOut = inArray[3];
  widgetTempTermostat = inArray[4];
}
