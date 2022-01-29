
//Предназначен для автоматической работы табов в любом количестве
//hasDefaultActiveId('имя_группы', 1) меняет активный таб 'группы' по умолчанию 


window.addEventListener("DOMContentLoaded", ready);
function ready() {

    class State {
        constructor() {
            this.stateObject = this.startObject;
        }

        get allTabs() {
            const allTabs = document.querySelectorAll('[role="tabList"]');
            let allTabsList = []
            allTabs.forEach((el)=> allTabsList = [`${el.id}`, ...allTabsList]);
            return allTabsList;
        }

        get startObject() {
            const preset = {
                defaultActiveId : 0,
                activeNavName : null,
                lastIdList : null
            }
            const result = this.allTabs.reduce((acc, el)=> acc = {...acc, [el]: Object.assign({}, preset)}, {});
            return result;
        }

        hasDefaultActiveId(idTabList, newId) {
            if(!idTabList || !newId) return this;
            const elementList = document.querySelectorAll(`#${idTabList} .nav-link`);
            const newElement = elementList[newId];
            this.stateObject[idTabList].defaultActiveId = newId;
            this.stateObject[idTabList].activeNavName = newElement.id;
            return this;
        }
  
        get activeState() {
            const keys = Object.keys(this.stateObject)
            keys.forEach((el)=> {
                const elementList = document.querySelectorAll(`#${el} .nav-link`);
                const objectState = this.stateObject[el];
                const activeElement = elementList[objectState.defaultActiveId];
                watch(state.stateObject[el], 'activeNavName', this.runActive ); // ватчер смотрит за выделенным состоянием
                objectState.lastIdList = elementList.length - 1;
                objectState.activeNavName = activeElement.id;
                this.controller();
            })
        }
        
        runActive() {
            const doc = document;
            const elementNav = doc.getElementById(`${this.activeNavName}`);
            const typeName = elementNav.parentNode.parentNode.id;
            const elementTab = doc.querySelector(`[data-tab='${typeName}'] #${elementNav.id}`);
            const navList = doc.querySelectorAll(`#${typeName} .nav-link`)
            const tabList = doc.querySelectorAll(`[data-tab='${typeName}'] .tab-pane`);
            navList.forEach((el)=> el.classList.remove('menu__nav-link_active'));
            tabList.forEach((el)=> el.classList.remove('active'));
    
            elementNav.classList.add('menu__nav-link_active');
            elementTab.classList.add('active');
        }

        controller() {
            const navList = document.querySelectorAll('.nav-link');
            navList.forEach((el)=> el.addEventListener('click', (e)=> {
                e.preventDefault();
                const elementName = e.target.id;
                const elementParentName = e.target.parentNode.parentNode.id;
                this.stateObject[elementParentName].activeNavName = elementName;
            }))
        }
        
    }

    const state = new State();
    state.activeState; // включаем обьект

}















