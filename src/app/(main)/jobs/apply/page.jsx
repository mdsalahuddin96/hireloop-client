import { getUserSession } from "@/lib/core/session";


const ApplyPage = async ({params}) => {
    const user=await getUserSession()
    if(user?.role!=="seeker"){
        return<div>
            This job is for only seeker.
        </div>
    }
    return (
        <div>
            apply for this page
        </div>
    );
};

export default ApplyPage;