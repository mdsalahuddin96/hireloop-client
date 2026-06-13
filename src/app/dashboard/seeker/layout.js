import { requiredRole } from '@/lib/core/session';

const SeekerLayout =async ({children}) => {
    await requiredRole("seeker")
    return (
        <div>
            {children}
        </div>
    );
};

export default SeekerLayout;