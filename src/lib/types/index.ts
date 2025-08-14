export interface User {
    id: string;
    name: string;
    email: string;
    // add other fields as needed
};

// Interface for Google user data
export interface GoogleUser {
	sub: string;
	name: string;
	email: string;
	picture?: string;
}
