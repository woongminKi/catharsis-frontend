import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  letter-spacing: 2px;
  z-index: 1001;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

// 데스크톱 메뉴
const DesktopNavMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 40px;
  margin: 0;
  padding: 0;

  @media (max-width: 968px) {
    display: none;
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 25px 0;
  display: block;
  transition: color 0.3s;

  &:hover {
    color: #7c3aed;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  list-style: none;
  padding: 10px 0;
  margin: 0;
  min-width: 180px;
  opacity: ${props => (props.$show ? 1 : 0)};
  visibility: ${props => (props.$show ? 'visible' : 'hidden')};
  transition: opacity 0.3s, visibility 0.3s;
`;

const DropdownItem = styled.li`
  padding: 12px 24px;

  a {
    color: #555;
    text-decoration: none;
    display: block;
    transition: color 0.3s;

    &:hover {
      color: #7c3aed;
    }
  }
`;

// 모바일 햄버거 버튼
const HamburgerButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;

  @media (max-width: 968px) {
    display: flex;
  }

  span {
    width: 30px;
    height: 3px;
    background: #333;
    border-radius: 10px;
    transition: all 0.3s;
    transform-origin: center;

    ${props =>
      props.$isOpen &&
      `
      &:nth-child(1) {
        transform: rotate(45deg) translateY(10px);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(3) {
        transform: rotate(-45deg) translateY(-10px);
      }
    `}
  }
`;

// 모바일 사이드바
const MobileSidebar = styled.div`
  position: fixed;
  top: 0;
  right: ${props => (props.$isOpen ? '0' : '-100%')};
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  overflow-y: auto;
  z-index: 1000;
  padding-top: 80px;

  @media (min-width: 969px) {
    display: none;
  }
`;

const MobileOverlay = styled.div`
  display: ${props => (props.$isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;

  @media (min-width: 969px) {
    display: none;
  }
`;

const MobileMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MobileMenuItem = styled.li`
  border-bottom: 1px solid #eee;
`;

const MobileMenuLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  color: #333;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: background 0.3s;

  &:hover {
    background: #f9fafb;
  }
`;

const MobileMenuButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background: none;
  border: none;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  transition: background 0.3s;

  &:hover {
    background: #f9fafb;
  }
`;

const Arrow = styled.span`
  transition: transform 0.3s;
  transform: ${props => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0)')};
`;

const MobileSubMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background: #f9fafb;
  max-height: ${props => (props.$isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const MobileSubMenuItem = styled.li`
  a {
    display: block;
    padding: 12px 24px 12px 40px;
    color: #666;
    text-decoration: none;
    font-size: 14px;
    transition: background 0.3s;

    &:hover {
      background: #f0f0f0;
      color: #7c3aed;
    }
  }
`;

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});

  const menuItems = [
    {
      title: '학원소개',
      path: '/about',
      submenu: [
        { title: '시스템', path: '/about/system' },
        { title: '강사소개', path: '/about/instructors' },
        { title: '시설안내', path: '/about/facilities' },
      ],
    },
    {
      title: '교육과정',
      path: '/curriculum',
      submenu: [
        { title: '입시반', path: '/curriculum/admission' },
        { title: '실기반', path: '/curriculum/practical' },
        { title: '커리큘럼', path: '/curriculum/course' },
      ],
    },
    {
      title: '민액터스 합격자',
      path: '/passers',
    },
    {
      title: '커뮤니티',
      path: '/community',
      submenu: [
        { title: '공지사항', path: '/community/notice' },
        { title: '후기', path: '/community/reviews' },
      ],
    },
    { title: '상담문의', path: '/consultation' },
    { title: '오시는 길', path: '/location' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileMenuOpen) {
      setMobileSubmenuOpen({});
    }
  };

  const toggleMobileSubmenu = index => {
    setMobileSubmenuOpen(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileSubmenuOpen({});
  };

  return (
    <>
      <HeaderContainer>
        <Nav>
          <Logo to="/" onClick={closeMobileMenu}>
            MYNACTORS
          </Logo>

          {/* 데스크톱 메뉴 */}
          <DesktopNavMenu>
            {menuItems.map((item, index) => (
              <NavItem
                key={index}
                onMouseEnter={() => item.submenu && setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <NavLink to={item.path}>{item.title}</NavLink>
                {item.submenu && (
                  <DropdownMenu $show={activeDropdown === index}>
                    {item.submenu.map((subitem, subIndex) => (
                      <DropdownItem key={subIndex}>
                        <Link to={subitem.path}>{subitem.title}</Link>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                )}
              </NavItem>
            ))}
          </DesktopNavMenu>

          {/* 햄버거 버튼 */}
          <HamburgerButton $isOpen={mobileMenuOpen} onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </HamburgerButton>
        </Nav>
      </HeaderContainer>

      {/* 모바일 오버레이 */}
      <MobileOverlay $isOpen={mobileMenuOpen} onClick={closeMobileMenu} />

      {/* 모바일 사이드바 */}
      <MobileSidebar $isOpen={mobileMenuOpen}>
        <MobileMenu>
          {menuItems.map((item, index) => (
            <MobileMenuItem key={index}>
              {item.submenu ? (
                <>
                  <MobileMenuButton onClick={() => toggleMobileSubmenu(index)}>
                    {item.title}
                    <Arrow $isOpen={mobileSubmenuOpen[index]}>▼</Arrow>
                  </MobileMenuButton>
                  <MobileSubMenu $isOpen={mobileSubmenuOpen[index]}>
                    {item.submenu.map((subitem, subIndex) => (
                      <MobileSubMenuItem key={subIndex}>
                        <Link to={subitem.path} onClick={closeMobileMenu}>
                          {subitem.title}
                        </Link>
                      </MobileSubMenuItem>
                    ))}
                  </MobileSubMenu>
                </>
              ) : (
                <MobileMenuLink to={item.path} onClick={closeMobileMenu}>
                  {item.title}
                </MobileMenuLink>
              )}
            </MobileMenuItem>
          ))}
        </MobileMenu>
      </MobileSidebar>
    </>
  );
};

export default Header;
