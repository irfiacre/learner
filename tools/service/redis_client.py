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

    def add_course(self, course_item: str):
        """
        Adds a course object to Redis.

        Args:
            course_item (str): JSON string describing the course.
        """
        import json
        
        course = json.loads(course_item)        
        courses = self.redis_client.get("courses")
        courses = json.loads(courses) if courses else []
        courses.append(course)        
        self.redis_client.set("courses", json.dumps(courses))

    def get_courses(self):
        """
        Gets all courses from the Redis caching server.

        Returns:
            List of all courses
        """
        import json
        courses = self.redis_client.get("courses")
        courses = json.loads(courses) if courses else []
        return courses

    def delete_all_courses(self):
        """
        Deletes all courses from the Redis caching server.
        """
        self.redis_client.delete("courses")
