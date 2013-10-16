class QuizzesController < ApplicationController
  respond_to :json

  # GET /quizzes.json
  def index
    quizzes = Quiz.all
    render json: { quizzes: quizzes }.to_json
  end
end
