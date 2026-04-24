
const quiz = [
 {q:"HTML stands for?", a:["Hyper Text Markup Language","Machine Learning","Programming"], c:0},
 {q:"CSS is used for?", a:["Structure","Design","Database"], c:1},
 {q:"JS is?", a:["Language","Database","Hardware"], c:0},
 {q:"React is?", a:["Framework","Language","Server"], c:0},
 {q:"UX means?", a:["User Experience","User Execute","System"], c:0},
 {q:"HCI focuses on?", a:["User","Hardware","Network"], c:0},
 {q:"HTML tag for link?", a:["a","p","div"], c:0},
 {q:"CSS property color?", a:["font","color","align"], c:1},
 {q:"Backend example?", a:["Node","HTML","CSS"], c:0},
 {q:"Database?", a:["MySQL","CSS","HTML"], c:0},

 {q:"JS keyword?", a:["let","color","div"], c:0},
 {q:"HTML image tag?", a:["img","src","pic"], c:0},
 {q:"CSS box model?", a:["Margin","Loop","Array"], c:0},
 {q:"UI means?", a:["User Interface","Unit Input","User Info"], c:0},
 {q:"Frontend?", a:["UI","Server","DB"], c:0},
 {q:"API?", a:["Interface","Code","Design"], c:0},
 {q:"Responsive?", a:["Flexible","Fixed","None"], c:0},
 {q:"Bootstrap?", a:["Framework","Language","Server"], c:0},
 {q:"Git?", a:["Version Control","DB","UI"], c:0},
 {q:"HTTP?", a:["Protocol","Language","App"], c:0}
];

let qi=0, score=0;

function loadQ(){
 document.getElementById("question").innerText=quiz[qi].q;
 document.getElementById("quizCount").innerText=`${qi+1}/20`;
 let html="";
 quiz[qi].a.forEach((x,i)=>{
  html+=`<button onclick="ans(${i})">${x}</button><br>`;
 });
 document.getElementById("answers").innerHTML=html;
}

function ans(i){
 if(i===quiz[qi].c) score++;
}

function nextQ(){
 qi++;
 if(qi<quiz.length) loadQ();
 document.getElementById("quizScore").innerText=score;
}

loadQ();


const words=["javascript","interface","database","algorithm","function","variable","frontend","backend","network","security",
"design","usability","accessibility","responsive","framework","component","system","software","hardware","application"];

let w=words[Math.floor(Math.random()*words.length)];

function scramble(word){
 return word.split('').sort(()=>0.5-Math.random()).join(' ');
}

document.getElementById("scrambled").innerText=scramble(w);

function checkScr(){
 let val=document.getElementById("scrInput").value;
 document.getElementById("scrResult").innerText=
 val===w?"Correct!":"Try Again";
}

const cards=[
 ["HTML","Structure of webpage"],
 ["CSS","Design and layout"],
 ["JS","Adds interactivity"],
 ["HCI","User interaction"],
 ["UX","User experience"],
 ["UI","User interface"],
 ["API","Communication"],
 ["DB","Stores data"],
 ["Git","Version control"],
 ["React","Frontend library"],
 ["Node","Backend runtime"],
 ["SQL","Database language"],
 ["HTTP","Protocol"],
 ["CSS Grid","Layout system"],
 ["Flexbox","Alignment tool"],
 ["DOM","Page structure"],
 ["Event","User action"],
 ["Function","Reusable code"],
 ["Loop","Repeat code"],
 ["Variable","Stores data"]
];

let ci=0, flipState=false;

function flip(){
 let card=document.getElementById("flashCard");
 card.innerText=flipState?cards[ci][0]:cards[ci][1];
 flipState=!flipState;
}

function nextCard(){
 ci=(ci+1)%cards.length;
 flipState=false;
 document.getElementById("flashCard").innerText=cards[ci][0];
}

document.getElementById("flashCard").innerText=cards[0][0];

const fill=[
 {q:"HTML is used to ___ structure",a:"create"},
 {q:"CSS is used to ___ design",a:"style"},
 {q:"JS makes site ___",a:"interactive"},
 {q:"Database stores ___",a:"data"},
 {q:"HCI focuses on ___",a:"user"},
 {q:"Frontend is ___ side",a:"client"},
 {q:"Backend is ___ side",a:"server"},
 {q:"API connects ___",a:"systems"},
 {q:"UX improves ___",a:"experience"},
 {q:"UI is visual ___",a:"design"},

 {q:"Git tracks ___",a:"changes"},
 {q:"HTTP is ___",a:"protocol"},
 {q:"CSS uses ___",a:"styles"},
 {q:"JS uses ___",a:"logic"},
 {q:"HTML uses ___",a:"tags"},
 {q:"Responsive means ___",a:"flexible"},
 {q:"Function is ___ code",a:"reusable"},
 {q:"Loop repeats ___",a:"code"},
 {q:"Variable stores ___",a:"value"},
 {q:"DOM represents ___",a:"document"}
];

let fi=0;

function loadFill(){
 document.getElementById("fillQ").innerText=fill[fi].q;
}

function checkFill(){
 let val=document.getElementById("fillInput").value.toLowerCase();
 document.getElementById("fillRes").innerText=
 val===fill[fi].a?"Correct!":"Try Again";
 fi=(fi+1)%fill.length;
 loadFill();
}

loadFill();
