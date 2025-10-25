interface UserInput {
  course: string;
  examType: string;
  note: string;
  links: String[];
  extraInformation?: String[];
}
//    ${
//       input.extraInformation.len &&
//       `- Use this information as the basis for any of your answers ${input.extraInformation.toString()}`
//     }
export const buildAssessmentPrompt = (input: UserInput) => `
    <context>
    ${
      input.links?.length > 0 &&
      `- Read information from these links provided by the user ${input.links.toString()}`
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

// The exam should be for primary 3 school students
// https://www.uvm.edu/~ldonfort/P21S20/2_Kinematics.pdf