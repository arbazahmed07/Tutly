import { useCallback, useEffect, useState } from "react";

import { useRouter } from "@/hooks/use-router";

const useSearchParams = () => {
  const [searchParams] = useState(() => new URLSearchParams(window.location.search));
  return searchParams;
};

export { useSearchParams };
