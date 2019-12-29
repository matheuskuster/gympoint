import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';
import { Container, Content, Profile } from './styles';
import { signOut } from '~/store/modules/auth/actions';

NavLink.defaultProps = {
  activeStyle: {
    color: '#444444',
  },
};

export default function Header() {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.user);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/students">GYMPOINT</Link>

          <ul>
            <li>
              <NavLink to="/students">ALUNOS</NavLink>
            </li>
            <li>
              <NavLink to="/plans">PLANOS</NavLink>
            </li>
            <li>
              <NavLink to="/enrollments">MATRÍCULAS</NavLink>
            </li>
            <li>
              <NavLink to="/help">PEDIDOS DE AUXÍLIO</NavLink>
            </li>
          </ul>
        </nav>

        <aside>
          <Profile>
            <strong>{profile.name}</strong>
            <button onClick={handleLogout} type="button">
              sair do sistema
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
