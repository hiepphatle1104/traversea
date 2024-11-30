export {};

declare global {
	interface CustomJwtSessionClaims {
		email?: string;
		userId?: string;
		lastName?: string;
		username?: string;
		firstName?: string;
		publicMetadata?: {
			userId: string;
		};
	}
}
