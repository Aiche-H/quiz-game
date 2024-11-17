// Import the QUESTIONS array from the questions.js file
import { QUESTIONS } from "./questions.js";


// wait for each dom element to be loaded first
document.addEventListener("DOMContentLoaded", () => {
  // Get a reference to the quiz container element
  const QUIZ_CONTAINER = document.getElementById("quiz-container");
  // Initialize an empty array to store the random questions
  const RANDOM_QUESTIONS = [];
  // Loop until we have 5 random questions
  while (RANDOM_QUESTIONS.length < 5) {
    // Generate a random index for the QUESTIONS array
    const RANDOM_INDEX = Math.floor(Math.random() * QUESTIONS.length);
    // Get the question at the random index
    const QUESTION = QUESTIONS[RANDOM_INDEX];
    // Check if the question is already in the RANDOM_QUESTIONS array
    if (!RANDOM_QUESTIONS.includes(QUESTION)) {
      // Add the question to the RANDOM_QUESTIONS array
      RANDOM_QUESTIONS.push(QUESTION);
    }
  }

  // Clear the contents of the quiz container element
  QUIZ_CONTAINER.innerHTML = "";

  // Loop through the RANDOM_QUESTIONS array and create HTML for each question
  RANDOM_QUESTIONS.forEach((QUESTION, INDEX) => {
    // Create the HTML for the question
    const QUESTION_HTML = `
            <div>
            <p>${QUESTION.question}</p>
            ${QUESTION.options
              // Loop through the options for the question and create HTML for each option
              .map((OPTION, OPTION_INDEX) => {
                return `
             <input type="radio" name="question-${INDEX}" value="${OPTION}">
             <label>${OPTION}</label>
             <br>
             `;
              })
              // Join the HTML for each option into a single string
              .join("")}
             </div>
            `;
    // Add the question HTML to the quiz container element
    QUIZ_CONTAINER.insertAdjacentHTML("beforeend", QUESTION_HTML);
  });

  // Get a reference to the submit button element
  const SUBMIT_BUTTON = document.getElementById("submit");

  // Add an event listener to the submit button to handle clicks
  SUBMIT_BUTTON.addEventListener("click", () => {
    // Initialize the score to 0
    let score = 0;
    // Loop through the RANDOM_QUESTIONS array and check the answers
    RANDOM_QUESTIONS.forEach((QUESTION, INDEX) => {
      // get the selected answer for the question
      const SELECTED_ANSWER = document.querySelector(
        `input[name="question-${INDEX}"]:checked`
      );
      // Check if the selected answer is correct
      if (SELECTED_ANSWER && SELECTED_ANSWER.value === QUESTION.answer) {
        // Increment the score if the answer is correct
        score++;
      }
    });
    // Display the score in an alert box
    alert(`your score ${score} out of ${RANDOM_QUESTIONS.length}`);
    // Reload the page to start the quiz again
    location.reload();
  });
});
