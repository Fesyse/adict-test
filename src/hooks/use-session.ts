// MOCK SESSION

import { useState } from "react";

export const useSession = () => {
	const [session, setSession] = useState({
		user: {
			id: 1,
			name: "John Doe",
			username: "johndoe",
			email: "johndoe@example.com",
			address: {
				street: "123 Main St",
				suite: "Apt. 456",
				city: "San Francisco",
				zipcode: "94105",
				geo: {
					lat: "-37.8225",
					lng: "-122.427",
				},
			},
			phone: "555-1234",
			website: "https://example.com",
			company: {
				name: "ACME Corporation",
				catchPhrase: "Multi-layered client-server neural-net",
				bs: "revolutionize end-to-end systems",
			},
		},
	});

	return session;
};
