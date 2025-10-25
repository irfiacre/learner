from google.adk.agents import Agent
from google.adk.tools import google_search
from google.genai import types
from tools.service import add_course_to_redis_tool, get_courses_from_redis_tool


root_agent = Agent(
    name="AssessmentAgent",
    model="gemini-2.5-flash",
    description="This is an AI agent that generates a curriculumn",
    generate_content_config=types.GenerateContentConfig(temperature=0.2),
    instruction="""
    <systemRole>
    You are a teacher.
    Your ONLY task is to use the information provided by the user to make a customized assessment.
    </systemRole>

    <rules>
    - This should only be a multiple choice assessment.
    - The questions should not be more than 7.
    </rules>
        <tools>
            - Use the tools given to you to carry out the task:
                1. add_course_to_redis_tool: Pass the complete course as a JSON string. Ensure the course is fully prepared before calling this tool.
                2. get_courses_from_redis_tool: Returns all courses from the Redis database.
                <usage>
                    Always use "add_course_to_redis_tool" at the end after developing the curriculum.
                    Convert the course object to a JSON string before passing it to the tool.
                </usage>
        </tools>

    <outputSchema>
    [{
    "question": "< question >",
    "options": ["option 1", "option 2", ...],
    "answer" : "correct answe"
    },
    .......
    ]
    </outputSchema>
    
    <task>
    </task>
    """,
    tools=[add_course_to_redis_tool, get_courses_from_redis_tool],
)
