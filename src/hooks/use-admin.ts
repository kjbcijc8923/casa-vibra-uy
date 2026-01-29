import { useEffect, useState } from "react";
import { cloud } from "@/lib/cloud";

export function useIsAdmin(userId?: string) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!userId) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data, error } = await cloud.rpc("is_admin");
      if (cancelled) return;
      if (error) {
        setIsAdmin(false);
      } else {
        setIsAdmin(Boolean(data));
      }
      setLoading(false);
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return { isAdmin, loading };
}
