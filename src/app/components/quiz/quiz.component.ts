import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private courseService: CourseService, private userService: UserService, private activateRoute: ActivatedRoute, private router: Router) { }

  //variable
  courseId: any;
  userId: any;
  user: any = {};
  current: number = 0;
  points: number = 0;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  progress: string = '0';
  courses: any = [];
  quiz: any = {}

  questions: any = [{
    questionText: "Which of the following does TypeScript use to specify types?",
    options: [{
      text: ":",
      correct: true
    },
    {
      text: ";"
    },
    {
      text: "!"
    },
    {
      text: "&"
    }
    ],

  },
  {
    questionText: "Which of the following is NOT a type used in TypeScript?",
    options: [{
      text: "number"
    },
    {
      text: "string"
    },
    {
      text: "boolean"
    },
    {
      text: "enum",
      "correct": true
    }
    ],
  },
  {
    questionText: "How can we specify properties and methods for an object in TypeScript?",
    options: [{
      text: "Use classes."
    },
    {
      text: "Use interfaces.",
      "correct": true
    },
    {
      text: "Use enums."
    },
    {
      text: "Use async/await."
    }
    ],
  },
  {
    questionText: "How else can Array<number> be written in TypeScript?",
    options: [{
      text: "@number"
    },
    {
      text: "number[]",
      "correct": true
    },
    {
      text: "number!"
    },
    {
      text: "number?"
    }
    ],
  },
  {
    questionText: "In which of these does a class take parameters?",
    options: [{
      text: "constructor",
      "correct": true
    },
    {
      text: "destructor"
    },
    {
      text: "import"
    },
    {
      text: "subscribe"
    }
    ],
  },
  {
    questionText: "Which is NOT an access modifier?",
    options: [{
      text: "private"
    },
    {
      text: "protected"
    },
    {
      text: "public"
    },
    {
      text: "async",
      "correct": true
    }
    ],
  },
  {
    questionText: "Which keyword allows us to share information between files in TypeScript?",
    options: [{
      text: "import"
    },
    {
      text: "export",
      "correct": true
    },
    {
      text: "async"
    },
    {
      text: "constructor"
    }
    ],
  },
  {
    questionText: "Which is an array method to generate a new array based on a condition?",
    options: [{
      text: "filter",
      "correct": true
    },
    {
      text: "map"
    },
    {
      text: "async"
    },
    {
      text: "enum"
    }
    ],
  },
  {
    questionText: "How is a property accessible within a class?",
    options: [{
      text: "Using this.propertyName",
      "correct": true
    },
    {
      text: "Accessors"
    },
    {
      text: "Destructuring"
    },
    {
      text: "Arrow function"
    }
    ],
  }
  ];

  ngOnInit() {
    this.courseId = this.activateRoute.snapshot.paramMap.get("courseId");
    this.userId = localStorage.getItem("userId");
    this.courseService.getFeedBackByCourse(this.courseId).subscribe((data) => {
      console.log("-------------------------------", data.feedbacks)
      this.courses = data.feedbacks;
    })
    this.userService.getUserById(this.userId).subscribe((data) => {
      this.user = data.user
    })

  }
  answer(current, option) {
    if (current == this.questions.length) {
      localStorage.setItem("note", JSON.stringify(this.points))
      this.quiz.points = this.points
      this.quiz.courseId = this.courseId
      this.courseService.quizAttempt(this.userId, this.quiz)
      this.router.navigate(['dashboard-quiz'])
    }

    if (option.correct) {
      this.points += 2.5;
      this.current++;
      this.correctAnswer++;
      this.getProgress()
    } else {

      this.incorrectAnswer++;
      this.current++;
      this.getProgress()

    }
  }
  
  getProgress() {
    this.progress = ((this.current / this.questions.length) * 100).toString()
    return this.progress;
  }

  nextQuestion() {
    this.current++
  }
  prevQuestion() {
    this.current--

  }

}
