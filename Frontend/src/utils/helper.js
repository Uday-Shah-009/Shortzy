
import { redirect } from "@tanstack/react-router";
import { getMe } from "../API/user.api";
import { login } from "../Store/slice/authReducer";

export const checkAuth  = async ({context}) => {
   const store = context.store;
   const queryClient = context.queryClient;
   try{
   const user = await queryClient.ensureQueryData( {queryKey : ["user"], queryFn: getMe});
   if(!user){
     return false
   }
   store.dispatch(login(user));
     const auth = store.getState().auth;
     if(!auth.isAuthenticated){
        return false
     }
     return true
   }
   catch(err){
      console.log(err)
      return redirect({to: "/auth"})
   } 
}