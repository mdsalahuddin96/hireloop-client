import { requiredRole } from '@/lib/core/session';
import React from 'react';

const AdminDashboardLayout =async ({children}) => {
    await requiredRole("admin")
    return (
        <div>
            {children}
        </div>
    );
};

export default AdminDashboardLayout;