import { redirect } from '@sveltejs/kit';
import { google } from '$lib/server/auth';
import { generateCodeVerifier, generateState } from 'arctic';
import { dev } from '$app/environment';
import type { PageServerLoad } from './$types';
import type { GoogleUser } from '$lib/types';

// Constants for timeouts
const OAUTH_TIMEOUT = 10000; // 10 seconds
const USERINFO_TIMEOUT = 5000; // 5 seconds

// Helper function to set secure cookies
function setAuthCookies(cookies: any, oauthState: string, codeVerifier: string) {
	cookies.set('oauth_code_verifier', codeVerifier, {
		path: '/',
		httpOnly: true,
		secure: !dev,
		sameSite: 'lax' as const,
		maxAge: 10 * 60 // 10 minutes
	});

	cookies.set('oauth_state', oauthState, {
		path: '/',
		httpOnly: true,
		secure: !dev,
		sameSite: 'lax' as const,
		maxAge: 10 * 60 // 10 minutes
	});
}

// Helper function to clear auth cookies
function clearAuthCookies(cookies: any) {
	cookies.delete('oauth_code_verifier', { path: '/' });
	cookies.delete('oauth_state', { path: '/' });
}

export const load: PageServerLoad = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	// Early validation for OAuth callback
	if (!code || !state) {
		// Initial OAuth request - redirect to Google
		const oauthState = generateState();
		const codeVerifier = generateCodeVerifier();

		setAuthCookies(cookies, oauthState, codeVerifier);

		const oauthUrl = await google.createAuthorizationURL(oauthState, codeVerifier, [
			'openid',
			'profile',
			'email'
		]);

		throw redirect(302, oauthUrl.toString());
	}

	// Handle OAuth callback
	const codeVerifier = cookies.get('oauth_code_verifier');
	const storedState = cookies.get('oauth_state');

	clearAuthCookies(cookies);

	// Validate state and code verifier
	if (!codeVerifier || !storedState || state !== storedState) {
		return {
			error: 'Invalid authentication state. Please try again.'
		};
	}

	try {
		// Validate OAuth code with timeout
		const tokens = await Promise.race([
			google.validateAuthorizationCode(code, codeVerifier),
			new Promise<never>((_, reject) =>
				setTimeout(() => reject(new Error('OAuth validation timeout')), OAUTH_TIMEOUT)
			)
		]);

		// Fetch user info from Google
		const response = await Promise.race([
			fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`
				}
			}),
			new Promise<never>((_, reject) =>
				setTimeout(() => reject(new Error('User info fetch timeout')), USERINFO_TIMEOUT)
			)
		]);

		if (!response.ok) {
			throw new Error(`Failed to fetch user info: ${response.status}`);
		}

		const googleUser: GoogleUser = await response.json();

		// TODO: Create or update session with googleUser data
		// Example: Store user session in database or session store
		// await createSession(googleUser.sub, { email: googleUser.email, name: googleUser.name });

		return {
			success: true,
			user: {
				id: googleUser.sub,
				email: googleUser.email,
				name: googleUser.name
			}
		};
	} catch (error: any) {
		console.error('OAuth callback error:', {
			message: error.message,
			stack: error.stack
		});

		// Specific error messages
		let errorMessage = 'Authentication failed. Please try again.';
		if (error.message?.includes('timeout')) {
			errorMessage = 'Authentication timed out. Please check your connection and try again.';
		} else if (error.message?.includes('ETIMEDOUT')) {
			errorMessage = 'Network connection timed out. Please check your internet and try again.';
		} else if (error.code === 'invalid_grant' || error.message?.includes('invalid_grant')) {
			errorMessage = 'Authorization expired. Please try signing in again.';
		}

		return {
			error: errorMessage
		};
	}
};
