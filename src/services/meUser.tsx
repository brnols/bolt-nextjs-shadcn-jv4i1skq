import { getMeUser, postLogout } from "@/actions/meUser";
import { useQuery, useMutation } from "@tanstack/react-query";


const MeUserServices = {
    getMeUser: () => {
        return useQuery({
            queryKey: ["meUser"],
            queryFn: async () => getMeUser(),
        });
    },
    postLogout: () => {
        return useMutation({
            mutationKey: ["logout"],
            mutationFn: async () => postLogout(),
        });
    },
};

export default MeUserServices;