import os
import redis as redis
import ast

from google.adk.tools import FunctionTool
from typing import Dict, Any


class RedisCourseClient:
    def __init__(self, host=None, port=6379, db=0):
        self.redis_host = host or os.environ.get('REDIS_HOST', 'localhost')
        self.redis_client = redis.Redis(
            host=self.redis_host, port=port, db=db, decode_responses=True
        )

    def add_course(self, course: Dict[str, Any]) -> Dict[str, Any]:
        """
        Adds a course object (JSON-serializable dict) to Redis.

        Args:
            course (dict): JSON object describing the course.
        Returns:
            dict: result with status and meta information.
        """
        print("========== ======= ADDING COURSE:", course)
        courses = self.redis_client.get("courses")
        courses = ast.literal_eval(courses) if courses else []
        courses.append(course)
        self.redis_client.set("courses", str(courses))
        return {"status": "success", "courses_count": len(courses)}

    def get_courses(self):
        """
        Gets all courses from the Redis caching server.

        Returns:
            List of all courses
        """
        courses = self.redis_client.get("courses")
        courses = ast.literal_eval(courses) if courses else []
        return courses

    def delete_all_courses(self):
        """
        Deletes all courses from the Redis caching server.
        """
        self.redis_client.delete("courses")


# if __name__=="__main__":
#     print(redis_course_client.get_courses())
