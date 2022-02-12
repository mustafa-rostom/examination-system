

var question=document.getElementById('question');
var answer1=document.getElementById('answer1');
var answer2=document.getElementById('answer2');
var answer3=document.getElementById('answer3');
var answer4=document.getElementById('answer4');
var radio1=document.getElementById('1');
var radio2=document.getElementById('2');
var radio3=document.getElementById('3');
var radio4=document.getElementById('4');
var pageNumber=document.getElementById('pageNo');
var next=document.getElementById('next');
var previous=document.getElementById('previous');
previous.style.display='none';
var mark=document.getElementById('mark');
var timer=document.getElementById('timer');

function Question(id, content, answers) {
    this.qId = id;
    this.qContent = content;
    this.qAnswers = answers;
}

function Answer(id, content, v) {
    this.aId = id;
    this.aContent = content;
    this.value = v;
}
var questions = [new Question(1, 'What is the name of the player who guards the goal?', [new Answer(1, 'Goalkeeper', true), new Answer(2, 'Defender', false), new Answer(3, 'centre forward', false), new Answer(4, 'shot stopper', false)]),
new Question(2, 'How many teams play in the Premier League?', [new Answer(1, '12', false), new Answer(2, '21', false), new Answer(3, '20', true), new Answer(4, '44', false)]),
        new Question(3, 'What do you usually use to move the football? ', [new Answer(1, 'Bum', false), new Answer(2, 'A stick', false), new Answer(3, 'Foot', true), new Answer(4, 'Mind control', false)]),
        new Question(4, "Who's the GOAT?", [new Answer(1, 'Mustafa Rostom', false), new Answer(2, 'Lionel Messi', true), new Answer(3, 'Mo Salah', false), new Answer(4, 'Samir Kamona', false)]),
        new Question(5,'On which part of the pitch does the goalkeeper play?',[new Answer(1,'In front of the goal',true),new Answer(2,'Inside a burger van',false),new Answer(3,'The middle of pitch'),new Answer(4,'On the stadium roof')])
        ];
        
var cloneQuestions=[...questions];
localStorage.setItem('total', String(questions.length));
var resArr=new Array();
setInterval(function(){
    
    timer.value+=1;
    if(timer.value==timer.max){
        var finalResult=0;
        for(var i=0;i<resArr.length;i++){
            if(resArr[i]['aval']==true){
                finalResult+=1;
            }
        }      
        localStorage.setItem('result',String(finalResult));
        window.location.replace('../lastPage/timeOut.html');
    }
},1000  )

