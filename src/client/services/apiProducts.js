export async function getItems() {
  try {
    const res = await fetch(`http://localhost:9000/items`);

    if (!res.ok) throw Error("Failed getting items");

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getItem(searchQuery) {
  console.log(searchQuery);
  return [{ name: "dd" }];
}

export async function createItem(newItem) {
  try {
    const res = await fetch(`${API_URL}/item`, {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateItem(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/item/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
  } catch (err) {
    throw Error("Failed updating your order");
  }
}
