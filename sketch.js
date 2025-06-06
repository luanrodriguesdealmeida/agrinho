let questions = [
  {
    question: "Qual é a capital do Brasil?",
    options: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"],
    answer: 1
  },
  {
    question: "Quanto é 5 + 7?",
    options: ["10", "12", "14", "15"],
    answer: 1
  },
  {
    question: "Quem pintou a Mona Lisa?",
    options: ["Van Gogh", "Leonardo da Vinci", "Picasso", "Michelangelo"],
    answer: 1
  },
  {
    question: "Maior planeta do sistema solar?",
    options: ["Terra", "Marte", "Júpiter", "Saturno"],
    answer: 2
  },
  {
    question: "Em que continente está o Egito?",
    options: ["África", "Europa", "Ásia", "América"],
    answer: 0
  },
  {
    question: "Qual é o elemento químico da água?",
    options: ["H2O", "O2", "CO2", "NaCl"],
    answer: 0
  },
  {
    question: "Quem escreveu 'Dom Quixote'?",
    options: ["Machado de Assis", "Miguel de Cervantes", "Shakespeare", "Clarice Lispector"],
    answer: 1
  },
  {
    question: "Ano da independência do Brasil?",
    options: ["1822", "1889", "1500", "1945"],
    answer: 0
  },
  {
    question: "Maior animal terrestre?",
    options: ["Elefante", "Girafa", "Baleia Azul", "Rinoceronte"],
    answer: 0
  },
  {
    question: "Quantos lados tem um hexágono?",
    options: ["5", "6", "7", "8"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;
let buttons = [];

let fadeAlpha = 0;
let fadingIn = true;

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  textSize(18);
  createButtons();
}

function createButtons() {
  buttons = [];
  let opts = questions[currentQuestion].options;
  for (let i = 0; i < opts.length; i++) {
    let btn = createButton(opts[i]);
    btn.position(200, 200 + i * 40);
    btn.size(200, 30);
    btn.style('font-size', '16px');
    btn.mouseOver(() => btn.style('transform', 'scale(1.1)'));
    btn.mouseOut(() => btn.style('transform', 'scale(1)'));
    btn.mousePressed(() => checkAnswer(i));
    buttons.push(btn);
  }
  fadeAlpha = 0;
  fadingIn = true;
}

function checkAnswer(choice) {
  if (choice === questions[currentQuestion].answer) {
    score++;
  }
  for (let btn of buttons) {
    btn.remove();
  }
  currentQuestion++;
  if (currentQuestion < questions.length) {
    createButtons();
  }
}

function draw() {
  background(30, 144, 255); // azul de fundo

  // Efeito fade-in
  if (fadingIn && fadeAlpha < 255) {
    fadeAlpha += 5;
  } else {
    fadingIn = false;
  }

  fill(255, fadeAlpha);
  textSize(22);
  
  if (currentQuestion < questions.length) {
    text(`Pergunta ${currentQuestion + 1} de ${questions.length}`, width / 2, 50);
    textSize(24);
    text(questions[currentQuestion].question, width / 2, 100);
  } else {
    textSize(30);
    text("Quiz Finalizado!", width / 2, 150);
    textSize(24);
    text(`Sua pontuação foi: ${score} de ${questions.length}`, width / 2, 200);
  }

  // Bolhas animadas no fundo
  drawBubbles();
}

let bubbles = [];

function drawBubbles() {
  if (bubbles.length < 20) {
    bubbles.push({
      x: random(width),
      y: height + random(100),
      size: random(10, 30),
      speed: random(1, 3),
      alpha: random(50, 150)
    });
  }

  for (let b of bubbles) {
    noStroke();
    fill(255, b.alpha);
    ellipse(b.x, b.y, b.size);
    b.y -= b.speed;

    if (b.y < -50) {
      b.y = height + random(50);
      b.x = random(width);
    }
  }
}
