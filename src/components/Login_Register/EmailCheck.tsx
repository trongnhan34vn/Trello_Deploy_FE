import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmailCheck = () => {
  const navigate = useNavigate();

  return (
    <>
      {/*100% body table*/}
      <table cellSpacing={0} border={0} cellPadding={0} width="100%">
        <tbody>
          <tr>
            <td>
              <table
                style={{
                  maxWidth: 670,
                  margin: '0 auto',
                }}
                width="100%"
                border={0}
                align="center"
                cellPadding={0}
                cellSpacing={0}
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        width="95%"
                        border={0}
                        align="center"
                        cellPadding={0}
                        cellSpacing={0}
                        style={{
                          maxWidth: 670,
                          background: '#fff',
                          borderRadius: 3,
                          textAlign: 'center',
                          WebkitBoxShadow: '0 6px 18px 0 rgba(0,0,0,.06)',
                          MozBoxShadow: '0 6px 18px 0 rgba(0,0,0,.06)',
                          boxShadow: '0 6px 18px 0 rgba(0,0,0,.06)',
                        }}
                      >
                        <tbody>
                          <tr>
                            <td style={{ height: 40 }}>&nbsp;</td>
                          </tr>
                          <tr>
                            <td style={{ padding: '0 35px' }}>
                              <h1
                                style={{
                                  color: '#1e1e2d',
                                  fontWeight: 600,
                                  margin: 0,
                                  fontSize: 32,
                                  fontFamily: '"Rubik",sans-serif',
                                }}
                              >
                                Your password has been sent to your email.
                                Please check and login!
                              </h1>
                              <span
                                style={{
                                  display: 'inline-block',
                                  verticalAlign: 'middle',

                                  borderBottom: '1px solid #cecece',
                                  width: 100,
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="align-middle">
                              <button
                                onClick={() => {
                                  navigate('/login');
                                }}
                                className="opacity-80 hover:opacity-100 transition-all ease-in-out duration-200"
                                style={{
                                  background: '#20e277',
                                  textDecoration: 'none !important',
                                  fontWeight: 500,
                                  marginTop: 20,
                                  color: '#fff',
                                  marginBottom: 20,
                                  textTransform: 'uppercase',
                                  fontSize: 14,
                                  padding: '10px 24px',
                                  display: 'inline-block',
                                  borderRadius: 3,
                                }}
                              >
                                Login to Trello
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      {/*/100% body table*/}
    </>
  );
};

export default EmailCheck;
