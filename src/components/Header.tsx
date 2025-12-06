import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface MenuItem {
  title: string;
  path: string;
  submenu?: { title: string; path: string }[];
}

interface DropdownMenuProps {
  $show: boolean;
}

interface HamburgerButtonProps {
  $isOpen: boolean;
}

interface MobileSidebarProps {
  $isOpen: boolean;
}

interface MobileOverlayProps {
  $isOpen: boolean;
}

interface ArrowProps {
  $isOpen: boolean;
}

interface MobileSubMenuProps {
  $isOpen: boolean;
}

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
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 80px;

  @media (max-width: 968px) {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    position: relative;
  }
`;

const Logo = styled(Link)`
  font-size: 22px;
  font-weight: 700;
  color: #333;
  text-decoration: none;
  letter-spacing: 1px;
  text-align: center;
  z-index: 1001;
  white-space: nowrap;

  @media (max-width: 968px) {
    font-size: 18px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 968px) {
    display: none;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f5f5f5;
  transition: all 0.3s;

  &:hover {
    background: #7c3aed;
    transform: translateY(-2px);
  }

  svg {
    width: 20px;
    height: 20px;
    fill: #333;
  }

  &:hover svg {
    fill: white;
  }
`;

// 데스크톱 메뉴
const DesktopNavMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 32px;
  margin: 0;
  padding: 0;
  justify-content: flex-start;

  @media (max-width: 968px) {
    display: none;
  }
`;

const NavItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  padding: 28px 0;
  display: block;
  transition: all 0.3s;
  white-space: nowrap;

  &:hover {
    color: #7c3aed;
  }
`;

const DropdownMenu = styled.ul<DropdownMenuProps>`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  list-style: none;
  padding: 8px 0;
  margin: 0;
  min-width: 160px;
  opacity: ${props => (props.$show ? 1 : 0)};
  visibility: ${props => (props.$show ? 'visible' : 'hidden')};
  transform: ${props => (props.$show ? 'translateY(0)' : 'translateY(-10px)')};
  transition: all 0.3s ease;
  border-top: 2px solid #7c3aed;
`;

const DropdownItem = styled.li`
  a {
    color: #555;
    text-decoration: none;
    display: block;
    padding: 10px 20px;
    font-size: 14px;
    transition: all 0.2s;
    white-space: nowrap;

    &:hover {
      color: #7c3aed;
      background: #f9fafb;
      padding-left: 24px;
    }
  }
`;

// 모바일 햄버거 버튼
const HamburgerButton = styled.button<HamburgerButtonProps>`
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
const MobileSidebar = styled.div<MobileSidebarProps>`
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

const MobileOverlay = styled.div<MobileOverlayProps>`
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

const Arrow = styled.span<ArrowProps>`
  transition: transform 0.3s;
  transform: ${props => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0)')};
`;

const MobileSubMenu = styled.ul<MobileSubMenuProps>`
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

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<{ [key: number]: boolean }>({});

  const menuItems: MenuItem[] = [
    {
      title: '학원 소개',
      path: '/about',
      submenu: [
        { title: '인사말', path: '/about/greeting' },
        { title: '카타르시스 특징', path: '/about/features' },
        { title: '강사소개', path: '/about/instructors' },
        { title: '시설안내', path: '/about/facilities' },
        { title: '오시는 길', path: '/about/location' },
      ],
    },
    {
      title: '커리큘럼',
      path: '/curriculum',
      submenu: [
        { title: '입시반', path: '/curriculum/admission' },
        { title: '예비입시반', path: '/curriculum/pre-admission' },
      ],
    },
    {
      title: '합격자현황',
      path: '/passers',
      submenu: [{ title: '실시간 합격자', path: '/passers' }],
    },
    {
      title: '온라인상담',
      path: '/consultation',
      submenu: [{ title: '수강 문의', path: '/consultation/inquiry' }],
    },
    {
      title: '커뮤니티',
      path: '/community',
      submenu: [
        { title: '공지사항', path: '/community/notice' },
        { title: '입시 자료실', path: '/community/archive' },
        { title: '포토 갤러리', path: '/community/gallery' },
      ],
    },
  ];

  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileMenuOpen) {
      setMobileSubmenuOpen({});
    }
  };

  const toggleMobileSubmenu = (index: number): void => {
    setMobileSubmenuOpen(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const closeMobileMenu = (): void => {
    setMobileMenuOpen(false);
    setMobileSubmenuOpen({});
  };

  return (
    <>
      <HeaderContainer>
        <Nav>
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

          {/* 로고 */}
          <Logo to="/" onClick={closeMobileMenu}>
            카타르시스 연기학원
          </Logo>

          {/* 소셜 미디어 아이콘 */}
          <SocialIcons>
            {/* <SocialLink href="https://pf.kakao.com/" target="_blank" rel="noopener noreferrer" aria-label="카카오톡">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3C6.477 3 2 6.477 2 10.75c0 2.734 1.819 5.127 4.54 6.518-.197.718-.645 2.444-.742 2.826-.115.456.168.45.353.327.153-.102 2.423-1.675 3.355-2.318C10.235 18.25 11.102 18.5 12 18.5c5.523 0 10-3.477 10-7.75S17.523 3 12 3z"/>
              </svg>
            </SocialLink> */}
            <SocialLink
              href="https://www.instagram.com/catharsis_act?igsh=MXBkaWMzN2IyMWdwZA%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="인스타그램"
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </SocialLink>
            <SocialLink
              href="https://www.youtube.com/@catharsis_act"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="유튜브"
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </SocialLink>
          </SocialIcons>

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
