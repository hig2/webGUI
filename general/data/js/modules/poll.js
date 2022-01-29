
window.addEventListener("load", start);

stateGlobal.eventPull = new Kubik(pull, stateGlobal.network.pullTime);

async function pull() {
    const result = await postData('/pull');
    if(result === 'error') {
        stateGlobal.network.pullError += 1;      
    }else {
        upgradeStateGlobal(stateGlobal, result);   
    }
}

async function start() {
   const result = await postData('/start');
   if(result === 'error') {
        stateGlobal.network.pullError += 1;      
        setTimeout(start, 4000);
   }else {
        upgradeStateGlobal(stateGlobal, result);
        lastVersion();
        setTimeout(()=> {
            const doc = document;
            doc.querySelector('.load').style.display = 'none';
            doc.querySelector('.wrapper').style.opacity = 1;
            stateGlobal.eventPull.run();
        },2000);
   }

}

async function lastVersion() {
    const url = new URL('last_version', stateGlobal.network.updateUrl);
    const test = 'http://update.kitkb.ru/last_version';
    const result = await postData(test);
    console.log(`Result: ${result}`);
    if(result === 'error') {
        stateGlobal.network.pullError += 1;      
    }else {
        stateGlobal.network.lastVerB = result.verB;
    }
}

async function saveBurnerConfig() {
    const result = await postData('/burner', stateGlobal.gui);

    if(result === 'error') {
        stateGlobal.network.pullError += 1;      
    }else{

    }
}

async function updatePatch() {
    const url = new URL('update', stateGlobal.network.updateUrl);
    const result = await postData(url, stateGlobal.system.serialNumber);

    if(result === 'error') {
        stateGlobal.network.pullError += 1;      
    }else {
        postData('/update', result);

        const doc = document;
        doc.querySelector('.load__text').textContent = 'Перезагрузка...';
        doc.querySelector('.wrapper').style.opacity = 0;
        setTimeout(()=>{
            doc.querySelector('.load').style.display = 'block';
        },800);
    }
}


async function saveConnectConfig() {
    const result = await postData('/connect', stateGlobal.network);

    if(result === 'error') {
        stateGlobal.network.pullError += 1;      
    }else{
        const doc = document;
        doc.querySelector('.load__text').textContent = 'Перезагрузка...';
        doc.querySelector('.wrapper').style.opacity = 0;
        setTimeout(()=>{
            doc.querySelector('.load').style.display = 'block';
        },800);
    }

}


// общая функция запроса
    async function postData(url = '', data = {}) {
        const result = await fetch(url, {
            method: 'POST',
            mode: 'no-cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data),
        })
        console.log(`Status: ${result.status}`);

        if(result.ok) {
            return await result.json();
        }else {
            console.log(`Error! URL: ${url}`);
            console.log(await result.json());
            return 'error';
        }
    }

        // функция определения обекта 
    const isObject = (el)=> typeof el === 'object' && el !== null && !Array.isArray(el);


        // функция апгрейда глобального состояния
    function upgradeStateGlobal(state, donar) {
        if(!isObject(donar)) {
            console.error('Получен некорректный донар!');
            return;
        };
        const run = (element)=> {
            const keys = Object.keys(element);
            if(keys.length !== 0) {
                keys.forEach((el)=> {
                    if(isObject(element[el]) ){
                        run(element[el]);
                    } else if(donar.hasOwnProperty(el)) {
                            element[el] = donar[el];
                    }
                })
            }
        }
        run(state);
    }











