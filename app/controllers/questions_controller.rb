class QuestionsController < ApplicationController
  respond_to :json
  # GET /quizzes/:quiz_id/questions/next.json
  def next
    quiz = Quiz.find(params[:quiz_id])
    if quiz
      last_answered_question_id = @simple_session.last_answered_question_id || 0
      remaining_questions = quiz.questions.where("id > ?", last_answered_question_id)
      if remaining_questions.count > 0
        render json: { question: remaining_questions.first }.to_json
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
    @simple_session.tally(submitted_choice, correct_choice)
    more_questions = question.quiz.questions.where("id > ?", question.id).count > 0
    if question
      render json: {
        status: {
          quiz_id: question.quiz.id,
          question_id: question.id,
          more_questions: more_questions,
          correct: submitted_choice.id == correct_choice.id,
          submitted_choice_id: submitted_choice.id,
          correct_choice_id: correct_choice.id,
          num_correct: @simple_session.num_correct,
          num_incorrect: @simple_session.num_incorrect
        }
      }.to_json
    else
      render status: :unprocessable_entity, json: { message: "#{question.id} is not a valid question id!" }.to_json
    end
  end
end
