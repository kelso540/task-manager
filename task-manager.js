class TimeRef {
    constructor(){
        this.timeNow = new Date();
        this.timeList = this.timeNow.toString().split(" "); 
    }
}

const HTML = {
    mainList: document.querySelector('.list'),
    plusIcon: document.querySelector('.plusIcon'),
    addTaskDiv: document.querySelector('.displayNone'),
    addTaskButton: document.querySelector('.addTaskButton'), 
    inputBox: document.querySelector('.inputBox'), 
    closeX: document.querySelector('.closeX'), 
    startListText: document.querySelector('.startListText'),  
    deleteDiv: document.querySelector('.deleteDiv'),
    deleteBtn: document.querySelector('.deleteBtn'),
}

const P = {
    mainArray: [],
    date:  new TimeRef(),
    timeDate: '',
    count: 0,
}

const getAMOrPM12Hr = (time) => {
    let cut = time.timeList[4].toString().split(":");
    let amPM = "AM";
    let zero = "0";  
    if (cut[0] < 12){ 
        amPM = "AM";
      }
      if (cut[0] >= 12){
      amPM = "PM";
      cut[0] -= 12;
      if(cut[0] < 10){
          cut[0] = zero + cut[0];
      }
      }
      if(cut[0] <= 0){
        cut[0] = 12; 
      }
    P.timeDate = cut[0] + ":" + cut[1] + " " + amPM; 
}

getAMOrPM12Hr(P.date);

const showAddInputDiv = () => { 
    HTML.addTaskDiv.classList.remove('displayNone'); 
    HTML.addTaskDiv.classList.add('addTaskDiv'); 
}

const closeAddInputDiv = () => {
    HTML.addTaskDiv.classList.remove('addTaskDiv'); 
    HTML.addTaskDiv.classList.add('displayNone');  
}

const addListItem = () => {
    const mainDiv =  document.createElement('div'); 
    const listDiv =  document.createElement('div'); 
    const timeDiv =  document.createElement('div');
    const labelElement =  document.createElement('label');
    const strongElement =  document.createElement('strong'); 
    const h2Element =  document.createElement('h4');
    mainDiv.className = `item mainDiv${P.count}`; 
    listDiv.className = 'checkAndNameDiv'; 
    labelElement.className = `check bullet${P.count}`;
    labelElement.setAttribute('onclick', `changeBullet(${P.count})`); 
    strongElement.className = `listName itemName${P.count}`; //add P.count to differentiate between bullet and date div list items.
    h2Element.className = `time itemTime${P.count}`;
    strongElement.innerHTML = HTML.inputBox.value;
    timeDiv.className = 'listItemDiv'; 
    h2Element.innerHTML = 'Created on: ' + P.date.timeList[0] + ' ' + P.date.timeList[1] + ' ' + P.date.timeList[2] + ' ' + P.date.timeList[3] + ' at ' + P.timeDate; 
    listDiv.append(labelElement, strongElement); 
    timeDiv.append(h2Element); 
    mainDiv.append(listDiv, timeDiv); 
    HTML.mainList.appendChild(mainDiv); 
    HTML.addTaskDiv.classList.remove('addTaskDiv'); 
    HTML.addTaskDiv.classList.add('displayNone');
    HTML.inputBox.value = '';
    P.count++;
    HTML.startListText.style.display = "none";
    HTML.mainList.scrollTo(0, document.body.scrollHeight); 
}

const changeBullet = (value) => {
    const main = document.querySelector(`.mainDiv${value}`); 
    const bullet = document.querySelector(`.bullet${value}`); 
    const text = document.querySelector(`.itemName${value}`);
    const time = document.querySelector(`.itemTime${value}`);
    main.classList.toggle('deleteMe'); 
    bullet.classList.toggle('checkMark');
    text.classList.toggle('lineThrough');
    time.classList.toggle('lineThrough');
    HTML.deleteDiv.style.opacity = '1'; 
    const checkedItems = document.querySelectorAll('.deleteMe');
    console.log(checkedItems.length);
    if(checkedItems.length < 1){
        HTML.deleteDiv.style.opacity = '0';
    } 
}

const deleteListItems = () => {
    const checkedItems = document.querySelectorAll('.deleteMe');
    for(let i = 0; i < checkedItems.length; i++){
        HTML.mainList.removeChild(checkedItems[i]); 
    }
    if(checkedItems.length >= 0){
        HTML.deleteDiv.style.opacity = '0';
    }
    const listLength = document.querySelectorAll('.item'); 
    console.log(listLength.length);
    if(listLength.length <= 0){
        HTML.startListText.style.display = "block";
    }
}

HTML.plusIcon.addEventListener('click', showAddInputDiv); 
HTML.addTaskButton.addEventListener('click', addListItem);
HTML.addTaskDiv.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        event.preventDefault(); //if event is interrupted early this will cancel the function. 
        addListItem();  
    }
}); 
HTML.closeX.addEventListener('click', closeAddInputDiv); 
HTML.deleteBtn.addEventListener('click', deleteListItems);