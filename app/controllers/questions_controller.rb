class QuestionsController < ApplicationController
  respond_to :json
  # GET /quizzes/:quiz_id/questions/next.json
  def next
    puts "GET /quizzes/:quiz_id/questions/next.json"
    render json: {}.to_json
  end

  # POST /questions/:question_id/answers.json
  def answer
    puts "POST /questions/:question_id/answers.json"
    render json: {}.to_json
  end
end
