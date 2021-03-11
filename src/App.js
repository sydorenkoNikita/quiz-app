import React, {useState, useEffect} from 'react'
import './App.css';
import {fetchQuiz} from "./utils/api/fetchQuiz";

const App = () => {
    const [showScore, setShowScore] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [quiz, setQuiz] = useState({
        questions: []
    })

    useEffect(async () => {
        const responseQuiz = await fetchQuiz()
        setQuiz({
            questions: responseQuiz.results
        })
    }, [setQuiz])

    const {questions = []} = quiz;
    const {question = ''} = questions[currentQuestion] || '';
    const {correct_answer = ''} = questions[currentQuestion] || '';
    const {incorrect_answers = []} = questions[currentQuestion] || [];
    const allAnswers = [...incorrect_answers];
    allAnswers.splice(Math.random() * 4, 0, correct_answer);

    const handleAnswerClick = (item) => {

        if (item === correct_answer) {
            setScore(score + 1)
        }
        const nextQuestion = currentQuestion + 1
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion)
        } else {
            setShowScore(true)
        }
    }
    const refresh = () => {
        setShowScore(false);
        setCurrentQuestion(0);
        setScore(0)
    }
    return (
        <div className="App">
            {
                showScore
                    ? <div className="sectionScore">
                        <div>correct answers {score} out of {questions.length}</div>
                        <button onClick={refresh}>попровобавть еще раз</button>
                    </div>
                    : <div className="quiz">
                        <div className="questionSection">
                            <div className="questionCount">
                                <span>question {currentQuestion + 1}</span> / {questions.length}
                            </div>
                            <div className="questionText">{question}</div>
                        </div>
                        <div className="answerSection">
                            {allAnswers.map((item, index) => (
                                <button onClick={() => handleAnswerClick(item)} key={index}>{item}</button>
                            ))}
                        </div>
                </div>
            }

        </div>
    );
}

export default App;
