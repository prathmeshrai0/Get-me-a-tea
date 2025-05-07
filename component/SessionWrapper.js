'use client'

import React from "react";
import { SessionProvider } from "next-auth/react";

const SessionWrapper = (props) => {
 
  // React automatically passes whatever is between the <SessionWrapper>...</SessionWrapper> tags as a special prop called children.
  return <SessionProvider>{props.children}</SessionProvider>;
};
 
export default SessionWrapper;
