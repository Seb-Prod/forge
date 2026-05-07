import { useEffect, useRef, useState } from "react";

type Params = {
  handleLocalTree: () => Promise<void>;
  handleRemoteTree: () => Promise<void>;
  handleStatus: () => Promise<void>;
};

type GitRefreshReturn = {
  localEnabled: boolean;
  setLocalEnabled: (v: boolean) => void;
  remoteEnabled: boolean;
  setRemoteEnabled: (v: boolean) => void;
  statusEnabled: boolean;
  setStatusEnabled: (v: boolean) => void;
};

export const useGitRefresh = ({
  handleLocalTree,
  handleRemoteTree,
  handleStatus,
}: Params):GitRefreshReturn => {
  const [localEnabled, setLocalEnabled] = useState(true);
  const [remoteEnabled, setRemoteEnabled] = useState(true);
  const [statusEnabled, setStatusEnabled] = useState(true);

  const localRef = useRef(handleLocalTree);
  const remoteRef = useRef(handleRemoteTree);
  const statusRef = useRef(handleStatus);

  useEffect(() => {
    localRef.current = handleLocalTree;
    remoteRef.current = handleRemoteTree;
    statusRef.current = handleStatus;
  }, [handleLocalTree, handleRemoteTree, handleStatus]);


  // LOCAL (30s)
  useEffect(() => {
    if (!localEnabled) return;

    localRef.current();

    const id = setInterval(() => {
      localRef.current();
    }, 30000);

    return () => clearInterval(id);
  }, [localEnabled]);

  // REMOTE (180s)
  useEffect(() => {
    if (!remoteEnabled) return;

    remoteRef.current();

    const id = setInterval(() => {
      remoteRef.current();
    }, 180000);

    return () => clearInterval(id);
  }, [remoteEnabled]);

  // STATUS (30s)
  useEffect(() => {
    if (!statusEnabled) return;

    statusRef.current();

    const id = setInterval(() => {
      statusRef.current();
    }, 30000);

    return () => clearInterval(id);
  }, [statusEnabled]);

  return {
    localEnabled,
    setLocalEnabled,
    remoteEnabled,
    setRemoteEnabled,
    statusEnabled,
    setStatusEnabled,
  };
};
