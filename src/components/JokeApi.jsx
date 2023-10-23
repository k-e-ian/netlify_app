export default async function fetchJoke(category) {
  try {
    const response = await fetch(`https://v2.jokeapi.dev/joke/${category}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return {
        error: true,
        message: "Sorry, couldn't fetch a joke at the moment.",
      };
    }
  } catch (error) {
    return {
      error: true,
      message: "An error occurred while fetching a joke.",
    };
  }
}
