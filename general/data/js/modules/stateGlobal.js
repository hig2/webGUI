const stateGlobal =  {
    gui: {
        typeFuel: null,
        retentionTemp: null,
        termostat: null,
    },
    
    widget: {
        status: null,
        tempFuel: 0,
        tempOut: 0,
        tempTermostat: 0,
        errorStatus: 0
    },

    network: {
        pullError: 0,
        updateUrl: 'http://update.kitkb.ru/',
        pullTime: 4000,
        typeConnect: null,
        ssid: null,
        password: null
    },

    system: {
        serialNumber: 'N/A',
        verA: 'N/A',
        verB: 'N/A',
        lastVerB: 'N/A'
    },

    patch: null

}