"use client";

import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

// number of docs the user is allowed to have
const PRO_LIMIT = 20;
const FREE_LIMIT = 2;

function useSubscription() {
  const [hasActiveMembership, setHasActiveMembership] = useState(null);
  const [isOverFileLimit, setIsOverFileLimit] = useState(false);
  const { user } = useUser();

  //   Listen to the User document
  const [snapshot, loading, error] = useDocument(
    user ? doc(db, "users", user.id) : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  //   Listen to the users files collection
  const [filesSnapshot, filesLoading] = useCollection(
    user ? collection(db, "users", user?.id, "files"): null,
  );

  useEffect(() => {

    if(loading || filesLoading) return // Wait until both are loaded 
    if (snapshot) {
        const data = snapshot.data();
        if(data){
            setHasActiveMembership(data.hasActiveMembership);
            console.log("hasActiveMembership", data.hasActiveMembership);
        }
    }
  }, [snapshot, loading, filesLoading]);

  useEffect(() => {
    console.log("hasActiveMembership", hasActiveMembership);
    if (filesSnapshot || hasActiveMembership !== null){
        const files = filesSnapshot?.docs;
        const usersLimit = hasActiveMembership ? PRO_LIMIT : FREE_LIMIT;
      
        console.log("Checking if user is over file limit", files?.length, usersLimit);

        setIsOverFileLimit(files?.length! >= usersLimit);
    }

  }, [filesSnapshot, hasActiveMembership]);

  return { hasActiveMembership, loading, error, isOverFileLimit, filesLoading };
}

export default useSubscription;