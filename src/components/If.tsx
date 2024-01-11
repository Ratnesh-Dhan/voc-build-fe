import React from 'react';

type IfProps = {
  condition: boolean;
  then: React.ReactElement | string | number;
  else?: React.ReactElement | string | number;
};

const If = ({ condition, then, else: e = null }: IfProps) => {
  if (condition) return then;
  else return e;
};

export default If;
