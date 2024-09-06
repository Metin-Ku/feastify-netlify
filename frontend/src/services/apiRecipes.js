export async function getRecipes({ filter }) {
  if (!filter) {
    return { data: null, error: null };
  }

  try {
    const endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/v1/recipes?title=*${filter}*`;

    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    const { data } = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Recipes could not be loaded' };
  }
}

export async function getRecipe({ id }) {
  try {
    const endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/v1/recipes/${id}`;

    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Failed to fetch recipe');
    }

    const { data } = await response.json();

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Recipe could not be loaded' };
  }
}

export async function createRecipe(recipe) {
  try {
    const endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/v1/recipes`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      throw new Error('Failed to create recipe');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { data: null, error: 'Recipe could not be created' };
  }
}
