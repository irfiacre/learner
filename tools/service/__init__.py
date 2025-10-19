from google.adk.tools import FunctionTool

from .redis_client import RedisCourseClient


# Singleton instance for tool use
redis_course_client = RedisCourseClient()

add_course_to_redis_tool = FunctionTool(func=redis_course_client.add_course)
get_courses_from_redis_tool = FunctionTool(func=redis_course_client.get_courses)
