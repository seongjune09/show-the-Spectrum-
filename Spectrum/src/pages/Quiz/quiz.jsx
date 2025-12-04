import { useState } from 'react';
import './quiz.css';

// 퀴즈 데이터
const quizData = {
  상: [
    {
      question: "수소(H)의 스펙트럼에서 가장 강한 빛을 내는 색은?",
      options: ["빨강", "보라", "파랑", "초록"],
      answer: 0
    },
    {
      question: "헬륨(He)의 스펙트럼 선의 특징은?",
      options: ["노란색 선만 있다", "여러 색의 선이 있다", "빨간색 선만 있다", "파란색 선만 있다"],
      answer: 1
    },
    {
      question: "나트륨(Na)의 특징적인 스펙트럼 색은?",
      options: ["빨강", "노랑", "파랑", "초록"],
      answer: 1
    },
    {
      question: "네온(Ne) 사인의 색은?",
      options: ["빨강-오렌지", "파랑", "초록", "노랑"],
      answer: 0
    },
    {
      question: "수소의 발머 계열에서 가장 긴 파장은?",
      options: ["H-α (빨강)", "H-β (청록)", "H-γ (보라)", "H-δ (보라)"],
      answer: 0
    }
  ],
  중: [
    {
      question: "수소 스펙트럼의 발머 계열은 어느 영역에 있나?",
      options: ["가시광선", "적외선", "자외선", "X선"],
      answer: 0
    },
    {
      question: "리튬(Li)의 스펙트럼에서 가장 강한 선의 색은?",
      options: ["빨강", "노랑", "파랑", "초록"],
      answer: 0
    },
    {
      question: "칼륨(K)의 특징적인 스펙트럼 색은?",
      options: ["빨강", "보라", "파랑", "초록"],
      answer: 1
    },
    {
      question: "구리(Cu)를 불꽃 반응시키면 나타나는 색은?",
      options: ["빨강", "청록", "노랑", "보라"],
      answer: 1
    },
    {
      question: "칼슘(Ca)의 불꽃 반응 색은?",
      options: ["주황-빨강", "노랑", "초록", "파랑"],
      answer: 0
    }
  ],
  하: [
    {
      question: "방출 스펙트럼은 무엇을 보여주나?",
      options: ["원소가 방출하는 빛", "원소가 흡수하는 빛", "원소의 질량", "원소의 온도"],
      answer: 0
    },
    {
      question: "각 원소의 스펙트럼이 다른 이유는?",
      options: ["전자 배치가 다르기 때문", "원자 크기가 다르기 때문", "질량이 다르기 때문", "밀도가 다르기 때문"],
      answer: 0
    },
    {
      question: "스펙트럼은 주로 어떤 실험에 사용되나?",
      options: ["원소 확인", "온도 측정", "압력 측정", "부피 측정"],
      answer: 0
    },
    {
      question: "흡수 스펙트럼에서 검은 선은 무엇을 의미하나?",
      options: ["흡수된 파장", "방출된 파장", "반사된 파장", "투과된 파장"],
      answer: 0
    },
    {
      question: "불꽃 반응 실험의 목적은?",
      options: ["원소를 색으로 구분", "원소의 질량 측정", "원소의 온도 측정", "원소의 크기 측정"],
      answer: 0
    }
  ]
};

export default function Quiz() {
  const [difficulty, setDifficulty] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // 난이도 선택
  const selectDifficulty = (level) => {
    setDifficulty(level);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizFinished(false);
  };

  // 답안 선택
  const selectAnswer = (index) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    setShowResult(true);

    if (index === quizData[difficulty][currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  // 다음 문제
  const nextQuestion = () => {
    if (currentQuestion < quizData[difficulty].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  };

  // 재시작
  const restart = () => {
    setDifficulty(null);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizFinished(false);
  };

  // 난이도 선택 화면
  if (!difficulty) {
    return (
      <div className="quiz-container">
        <div className="difficulty-selection">
          <h1 className="quiz-title">스펙트럼 퀴즈</h1>
          <p className="quiz-subtitle">난이도를 선택하세요</p>
          <div className="difficulty-buttons">
          <button
              className="difficulty-btn hard"
              onClick={() => selectDifficulty('상')}
            >
              <img className="First-img" src = "First.png" />
              <div className="btn-text">상</div>
              <div className="btn-desc">심화 학습</div>
            </button>
            
            <button
              className="difficulty-btn medium"
              onClick={() => selectDifficulty('중')}
            >
              <img className="Second-img" src = "Second.png" />
              <div className="btn-text">중</div>
              <div className="btn-desc">원소별 특징</div>
            </button>
            <button
              className="difficulty-btn easy"
              onClick={() => selectDifficulty('하')}
            >
              <img className="Third-img" src = "Third.png" />
              <div className="btn-text">하</div>
              <div className="btn-desc">기초 개념</div>
            </button>

          </div>
        </div>
      </div>
    );
  }

  // 퀴즈 완료 화면
  if (quizFinished) {
    const percentage = (score / quizData[difficulty].length) * 100;
    return (
      <div className="quiz-container">
        <div className="result-screen">
          <h1 className="result-title">퀴즈 완료!</h1>
          <div className="result-score">
            <div className="score-circle">
              <span className="score-number">{score}</span>
              <span className="score-total">/ {quizData[difficulty].length}</span>
            </div>
          </div>
          <p className="result-percentage">{percentage.toFixed(0)}% 정답</p>
          <p className="result-message">
            {percentage === 100 ? "완벽해요! 🎉" :
             percentage >= 80 ? "훌륭해요! 👏" :
             percentage >= 60 ? "잘했어요! 😊" :
             "다시 도전해보세요! 💪"}
          </p>
          <div className="result-buttons">
            <button className="retry-btn" onClick={() => selectDifficulty(difficulty)}>
              같은 난이도 다시하기
            </button>
            <button className="home-btn" onClick={restart}>
              난이도 선택으로
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 퀴즈 진행 화면
  const currentQ = quizData[difficulty][currentQuestion];

  return (
    <div className="quiz-container">
      <div className={`quiz-content difficulty-${difficulty}`}>
        <div className="quiz-header">
          <span className="difficulty-badge">난이도: {difficulty}</span>
        </div>

        <h2 className="question-text">{currentQ.question}</h2>

        <div className="options-container">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${
                selectedAnswer === index
                  ? index === currentQ.answer
                    ? 'correct'
                    : 'incorrect'
                  : showResult && index === currentQ.answer
                    ? 'correct'
                    : ''
              }`}
              onClick={() => selectAnswer(index)}
              disabled={selectedAnswer !== null}
            >
              <span className="option-number">{index + 1}</span>
              <span className="option-text">{option}</span>
              {showResult && index === currentQ.answer && (
                <span className="check-icon">✓</span>
              )}
              {selectedAnswer === index && index !== currentQ.answer && (
                <span className="cross-icon">✗</span>
              )}
            </button>
          ))}
        </div>

        {showResult && (
          <div className="result-feedback">
            <p className={selectedAnswer === currentQ.answer ? 'correct-feedback' : 'incorrect-feedback'}>
              {selectedAnswer === currentQ.answer ? '정답입니다! 🎉' : '틀렸습니다. 😢'}
            </p>
            <button className="next-btn" onClick={nextQuestion}>
              {currentQuestion < quizData[difficulty].length - 1 ? '다음 문제' : '결과 보기'}
            </button>
          </div>
        )}

        <div className="quiz-footer">
          <button className="quit-btn" onClick={restart}>
            그만하기
          </button>
          <span className="current-score">현재 점수: {score}</span>
        </div>
      </div>
    </div>
  );
}
