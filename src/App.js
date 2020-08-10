import React, { useState, useEffect } from 'react';
import './App.css';
import sha256 from 'crypto-js/sha256';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import CryptoJS from 'crypto-js';
import crypto from 'crypto';

const App = () => {
  const [state, setState] = useState({
    path: '',
    verb: '',
    token: '',
    timestamp: '',
    body: '',
    secret: 'SECRET',
    signature: '',
  });
  useEffect(() => {
    generateSignature();
  }, []);
  const generateSignature = () => {
    const timestamp = new Date().toISOString();
    const payload =
      'path=' +
      '&verb=' +
      '&token=Bearer 123' +
      '&timestamp=2020-07-02T23:32:16.515Z' +
      '&body=';
    // const hashDigest = sha256(payload);

    // const hmacDigest = Base64.stringify(hmacSHA256(hashDigest, 'SECRET'));
    const hmacDigest2 = CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA256(payload, 'SECRET')
    );
    // const hmacDigest3 = CryptoJS.SHA256(payload);

    console.log(payload);
    console.log(hmacDigest2);

    setState({ ...state, signature: hmacDigest2 });
  };

  const createTimeStampHandler = () => {
    const timestamp = new Date().toISOString();
    const payload =
      'path=' +
      state.path +
      '&verb=' +
      state.verb +
      '&token=Bearer ' +
      state.token +
      '&timestamp=' +
      timestamp +
      '&body=' +
      state.body;
    const hashDigest = sha256(payload);
    const hmacDigest = Base64.stringify(hmacSHA256(hashDigest, 'SECRET'));

    setState({ ...state, timestamp: timestamp, signature: hmacDigest });
  };
  const onCHangeHandler = (event) => {
    event.persist();

    const payload =
      'path=' +
        state.path +
        '&verb=' +
        state.verb +
        '&token=Bearer ' +
        state.token +
        '&timestamp=' +
        event.target.name ===
      timestamp
        ? event.target.value
        : state.timestamp + '&body=' + state.body;

    const hashDigest = sha256(payload);
    const hmacDigest = Base64.stringify(hmacSHA256(hashDigest, state.secret));

    const hmacDigest2 = CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA256(payload, '')
    );

    console.log(hmacDigest);
    console.log(hmacDigest2);
  };
  const { path, verb, token, timestamp, body, secret, signature } = state;

  return (
    <div className="App">
      <div style={{ textAlign: 'center' }}>
        <h2>BRI-SIGNATURE</h2>
      </div>
      <input
        value={path}
        onChange={onCHangeHandler}
        name="path"
        placeholder="path"
      />
      <input
        value={verb}
        onChange={onCHangeHandler}
        name="verb"
        placeholder="verb"
      />
      <input
        value={token}
        onChange={onCHangeHandler}
        name="token"
        placeholder="token"
      />
      <input
        value={timestamp}
        onChange={onCHangeHandler}
        name="timestamp"
        placeholder="timestamp"
      />
      <button onClick={createTimeStampHandler}>timestamp</button>
      <input
        value={body}
        onChange={onCHangeHandler}
        name="body"
        placeholder="body"
      />
      <input
        value={secret}
        onChange={onCHangeHandler}
        name="secret"
        placeholder="your secret key"
      />
      <label>Payload :</label>
      <p>
        path={path}&verb={verb}&token={token}&timestamp={timestamp}&body={body}
      </p>
      <label>Signature :</label>
      <p>{signature}</p>
    </div>
  );
};

export default App;
