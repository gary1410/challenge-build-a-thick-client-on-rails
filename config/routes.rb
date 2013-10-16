Quizzes::Application.routes.draw do
  root to: 'home#index'

  get '/quizzes.:format', to: 'quizzes#index', as: :quizzes, constraints: {:format => /json/}
  get '/quizzes/:quiz_id/questions/next.:format', to: 'questions#next', as: :next_question, constraints: {:format => /json/}
  post '/questions/:question_id/answers.:format', to: 'questions#answer', as: :submit_answer, constraints: {:format => /json/}
end
