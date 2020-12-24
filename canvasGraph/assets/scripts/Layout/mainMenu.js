//macros
function el(elementName){let el = document.getElementById(elementName);if (el){return el;} else{ return document.getElementsByClassName(elementName);}}

let dropDownButtons = el('btn-sm dropdown-toggle');

let menuGraph = dropDownButtons[0];
let menuLook = dropDownButtons[1];
let menuConnect = dropDownButtons[2];

let matrixAdjButton = el('ShowAdjacencyMatrix');
let randomGraphButton = el('RandomGraph')
let matrixAdjModal = el('modal')[0];
let randomGraphModal = el('modal')[1];
let matrixInputClose = el('close');
let activeModal;

function FindActiveButton(){
    let stack = [];
    for (let i = 0; i < dropDownButtons.length; i++) {
        if (dropDownButtons[i].nextSibling.nextSibling.className.indexOf("active")!==-1){
            stack.push(i);
        }
    }
    return stack;
}


let showHide = function (elem ) {
    let elCn = elem.className;
    if (elCn === 'dropdown-menu') {
        elem.className += "-active";

    } else {
        elem.className = 'dropdown-menu';
    }
}

export let HideAll = function (){
    let elem;
    let elCn;

    const btn = FindActiveButton();
    if (btn.length !== -1){
        elem = dropDownButtons[btn[btn.length-1]].nextSibling.nextSibling;
        elCn = elem.className;
        if (elCn === 'dropdown-menu-active'){
            elem.className = 'dropdown-menu';
        }
    }
}

let switchDropDown = function (){
    const stack = FindActiveButton();
    if (stack.length>0){
        HideAll();
    }
}

let showHideModal = function (elem) {
    let elCn = elem.className;
    if (elCn === 'modal') {
        elem.className += "-active";
    } else {
        elem.className = 'modal';
    }
}

document.addEventListener('keydown', function (e){
    if (e.code === 'Escape'){
        HideAll();
    }
});

menuGraph.addEventListener('click', function (){
    switchDropDown();
    showHide(menuGraph.nextSibling.nextSibling);
}, false);
menuLook.addEventListener('click', function (){
    switchDropDown();
    showHide(menuLook.nextSibling.nextSibling);
}, false);
menuConnect.addEventListener('click', function (){
    switchDropDown();
    showHide(menuConnect.nextSibling.nextSibling);
}, false);


matrixAdjButton.addEventListener('click', function (){
    activeModal = matrixAdjModal;
    showHideModal(matrixAdjModal);
    HideAll();
}, false);

randomGraphButton.addEventListener('click', function (){
    activeModal = randomGraphModal;
    showHideModal(randomGraphModal);
    HideAll();
}, false);

for (let i = 0; i < matrixInputClose.length; i++) {
    matrixInputClose[i].addEventListener('click', function (){
        showHideModal(activeModal);
    },false)
}

