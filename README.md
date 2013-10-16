# quizzes

## This app exposes an API for a simple quiz appication.

Your mission: build a one-page app using (at least) jQuery, Javascript, and AJAX to render questions to the user, allow her to submit answers, tell her whether or not her submitted answer was correct, and give her her final correct / incorrect tally.

Fork this repo to get started!

## APIs

### Get Quizzes

#### Request

```
GET /quizzes.json
```

#### Response

```json
{
  quizzes: [
    {
      id: 1,
      name: "Random Stuff"
    },
    {
      id: 2,
      name: "Javascript Questions"
    }
  ]
}
```

### Get Next Question

#### Request

```
GET /quizzes/1/questions/next.json
```

#### Request Data

{ session_key: 'a124f87dec55da23' }

#### Response

```json
{
  id: 1,
  question: "Did your mom go to college?",
  choices: {
    12: "Yes", // should render as "a: Yes"
    13: "No"   // should render as "b: No"
  }
}
```

### Submit Answer

#### Request

```
POST /questions/1/answers.json
```

#### Request Data

```json
{ session_key: 'a124f87dec55da23', choice_id: 12 }
```


#### Response

```json
{
  id: 1,
  more_questions: true, // if false, display complete message
  correct: false,
  submitted_choice: 12,
  correct_choice: 13,
  num_correct: 0,
  num_incorrect: 1
}
```
