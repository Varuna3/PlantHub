export async function seedPlants(Plant: any, arr: any[]) {
  for (let i = 0; i < arr.length; i++) {
    await Plant.create(arr[i])
  }
}

export async function resetUsers(User: any) {
  const users = await User.findall()
  await users.destroy()
}
