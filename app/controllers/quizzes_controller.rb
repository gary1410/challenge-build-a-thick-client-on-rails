class QuizzesController < ApplicationController
  respond_to :json

  # GET /quizzes.json
  def index
    puts "GET /quizzes.json"
    render json: {}.to_json
  end
end
