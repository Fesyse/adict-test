import { User } from "@/types/user";

class UsersService {
	private BASE_URL = "http://localhost:8000/api/users";

	async getUserById(id: number): Promise<User> {
		const response = await fetch(`${this.BASE_URL}/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) throw new Error(`Failed to fetch user ${id}`);

		return response.json();
	}
}

export const usersService = new UsersService();
