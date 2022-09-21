import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import Button  from "./Button";

export default function FundraiserButton() {
  const { data: session, status } = useSession();
  const router  = useRouter();
  const { openConnectModal } = useConnectModal();
  const [gettingSession, setGettingSession] = useState(false);
  
  useEffect(() => {
    if (gettingSession && status === "authenticated") {
      router.push('/create-fundraiser');
      setGettingSession(false);
    } else if (status === "unauthenticated") {
      router.push('/');
    }
  }, [session])
    
  function handleOnClick(e: React.SyntheticEvent) {
    setGettingSession(true)
    if (!session && openConnectModal) {
      openConnectModal();
    } else {
      router.push('/create-fundraiser');
    }
  }

  return (
    <Button 
      onClick={handleOnClick} 
      text={'Start a Fundraiser'}
      buttonType={'Secondary'}
    />  
  );
}