interface UserInput {
  course: string;
  examType: string;
  note: string;
  links: String[];
  baseInformation?: string;
}

export const buildAssessmentPrompt = (input: UserInput) => `
    <context>
    ${
      input.baseInformation &&
      input.baseInformation.length > 0 &&
      `- Here is the only information to use, nothing else, I repeate nothing else ${input.baseInformation.toString()}`
    }
    ${
      input.links?.length > 0 &&
      `For added context, open and use this information in these links these links provided by the user:
      - ${input.links.map((link) => `"${link}"`).toString()}
      `
    }
    </context>
    <systemRole>
    You are an expert ${input.course} teacher.

    Your ONLY task is to generate a custom assessment exam for students so that.
    </systemRole>
    <rules>
    - The result custom assessment exam should follow these instructions ${
      input.note
    }
    - The type of custom assessment exam is ${input.examType}.
    </rules>
    <outputSchema>
    [{
    "question": "<question>",
    "options": ["option 1", "option 2", ...],
    "answer" : "correct answer"
    },
    .......
    ]
    </outputSchema>
`;

// Prepare an exam on the unit "Quantitative Analysis of Linear Motion" on Motion due to gravity (the exam is 10 questions).
// https://www.uvm.edu/~ldonfort/P21S20/2_Kinematics.pdf
// https://phys.libretexts.org/Bookshelves/University_Physics/Book%3A_Introductory_Physics_-_Building_Models_to_Describe_Our_World_(Martin_Neary_Rinaldo_and_Woodman)/06%3A_Applying_Newtons_Laws/6.02%3A_Linear_motion
// https://www.wscacademy.org/ourpages/auto/2012/12/2/58245433/Physics%20Chapter%204%20Textbook.pdf
