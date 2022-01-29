
//Отвечает за сведенья об используймом устройсве 
//будет использована для определения является ли устройсво мобильным


const devaiceList = {
    mobile: [
        "Android",
        "webOS",
        "iPhone",
        "iPad",
        "iPod",
        "BlackBerry",
        "BB",
        "PlayBook",
        "IEMobile",
        "Windows Phone",
        "Kindle",
        "Silk",
        "Opera Mini"
    ]
}




export default class Devaice {
    constructor() {
        this.platform = navigator.platform;
        this.info = navigator.userAgent;    
    }
    
    get hasMobile() {
       const devaice = this.platform;
       return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(devaice)
    }
    //необходима придумать норлаьный способ парсинга а не это гавно  например с помощю indeOf и надо 
    // отталкиваться от метода платформ ибо парситьменьше и все же это субьективная проверка основным будет медиа запрос


}