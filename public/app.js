const btn = document.getElementById("button");

btn.addEventListener('click', getResponse);

async function getResponse(){
    const inputText = document.getElementById('input').value;
    const parentDiv = document.getElementById('chat-area');

    if (inputText === ''){
        return
    }

    const question = document.createElement('div');
    question.innerHTML = inputText;
    question.classList.add('box');
    parentDiv.appendChild(question);
    document.getElementById('input').value = '';

    const questionBody = {
        'question': inputText,
    };

    const res = await fetch('http://localhost:5000/chat',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionBody),
        }
    );

    const data = await res.json();

    if(data.message){
        const answer = document.createElement('div');
        answer.innerHTML = data.message;
        answer.classList.add('box', 'answer');
        parentDiv.appendChild(answer)
    }
}