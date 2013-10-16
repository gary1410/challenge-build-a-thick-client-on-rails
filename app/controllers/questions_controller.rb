class QuestionsController < ApplicationController
  respond_to :json
  # GET /quizzes/:quiz_id/questions/next.json
  def next
    quiz = Quiz.find(params[:quiz_id])
    if quiz
      last_answered_question_id = @simple_session.last_answered_question_id || 0
      remaining_questions = quiz.questions.where("id > ?", last_answered_question_id)
      if remaining_questions.count > 0
        render json: remaining_questions.first.to_json
      else
        render status: :unprocessable_entity, json: { message: "No more questions in quiz '#{quiz.name}'!" }.to_json
      end
    else
      render status: :unprocessable_entity, json: { message: "#{quiz.id} is not a valid quiz id!" }.to_json
    end
  end

  # POST /questions/:question_id/answers.json
  def answer
    question = Question.find(params[:question_id])
    submitted_choice = Choice.find(params[:choice_id])
    correct_choice = question.choices.where(is_correct: true).first
    more_questions = question.quiz.questions.where("id > ?", question.id).count > 0
    if question
      render json: {
        id: question.id,
        more_questions: more_questions,
        correct: submitted_choice.id == correct_choice.id,
        submitted_choice: submitted_choice.id,
        correct_choice: correct_choice.id,
        num_correct: (submitted_choice.id == correct_choice.id) ? 1 : 0,
        num_incorrect: (submitted_choice.id == correct_choice.id) ? 0 : 1
      }.to_json
    else
      render status: :unprocessable_entity, json: { message: "#{question.id} is not a valid question id!" }.to_json
    end
  end
end
