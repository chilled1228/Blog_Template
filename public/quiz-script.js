// Global variables
let currentQuestionIndex = 0;
let totalScore = 0;
const quizQuestions = [
  {
    text: "How often do you check your teen's phone or social media without permission?",
    options: [
      {text: "Daily or weekly", value: 3},
      {text: "Occasionally when worried", value: 2},
      {text: "Rarely or never", value: 1}
    ]
  },
  {
    text: "When your teen makes a mistake, how do you typically respond?",
    options: [
      {text: "Give silent treatment or withdraw affection", value: 3},
      {text: "Express disappointment but stay connected", value: 2},
      {text: "Address the behavior while maintaining warmth", value: 1}
    ]
  },
  {
    text: "How often do you compare your teen's problems to your own teenage experiences?",
    options: [
      {text: "Almost always - 'When I was your age...'", value: 3},
      {text: "Sometimes when trying to help", value: 2},
      {text: "Rarely - I recognize their world is different", value: 1}
    ]
  },
  {
    text: "What's your primary focus in conversations with your teen?",
    options: [
      {text: "Grades, achievements, and future planning", value: 3},
      {text: "Mix of achievements and personal topics", value: 2},
      {text: "Their thoughts, feelings, and interests", value: 1}
    ]
  },
  {
    text: "When your teen shares a problem with you, what's your first instinct?",
    options: [
      {text: "Tell them it's not a big deal or offer quick solutions", value: 3},
      {text: "Listen but quickly move to problem-solving", value: 2},
      {text: "Listen fully and validate their feelings first", value: 1}
    ]
  },
  {
    text: "How much time do you spend with your teen when things are going well?",
    options: [
      {text: "Very little - I'm busy and they seem fine", value: 3},
      {text: "Some quality time but often interrupted", value: 2},
      {text: "Regular, uninterrupted connection time", value: 1}
    ]
  },
  {
    text: "How do you handle your teen's growing independence?",
    options: [
      {text: "Try to maintain control over most decisions", value: 3},
      {text: "Struggle but gradually give more freedom", value: 2},
      {text: "Support their autonomy while maintaining boundaries", value: 1}
    ]
  }
];

// Function to handle next question
function handleNextQuestion() {
  const selectedOption = document.querySelector('input[name="currentQuestion"]:checked');
  if (!selectedOption) {
    alert("Please select an answer before continuing.");
    return;
  }
  
  totalScore += parseInt(selectedOption.value);
  currentQuestionIndex++;
  
  if (currentQuestionIndex < quizQuestions.length) {
    displayCurrentQuestion();
  } else {
    showQuizResults();
  }
}

// Function to display current question
function displayCurrentQuestion() {
  const questionContainer = document.getElementById('question-container');
  const question = quizQuestions[currentQuestionIndex];
  
  let optionsHtml = '';
  question.options.forEach((option, index) => {
    optionsHtml += `
      <label style="display: block; margin-bottom: 5px; cursor: pointer;">
        <input type="radio" name="currentQuestion" value="${option.value}" style="margin-right: 8px;">
        ${option.text}
      </label>
    `;
  });
  
  questionContainer.innerHTML = `
    <p id="question-text" style="font-weight: bold; margin-bottom: 15px;">Question ${currentQuestionIndex + 1}: ${question.text}</p>
    <div style="margin-bottom: 10px;">
      ${optionsHtml}
    </div>
  `;
}

// Function to show quiz results
function showQuizResults() {
  document.getElementById('question-container').style.display = 'none';
  document.querySelector('button').style.display = 'none';
  document.getElementById('results').style.display = 'block';
  
  const scoreDisplay = document.getElementById('score-display');
  const feedback = document.getElementById('feedback');
  
  let category, message, color;
  
  if (totalScore <= 10) {
    category = "Connection-Focused Parent";
    message = "Great job! You're building a strong, trust-based relationship with your teen. You understand that connection comes before correction and that your teen needs both boundaries and freedom to grow. Keep focusing on being their emotional safe space.";
    color = "#28a745";
  } else if (totalScore <= 17) {
    category = "Work-in-Progress Parent";
    message = "You're on the right track but there's room for growth. You care deeply about your teen but might sometimes let anxiety or old patterns guide your parenting. Focus on listening more, controlling less, and remembering that their world is different from yours.";
    color = "#ffc107";
  } else {
    category = "Control-Focused Parent";
    message = "Your parenting style might be inadvertently pushing your teen away. You love them deeply, but fear and control are driving many of your decisions. Consider shifting from managing their choices to connecting with their heart. Small changes can make a huge difference.";
    color = "#dc3545";
  }
  
  scoreDisplay.innerHTML = `Score: ${totalScore}/21 - ${category}`;
  scoreDisplay.style.color = color;
  feedback.innerHTML = message;
  feedback.style.borderLeftColor = color;
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // Quiz is already initialized with the first question in HTML
});