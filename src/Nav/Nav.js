import React, { useEffect, useState } from 'react';
import './Nav.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../Redux/Actions/auth';

const Nav = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [jam, setJam] = useState(false);
  const checkUrl = () => {
    if (window.location.pathname.replace(/^\/([^\/]*).*$/, '$1') === 'jam') {
      setJam(true);
    }
  };

  useEffect(() => {
    checkUrl();
  }, []);

  const [click, setclick] = useState(false);
  const handleClick = () => {
    setclick(!click);
  };

  return (
    <div className={'nav'}>
      <div className={'front'}>
        <Link
          style={{
            border: 'none',
            margin: '0px',
            padding: '0px',
            textDecoration: 'none',
          }}
          to='/songs/genre1'>
          <div className={'polarJam'}>PolarJam</div>
        </Link>
      </div>
      {/* <div className={'back'}>
        <div className='menu' onClick={handleClick}>
          menu
        </div>
        <ul className={'dropdown'}>
          <li>
            <Link style={{ margin: '0px', padding: '0px', textDecoration: 'none' }} to='/beats'>
              <span className={'name'}>Studio</span>
            </Link>
            <ul>
              <li>
                <Link
                  style={{
                    margin: '0px',
                    border: 'none',
                    padding: '0px',
                    textDecoration: 'none',
                  }}
                  to='/songs/genre1'>
                  <span className={'name'}>Full Songs</span>
                </Link>
                <ul>
                  <li>
                    <Link
                      style={{
                        margin: '0px',
                        border: 'none',
                        padding: '0px',
                        textDecoration: 'none',
                      }}
                      to='/songs/genre1'>
                      <span className={'name'}>Pop</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{
                        border: 'none',
                        margin: '0px',
                        padding: '0px',
                        textDecoration: 'none',
                      }}
                      to='/songs/genre2'>
                      <span className={'name'}>Tropical</span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li className='nav-item' onClick={handleClick}>
          <Link to='/songs/genre1' className='nav-links'>
            Pop
          </Link>
        </li>
        <li className='nav-item' onClick={handleClick}>
          <Link to='/songs/genre2' className='nav-links'>
            Tropical
          </Link>
        </li>
      </ul> */}
    </div>
  );
};

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Nav);
