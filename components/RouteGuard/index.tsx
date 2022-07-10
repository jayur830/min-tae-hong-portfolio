// Package
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { nvl } from '@root/utils';
import AdminLayout from '../AdminLayout';

// Global

// Local

export default function RouteGuard({ children }: any) {
	const router = useRouter();

	const [authorized, setAuthorized] = useState<boolean>(false);

	const auth = useMemo(() => {
		if (typeof window === 'object') {
			return localStorage.getItem('mthp_authentication');
		}
		return null;
	}, []);

	useEffect(() => {
		if (auth) {
			setAuthorized(true);
		} else {
			setAuthorized(false);
			router.push('/login');
		}
	}, [auth]);

	return authorized ? <AdminLayout>{children}</AdminLayout> : children;
}
