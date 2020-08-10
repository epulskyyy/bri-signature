import React from 'react';

export default function Output({ state }) {
  return (
    <>
      <label>Payload :</label>
      <textarea className="disabled">{state.secret}</textarea>
      <label>Signature :</label>
      <textarea className="disabled">{state.signature}</textarea>
    </>
  );
}
