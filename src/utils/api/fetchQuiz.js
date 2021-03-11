import {request} from "./request";


const BASE_URL = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple';

export const fetchQuiz = () => request(`${BASE_URL}`)