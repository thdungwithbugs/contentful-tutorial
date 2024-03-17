import Quiz from "./_component/Quiz";
export async function fetchListQuiz() {
  try {
    const result = await fetch(process.env.URL + "/api/quizList", {
      headers: {
        Accept: "application/json",
        method: "GET",
      },
    });

    if (result.ok) {
      return result.json();
    }
    return [];
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
  }
}
export default async function QuizPage() {
  const res = await fetchListQuiz();
  if (!res || !res?.data || res?.data?.length <= 0) return null;
  return <Quiz mockQuestionData={res?.data} />;
}
