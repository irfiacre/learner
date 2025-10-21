import { createInternalServerError } from "@/lib/handlers/error-utils";
import { getGeneratedCourses } from "@/services/services";

export const maxDuration = 300;

export async function GET(): Promise<Response> {
  try {
    const result = await getGeneratedCourses();

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    return createInternalServerError(
      "Failed to get data",
      error
    );
  }
}
