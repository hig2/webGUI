

window.addEventListener("DOMContentLoaded", ready);
function ready() {

var statusChange = new Audio('../../sound/tweet_sent.mp3');
statusChange.preload = 'auto';



const showStatus = ()=> {
    const doc = document;
    const newStatus = stateGlobal.widget.status;
    const element = doc.querySelector('.status__label');
    const indicator = doc.querySelector('.status__lamp');
    const errorMessage = doc.querySelector('.status-wrapper');

    const lamp = doc.querySelector('.status__lamp');
    lamp.style.boxShadow = '0px 0px 0px 1px #e7a61a';
    setTimeout(()=>{
        lamp.style.boxShadow = '0px 0px 16px 0px #e7a61a';
    },300);

    switch(newStatus) {
        case 1:
            statusChange.play();  
            element.textContent = 'Ожидание';
            indicator.style.backgroundColor = '#ff0000';
            errorMessage.style.display = 'none';
        break
      
        case 2:
            statusChange.play(); 
            element.textContent = 'Прогрев'
            indicator.style.backgroundColor = '#ff6b00';
            errorMessage.style.display = 'none';
        break
      
        case 3:
            statusChange.play();
            element.textContent = 'Горение'
            indicator.style.backgroundColor = '#64b703';
            errorMessage.style.display = 'none';
        break
        case 4:
            statusChange.play();
            element.textContent = 'Авария'
            indicator.style.backgroundColor = '#ff0033';
            errorMessage.textContent =  getErrorStatus(); //'Сюда приделать функцию';
            errorMessage.style.display = 'block';
        break  
    }
}

const getErrorStatus = ()=>{
    switch(stateGlobal.widget.errorStatus) {
        case 1: return "Не удалось поджечь.";
        case 2: return "Не удалось заполнить бак топливом.";
        case 3: return "Перегрев топлива.";
        case 4: return "Горелка заблокирована! Свяжитесь с разработчиком.";
        case 5: return "Произошел клин насоса.";
        case 6: return "Разрыв обмена данными с пультом";
        case 7: return "Обрыв датчика температуры котла.";
        default: return "Ошибка не известна."; 
    }    
}


const showFuel = ()=> {
    return document.querySelector('.oil-temp__temp').textContent = stateGlobal.widget.tempFuel;
};
const showTempOut = ()=>{ 
    return document.querySelector('.termometr-temp__temp').textContent = stateGlobal.widget.tempOut;
};
const showTempTermostat = ()=> {
    return document.querySelector('.termostat-temp__temp').textContent = stateGlobal.widget.tempTermostat
};

const showTypeFuel = ()=> {
    const doc = document;
    const elementsList = doc.querySelectorAll('.typeFuel option')
    elementsList.forEach((el)=> el.removeAttribute('selected'));
    doc.querySelector(`.typeFuel [value='${stateGlobal.gui.typeFuel}']`).setAttribute('selected', 'selected');
}

const showRetentionTemp = ()=>{
    return document.querySelector('.retentionTemp').setAttribute('value', stateGlobal.gui.retentionTemp);
}
const showTermostat = ()=> {
    const element = document.querySelector('.termostat');
    stateGlobal.gui.termostat ? element.setAttribute('checked', 'checked') : element.removeAttribute('checked');
}

const showSSID = ()=> {
    const element = document.querySelector('.ssid');
    element.setAttribute('value', `${stateGlobal.network.ssid}`);
}

const showPassword = ()=> {
    const element = document.querySelector('.password');
    element.setAttribute('value', `${stateGlobal.network.password}`);
}

const showTypeConnect = ()=> {
    const doc = document;
    const element = stateGlobal.network.typeConnect;
    const elementPassword = doc.querySelector('.password');
    const elementSSID = doc.querySelector('.ssid');
    const elementsList = doc.querySelectorAll('.typeConnect option')
    elementsList.forEach((el)=> el.removeAttribute('selected'));
    doc.querySelector(`.typeConnect [value='${stateGlobal.network.typeConnect}']`).setAttribute('selected', 'selected');


    if(element === 'ap'){
        elementPassword.setAttribute('disabled', 'disabled');
        elementSSID.setAttribute('disabled', 'disabled');
        elementPassword.parentNode.parentNode.classList.add('disabled');
        elementSSID.parentNode.parentNode.classList.add('disabled');
    }else {
        elementPassword.removeAttribute('disabled');
        elementSSID.removeAttribute('disabled');
        elementPassword.parentNode.parentNode.classList.remove('disabled');
        elementSSID.parentNode.parentNode.classList.remove('disabled');
    }
}

const showVerB = ()=> {
    const element = document.getElementById('verB');
    element.textContent = stateGlobal.system.verB;
}

const showLastVerB = ()=> {
    const element = document.getElementById('lastVerB');
    element.textContent = stateGlobal.system.lastVerB;
}

const showPatchList = ()=> {
    const elementSelect = document.querySelector('.typeFuel');
    const keys = Object.keys(stateGlobal.patch);

    keys.forEach((el)=> {
        const newElement = document.createElement('option');
        newElement.setAttribute('value', el);
        newElement.textContent = stateGlobal.patch[el].fuelName;
        elementSelect.append(newElement);
    });

    showTypeFuel();
}


watch(stateGlobal.widget, 'status', showStatus);
watch(stateGlobal.widget, 'tempFuel', showFuel);
watch(stateGlobal.widget, 'tempOut', showTempOut);
watch(stateGlobal.widget, 'tempTermostat', showTempTermostat);
watch(stateGlobal.gui, 'retentionTemp', showRetentionTemp);
watch(stateGlobal.gui, 'termostat', showTermostat);
watch(stateGlobal.network, 'ssid', showSSID);
watch(stateGlobal.network, 'password', showPassword);
watch(stateGlobal.network, 'typeConnect', showTypeConnect);
watch(stateGlobal.system, 'verB', showVerB);
watch(stateGlobal.system, 'lastVerB', showLastVerB);
watch(stateGlobal, 'patch', showPatchList);



    
// элементы интерфейса 
const doc = document;
const typeFuel = doc.querySelector('.typeFuel');
const retentionTemp = doc.querySelector('.retentionTemp');
const termostat = doc.querySelector('.termostat');
const typeConnect = doc.querySelector('.typeConnect');
const buttonConnect = doc.querySelector('.buttonConnect');
const buttonBurner = doc.querySelector('.buttonBurner');
const inputPassword = doc.querySelector('.password');
const inputSSID = doc.querySelector('.ssid');
const buttonUpdate = doc.querySelector('.buttonUpdate');


// Контроллер 

const changeTypeFuel = (e)=> stateGlobal.gui.typeFuel = e.target.value;
const changeRetentionTemp = (e)=> stateGlobal.gui.retentionTemp = e.target.value;
const changeTermostat = (e)=> stateGlobal.gui.termostat = e.target.value === 'on' ? true : false;
const changeTypeConnect = (e)=> stateGlobal.network.typeConnect = e.target.value;
const changePassword = (e)=> stateGlobal.network.password = e.target.value;
const changeSSID = (e)=> stateGlobal.network.ssid = e.target.value;
const changeButtonConnect = (e)=> saveConnectConfig();
const changeButtonBurner = (e)=> saveBurnerConfig();
const changeButtonUpdate = (e)=> updatePatch();

typeFuel.addEventListener('change', changeTypeFuel);
retentionTemp.addEventListener('input', changeRetentionTemp);
termostat.addEventListener('change', changeTermostat);
typeConnect.addEventListener('change', changeTypeConnect);
inputSSID.addEventListener('change', changeSSID);
inputPassword.addEventListener('change', changePassword);
buttonConnect.addEventListener('click', changeButtonConnect);
buttonBurner.addEventListener('click', changeButtonBurner);
buttonUpdate.addEventListener('click', changeButtonUpdate);

}