var randomArr = new Array;
        function createRandom() {
            while (cloneQuestions.length != 0) {
                randIndex = Math.floor(Math.random() * (cloneQuestions.length));
                for (i = 0; i < cloneQuestions.length; i++) {
                    if (i == randIndex) {
                        randomArr.push(cloneQuestions[i]);
                        cloneQuestions.splice(i, 1);
                    }
                }
            }
            console.log('ended');
        }

        //index variable to navigate between questions
        var index = 0;

        //display next question
        function displayQuestion(event) {
            //clean checked answer
            cleanInputs();

            //on next click
            if (event.target.attributes.getNamedItem('id').value === 'next') {
                //next question
                index += 1;
                //mark button check
                for (i = 0; i < resArr.length; i++) {
                    if (resArr[i]['qid'] == randomArr[index]['qId']) {
                        var checkedRadio = document.getElementById('' + resArr[i]['aid']);
                        checkedRadio.checked = true;
                    }
                }
                var flag = false;
                for (i = 0; i < markedQuestions.length; i++) {
                    if (randomArr[index]['qId'] == markedQuestions[i]) {
                        flag = true
                        markButton.value = 'Remove Mark'
                    }
                }
                if (flag == false) {
                    markButton.value = 'Mark'
                }
                pageNumber.innerHTML = String(index + 1);
                question.innerHTML = `Q` + String(index + 1) + `/ ` + randomArr[index]['qContent'];
                answer1.innerHTML = randomArr[index]['qAnswers'][0]['aContent'];
                answer2.innerHTML = randomArr[index]['qAnswers'][1]['aContent'];
                answer3.innerHTML = randomArr[index]['qAnswers'][2]['aContent'];
                answer4.innerHTML = randomArr[index]['qAnswers'][3]['aContent'];
                if (index == (randomArr.length - 1)) {
                    next.style.display = 'none';
                } else {
                    next.style.display = 'inline-block';
                    previous.style.display = 'inline-block';
                }
                //on previous click
            } else if (event.target.attributes.getNamedItem('id').value === 'previous') {
                index -= 1;
                for (i = 0; i < resArr.length; i++) {
                    if (resArr[i]['qid'] == randomArr[index]['qId']) {
                        var checkedRadio = document.getElementById('' + resArr[i]['aid']);
                        checkedRadio.checked = true;
                    }
                }
                //mark button check
                var flag = false;
                for (i = 0; i < markedQuestions.length; i++) {
                    if (randomArr[index]['qId'] == markedQuestions[i]) {
                        flag = true
                        markButton.value = 'Remove Mark'
                    }
                }
                if (flag == false) {
                    markButton.value = 'Mark'
                }
                pageNumber.innerHTML = String(index + 1);
                question.innerHTML = `Q` + String(index + 1) + `/ ` + randomArr[index]['qContent'];
                answer1.innerHTML = randomArr[index]['qAnswers'][0]['aContent'];
                answer2.innerHTML = randomArr[index]['qAnswers'][1]['aContent'];
                answer3.innerHTML = randomArr[index]['qAnswers'][2]['aContent'];
                answer4.innerHTML = randomArr[index]['qAnswers'][3]['aContent'];
                if (index == 0) {
                    previous.style.display = 'none';
                } else {
                    previous.style.display = 'inline-block';
                    next.style.display = 'inline-block';
                }
            } else {
                return 0;
            }
        }

        markedQuestions = new Array;
        var marked = document.getElementById('marked');
        var markButton = document.getElementById('mark')
        function addToMarked() {
            var flag = false;
            if (markButton.value == 'Mark') {
                markButton.value = 'Remove Mark'
                for (i = 0; i < markedQuestions.length; i++) {
                    if (randomArr[index]['qId'] == markedQuestions[i]) {
                        flag = true;
                    }
                }
                if (flag == false) {
                    markedQuestions.push(randomArr[index]['qId']);
                    marked.innerHTML += "<div class='marked-question' ><input type='button' class='qTitle' id=" + randomArr[index]['qId'] + " value='Question " + (index + 1) + "'onclick='displayMarked(event)'></div>"
                }
            } else {
                if (markButton.value == 'Remove Mark') {
                    for (i = 0; i < markedQuestions.length; i++) {
                        if (markedQuestions[i] == randomArr[index]['qId']) {
                            markedQuestions.splice(i, 1);
                            var removalble = document.getElementById("" + randomArr[index]['qId']);
                            removalble.parentNode.remove();
                        }
                    }
                }
                markButton.value = 'Mark'
            }

        }

        function displayMarked(event) {
            cleanInputs();
            var questionID = Number(event.target.attributes.getNamedItem('id').value);
            for (i = 0; i < resArr.length; i++) {
                if (resArr[i]['qid'] == questionID) {
                    var checkedRadio = document.getElementById('' + resArr[i]['aid']);
                    checkedRadio.checked = true;
                }
            }
            for (i = 0; i < randomArr.length; i++) {
                var flag = false;
                for (j = 0; j < markedQuestions.length; j++) {
                    if (markedQuestions[i] == questionID) {
                        markButton.value = 'Remove Mark'
                        flag = true;
                    }
                }
                if (randomArr[i]['qId'] == questionID) {
                    if (i == 0) {
                        previous.style.display = 'none';
                        next.style.display = 'inline-block';
                    } else if (i == (randomArr.length - 1)) {
                        next.style.display = 'none';
                        previous.style.display = 'inline-block';
                    } else {
                        previous.style.display = 'inline-block';
                        next.style.display = 'inline-block';
                    }
                    pageNumber.innerHTML = String(i + 1);
                    question.innerHTML = `Q` + String(i + 1) + `/ ` + randomArr[i]['qContent'];
                    answer1.innerHTML = randomArr[i]['qAnswers'][0]['aContent'];
                    answer2.innerHTML = randomArr[i]['qAnswers'][1]['aContent'];
                    answer3.innerHTML = randomArr[i]['qAnswers'][2]['aContent'];
                    answer4.innerHTML = randomArr[i]['qAnswers'][3]['aContent'];
                    index = i;
                }
            }
        }
        var resArr = new Array;
        function submitAnswer(checked) {
            var flag = false;
            for (i = 0; i < resArr.length; i++) {
                if (resArr[i]['qid'] == randomArr[index]['qId']) {
                    resArr[i]['aval'] = randomArr[index]['qAnswers'][checked.value]['value'];
                    resArr[i]['aid'] = randomArr[index]['qAnswers'][checked.value]['aId'];
                    flag = true;
                }
            }
            if (flag == false) {
                resArr.push({ qid: randomArr[index]['qId'], aval: randomArr[index]['qAnswers'][checked.value]['value'], aid: randomArr[index]['qAnswers'][checked.value]['aId'] })
            }
        }

        function cleanInputs() {
            radio1.checked = false;
            radio2.checked = false;
            radio3.checked = false;
            radio4.checked = false;
        }

        function viewResult() {
            var finalResult = 0;
            for (i = 0; i < resArr.length; i++) {
                if (resArr[i]['aval'] == true) {
                    finalResult += 1;
                }
            }
            localStorage.setItem('result', String(finalResult));
            location.replace('../lastPage/result.html');
        }
        //calling (createRandom) to create random question order
        createRandom();
        //first question to display
        question.innerHTML = `Q1/ ` + randomArr[0]['qContent'];
        answer1.innerHTML = randomArr[0]['qAnswers'][0]['aContent'];
        answer2.innerHTML= randomArr[0]['qAnswers'][1]['aContent'];
        answer3.innerHTML = randomArr[0]['qAnswers'][2]['aContent'];
        answer4.innerHTML = randomArr[0]['qAnswers'][3]['aContent'];

    