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
GET /quizzes/1.json
```

#### Request Data

{ session_id: 'a124f87dec55da23' }

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
POST /questions/1/answers
```

#### Request Data

```json
{ session_id: 'a124f87dec55da23', id: 1, answer: 12 }
```


#### Response

```json
{
  id: 1,
  more_questions: true, // if false, display complete message
  correct: true,
  submitted_answer: "a",
  correct_answer: "a",
  num_correct: 2,
  num_incorrect: 3
}
```
